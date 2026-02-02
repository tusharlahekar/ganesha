export default function TrustBadge({ label }) {
  return (
    <span className="px-4 py-2 rounded-full border border-gold text-xs uppercase tracking-[0.2em] text-maroon bg-white/80">
      {label}
    </span>
  );
}
