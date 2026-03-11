'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../components/CartContext';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    const formData = new FormData(event.currentTarget);
    const payload = {
      userName: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      murtiId: items[0]?.id || 'sample',
      quantity: items[0]?.quantity || 1,
      totalPrice: total,
      paymentMethod: formData.get('payment')
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('failed');
      setStatus('Order confirmed! WhatsApp confirmation will be sent shortly.');
    } catch (error) {
      setStatus('Unable to place order in demo environment.');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading text-maroon">Checkout</h1>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 mt-6">
          <form className="glass-card p-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-maroon">Full Name</label>
              <input name="name" className="border rounded-lg px-3 py-2 w-full mt-1" required />
            </div>
            <div>
              <label className="text-sm text-maroon">Phone</label>
              <input name="phone" className="border rounded-lg px-3 py-2 w-full mt-1" required />
            </div>
            <div>
              <label className="text-sm text-maroon">Delivery Address</label>
              <textarea name="address" className="border rounded-lg px-3 py-2 w-full mt-1" rows="3" required />
            </div>
            <div>
              <label className="text-sm text-maroon">Delivery Date</label>
              <input type="date" name="delivery" className="border rounded-lg px-3 py-2 w-full mt-1" />
            </div>
            <div>
              <label className="text-sm text-maroon">Payment Method</label>
              <select name="payment" className="border rounded-lg px-3 py-2 w-full mt-1">
                <option>COD</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
              </select>
            </div>
            <button className="w-full bg-maroon text-white py-3 rounded-full font-semibold">Place Order</button>
            {status && <p className="text-sm text-maroon/70">{status}</p>}
          </form>

          <aside className="glass-card p-6">
            <h2 className="text-lg font-heading text-maroon">Order Summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-semibold text-maroon">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
