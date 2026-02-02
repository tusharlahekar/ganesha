export default function WhatsAppButton({ phone, message }) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      className="px-4 py-3 rounded-full bg-green-600 text-white font-semibold text-sm"
      target="_blank"
      rel="noreferrer"
    >
      WhatsApp Inquiry
    </a>
  );
}
