export default function WhatsAppButton({ phone, message }) {
  const digitsOnly = String(phone || '').replace(/\D/g, '');
  const normalizedPhone = digitsOnly.length === 10 ? `91${digitsOnly}` : digitsOnly;
  const url = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
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
