import { SwrProvider, Toast } from '@/components';
import { Footer, Header } from '@/features';
import '@/styles/main.scss';


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
                <SwrProvider>
                    <Header />
                    <main className="container m-auto ">
                        {children}
                    </main>
                    <Footer />
                    <Toast />
                </SwrProvider>
            </body>
        </html>
    );
};

export default RootLayout;


