import type { Testimonial } from "@/lib/data/testimonials";

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  const track = [...testimonials, ...testimonials];

  return (
    <div className="marquee-track relative -mx-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:-mx-10 lg:-mx-16">
      <div className="animate-marquee flex w-max gap-5 px-6 sm:px-10 lg:px-16">
        {track.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            testimonial={testimonial}
            aria-hidden={index >= testimonials.length}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  "aria-hidden": ariaHidden,
}: {
  testimonial: Testimonial;
  "aria-hidden"?: boolean;
}) {
  const { name, role, rating, quote } = testimonial;

  return (
    <div
      aria-hidden={ariaHidden}
      className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-black/10 bg-white p-5 sm:w-90"
    >
      <QuoteIcon className="h-10 w-10 text-[#39548b]/20" />

      <div className="mt-3 flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < rating} className="h-4 w-4" />
        ))}
      </div>

      <p className="mt-3 text-sm leading-6 text-neutral-600">{quote}</p>

      <div className="mt-4">
        <p className="truncate font-semibold text-neutral-950">{name}</p>
        <p className="truncate text-sm text-neutral-500">{role}</p>
      </div>
    </div>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.5 6.5C6.5 7.8 4.8 10.1 4.8 13.1C4.8 15.5 6.3 17 8.3 17C10 17 11.3 15.7 11.3 14C11.3 12.4 10.1 11.2 8.6 11.2C8.3 11.2 8 11.2 7.8 11.3C8.1 9.5 9.3 8.1 11 7.3L9.5 6.5Z" />
      <path d="M17.7 6.5C14.7 7.8 13 10.1 13 13.1C13 15.5 14.5 17 16.5 17C18.2 17 19.5 15.7 19.5 14C19.5 12.4 18.3 11.2 16.8 11.2C16.5 11.2 16.2 11.2 16 11.3C16.3 9.5 17.5 8.1 19.2 7.3L17.7 6.5Z" />
    </svg>
  );
}

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      className={className}
    >
      <path
        d="M12 3.5L14.6 9.1L20.5 9.8L16.1 13.8L17.4 19.8L12 16.7L6.6 19.8L7.9 13.8L3.5 9.8L9.4 9.1L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
