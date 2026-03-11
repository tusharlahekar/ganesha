import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Murtis' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' }
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur shadow-sm">
      <div>
        <p className="text-2xl font-heading text-maroon">Shree Ganesh Murti Kala Kendra</p>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Traditional · Luxury · Eco</p>
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
          Cart
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
