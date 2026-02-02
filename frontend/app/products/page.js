'use client';

import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { sampleMurtis } from '../../data/sampleMurtis';

const MATERIALS = ['Eco Clay', 'Shadu', 'POP', 'Marble', 'Brass'];
const COLORS = ['Saffron', 'Maroon', 'Ivory', 'Gold', 'White'];

export default function ProductsPage() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 1000, page: 1, limit: 12 });
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    heightMin: '',
    heightMax: '',
    material: '',
    color: '',
    availability: false,
    sort: 'popularity'
  });

  useEffect(() => {
    const load = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.priceMin) params.append('price_min', filters.priceMin);
        if (filters.priceMax) params.append('price_max', filters.priceMax);
        if (filters.heightMin) params.append('height_min', filters.heightMin);
        if (filters.heightMax) params.append('height_max', filters.heightMax);
        if (filters.material) params.append('material', filters.material);
        if (filters.color) params.append('color', filters.color);
        if (filters.availability) params.append('available', 'true');
        params.append('sort', filters.sort);
        params.append('page', meta.page.toString());
        params.append('limit', meta.limit.toString());

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/murtis?${params.toString()}`);
        if (!response.ok) throw new Error('failed');
        const payload = await response.json();
        if (meta.page === 1) {
          setItems(payload.data);
        } else {
          setItems((prev) => [...prev, ...payload.data]);
        }
        setMeta(payload.meta);
      } catch (error) {
        setItems(sampleMurtis);
      }
    };

    load();
  }, [filters, meta.page, meta.limit]);

  const totalLabel = useMemo(() => `${meta.total}+ murtis`, [meta.total]);

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Product Listing</p>
            <h1 className="text-4xl font-heading text-maroon mt-3">All Murtis</h1>
            <p className="text-sm text-maroon/70 mt-2">{totalLabel} crafted for the festival season.</p>
          </div>
          <select
            className="border border-maroon/20 rounded-full px-4 py-2 text-sm"
            value={filters.sort}
            onChange={(event) => setFilters((prev) => ({ ...prev, sort: event.target.value, page: 1 }))}
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price">Sort by Price</option>
            <option value="newest">Sort by Newest</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 mt-10">
          <aside className="glass-card p-6 space-y-5">
            <h2 className="text-lg font-heading text-maroon">Filters</h2>
            <div>
              <p className="text-xs uppercase text-gold">Price range</p>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  value={filters.priceMin}
                  onChange={(event) => setFilters((prev) => ({ ...prev, priceMin: event.target.value, page: 1 }))}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  value={filters.priceMax}
                  onChange={(event) => setFilters((prev) => ({ ...prev, priceMax: event.target.value, page: 1 }))}
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-gold">Height (inches)</p>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  value={filters.heightMin}
                  onChange={(event) => setFilters((prev) => ({ ...prev, heightMin: event.target.value, page: 1 }))}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border rounded-lg px-3 py-2 text-sm w-full"
                  value={filters.heightMax}
                  onChange={(event) => setFilters((prev) => ({ ...prev, heightMax: event.target.value, page: 1 }))}
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-gold">Material</p>
              <select
                className="border rounded-lg px-3 py-2 text-sm w-full mt-2"
                value={filters.material}
                onChange={(event) => setFilters((prev) => ({ ...prev, material: event.target.value, page: 1 }))}
              >
                <option value="">All</option>
                {MATERIALS.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs uppercase text-gold">Color</p>
              <select
                className="border rounded-lg px-3 py-2 text-sm w-full mt-2"
                value={filters.color}
                onChange={(event) => setFilters((prev) => ({ ...prev, color: event.target.value, page: 1 }))}
              >
                <option value="">All</option>
                {COLORS.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-maroon">
              <input
                type="checkbox"
                checked={filters.availability}
                onChange={(event) => setFilters((prev) => ({ ...prev, availability: event.target.checked, page: 1 }))}
              />
              In stock only
            </label>
          </aside>

          <section>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {items.map((murti) => (
                <ProductCard key={murti.id} murti={murti} />
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="px-6 py-3 rounded-full bg-maroon text-white font-semibold"
                onClick={() => setMeta((prev) => ({ ...prev, page: prev.page + 1 }))}
              >
                Load more
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
