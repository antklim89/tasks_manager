import { Footer, Header } from '@/features';
import '@/styles/main.scss';


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


