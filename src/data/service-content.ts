import type { ServiceIconName } from "@/lib/data/services";

export type ServiceContent = {
  slug: string;
  label: string;
  tagline: string;
  iconName: ServiceIconName;
  heroImage: string;
  intro: string;
  features: string[];
};

export const serviceContent: Record<string, ServiceContent> = {
  development: {
    slug: "development",
    label: "Development",
    tagline: "Creating spaces designed for life and value.",
    iconName: "BuildingIcon",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    intro:
      "DEGSS designs and builds residential and mixed-use developments across Lagos — taking positioned land from planning through construction to handover, with a focus on spaces that hold their value long after the keys change hands.",
    features: [
      "Site planning & feasibility studies",
      "Architectural design & regulatory approvals",
      "Construction management & quality assurance",
      "Handover coordination & documentation",
      "Post-handover support",
    ],
  },
  acquisition: {
    slug: "acquisition",
    label: "Acquisition",
    tagline: "Securing assets positioned for tomorrow.",
    iconName: "KeyIcon",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    intro:
      "We help individuals, families, and investors identify and secure land and property with genuine long-term potential — verified titles, strategic locations, and terms structured to protect the buyer from the first conversation to closing.",
    features: [
      "Site identification & due diligence",
      "Title verification & documentation review",
      "Negotiation on your behalf",
      "Structured payment plans",
      "Handover & registration support",
    ],
  },
  consulting: {
    slug: "consulting",
    label: "Consulting",
    tagline: "Turning property decisions into informed decisions.",
    iconName: "ClipboardCheckIcon",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    intro:
      "Independent, experience-led advice for anyone facing a real estate decision — whether that's where to buy, how to structure an investment, or how to evaluate a piece of land before committing.",
    features: [
      "Investment & location advisory",
      "Market & feasibility assessment",
      "Documentation & compliance guidance",
      "Portfolio strategy for local and diaspora investors",
      "One-on-one consultation sessions",
    ],
  },
  management: {
    slug: "management",
    label: "Management",
    tagline: "Protecting and growing real estate value.",
    iconName: "ShieldCheckIcon",
    heroImage:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1600&auto=format&fit=crop",
    intro:
      "Ownership doesn't end at closing. We manage land and property on behalf of owners — protecting it from encroachment, keeping it development-ready, and helping it grow in value over time.",
    features: [
      "Land security & site monitoring",
      "Property & facility management",
      "Tenant sourcing & management",
      "Maintenance coordination",
      "Regular owner reporting",
    ],
  },
  "agro-farming": {
    slug: "agro-farming",
    label: "Agro Farming",
    tagline: "Making land productive.",
    iconName: "LeafIcon",
    heroImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    intro:
      "Land banked for the future doesn't have to sit idle. We partner with landowners and investors to put land to productive agricultural use ahead of development, turning otherwise dormant assets into a source of value.",
    features: [
      "Land preparation & cultivation",
      "Crop selection & farm management",
      "Yield monitoring & reporting",
      "Revenue-sharing structures for landowners",
      "Sustainable land-use practices",
    ],
  },
  "prime-circle": {
    slug: "prime-circle",
    label: "Prime Circle",
    tagline: "Structured access to real estate investment.",
    iconName: "OrbitIcon",
    heroImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
    intro:
      "Prime Circle gives members structured access to curated real estate opportunities — pooling resources for entry into properties and developments that would otherwise be out of individual reach.",
    features: [
      "Curated investment opportunities",
      "Structured entry & exit terms",
      "Transparent reporting to members",
      "Access to landbanking & development deals",
      "Dedicated relationship support",
    ],
  },
};

export const serviceContentList = Object.values(serviceContent);
