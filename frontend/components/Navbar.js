'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Murtis' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' }
];

export default function Navbar() {
  const { items } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect for background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-8">
      <nav 
        className={`
          max-w-7xl mx-auto flex items-center justify-between px-6 py-3 
          transition-all duration-500 ease-in-out rounded-2xl
          ${isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(93,14,17,0.1)] border border-white/40 py-2' 
            : 'bg-transparent border border-transparent'}
        `}
      >
        {/* LOGO SECTION */}
        <div className="flex flex-col">
          <Link href="/" className="group">
            <span className="text-xl md:text-2xl font-heading text-maroon block leading-tight">
              Shree Ganesh <span className="text-saffron group-hover:text-maroon transition-colors duration-300">Murti</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-maroon/60 font-bold">
              Traditional • Luxury • Eco
            </span>
          </Link>
        </div>

        {/* CENTER LINKS (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative text-sm font-bold tracking-wide uppercase transition-colors duration-300
                  ${isActive ? 'text-maroon' : 'text-maroon/60 hover:text-maroon'}
                  group
                `}
              >
                {link.label}
                {/* Animated Underline */}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-saffron transition-all duration-300 
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                />
              </Link>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full bg-white/50 border border-maroon/10 text-maroon hover:bg-maroon hover:text-white transition-all duration-300 group shadow-sm"
          >
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-saffron text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                {cartCount}
              </span>
            )}
          </Link>

          {/* CTA Button */}
          <Link
            href="/checkout"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon text-white text-sm font-bold shadow-lg shadow-maroon/20 hover:bg-saffron hover:shadow-saffron/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            <Sparkles size={16} />
            Book Your Bappa
          </Link>

          {/* Mobile Menu Toggle (Simplified for now) */}
          <button className="lg:hidden p-2 text-maroon">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Tailwind helper for the bounce animation */}
      <style jsx global>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}