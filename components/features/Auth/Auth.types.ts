import { z } from 'zod';

import { authSchema } from './Auth.schema';


export type AuthFotmInput = z.infer<typeof authSchema>
