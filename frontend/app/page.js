'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSlider from '../components/HeroSlider';
import FestivalAuraGenerator from '../components/FestivalAuraGenerator';
import SectionHeader from '../components/SectionHeader';
import CountdownTimer from '../components/CountdownTimer';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import TrustBadge from '../components/TrustBadge';
import { featuredMurtis } from '../data/featured';
import { testimonials } from '../data/testimonials';
import { trustBadges } from '../data/trustBadges';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  { name: 'Eco-friendly', desc: 'Mother Earth first', color: 'bg-green-50' },
  { name: 'Shadu', desc: 'Pure clay tradition', color: 'bg-orange-50' },
  { name: 'Marble', desc: 'Eternal elegance', color: 'bg-blue-50' },
  { name: 'Brass', desc: 'Antique divinity', color: 'bg-yellow-50' },
];

export default function HomePage() {
  return (
    <div className="relative">
      <Navbar />
      
      {/* 1. HERO SECTION - Full width with soft edges */}
      <main className="pt-24 pb-20 overflow-hidden">
        <section className="px-4 md:px-10">
          <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-maroon/10">
            <HeroSlider />
          </div>
        </section>

        {/* 2. AURA GENERATOR - Floating & Organic */}
        <section className="relative mt-24 px-6 max-w-7xl mx-auto">
          <div className="relative z-10">
             <FestivalAuraGenerator />
          </div>
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-saffron/5 blur-[100px] -z-10 rounded-[100%]" />
        </section>

        {/* 3. CATEGORIES - The "Bento Grid" (No borders, just depth) */}
        <section className="mt-32 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
             <SectionHeader title="The Collections" subtitle="Curated by Material" />
             <CountdownTimer />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={cat.name}
                className={`group relative p-8 rounded-[32px] transition-all duration-500 hover:-translate-y-2
                  ${idx % 2 === 0 ? 'md:mt-12 h-[300px]' : 'h-[300px]'} 
                  ${cat.color} border border-white/50 shadow-sm hover:shadow-xl hover:shadow-maroon/5`}
              >
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity">
                   <Sparkles className="text-maroon" />
                </div>
                <p className="text-xs uppercase tracking-widest text-maroon/50 font-bold">{cat.desc}</p>
                <h3 className="text-2xl font-heading text-maroon mt-2">{cat.name}</h3>
                <button className="absolute bottom-8 left-8 flex items-center gap-2 text-sm font-bold text-maroon group-hover:gap-4 transition-all">
                  Explore <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. BEST SELLERS - Staggered Gallery Layout */}
        <section className="mt-40 px-6 max-w-7xl mx-auto">
          <SectionHeader title="Signature Pieces" subtitle="Handpicked for your home" />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
            {featuredMurtis.map((murti, idx) => (
              <div key={murti.id} className={`${idx === 1 ? 'md:translate-y-20' : ''}`}>
                <div className="relative group">
                  {/* Custom Arch Shape for the Image */}
                  <div className="aspect-[4/5] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                    <ProductCard murti={murti} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TESTIMONIALS - Floating Cloud Style */}
        <section className="mt-60 py-24 bg-maroon/[0.02] relative">
           <div className="max-w-6xl mx-auto px-6">
             <div className="text-center mb-20">
               <SectionHeader title="Devotee Stories" subtitle="Voices of Faith" />
             </div>
             <div className="flex flex-wrap justify-center gap-8">
               {testimonials.map((t, idx) => (
                 <div key={idx} className="max-w-sm rotate-[-1deg] even:rotate-[1deg] hover:rotate-0 transition-transform duration-300">
                    <TestimonialCard testimonial={t} />
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* 6. TRUST BADGES - Clean Minimalist */}
        <section className="mt-32 px-6 max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-maroon/40 font-bold mb-8 text-center">Our Commitment to Quality</p>
          <div className="flex flex-wrap justify-center gap-6">
            {trustBadges.map((badge) => (
              <span key={badge} className="px-6 py-2 rounded-full border border-maroon/10 bg-white/50 text-maroon text-xs font-bold tracking-widest backdrop-blur-sm">
                {badge}
              </span>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}