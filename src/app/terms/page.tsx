import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | DEGSS",
  description:
    "The terms and conditions governing your use of the DEGSS website and services.",
};

const sections = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "By accessing or using the DEGSS website, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website or services.",
    ],
  },
  {
    heading: "2. Use of the Website",
    body: [
      "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of it. You must not attempt to gain unauthorized access to any part of the website, its servers, or any systems connected to it.",
    ],
  },
  {
    heading: "3. Property Listings",
    body: [
      "Property listings, prices, availability, and specifications published on this website are provided for general informational purposes only and are subject to change without notice. DEGSS makes reasonable efforts to keep listing information accurate and up to date but does not guarantee its completeness or accuracy.",
      "No listing on this website constitutes a binding offer. All transactions are subject to a formal agreement between the relevant parties.",
    ],
  },
  {
    heading: "4. Intellectual Property",
    body: [
      "All content on this website, including text, graphics, logos, images, and software, is the property of DEGSS or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "DEGSS will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website or any information, content, or services obtained through it.",
    ],
  },
  {
    heading: "6. Third-Party Links",
    body: [
      "This website may contain links to third-party websites. DEGSS is not responsible for the content, accuracy, or practices of any linked third-party sites and does not endorse them.",
    ],
  },
  {
    heading: "7. Changes to These Terms",
    body: [
      "We may update these Terms & Conditions from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of the website after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
  {
    heading: "8. Governing Law",
    body: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, and any disputes arising from them will be subject to the exclusive jurisdiction of the courts of Nigeria.",
    ],
  },
  {
    heading: "9. Contact Us",
    body: [
      "If you have any questions about these Terms & Conditions, please contact us at hello@degsslimited.com or +234 803 866 6532.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: September 6, 2026
          </p>
          <p className="mt-6 text-neutral-600">
            Please read these Terms &amp; Conditions carefully before using
            the DEGSS website. They set out the rules and guidelines for how
            you may use our website and services.
          </p>

          <div className="mt-12 divide-y divide-black/10 border-t border-black/10">
            {sections.map(({ heading, body }) => (
              <section key={heading} className="py-8">
                <h2 className="text-xl font-semibold text-neutral-950">
                  {heading}
                </h2>
                <div className="mt-3 space-y-3 text-neutral-600">
                  {body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
