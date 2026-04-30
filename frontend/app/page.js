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

const categories = [
  'Eco-friendly',
  'Shadu',
  'POP',
  'Marble',
  'Brass'
];

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <HeroSlider />
        <FestivalAuraGenerator />

        <section className="grid md:grid-cols-[1.4fr_0.6fr] gap-8">
          <div className="glass-card p-8">
            <SectionHeader title="Categories" subtitle="Crafted by material" />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category} className="p-4 rounded-2xl bg-white shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-gold">{category}</p>
                  <p className="text-maroon font-semibold mt-2">Explore {category} murtis</p>
                </div>
              ))}
            </div>
          </div>
          <CountdownTimer />
        </section>

        <section>
          <SectionHeader title="Best-selling murtis" subtitle="Signature pieces" />
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {featuredMurtis.map((murti) => (
              <ProductCard key={murti.id} murti={murti} />
            ))}
          </div>
        </section>

        <section className="glass-card p-8">
          <SectionHeader title="Festival offers" subtitle="Ganesh Chaturthi" />
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white">
              <h3 className="text-lg font-heading text-maroon">Free delivery slots</h3>
              <p className="text-sm text-maroon/70 mt-2">Book before 15 days and enjoy free doorstep delivery.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white">
              <h3 className="text-lg font-heading text-maroon">Eco pledge discount</h3>
              <p className="text-sm text-maroon/70 mt-2">Get 10% off on eco-friendly Shadu idols.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white">
              <h3 className="text-lg font-heading text-maroon">Royal family packs</h3>
              <p className="text-sm text-maroon/70 mt-2">Bundle two murtis and receive gold diya hampers.</p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeader title="Customer testimonials" subtitle="Devotees speak" />
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </section>

        <section className="glass-card p-8">
          <SectionHeader title="Festival trust badges" subtitle="Certified" />
          <div className="mt-6 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <TrustBadge key={badge} label={badge} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
