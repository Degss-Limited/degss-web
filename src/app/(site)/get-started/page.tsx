import Image from "next/image";
import Navbar from "@/components/Navbar";
import { buildMetadata } from "@/lib/seo";
import BudgetField from "./BudgetField";
import { submitGetStartedForm } from "./actions";

export const metadata = buildMetadata({
  title: "Get Started",
  description:
    "Tell DEGSS Limited what you're looking for — buying, investing, or exploring — and our team will guide you from there.",
  path: "/get-started",
});

const interests = [
  "Land",
  "House",
  "PrimeCycle",
  "Farmland",
  "Commercial Property",
];

const timelines = [
  "Immediately",
  "Within 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Just exploring",
];

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const { sent, error } = await searchParams;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-26">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="rounded-3xl bg-neutral-100 p-8 sm:p-10">
              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl">
                What can DEGSS help{" "}
                <span className="italic text-[#39548b]">you with?</span>
              </h1>
              <p className="mt-4 max-w-lg text-neutral-600">
                Tell us what you&apos;re looking for, and one of our property
                consultants will contact you with suitable options.
              </p>

              {sent && (
                <p className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Thanks — we&apos;ve got your details. Our team will reach out within 24 hours.
                </p>
              )}
              {error && (
                <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  Something went wrong. Please fill in your name, WhatsApp number, and email and try again.
                </p>
              )}

              <form action={submitGetStartedForm} className="mt-10 space-y-5">
                <Field label="Full Name" name="fullName" placeholder="Enter your full name" required />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="WhatsApp Number"
                    name="whatsapp"
                    type="tel"
                    placeholder="e.g. +234 816 268 0095"
                    required
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="hello@yourbrand.com"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                    I&apos;m interested in
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {interests.map((interest, i) => (
                      <label key={interest} className="cursor-pointer">
                        <input
                          type="radio"
                          name="interest"
                          value={interest}
                          defaultChecked={i === 0}
                          className="peer sr-only"
                        />
                        <span className="flex items-center rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors peer-checked:border-[#39548b] peer-checked:bg-[#39548b]/10 peer-checked:text-[#39548b]">
                          {interest}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <BudgetField
                    label="Budget"
                    name="budget"
                    placeholder="e.g. ₦50,000,000"
                    required
                  />
                  <SelectField
                    label="When do you plan to buy?"
                    name="timeline"
                    placeholder="Select a timeframe"
                    options={timelines}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="requirement"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                  >
                    Any specific requirement?
                  </label>
                  <textarea
                    id="requirement"
                    name="requirement"
                    rows={5}
                    placeholder="Write your message here..."
                    className="w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                  />
                </div>

                <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-full bg-[#39548b] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#263d6b]"
                  >
                    Send message
                  </button>
                  <p className="text-sm text-neutral-500">
                    The DEGSS team reads every message personally and
                    responds within 24 hours.
                  </p>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-[#39548b] p-6 text-white sm:p-7">
                <Image
                  src="/icon-light.png"
                  alt=""
                  aria-hidden="true"
                  width={500}
                  height={500}
                  className="pointer-events-none absolute -right-14 -top-14 h-56 w-auto opacity-10"
                />
                <div className="relative z-10 flex items-center gap-3">
                  <Image
                    src="/team/Daniel.jpeg"
                    alt="Daniel Onwuzuka"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Daniel Onwuzuka</p>
                    <p className="text-sm text-white/60">Managing Director</p>
                  </div>
                </div>
                <p className="relative z-10 mt-5 text-sm leading-6 text-white/70">
                  Every enquiry that comes through this form is reviewed
                  personally by the DEGSS leadership team.
                </p>
                <div className="relative z-10 mt-5 flex items-center gap-2.5 border-t border-white/10 pt-5 text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  Responds within 24 hours
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Office details
                </p>
                <div className="mt-5 space-y-5">
                  <DetailItem
                    icon={MapPinIcon}
                    label="Address"
                    value="Ibeju-Lekki, Lagos"
                  />
                  <DetailItem
                    icon={ClockIcon}
                    label="Hours"
                    value="Mon – Sat, 9am – 5pm"
                  />
                  <DetailItem
                    icon={PhoneIcon}
                    label="Direct line"
                    value="+234 803 866 6532"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#39548b]/10 text-[#39548b]">
                  <LockIcon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-neutral-950">
                    Your privacy is protected
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                    All enquiries are handled with discretion. Your details
                    are never shared with third parties.
                  </p>
                </div>
              </div>
            </div>
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
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-neutral-700"
      >
        {label}
        {required && <span className="text-[#39548b]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  placeholder,
  options,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-neutral-700"
      >
        {label}
        {required && <span className="text-[#39548b]">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue=""
          className="w-full appearance-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: (props: { className?: string }) => React.JSX.Element;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-950">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
          {label}
        </p>
        <p className="text-sm font-medium text-neutral-950">{value}</p>
      </div>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 7.5V12L15 14"
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

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
