import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-12 grid lg:grid-cols-[1fr_1fr] gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Contact Us</p>
          <h1 className="text-4xl font-heading text-maroon mt-3">Visit our studio</h1>
          <p className="text-sm text-maroon/70 mt-4">
            17 Heritage Lane, Pune · Open daily 9 AM to 9 PM
          </p>
          <div className="mt-6">
            <WhatsAppButton phone="8390457139" message="Hello! I would like to inquire about Ganpati murtis." />
          </div>
          <div className="mt-6 rounded-3xl overflow-hidden border border-maroon/10">
            <iframe
              title="Google Maps"
              src="https://maps.google.com/maps?q=Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-64"
            />
          </div>
        </div>
        <div className="glass-card p-6">
          <h2 className="text-xl font-heading text-maroon">Inquiry Form</h2>
          <form className="space-y-4 mt-4">
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Your name" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Phone" />
            <input className="border rounded-lg px-3 py-2 w-full" placeholder="Email" />
            <textarea className="border rounded-lg px-3 py-2 w-full" rows="4" placeholder="Message" />
            <button className="px-5 py-3 rounded-full bg-maroon text-white font-semibold w-full">Send Inquiry</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
