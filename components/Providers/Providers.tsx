'use client';
import { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SWRConfig } from 'swr';


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
    );
};

export default Providers;
