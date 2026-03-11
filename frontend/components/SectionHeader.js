export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{subtitle}</p>
        <h2 className="text-3xl font-heading text-maroon mt-2">{title}</h2>
      </div>
    </div>
  );
}
