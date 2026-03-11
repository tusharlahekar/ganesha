import './globals.css';
import { Cinzel_Decorative, Inter } from 'next/font/google';
import Providers from '../components/Providers';

const heading = Cinzel_Decorative({ subsets: ['latin'], weight: ['400', '700'] });
const body = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shree Ganesh Murti Kala Kendra',
  description: 'Premium Ganpati murtis crafted by master artisans.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.className} ${body.className}`}>
      <body>
        <Providers>
          <div className="min-h-screen bg-temple bg-repeat">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
