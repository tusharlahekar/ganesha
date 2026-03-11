import Link from 'next/link';

export default function ProductCard({ murti }) {
  return (
    <div className="glass-card overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={murti.image_urls?.[0]}
          alt={murti.name}
          className="w-full h-56 object-cover"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-white/90 text-maroon text-xs font-semibold px-3 py-1 rounded-full">
          {murti.category}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-heading text-maroon">{murti.name}</h3>
        <p className="text-sm text-maroon/70">{murti.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-gold">₹{murti.price}</span>
          <Link
            href={`/products/${murti.id}`}
            className="text-sm font-semibold text-maroon hover:text-saffron"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
