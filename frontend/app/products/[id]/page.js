'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import { useCart } from '../../../components/CartContext';
import { sampleMurtis } from '../../../data/sampleMurtis';

const fallback = sampleMurtis[0];

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [murti, setMurti] = useState(fallback);
  const [activeImage, setActiveImage] = useState(fallback.image_urls?.[0]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/murtis/${params.id}`);
        if (!response.ok) throw new Error('failed');
        const data = await response.json();
        setMurti(data);
        setActiveImage(data.image_urls?.[0]);
        const recs = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/murtis/${params.id}/recommendations`);
        if (recs.ok) {
          setRecommendations(await recs.json());
        }
      } catch (error) {
        setMurti(fallback);
        setActiveImage(fallback.image_urls?.[0]);
      }
    };

    load();
  }, [params.id]);

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div>
            <div className="glass-card p-6">
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={activeImage}
                  alt={murti.name}
                  className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 text-maroon text-xs px-3 py-1 rounded-full">
                  360° View Available
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                {murti.image_urls?.map((url) => (
                  <button key={url} onClick={() => setActiveImage(url)} className="border rounded-xl overflow-hidden">
                    <img src={url} alt="Thumbnail" className="w-20 h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">{murti.category}</p>
              <h1 className="text-3xl font-heading text-maroon mt-2">{murti.name}</h1>
              <p className="text-xl font-semibold text-gold mt-4">₹{murti.price}</p>
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-maroon/70">
                <div>
                  <p className="text-xs uppercase text-gold">Height</p>
                  <p>{murti.height} in</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gold">Weight</p>
                  <p>{murti.weight} kg</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gold">Material</p>
                  <p>{murti.material}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-gold">Eco Certification</p>
                  <p>{murti.is_eco_friendly ? 'Yes' : 'Available'}</p>
                </div>
              </div>
              <p className="text-sm text-maroon/80 mt-4">{murti.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="px-5 py-3 rounded-full bg-maroon text-white font-semibold"
                  onClick={() => addItem({ id: murti.id, name: murti.name, price: Number(murti.price) })}
                >
                  Add to Cart
                </button>
                <button className="px-5 py-3 rounded-full bg-gold text-maroon font-semibold">
                  Buy Now
                </button>
                <WhatsAppButton
                  phone="919876543210"
                  message={`Interested in ${murti.name}. Please share availability and delivery timeline.`}
                />
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-lg font-heading text-maroon">Delivery Timeline</h2>
              <p className="text-sm text-maroon/70 mt-2">Express delivery in 3-5 days within metro cities.</p>
              <p className="text-sm text-maroon/70 mt-2">Festival priority dispatch available for bulk orders.</p>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-heading text-maroon">People also bought</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {recommendations.map((item) => (
              <div key={item.id} className="glass-card p-5">
                <img src={item.image_urls?.[0]} alt={item.name} className="w-full h-40 object-cover rounded-xl" />
                <p className="font-heading text-maroon mt-3">{item.name}</p>
                <p className="text-sm text-gold">₹{item.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: murti.name,
            image: murti.image_urls,
            description: murti.description,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: murti.price,
              availability: murti.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            }
          })
        }}
      />
    </div>
  );
}
