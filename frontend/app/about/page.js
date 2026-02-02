import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">About Us</p>
          <h1 className="text-4xl font-heading text-maroon mt-3">Artisan Legacy Since 1952</h1>
          <p className="text-sm text-maroon/70 mt-4">
            Shree Ganesh Murti Kala Kendra is a multi-generation atelier known for premium Ganpati idols,
            blending traditional temple craft with modern luxury finishes.
          </p>
        </div>
        <section className="glass-card p-8 space-y-4">
          <h2 className="text-2xl font-heading text-maroon">Eco-Friendly Process</h2>
          <p className="text-sm text-maroon/70">
            We use certified Shadu and eco-clay materials with natural pigments to ensure minimal environmental impact.
          </p>
          <h2 className="text-2xl font-heading text-maroon">Awards & Certifications</h2>
          <ul className="list-disc list-inside text-sm text-maroon/70">
            <li>National Heritage Artisan Award 2023</li>
            <li>Eco Ganesh Sustainability Seal</li>
            <li>Luxury Craftsmanship Excellence 2024</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
