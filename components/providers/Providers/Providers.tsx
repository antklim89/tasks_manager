'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig value={{
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnMount: true,
            revalidateOnReconnect: false,
            // @ts-expect-error property exists
            throwOnError: false,
        }}
        >
            {children}
        </SWRConfig>
    );
};

export default Providers;
