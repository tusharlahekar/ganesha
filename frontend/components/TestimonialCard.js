export default function TestimonialCard({ testimonial }) {
  return (
    <div className="glass-card p-6">
      <p className="text-maroon/80">“{testimonial.quote}”</p>
      <p className="mt-4 text-sm font-semibold text-maroon">{testimonial.name}</p>
    </div>
  );
}
