export default function Footer() {
  return (
    <footer className="px-6 py-10 text-white bg-gradient-to-r from-blackcurrant via-maroon to-saffron">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-heading">Shree Ganesh Murti Kala Kendra</h3>
          <p className="text-sm text-white/85 mt-3">
            Crafting divine murtis with heritage techniques, sustainable materials, and royal finishing.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.3em] text-gold">Studio</h4>
          <p className="text-sm text-white/85 mt-3">17 Heritage Lane, Pune, Maharashtra</p>
          <p className="text-sm text-white/85">Open daily - 9 AM to 9 PM</p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-[0.3em] text-gold">Connect</h4>
          <p className="text-sm text-white/85 mt-3">WhatsApp: +91 83904 57139</p>
          <p className="text-sm text-white/85">Email: hello@ganeshmurti.example</p>
        </div>
      </div>
      <p className="text-center text-xs text-white/70 mt-8">Copyright 2026 Shree Ganesh Murti Kala Kendra</p>
    </footer>
  );
}
