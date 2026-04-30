'use client';

import Link from 'next/link';
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
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/75 backdrop-blur shadow-sm border-b border-maroon/10">
      <div>
        <p className="text-2xl font-heading text-maroon">Shree Ganesh Murti Kala Kendra</p>
        <p className="text-xs uppercase tracking-[0.2em] text-blackcurrant/80">Traditional - Luxury - Eco</p>
      </div>
      <div className="flex gap-6 text-sm font-semibold text-maroon">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-saffron transition">
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-3">
        <Link
          href="/cart"
          className="px-4 py-2 rounded-full border border-maroon text-maroon text-sm font-semibold hover:bg-maroon hover:text-white transition"
        >
          Cart ({cartCount})
        </Link>
        <Link
          href="/checkout"
          className="px-4 py-2 rounded-full bg-maroon text-white text-sm font-semibold hover:bg-saffron transition"
        >
          Book Your Bappa
        </Link>
      </div>
    </nav>
  );
}
