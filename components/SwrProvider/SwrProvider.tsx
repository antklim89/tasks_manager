'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';


const SwrProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig value={{
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnMount: true,
            revalidateOnReconnect: false,
        }}
        >
            {children}
        </SWRConfig>
    );
};

export default SwrProvider;
