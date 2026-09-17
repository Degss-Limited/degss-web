import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "DEGSS Limited is a Lagos-based real estate, land banking, and community-development company helping people find, invest in, and build lasting wealth through property.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DEGSS Limited | Real Estate & Land Banking in Lagos, Nigeria",
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    "DEGSS Limited",
    "real estate Lagos",
    "land banking Nigeria",
    "buy land Lagos",
    "Ibeju-Lekki real estate",
    "property investment Nigeria",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: "DEGSS Limited | Real Estate & Land Banking in Lagos, Nigeria",
    description,
    url: "/",
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEGSS Limited | Real Estate & Land Banking in Lagos, Nigeria",
    description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-dark.svg`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate) Abijo",
    addressLocality: "Ibeju-Lekki",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  email: "hello@degsslimited.com",
  telephone: "+2348038666532",
  sameAs: [
    "https://www.facebook.com/people/Degss-Limited/61580249255835/",
    "https://www.instagram.com/degsslimited",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
