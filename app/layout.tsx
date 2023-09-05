import { Providers, Toast } from '@/components';
import { Footer, Header } from '@/features';

import '@/styles/main.scss';
import 'core-js/actual/array/to-spliced';


export const metadata = {
    title: {
        default: 'Tasks Manager',
        template: '%s | Tasks Manager',
    },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html data-theme="dark" lang="en">
            <head />
            <body>
                <Providers>
                    <Header />
                    <main className="container m-auto ">
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


