'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCart } from '../../components/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-heading text-maroon">Your Cart</h1>
        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="glass-card p-6">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="glass-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-heading text-maroon text-lg">{item.name}</p>
                  <p className="text-sm text-maroon/70">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                    className="border rounded-lg px-3 py-2 w-24"
                  />
                  <button
                    className="text-sm text-maroon underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold text-maroon">Total: ₹{total.toFixed(2)}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
