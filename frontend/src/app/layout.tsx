import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { AppProviders } from './providers';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: '--font-jakarta',
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Buch Dashboard',
    description: 'Frontend für das Buch-Backend',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" className={plusJakartaSans.variable}>
            <body>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
