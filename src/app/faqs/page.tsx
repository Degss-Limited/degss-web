import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs | DEGSS",
  description:
    "Answers to common questions about buying, renting, and managing property with DEGSS.",
};

const faqs = [
  {
    question: "What services does DEGSS offer?",
    answer:
      "DEGSS helps clients buy, rent, and manage residential and commercial properties. Our team handles everything from property search and viewings to negotiations, documentation, and after-sale support.",
  },
  {
    question: "How do I schedule a property viewing?",
    answer:
      "You can book a viewing by reaching out through our Contact page, calling us directly, or clicking \"Get started\" on any listing. A member of our team will confirm a convenient time with you within 24 hours.",
  },
  {
    question: "Are the prices on your listings negotiable?",
    answer:
      "Pricing depends on the property and the seller or landlord. Our agents will let you know upfront whether a listing has room for negotiation and will represent your interests through the process.",
  },
  {
    question: "What documents do I need to rent or buy a property?",
    answer:
      "Requirements vary by property, but you should generally have a valid form of identification, proof of income or funds, and, for rentals, references from a previous landlord or employer. Our team will provide a full checklist once you've found a property you're interested in.",
  },
  {
    question: "Do you charge a fee for using DEGSS?",
    answer:
      "Browsing listings and booking viewings is free. Agency and legal fees may apply once a transaction proceeds, and these are always communicated clearly before you commit to anything.",
  },
  {
    question: "Which areas do you cover?",
    answer:
      "We currently operate across Lagos, with a focus on Lekki, Ibeju-Lekki, and surrounding areas. Get in touch if you're looking outside these areas — we may still be able to help through our partner network.",
  },
  {
    question: "How long does the buying or renting process take?",
    answer:
      "Rentals can typically close within 1–2 weeks once documentation is complete. Purchases take longer due to legal and title verification, usually ranging from a few weeks to a couple of months depending on the property.",
  },
  {
    question: "Can DEGSS help manage a property I already own?",
    answer:
      "Yes. Our property management service covers tenant sourcing, rent collection, maintenance coordination, and regular reporting so you can own property without the day-to-day hassle.",
  },
];

export default function FAQsPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-neutral-50 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-xl text-neutral-600">
            Can&apos;t find the answer you&apos;re looking for? <br />Reach out to
            our team on the{" "}
            <a
              href="/contact"
              className="font-medium text-neutral-950 underline underline-offset-2"
            >
              Contact us
            </a>{" "}
            page and we&apos;ll be happy to help.
          </p>

          <FaqAccordion faqs={faqs} />
        </div>
      </main>
    </>
  );
}
