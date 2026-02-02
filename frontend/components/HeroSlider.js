'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  {
    title: 'Royal Ganpati Collection',
    subtitle: 'Gold-leaf detailing with temple-grade finish.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Eco-Friendly Shadu Series',
    subtitle: 'Biodegradable murtis with serene pastel hues.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Marble Heritage Idols',
    subtitle: 'Hand-sculpted with fine chiseling by master artisans.',
    image: 'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1400&q=80'
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const active = slides[index];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-maroon text-white">
      <img
        src={active.image}
        alt={active.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative z-10 px-10 py-16 md:py-24 max-w-3xl">
        <p className="uppercase tracking-[0.3em] text-gold text-xs">Shree Ganesh Murti Kala Kendra</p>
        <h1 className="text-4xl md:text-6xl font-heading mt-4">{active.title}</h1>
        <p className="text-lg text-white/80 mt-4">{active.subtitle}</p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-gold text-maroon font-semibold"
          >
            Book Your Bappa
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-full border border-white/60 text-white"
          >
            Our Artisan Story
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 right-8 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-2 w-10 rounded-full ${idx === index ? 'bg-gold' : 'bg-white/40'}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
