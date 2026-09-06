import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact | DEGSS",
  description:
    "Get in touch with DEGSS — whether you're buying, renting, or just exploring, we're here to guide you every step of the way.",
};

const address =
  "4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate) Abijo, Ibeju-Lekki, Lagos.";

const contactCards = [
  {
    label: "Address",
    detail: address,
    icon: MapPinIcon,
  },
  {
    label: "Email",
    detail: "hello@degsslimited.com",
    icon: MailIcon,
  },
  {
    label: "Phone",
    detail: "+234 803 866 6532",
    icon: PhoneIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:px-10 lg:grid-cols-2 lg:px-16">
          <div className="rounded-3xl bg-neutral-100 p-8 sm:p-10">
            <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
              Get in Touch
            </h1>
            <p className="mt-4 max-w-md text-neutral-600">
              Whether you&apos;re buying, renting, or just exploring, we&apos;re
              here to guide you every step of the way.
            </p>

            <form className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First name" name="firstName" placeholder="Jane" />
                <Field label="Last name" name="lastName" placeholder="Doe" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                />
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Type your message here"
                  className="w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-neutral-950 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-3xl bg-neutral-950">
            <Image
              src="/hero-img.jpg"
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-neutral-950/45"
            />

            <div className="relative grid h-full grid-cols-2 gap-4 p-4 sm:p-6">
              {contactCards.map(({ label, detail, icon: Icon }) => (
                <div
                  key={label}
                  className={`flex flex-col justify-between gap-8 rounded-2xl bg-white p-6 ${
                    label === "Address" ? "col-span-2" : ""
                  }`}
                >
                  <Icon className="h-6 w-6 text-neutral-950" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="overflow-hidden rounded-3xl border border-black/10">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
              width="100%"
              height="550"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="DEGSS Limited location"
            />
          </div>
        </div>
      </main>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-neutral-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.5 6.5 12 12l7.5-5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.5 3.5h2.4l1.4 4.2-2 1.4a11.5 11.5 0 0 0 5.6 5.6l1.4-2 4.2 1.4v2.4c0 1.1-.9 2-2 2C10.4 18.5 5.5 13.6 4.5 6.5c0-1.1.9-3 2-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
