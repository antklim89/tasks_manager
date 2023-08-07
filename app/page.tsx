import { SWRConfig } from 'swr';

import { Hero } from '@/features';


const HomePage = async () => {
    const swrConfig: Parameters<typeof SWRConfig>[0]['value'] = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnMount: true,
        revalidateOnReconnect: false,
    } as const;

    return (
        <SWRConfig value={swrConfig}>
            <Hero />
        </SWRConfig>
    );
};

export default HomePage;
