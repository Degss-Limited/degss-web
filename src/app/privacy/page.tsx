import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | DEGSS",
  description:
    "How DEGSS collects, uses, and protects your personal information.",
};

type BodyItem = string | { label: string; value: string };

const sections: {
  heading: string;
  body: BodyItem[];
  list?: string[];
}[] = [
  {
    heading: "1. Our Commitment to Privacy",
    body: [
      "DEGSS Limited respects your privacy and is committed to protecting personal information entrusted to us.",
      "This Privacy Policy explains how DEGSS collects, uses, stores, protects and may disclose personal information when you interact with our website, services, employees, agents or digital platforms.",
      "This Policy is intended to operate consistently with applicable Nigerian data-protection requirements, including the Nigeria Data Protection Act 2023.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: ["Depending on your interaction with DEGSS, we may collect:"],
    list: [
      "Identity information: full name, date of birth where necessary, and identification information where legally or commercially required.",
      "Contact information: telephone number, email address, and residential or correspondence address.",
      "Transaction information: property or service purchased, payment information, transaction history, invoice and receipt information, and account information.",
      "Communication information: enquiries, messages, customer-service communications, feedback and complaints.",
      "Technical information: IP address, browser type, device information, operating system, website usage information, cookies and similar technologies.",
    ],
  },
  {
    heading: "3. How We Collect Information",
    body: [
      "We may collect personal information when you visit our website, complete an online form, contact us by email or telephone, request information, purchase a product or service, register for an account, submit an enquiry, participate in promotions, communicate with our representatives, interact with our digital platforms, or otherwise voluntarily provide information to us.",
      "We may also receive information from authorised third parties where permitted by law.",
    ],
  },
  {
    heading: "4. How We Use Personal Information",
    body: ["We may use personal information to:"],
    list: [
      "Provide requested products and services.",
      "Process transactions and verify customer identity.",
      "Communicate with customers and respond to enquiries.",
      "Provide customer support and process payments.",
      "Maintain records and improve our products and website.",
      "Prevent fraud and abuse and maintain cybersecurity.",
      "Meet legal and regulatory obligations.",
      "Send service-related communications and marketing communications where legally permitted.",
      "Conduct analytics and business administration.",
      "Protect our legal rights and interests.",
    ],
  },
  {
    heading: "5. Lawful Basis for Processing",
    body: [
      "Depending on the circumstances, DEGSS may process personal data on the basis of your consent; performance of a contract; taking steps at your request before entering into a contract; compliance with a legal or regulatory obligation; protection of legitimate interests where applicable; or other lawful grounds recognised by applicable Nigerian data-protection law.",
    ],
  },
  {
    heading: "6. Marketing Communications",
    body: [
      "Where permitted by law, DEGSS may send information about products, services, promotions and investment opportunities.",
      "You may unsubscribe from marketing communications at any time. However, opting out of marketing communications will not necessarily stop essential transactional, security or service communications.",
    ],
  },
  {
    heading: "7. Cookies",
    body: [
      "Our website may use cookies and similar technologies to keep the website functioning, remember user preferences, understand website traffic, improve website performance, analyse usage patterns and support relevant marketing activities where applicable.",
      "You may configure your browser to reject or delete cookies. Disabling certain cookies may affect website functionality.",
    ],
  },
  {
    heading: "8. Sharing Personal Information",
    body: [
      "DEGSS does not sell personal information simply for the purpose of selling personal information.",
      "We may disclose information where reasonably necessary to:",
    ],
    list: [
      "Employees and authorised representatives.",
      "Professional advisers.",
      "Payment processors.",
      "Banks and financial institutions.",
      "Technology and hosting providers.",
      "Marketing and communication providers.",
      "Business partners.",
      "Government agencies and regulators.",
      "Law-enforcement authorities where legally required.",
      "Other service providers necessary to deliver requested services.",
    ],
  },
  {
    heading: "9. International Data Transfers",
    body: [
      "Some service providers used by DEGSS may process information outside Nigeria.",
      "Where personal data is transferred or processed outside Nigeria, DEGSS will seek to ensure that appropriate safeguards and lawful transfer mechanisms are applied as required by applicable data-protection law.",
    ],
  },
  {
    heading: "10. Data Security",
    body: [
      "DEGSS takes reasonable technical and organisational measures to protect personal information against unauthorised access, accidental loss, destruction, misuse, alteration, unauthorised disclosure and other unlawful processing.",
      "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    heading: "11. Data Retention",
    body: [
      "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including providing services, maintaining business and transaction records, meeting legal requirements, resolving disputes, enforcing agreements and protecting legitimate business interests.",
      "When information is no longer required, we will take reasonable steps to securely delete, anonymise or otherwise dispose of it where appropriate.",
    ],
  },
  {
    heading: "12. Your Data Protection Rights",
    body: [
      "Subject to applicable law and relevant conditions, you may have rights including the right to:",
    ],
    list: [
      "Request access to your personal data.",
      "Request correction of inaccurate information.",
      "Request deletion of personal data in appropriate circumstances.",
      "Object to certain processing.",
      "Request restriction of certain processing.",
      "Withdraw consent where processing is based on consent.",
      "Request portability of personal data where applicable.",
      "Lodge a complaint regarding the processing of your personal data.",
    ],
  },
  {
    heading: "13. How to Exercise Your Rights",
    body: [
      "To exercise a privacy right or make a data-protection request, contact DEGSS Limited at info@degsslimited.com or 08038666532.",
      "We may need to verify your identity before processing certain requests.",
    ],
  },
  {
    heading: "14. Data Breaches",
    body: [
      "Where a personal-data breach occurs, DEGSS will assess the incident and take appropriate measures in accordance with applicable Nigerian data-protection requirements, including notification to relevant authorities or affected individuals where legally required.",
    ],
  },
  {
    heading: "15. Children's Privacy",
    body: [
      "Our website and services are not intentionally directed toward children where parental consent or other legal requirements would be necessary.",
      "We do not knowingly collect children's personal information unlawfully. If you believe a child has provided personal information to us improperly, please contact us.",
    ],
  },
  {
    heading: "16. Third-Party Websites",
    body: [
      "Our website may contain links to third-party websites. DEGSS is not responsible for the privacy practices, content or security of external websites. You should review the privacy policies of third-party websites before providing personal information.",
    ],
  },
  {
    heading: "17. Data Protection Compliance",
    body: [
      "DEGSS will endeavour to maintain appropriate data-protection governance, policies, security controls and procedures proportionate to the nature and volume of personal data it processes.",
      "The Nigeria Data Protection Commission (NDPC) is Nigeria's data-protection authority established under the Nigeria Data Protection Act 2023.",
    ],
  },
  {
    heading: "18. Changes to This Privacy Policy",
    body: [
      "We may update this Privacy Policy periodically to reflect changes in our business, technology, applicable law, regulatory requirements or privacy practices.",
      "The updated version will be published on our website with a revised effective date.",
    ],
  },
  {
    heading: "19. Contact Information",
    body: [
      "For privacy enquiries, complaints or data-protection requests:",
      "DEGSS Limited",
      "4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate), Abijo, Ibeju-Lekki, Lagos, Nigeria.",
      { label: "Email", value: "info@degsslimited.com" },
      { label: "Phone", value: "08038666532" },
      { label: "Website", value: "www.degsslimited.com" },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            Last updated: September 12, 2026
          </p>
          <p className="mt-6 text-neutral-600">
            This Privacy Policy describes how DEGSS collects, uses, and
            protects your personal information when you use our website and
            services.
          </p>

          <div className="mt-12 divide-y divide-black/10 border-t border-black/10">
            {sections.map(({ heading, body, list }) => (
              <section key={heading} className="py-8">
                <h2 className="text-xl font-semibold text-neutral-950">
                  {heading}
                </h2>
                <div className="mt-3 space-y-3 text-neutral-600">
                  {body.map((paragraph) =>
                    typeof paragraph === "string" ? (
                      <p key={paragraph}>{paragraph}</p>
                    ) : (
                      <p key={paragraph.label}>
                        <strong className="font-semibold text-neutral-800">
                          {paragraph.label}:
                        </strong>{" "}
                        {paragraph.value}
                      </p>
                    )
                  )}
                </div>
                {list && (
                  <ul className="mt-3 space-y-2 text-neutral-600">
                    {list.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
