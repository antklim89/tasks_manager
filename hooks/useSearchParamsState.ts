import { useRouter, useSearchParams } from 'next/navigation';
import { z, Schema } from 'zod';


export function useSearchParamsState(
    name: string,
): readonly [string | undefined, (newState?: string | null) => void]

export function useSearchParamsState<S extends Schema>(
    name: string,
    schema: S,
): readonly [z.infer<S> | undefined, (newState?: string | null) => void]

export function useSearchParamsState<S extends Schema>(
    name: string,
    schema?: S,
): readonly [z.infer<S> | undefined, (newState?: string | null) => void] {
    const { replace } = useRouter();
    const state = (schema ? schema.optional().catch(undefined) : z.string().optional().catch(undefined))
        .parse(useSearchParams().get(name));

    const changeState = (newState?: string | null): void => {
        const searchParams = new URLSearchParams(location.search);
        if (newState) searchParams.set(name, newState);
        else searchParams.delete(name);
        replace(`?${searchParams.toString()}`, {});
    };

    return [state, changeState] as const;
}
