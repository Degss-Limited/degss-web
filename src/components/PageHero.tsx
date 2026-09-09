import Image from "next/image";

export default function PageHero({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
      <div className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-[2rem] bg-neutral-950 px-6 pb-10 pt-10 sm:min-h-[420px] sm:px-10 lg:min-h-[480px] lg:px-16">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10"
        />

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="max-w-sm text-lg leading-7 text-white/70 lg:text-right">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
