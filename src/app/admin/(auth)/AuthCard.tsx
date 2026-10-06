import Image from "next/image";

export default function AuthCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-neutral-950 px-6">
      <Image
        src="/abt-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-neutral-950/50" />

      <Image
        src="/logo-light.png"
        alt="DEGSS"
        width={362}
        height={124}
        unoptimized
        priority
        className="relative z-10 h-15 w-auto"
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white p-8">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          {title}
        </h1>
        <p className="mt-1.5 text-sm text-neutral-500">{description}</p>

        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
