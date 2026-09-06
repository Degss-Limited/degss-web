import Link from "next/link";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

const quickLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Contact us", href: "/contact" },
  { label: "Properties", href: "/properties" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/people/Degss-Limited/61580249255835/", icon: FacebookIcon },
  // { label: "X", href: "#", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/degsslimited", icon: InstagramIcon },
  // { label: "LinkedIn", href: "#", icon: LinkedInIcon },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div className="w-full shrink-0 lg:w-[420px]">
            <h2 className="text-2xl font-semibold">Subscribe to our newsletter</h2>
            <form className="mt-6 flex w-full items-center rounded-full border border-white/20 bg-transparent pl-6 pr-1.5 py-1.5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="dark-input w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
              >
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-10 flex items-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            <div>
              <h3 className="text-base font-semibold">Main pages</h3>
              <ul className="mt-5 space-y-3">
                {mainLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/60 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold">Quick Links</h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/60 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold">Location</h3>
              <address className="mt-5 space-y-3 text-white/60 not-italic">
                <p>4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate) Abijo, Ibeju-Lekki, Lagos.</p>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-4 sm:px-10 lg:px-16">
        <svg
          viewBox="0 -221 758.03 286"
          className="block w-full h-auto select-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="0"
            fontSize="220"
            fontWeight="700"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            fill="url(#footer-wordmark)"
          >
            DEGSS
          </text>
        </svg>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-4 border-t border-white/10 px-6 py-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <p>&copy; {new Date().getFullYear()} DEGSS. All rights reserved.</p>
        <Link href="/terms" className="transition-colors hover:text-white">
          Terms &amp; Conditions
        </Link>
      </div>
    </footer>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M7 17L17 7M17 7H8M17 7V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.25c0-.87.24-1.46 1.49-1.46H16.5V3.98C16.22 3.94 15.26 3.86 14.15 3.86c-2.32 0-3.9 1.41-3.9 4v2.64H7.75v3H10.25V21h3.25Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 3H21l-6.52 7.45L22.5 21h-6.373l-4.99-6.52L4.9 21H2.14l6.98-7.97L1.5 3h6.53l4.51 5.96L18.244 3Zm-1.114 16.17h1.49L7.03 4.744H5.44l11.69 14.426Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.94 8.5H4.05V20h2.89V8.5ZM5.5 3.6a1.68 1.68 0 1 0 0 3.36 1.68 1.68 0 0 0 0-3.36ZM20 20h-2.9v-5.87c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.53-2.25 3.1V20H10V8.5h2.78v1.57h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44V20Z" />
    </svg>
  );
}
