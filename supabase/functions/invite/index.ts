import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.22.2/mod.ts';
import { type User, createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import type { Database } from '../../generated-types.ts';
import { cors } from '../cors.ts';


const {
    SUPABASE_DB_URL,
    SEND_EMAIL,
    EMAIL_PASSWORD,
    RECV_EMAIL,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
} = z.object({
    SUPABASE_DB_URL: z.string(),
    SEND_EMAIL: z.string(),
    EMAIL_PASSWORD: z.string(),
    RECV_EMAIL: z.string(),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
}).parse(Deno.env.toObject());


const pool = new postgres.Pool(SUPABASE_DB_URL, 3, true);

const connectConfig = {
    hostname: 'smtp.mail.ru',
    port: 465,
    username: SEND_EMAIL,
    password: EMAIL_PASSWORD,
} as const;

const bodySchema = z.object({
    email: z.string().email(),
    projectId: z.number().positive(),
});

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
    const inviteToken = nanoid(100);

    try {
        const { email, projectId } = await getBody(req);
        const user = await getInvitedUser(email);
        await createMember(req, { email, inviteToken, projectId, userId: user.id });
        return sendEmail(inviteToken);
    } catch (error) {
        if (error instanceof Response) return error;
        console.error(error);
        return new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    }
});


function getSupabaseClient(req: Request) {
    const authToken = req.headers.get('Authorization');
    if (!authToken) throw new Response('You are not authenticated.', { headers: cors, status: 401 });
    return createClient<Database>(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        { global: { headers: { Authorization: authToken } } },
    );
}

async function getBody(req: Request) {
    const body = await req.json();
    const parseResult = await bodySchema.safeParseAsync(body);
    if (!parseResult.success) throw new Response(parseResult.error.message, { headers: cors, status: 400 });
    return parseResult.data;
}

async function getInvitedUser(email: string) {
    const connection = await pool.connect();
    try {
        const { rows: [user] } = await connection
            .queryObject<User>`SELECT id FROM auth.users au WHERE au.email = ${email}`;

        if (!user) throw new Response('User with this email not found', { headers: cors, status: 404 });

        return user;
    } catch (error) {
        console.error('Get invited user error.\n', error);
        throw new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    } finally {
        connection.release();
    }
}

async function createMember(req: Request, {
    projectId,
    userId,
    email,
    inviteToken,
}: {
    projectId: number;
    userId: string;
    email: string;
    inviteToken: string;
}) {
    const supabaseClient = getSupabaseClient(req);

    const { error } = await supabaseClient
        .from('members')
        .insert({ projectId, userId, email, role: 'invited', inviteToken });

    if (error) {
        if (error.code !== '23505') throw new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
        await supabaseClient
            .from('members')
            .update({ inviteToken })
            .eq('projectId', projectId)
            .eq('userId', userId)
            .eq('role', 'invited');
    }
}

async function sendEmail(inviteToken: string) {
    const client = new SmtpClient();
    try {
        await client.connectTLS(connectConfig);
        const inviteLink = new URL(`${SUPABASE_URL}/functions/v1/accept-invite`);
        inviteLink.searchParams.set('token', inviteToken);
        const content = `
<h1>You have been invited to Tasks Manager.</h1>

<p>Follow the link to accept it.</p>
<a href="${inviteLink}">${inviteLink}</a>
        `;

        await client.send({
            from: SEND_EMAIL,
            to: RECV_EMAIL,
            subject: 'Tasks Manager Invitation!',
            content,
        });
        return new Response('Ok', { headers: cors, status: 200 });
    } catch (error) {
        console.error('Send email error.\n', error);
        return new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    } finally {
        await client.close();
    }
}
