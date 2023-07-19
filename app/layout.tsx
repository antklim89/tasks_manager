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
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
};

export default RootLayout;


