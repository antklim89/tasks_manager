import { Providers, Toast , Footer, Header } from '@/components';

import '@/styles/main.css';
import 'core-js/actual/array/to-spliced';
import 'core-js/actual/object/group-by';


export const metadata = {
    title: {
        default: 'Tasks Manager',
        template: '%s | Tasks Manager',
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html data-theme="dark" lang="en">
            <head>
                <link href="/favicon.svg" rel="icon" sizes="any" />
            </head>
            <body>
                <Providers>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Footer />
                    <Toast />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;

export const dynamic = 'force-dynamic';
