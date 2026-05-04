import '../styles/globals.css';
import { Cinzel_Decorative, Inter } from 'next/font/google';
import Providers from '../components/Providers';
import { CartProvider } from '../components/CartContext';

const heading = Cinzel_Decorative({ subsets: ['latin'], weight: ['400', '700'] });
const body = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shree Ganesh Murti Kala Kendra',
  description: 'Premium Ganpati murtis crafted by master artisans.'
};

// layout.js

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heading.className} ${body.className}`}>
      <body className="antialiased">
        <Providers>
          <CartProvider>
            {/* 
               THE LUXURY BACKGROUND 
               - Uses a 'Radial Gradient' to create a spotlight effect
            */}
            <div 
              className="relative min-h-screen w-full overflow-x-hidden"
              style={{
                backgroundColor: '#FFF9F2',
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 245, 230, 0.5) 50%, rgba(250, 230, 210, 0.3) 100%),
                  url("https://www.transparenttextures.com/patterns/p6-polyester.png")
                `
              }}
            >
              
              {/* SOFT AMBIENT GLOWS (Saffron & Rose) */}
              <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFD700] opacity-[0.08] blur-[120px] pointer-events-none" />
              <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#800000] opacity-[0.05] blur-[100px] pointer-events-none" />

              {/* FLOATING DECORATIVE ELEMENT (Subtle Mandala) */}
              <div 
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("https://www.transparenttextures.com/patterns/mandala.png")`,
                  backgroundSize: '600px',
                  backgroundRepeat: 'repeat'
                }}
              />

              {/* MAIN CONTENT AREA */}
              <div className="relative z-10">
                {children}
              </div>

              {/* VIGNETTE OVERLAY (Darkens the very edges slightly for focus) */}
              <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(93,14,17,0.03)]" />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
