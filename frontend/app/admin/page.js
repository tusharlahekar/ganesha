'use client';

import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const demoOrders = [
  { id: 'ORD-2031', customer: 'Aditi', status: 'pending', total: 28500 },
  { id: 'ORD-2032', customer: 'Rahul', status: 'packed', total: 12400 },
  { id: 'ORD-2033', customer: 'Sneha', status: 'delivered', total: 46200 }
];

export default function AdminPage() {
  const [status, setStatus] = useState('');
  const [stockPulse, setStockPulse] = useState('No updates yet');

  useEffect(() => {
    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/stock/stream`);
    source.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStockPulse(`${data.updated} items updated at ${new Date(data.timestamp).toLocaleTimeString()}`);
    };
    return () => source.close();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Murti saved.');
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin Dashboard</p>
          <h1 className="text-3xl font-heading text-maroon mt-2">Inventory & Orders</h1>
          <p className="text-sm text-maroon/70 mt-2">Real-time stock updates: {stockPulse}</p>
        </div>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <p className="text-xs uppercase text-gold">Total Sales</p>
            <h3 className="text-2xl font-heading text-maroon mt-2">₹12.4L</h3>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs uppercase text-gold">Orders</p>
            <h3 className="text-2xl font-heading text-maroon mt-2">1,245</h3>
          </div>
          <div className="glass-card p-6">
            <p className="text-xs uppercase text-gold">Low Stock</p>
            <h3 className="text-2xl font-heading text-maroon mt-2">18 SKUs</h3>
          </div>
        </section>

        <section className="grid lg:grid-cols-[1fr_1fr] gap-8">
          <form className="glass-card p-6 space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-heading text-maroon">Add / Edit Murti</h2>
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Murti name" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Price" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Material" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Inventory" />
            <textarea className="border rounded-lg px-3 py-2 w-full" placeholder="Description" rows="3" />
            <button className="px-5 py-3 rounded-full bg-maroon text-white font-semibold">Save Murti</button>
            {status && <p className="text-sm text-maroon/70">{status}</p>}
          </form>

          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-heading text-maroon">Bulk CSV Upload</h2>
              <p className="text-sm text-maroon/70">Upload CSV for 1000+ products with images.</p>
              <input type="file" className="border rounded-lg px-3 py-2 w-full" />
              <button className="px-5 py-3 rounded-full bg-gold text-maroon font-semibold">Upload CSV</button>
            </div>
            <div className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-heading text-maroon">Bulk Image Upload</h2>
              <p className="text-sm text-maroon/70">Upload 1000+ images to Cloudinary or S3.</p>
              <input type="file" multiple className="border rounded-lg px-3 py-2 w-full" />
              <button className="px-5 py-3 rounded-full bg-maroon text-white font-semibold">Upload Images</button>
            </div>
          </div>
        </section>

        <section className="glass-card p-6">
          <h2 className="text-xl font-heading text-maroon">Order Tracking</h2>
          <div className="mt-4 space-y-3">
            {demoOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-semibold text-maroon">{order.id}</p>
                  <p className="text-sm text-maroon/70">{order.customer}</p>
                </div>
                <div className="text-sm text-maroon/70">{order.status}</div>
                <div className="text-sm font-semibold text-maroon">₹{order.total}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
