import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Terms & Conditions | DEGSS",
  description:
    "The terms and conditions governing your use of the DEGSS website and services.",
};

type BodyItem = string | { label: string; value: string };

const sections: {
  heading: string;
  body: BodyItem[];
  list?: BodyItem[];
}[] = [
  {
    heading: "1. Introduction",
    body: [
      "Welcome to DEGSS Limited (\"DEGSS\", \"we\", \"us\", or \"our\"). These Terms & Conditions (\"Terms\") govern your access to and use of the DEGSS website, degsslimited.com, and any services, products, platforms, applications, communications or transactions provided by DEGSS Limited.",
      "By accessing our website or using our services, you acknowledge that you have read, understood and agreed to be legally bound by these Terms. If you do not agree with these Terms, please discontinue use of our website and services.",
    ],
  },
  {
    heading: "2. About DEGSS Limited",
    body: [
      "DEGSS Limited is a Nigerian company registered with the Corporate Affairs Commission (CAC) under registration number 8799328.",
    ],
    list: [
      {
        label: "Registered Office",
        value:
          "4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate), Abijo, Ibeju-Lekki, Lagos, Nigeria.",
      },
      { label: "Email", value: "info@degsslimited.com" },
      { label: "Telephone", value: "08038666532" },
      { label: "Website", value: "degsslimited.com" },
    ],
  },
  {
    heading: "3. Eligibility",
    body: ["By using our website or services, you represent that:"],
    list: [
      "You are legally capable of entering into a binding agreement.",
      "The information you provide to DEGSS is accurate and complete.",
      "You will comply with all applicable laws and regulations.",
      "You will not use our services for unlawful, fraudulent or unauthorised purposes.",
    ],
  },
  {
    heading: "4. Website Use",
    body: [
      "You agree to use our website responsibly and only for lawful purposes.",
    ],
    list: [
      "Attempt to gain unauthorised access to our systems.",
      "Introduce malware, viruses or other malicious code.",
      "Interfere with the operation or security of the website.",
      "Copy, reproduce or exploit our content without permission.",
      "Use our website for fraudulent or deceptive activities.",
      "Impersonate DEGSS, its employees, agents or representatives.",
      "Use automated systems to scrape, harvest or extract information without written permission.",
      "Submit false, misleading or fraudulent information.",
    ],
  },
  {
    heading: "5. Products and Services",
    body: [
      "DEGSS may provide or facilitate access to various products and services, which may include real estate opportunities, property-related services, investment opportunities, consultancy, marketing, technology-enabled services, referral programmes and other services introduced from time to time.",
      "Specific products or services may have additional terms, prices, payment schedules, eligibility requirements, documentation and contractual conditions. Where additional terms apply, those terms shall form part of the agreement between you and DEGSS.",
    ],
  },
  {
    heading: "6. Property and Real Estate Transactions",
    body: ["Where DEGSS facilitates or markets real estate transactions:"],
    list: [
      "Property descriptions, prices, sizes, locations, titles, development status and availability are subject to verification.",
      "Information may change without prior notice.",
      "Prospective purchasers should independently verify property documentation before completing a transaction.",
      "A property advertisement does not, by itself, constitute a transfer of legal title.",
      "No property shall be considered sold until the applicable contractual requirements and payment obligations have been satisfied.",
      "Government approvals, title documentation, surveys, planning requirements and other property matters may be subject to the relevant authorities.",
      "DEGSS shall not be responsible for representations made by unauthorised third parties.",
    ],
  },
  {
    heading: "7. Investment Disclaimer",
    body: [
      "Where DEGSS advertises or facilitates an investment opportunity, the information provided is for general informational and commercial purposes unless expressly stated otherwise.",
      "Past performance, projected returns, estimated appreciation or projected profits are not guarantees of future results.",
      "Investment involves risk, including the possible loss of capital. You should conduct your own due diligence and obtain independent professional, financial, legal or tax advice where appropriate before committing funds.",
      "Nothing on our website should automatically be interpreted as a guarantee that an investor will receive a particular return.",
      "Where an investment product is regulated or requires regulatory approval, DEGSS will operate subject to applicable Nigerian laws and regulatory requirements.",
    ],
  },
  {
    heading: "8. Prices and Payments",
    body: [
      "Prices displayed on our website may change without prior notice. A price displayed online does not necessarily constitute a binding offer unless expressly stated otherwise.",
      "Payments must be made through authorised DEGSS payment channels.",
      "DEGSS will not be responsible for payments made to unauthorised individuals, personal bank accounts, fraudulent websites or third parties claiming to represent DEGSS. Customers should independently verify payment instructions with DEGSS before making substantial payments.",
    ],
  },
  {
    heading: "9. Refunds and Cancellations",
    body: [
      "Refunds, cancellations, transfers and payment reversals shall be governed by the terms applicable to the particular product or transaction.",
      "Where a transaction has a specific agreement, the refund and cancellation provisions contained in that agreement shall prevail over general website information.",
      "Where a refund is approved, applicable administrative, transaction, third-party or statutory deductions may apply where legally permissible and disclosed.",
    ],
  },
  {
    heading: "10. Third-Party Services",
    body: [
      "Our website may contain links, integrations or references to third-party websites, payment processors, financial institutions, technology providers, social-media platforms or other service providers.",
      "DEGSS does not control all third-party services and is not responsible for their availability, security, privacy practices, content, terms and conditions, or performance. Your use of third-party services is subject to the relevant third party's terms.",
    ],
  },
  {
    heading: "11. Intellectual Property",
    body: [
      "Unless otherwise stated, all content appearing on the DEGSS website belongs to or is licensed to DEGSS Limited. This includes logos, trademarks, text, graphics, photographs, videos, designs, software, website layouts, marketing materials and other intellectual property.",
      "You may not reproduce, modify, distribute, sell, publish or commercially exploit our intellectual property without prior written permission.",
    ],
  },
  {
    heading: "12. User-Submitted Content",
    body: [
      "Where you submit information, reviews, testimonials, photographs, comments or other content to DEGSS, you confirm that you have the right to provide the content and that it does not violate another person's rights or applicable law.",
      "You grant DEGSS permission to use such content for legitimate business, marketing and promotional purposes where legally permitted and where appropriate consent has been obtained.",
    ],
  },
  {
    heading: "13. Accuracy of Information",
    body: [
      "We endeavour to ensure that information published on our website is accurate and current. However, errors, omissions, typographical errors, pricing changes, availability changes and technical inaccuracies may occasionally occur.",
      "DEGSS reserves the right to correct errors and update information without prior notice.",
    ],
  },
  {
    heading: "14. Availability of Website",
    body: [
      "We do not guarantee that the website will always be available, uninterrupted, secure or error-free. The website may occasionally be unavailable due to maintenance, technical failures, internet or telecommunications failures, cybersecurity incidents, third-party service failures, force majeure events or other circumstances beyond our reasonable control.",
    ],
  },
  {
    heading: "15. Limitation of Liability",
    body: [
      "To the extent permitted by Nigerian law, DEGSS shall not be liable for indirect, incidental, consequential or unforeseeable losses arising from your use of the website or services.",
      "Nothing in these Terms excludes liability that cannot lawfully be excluded under applicable Nigerian law.",
    ],
  },
  {
    heading: "16. Indemnity",
    body: [
      "You agree to indemnify and hold harmless DEGSS Limited, its directors, employees, agents and authorised representatives from claims, losses, liabilities, damages and reasonable expenses arising from your breach of these Terms, unlawful use of our services, fraudulent or misleading information supplied by you, violation of another person's rights, or violation of applicable law.",
    ],
  },
  {
    heading: "17. Privacy",
    body: [
      "Your use of our website is also governed by the DEGSS Limited Privacy Policy, which forms part of these Terms. Our Privacy Policy explains how we collect, use, store, disclose and protect personal information.",
    ],
  },
  {
    heading: "18. Electronic Communications",
    body: [
      "By communicating electronically with DEGSS, you consent to receiving communications electronically where legally permitted. These communications may include emails, SMS, WhatsApp messages, transaction notifications, service updates, marketing communications and other electronic notices.",
      "You may opt out of marketing communications where applicable.",
    ],
  },
  {
    heading: "19. Force Majeure",
    body: [
      "DEGSS shall not be liable for failure or delay caused by circumstances reasonably beyond its control, including natural disasters, government actions, civil unrest, telecommunications failures, cyber incidents, epidemics, strikes, power failures or other force majeure events.",
    ],
  },
  {
    heading: "20. Termination",
    body: [
      "DEGSS may suspend or terminate access to its website or services where you breach these Terms, your activities create security or legal risks, fraud is suspected, required information is inaccurate or misleading, or termination is otherwise permitted by law or applicable contract.",
      "Termination does not affect rights or obligations that accrued before termination.",
    ],
  },
  {
    heading: "21. Governing Law",
    body: [
      "These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.",
      "Subject to applicable law, disputes shall be resolved through appropriate negotiation, mediation, arbitration or the competent courts of Nigeria, as applicable.",
    ],
  },
  {
    heading: "22. Changes to These Terms",
    body: [
      "DEGSS may update these Terms from time to time. Updated Terms will be published on the website with a revised effective date. Your continued use of the website after an update constitutes acceptance of the revised Terms to the extent permitted by law.",
    ],
  },
  {
    heading: "23. Contact Us",
    body: ["For questions, complaints or enquiries regarding these Terms:",
      "DEGSS Limited",
      "4, Adedayo Ogidan Close, Fidiso Estate (By Green Park Estate), Abijo, Ibeju-Lekki, Lagos, Nigeria.",
      { label: "Email", value: "info@degsslimited.com" },
      { label: "Phone", value: "08038666532" },
      { label: "Website", value: "www.degsslimited.com" },
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
            Last updated: September 12, 2026
          </p>
          <p className="mt-6 text-neutral-600">
            Please read these Terms &amp; Conditions carefully before using
            the DEGSS website. They set out the rules and guidelines for how
            you may use our website and services.
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
                      <li
                        key={typeof item === "string" ? item : item.label}
                        className="flex gap-2.5"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400"
                        />
                        <span>
                          {typeof item === "string" ? (
                            item
                          ) : (
                            <>
                              <strong className="font-semibold text-neutral-800">
                                {item.label}:
                              </strong>{" "}
                              {item.value}
                            </>
                          )}
                        </span>
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
