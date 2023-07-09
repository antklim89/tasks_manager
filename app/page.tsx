import { Metadata } from 'next';

import { Hero } from '@/features';


export const metadata: Metadata = {
    title: {
        default: 'Home',
        template: '&s | Example',
    },
};

const HomePage = async () => {

    return (
        <>
            <Hero />
        </>
    );
};

export default HomePage;
