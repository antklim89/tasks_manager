import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { z, Schema } from 'zod';


export function useSearchParamsState(
    name: string,
    options?: { defer?: number },
): readonly [string | undefined, (newState?: string | null) => void]

export function useSearchParamsState<S extends Schema>(
    name: string,
    options?:{ defer?: number, schema: S, },
): readonly [z.infer<S> | undefined, (newState?: string | null) => void]

export function useSearchParamsState<S extends Schema>(
    name: string,
    { schema, defer }: { defer?: number, schema?: S, } = {},
): readonly [z.infer<S> | undefined, (newState?: string | null) => void] {
    const queryState = (schema ? schema.optional().catch(undefined) : z.string().optional().catch(undefined))
        .parse(useSearchParams().get(name));

    const timeoutId = useRef<NodeJS.Timeout|null>(null);
    const { replace } = useRouter();
    const [state, setState] = useState(queryState);

    const changeState = (newState?: string | null): void => {
        setState(newState);
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            const searchParams = new URLSearchParams(location.search);
            if (newState) searchParams.set(name, newState);
            else searchParams.delete(name);
            replace(`?${searchParams.toString()}`, {});
        }, defer);
    };

    return [state, changeState] as const;
}
