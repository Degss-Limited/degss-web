export function unsplash(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?q=80&w=1600&auto=format&fit=crop`;
}

export type Property = {
  slug: string;
  title: string;
  location: string;
  price: string;
  description: string;
  about: string[];
  image: string;
  gallery: string[];
  beds: number;
  baths: number;
  sqft: string;
  highlight: string;
  status: "Available" | "Under Offer";
  propertyType: string;
  yearBuilt: number;
  lotSize: string;
  parking: string;
  features: string[];
  neighborhood: {
    name: string;
    city: string;
    description: string;
  };
};

export const properties: Property[] = [
  {
    slug: "hrizon-villa",
    title: "Hrizon Villa",
    location: "Ikoyi, Lagos",
    price: "₦850,000,000",
    description:
      "A sleek modern villa with panoramic skyline views and a private pool.",
    about: [
      "Located within a quiet, gated enclave in Ikoyi, Hrizon Villa was designed to maximize light, openness, and views across the surrounding skyline. Floor-to-ceiling glass frames uninterrupted views from nearly every room.",
      "Outdoor terraces extend toward a private pool deck, with multiple lounge areas and a dedicated dining space built for relaxed entertaining. Interior finishes stay calm and natural, letting the setting lead the experience.",
      "The property combines contemporary design with the privacy and security expected of Lagos's most sought-after residential district, suited equally to full-time living or a weekend retreat.",
    ],
    image: unsplash("1600596542815-ffad4c1539a9"),
    gallery: [
      unsplash("1600596542815-ffad4c1539a9"),
      unsplash("1580587771525-78b9dba3b914"),
      unsplash("1502005229762-cf1b2da7c5d6"),
      unsplash("1613490493576-7fde63acd811"),
      unsplash("1600607687939-ce8a6c25118c"),
    ],
    beds: 3,
    baths: 7,
    sqft: "5,000",
    highlight: "Private Pool",
    status: "Available",
    propertyType: "Detached Villa",
    yearBuilt: 2022,
    lotSize: "0.35 Acres",
    parking: "4-Car Garage",
    features: [
      "Private swimming pool",
      "Floor-to-ceiling windows",
      "Smart home automation",
      "Landscaped garden",
      "Staff quarters",
      "24/7 estate security",
    ],
    neighborhood: {
      name: "Ikoyi",
      city: "Lagos, Nigeria",
      description:
        "An established, leafy district known for waterfront views, top schools, and easy access to the Lagos business district.",
    },
  },
  {
    slug: "cedarwood-estates",
    title: "Cedarwood Estates",
    location: "Lekki, Lagos",
    price: "₦620,000,000",
    description:
      "A gated estate offering spacious family living amid landscaped gardens.",
    about: [
      "Cedarwood Estates sits within a secure, professionally managed estate in Lekki, built around wide streets and mature landscaping. The layout favors generous family living with a strong connection to the outdoors.",
      "Each living space opens onto shaded terraces and communal gardens, while a dedicated family lounge and study offer room to spread out. Finishes throughout favor warm, durable materials suited to everyday living.",
      "Residents enjoy round-the-clock estate security, close proximity to international schools, and quick access to Lekki's retail and business districts.",
    ],
    image: unsplash("1600585154340-be6161a56a0c"),
    gallery: [
      unsplash("1600585154340-be6161a56a0c"),
      unsplash("1600047509807-ba8f99d2cdde"),
      unsplash("1494526585095-c41746248156"),
      unsplash("1600210492486-724fe5c67fb0"),
      unsplash("1600566753086-00f18fb6b3ea"),
    ],
    beds: 5,
    baths: 6,
    sqft: "4,500",
    highlight: "Gated Estate",
    status: "Available",
    propertyType: "Terraced Duplex",
    yearBuilt: 2021,
    lotSize: "0.28 Acres",
    parking: "3-Car Garage",
    features: [
      "Gated estate security",
      "Landscaped communal gardens",
      "Family lounge and study",
      "Fitted kitchen with island",
      "Children's play area",
      "Backup power supply",
    ],
    neighborhood: {
      name: "Lekki",
      city: "Lagos, Nigeria",
      description:
        "A fast-growing residential hub known for gated estates, modern retail, and easy access to the Lekki-Epe corridor.",
    },
  },
  {
    slug: "willowbrook-house",
    title: "Willowbrook House",
    location: "Victoria Island, Lagos",
    price: "₦430,000,000",
    description: "A cozy contemporary home just minutes from the waterfront.",
    about: [
      "Willowbrook House sits on a quiet street in Victoria Island, just minutes from the waterfront. The design favors clean lines and comfortable proportions, with natural light reaching every principal room.",
      "A compact footprint is used efficiently, with an open-plan living and dining area that flows onto a private courtyard. Bedrooms are arranged for privacy, each with generous storage and en-suite bathrooms.",
      "The location offers effortless access to Victoria Island's offices, restaurants, and waterfront promenades, making it well suited to professionals and small families alike.",
    ],
    image: unsplash("1512917774080-9991f1c4c750"),
    gallery: [
      unsplash("1512917774080-9991f1c4c750"),
      unsplash("1613977257363-707ba9348227"),
      unsplash("1600573472592-401b489a3cdc"),
      unsplash("1564013799919-ab600027ffc6"),
      unsplash("1523217582562-09d0def993a6"),
    ],
    beds: 4,
    baths: 4,
    sqft: "3,200",
    highlight: "Waterfront Access",
    status: "Available",
    propertyType: "Semi-Detached Duplex",
    yearBuilt: 2019,
    lotSize: "0.2 Acres",
    parking: "2-Car Garage",
    features: [
      "Private courtyard",
      "En-suite bathrooms",
      "Fitted wardrobes",
      "Rooftop terrace",
      "CCTV surveillance",
      "Dedicated visitor parking",
    ],
    neighborhood: {
      name: "Victoria Island",
      city: "Lagos, Nigeria",
      description:
        "Lagos's commercial core, offering waterfront living alongside offices, hotels, and fine dining, all within walking distance.",
    },
  },
  {
    slug: "meadow-view-cottage",
    title: "Meadow View Cottage",
    location: "Ibeju-Lekki, Lagos",
    price: "₦280,000,000",
    description: "A charming cottage retreat surrounded by open green views.",
    about: [
      "Set back from the road in Ibeju-Lekki, Meadow View Cottage offers a quieter pace with open green views on every side. The single-storey layout keeps living spaces close to the garden.",
      "A wraparound veranda connects the interior to the surrounding grounds, ideal for slow mornings and evening gatherings alike. Interiors lean warm and understated, built for comfortable, low-maintenance living.",
      "With Lagos's new business districts and the coastline both nearby, the cottage suits buyers looking for a calmer setting without giving up convenient access to the city.",
    ],
    image: unsplash("1568605114967-8130f3a36994"),
    gallery: [
      unsplash("1568605114967-8130f3a36994"),
      unsplash("1600566752355-35792bedcfea"),
      unsplash("1571055107559-3e67626fa8be"),
      unsplash("1560448204-e02f11c3d0e2"),
      unsplash("1600585154526-990dced4db0d"),
    ],
    beds: 3,
    baths: 3,
    sqft: "2,600",
    highlight: "Garden Retreat",
    status: "Available",
    propertyType: "Bungalow",
    yearBuilt: 2020,
    lotSize: "0.4 Acres",
    parking: "2-Car Carport",
    features: [
      "Wraparound veranda",
      "Open garden grounds",
      "Borehole water supply",
      "Solar backup power",
      "Staff quarters",
      "Perimeter fencing",
    ],
    neighborhood: {
      name: "Ibeju-Lekki",
      city: "Lagos, Nigeria",
      description:
        "A rapidly developing corridor along the Lekki coastline, home to new estates, the Dangote refinery, and the Lekki Free Trade Zone.",
    },
  },
  {
    slug: "palm-grove-residence",
    title: "Palm Grove Residence",
    location: "Ikate, Lekki",
    price: "₦540,000,000",
    description:
      "A minimalist duplex with clean lines and warm natural light throughout.",
    about: [
      "Palm Grove Residence sits on a quiet close in Ikate, a short drive from Lekki's main retail and business strip. The design keeps a low, minimalist profile, with dark timber cladding set against wide expanses of glass.",
      "Inside, an open-plan kitchen and living area is built around a central island, with sliding doors that open the whole ground floor onto a landscaped rear garden. Bedrooms upstairs are quiet and light-filled, each with fitted storage.",
      "Every system in the home, from lighting to security, is wired for smart control, making it a fit for buyers who want a modern, low-maintenance base close to Lekki's core without sacrificing space.",
    ],
    image: unsplash("1600585153490-76fb20a32601"),
    gallery: [
      unsplash("1600585153490-76fb20a32601"),
      unsplash("1600585154363-67eb9e2e2099"),
      unsplash("1600585152220-90363fe7e115"),
      unsplash("1554995207-c18c203602cb"),
      unsplash("1512918728675-ed5a9ecdebfd"),
    ],
    beds: 4,
    baths: 5,
    sqft: "3,800",
    highlight: "Smart Home",
    status: "Available",
    propertyType: "Detached Duplex",
    yearBuilt: 2023,
    lotSize: "0.22 Acres",
    parking: "3-Car Garage",
    features: [
      "Smart lighting and security",
      "Open-plan kitchen island",
      "Landscaped rear garden",
      "Fitted upstairs storage",
      "Sliding glass doors",
      "Visitor parking bay",
    ],
    neighborhood: {
      name: "Ikate",
      city: "Lagos, Nigeria",
      description:
        "A quiet residential pocket of Lekki Phase 1, close to the axis's restaurants, retail, and schools, with easy access to the Lekki-Epe Expressway.",
    },
  },
  {
    slug: "bellview-heights",
    title: "Bellview Heights",
    location: "Banana Island, Lagos",
    price: "₦1,450,000,000",
    description:
      "An architectural statement mansion built for large-scale entertaining.",
    about: [
      "Bellview Heights occupies a prime plot on Banana Island, Lagos's most exclusive address. Bold geometric massing and a striking material palette set the home apart, while the interior scales up to match: soaring ceilings, wide-format stone, and a fireplace-anchored living hall built for hosting.",
      "A separate family wing keeps everyday living private from the formal entertaining spaces, and a fully equipped home cinema and study round out the ground floor. Every principal room takes in views over the surrounding island.",
      "With round-the-clock estate security and direct access to Banana Island's private marina facilities, the property suits buyers seeking the very top end of Lagos's residential market.",
    ],
    image: unsplash("1600047509358-9dc75507daeb"),
    gallery: [
      unsplash("1600047509358-9dc75507daeb"),
      unsplash("1600121848594-d8644e57abab"),
      unsplash("1600210491892-03d54c0aaf87"),
      unsplash("1560185008-b033106af5c3"),
      unsplash("1560185127-6ed189bf02f4"),
    ],
    beds: 6,
    baths: 8,
    sqft: "8,200",
    highlight: "Home Cinema",
    status: "Available",
    propertyType: "Luxury Mansion",
    yearBuilt: 2023,
    lotSize: "0.6 Acres",
    parking: "6-Car Garage",
    features: [
      "Home cinema and study",
      "Fireplace-anchored living hall",
      "Separate family wing",
      "Wide-format stone finishes",
      "Marina access",
      "Round-the-clock estate security",
    ],
    neighborhood: {
      name: "Banana Island",
      city: "Lagos, Nigeria",
      description:
        "A man-made, gated island off Ikoyi and Lagos's most exclusive address, home to ambassadors, executives, and the country's highest-value real estate.",
    },
  },
  {
    slug: "fairview-bungalow",
    title: "Fairview Bungalow",
    location: "Magodo, Lagos",
    price: "₦195,000,000",
    description:
      "A classic family bungalow on a quiet, tree-lined estate street.",
    about: [
      "Fairview Bungalow sits on a generous corner plot within Magodo GRA, a long-established, low-density scheme on the mainland. Stone cladding and a pitched roof give the home a settled, classic street presence.",
      "Inside, the layout favors family life: a separate living and family room, a dining area open to the kitchen, and four bedrooms arranged for privacy. A covered driveway leads to a double garage at the side of the house.",
      "Magodo's wide, tree-lined streets and long-standing resident community make this a straightforward fit for families looking for space and quiet on the mainland, without moving far from the Lagos-Ibadan corridor.",
    ],
    image: unsplash("1605276374104-dee2a0ed3cd6"),
    gallery: [
      unsplash("1605276374104-dee2a0ed3cd6"),
      unsplash("1592595896616-c37162298647"),
      unsplash("1615873968403-89e068629265"),
      unsplash("1560185009-5bf9f2849488"),
      unsplash("1600607687920-4e2a09cf159d"),
    ],
    beds: 4,
    baths: 3,
    sqft: "2,400",
    highlight: "Family Estate",
    status: "Available",
    propertyType: "Bungalow",
    yearBuilt: 2017,
    lotSize: "0.25 Acres",
    parking: "2-Car Driveway",
    features: [
      "Separate family room",
      "Covered driveway",
      "Double garage",
      "Corner plot",
      "Mature perimeter trees",
      "Estate resident association",
    ],
    neighborhood: {
      name: "Magodo",
      city: "Lagos, Nigeria",
      description:
        "A well-established GRA on the mainland, known for wide streets, good schools, and a strong, long-standing resident community.",
    },
  },
];

export function getProperty(slug: string) {
  return properties.find((property) => property.slug === slug);
}
