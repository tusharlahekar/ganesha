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
              <div key={item.id} className="glass-card p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || '/images/image.png'}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover border border-maroon/10"
                  />
                  <div>
                    <p className="font-heading text-maroon text-lg">{item.name}</p>
                    <p className="text-sm text-maroon/70">Unit Price: ₹{Number(item.price).toFixed(2)}</p>
                    <p className="text-sm font-semibold text-blackcurrant mt-1">
                      Subtotal: ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:min-w-[260px] md:justify-end">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item.id, Math.max(1, Number(event.target.value) || 1))}
                    className="border border-maroon/20 rounded-lg px-3 py-2 w-24 text-center"
                  />
                  <button
                    className="text-sm text-maroon underline underline-offset-4 hover:text-saffron"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 glass-card p-5 flex items-center justify-between">
          <p className="text-sm text-maroon/80">{items.length} item(s) in cart</p>
          <p className="text-xl font-semibold text-maroon">Total: ₹{total.toFixed(2)}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
