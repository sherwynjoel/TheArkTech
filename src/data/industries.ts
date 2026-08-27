export interface Industry {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  /** Short rail label. Full titles wrap badly in the carousel rail. */
  short: string;
  /** Glyph name from components/Icon.astro */
  icon: string;
  /** Longer lead paragraph for the industry page. Falls back to `desc`. */
  intro?: string;
  /** What we typically build for this sector. */
  builds?: string[];
  /**
   * Portfolio `sector` values that belong to this industry, so each page can
   * show real client work instead of a generic pitch. Industries with no
   * matching project simply omit that section.
   */
  sectors?: string[];
}

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    title: "E-Commerce & Retail",
    desc: "Fast, secure online stores with product management, payments, and order systems.",
    tag: "Retail",
    short: "E-Commerce & Retail",
    icon: "bag",
    intro:
      "Online stores that handle real catalogues, real payments, and real order volume — built to stay fast as your product range grows.",
    builds: [
      "Product catalogue with search & filters",
      "Payment gateway integration",
      "Order & inventory management",
      "Customer accounts and order history",
      "Admin dashboard for your team",
      "Mobile-first checkout",
    ],
    sectors: ["E-Commerce", "Jewelry Retail"],
  },
  {
    slug: "healthcare",
    title: "Healthcare & Wellness",
    desc: "Appointment systems, clinic management software, and websites for doctors and clinics.",
    tag: "Health",
    short: "Healthcare & Wellness",
    icon: "pulse",
    intro:
      "Websites and systems for clinics and practitioners, built around the patient journey — from finding you to booking an appointment.",
    builds: [
      "Appointment & enquiry booking flows",
      "Treatment and service catalogues",
      "Doctor and practitioner profiles",
      "Before/after and case galleries",
      "Patient enquiry management",
      "Accessible, fast-loading pages",
    ],
    sectors: ["Healthcare"],
  },
  {
    slug: "corporate",
    title: "Corporate & Business",
    desc: "Clean, modern business websites and internal tools with secure enquiry workflows.",
    tag: "Business",
    short: "Corporate & Business",
    icon: "building",
    intro:
      "Corporate websites and internal tools for established businesses — clear structure, credible presentation, and enquiry flows that actually reach your team.",
    builds: [
      "Multi-division corporate sites",
      "Service and capability sections",
      "Enquiry routing and forms",
      "Internal dashboards and tools",
      "CMS so your team can edit content",
      "Document and brochure delivery",
    ],
    sectors: ["Business Services", "Conglomerate"],
  },
  {
    slug: "education",
    title: "Education & E-Learning",
    desc: "Portals for academies, educators, courses, and online learning platforms.",
    tag: "Education",
    short: "Education & E-Learning",
    icon: "cap",
    intro:
      "Platforms for academies, trainers, and research organisations — course delivery, enrolment, and content that scales with your intake.",
    builds: [
      "Course catalogues and enrolment",
      "Student and batch management",
      "Content and resource libraries",
      "Enquiry and admission workflows",
      "Certificates and progress tracking",
      "Payment collection",
    ],
    sectors: ["Education & R&D"],
  },
  {
    slug: "realestate",
    title: "Real Estate & Construction",
    desc: "Property listings, builder portfolios, and enquiry-driven landing pages.",
    tag: "Property",
    short: "Real Estate",
    icon: "home",
    intro:
      "Sites for builders, contractors, and infrastructure firms — project showcases that establish credibility and turn interest into enquiries.",
    builds: [
      "Project and property showcases",
      "Image galleries and virtual walkthroughs",
      "Specification and brochure downloads",
      "Location and amenity detail pages",
      "Enquiry capture and routing",
      "Completed-works portfolios",
    ],
    sectors: ["Sports Infrastructure"],
  },
  {
    slug: "travel",
    title: "Travel & Tourism",
    desc: "Travel agency websites, booking systems, itineraries, and lead-capture forms.",
    tag: "Travel",
    short: "Travel & Tourism",
    icon: "plane",
    intro:
      "Travel and tour operator platforms — itineraries, packages, and booking flows that work as well on a phone as on a desktop.",
    builds: [
      "Package and itinerary listings",
      "Enquiry and booking flows",
      "Photo galleries and destination pages",
      "Seasonal pricing and availability",
      "Payment and deposit collection",
      "Multi-language ready builds",
    ],
  },
  {
    slug: "finance",
    title: "Finance & Tax",
    desc: "Professional sites for CA firms, finance consultants, and accounting companies.",
    tag: "Finance",
    short: "Finance & Tax",
    icon: "calculator",
    intro:
      "Websites for chartered accountants, consultants, and financial firms where trust, clarity, and confidentiality come first.",
    builds: [
      "Service and specialisation pages",
      "Secure client enquiry forms",
      "Team and credential profiles",
      "Resource and compliance libraries",
      "Appointment scheduling",
      "Document request workflows",
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Manufacturing",
    desc: "Inventory systems, corporate sites, product catalogs, and business automation.",
    tag: "Industry",
    short: "Logistics",
    icon: "truck",
    intro:
      "Systems for manufacturers, exporters, and logistics operators — product credibility online, and automation behind the scenes.",
    builds: [
      "Product and specification catalogues",
      "Export and certification presentation",
      "Enquiry and quotation workflows",
      "Inventory and order tracking",
      "Internal process automation",
      "ERP and system integration",
    ],
    sectors: ["Food & Export"],
  },
  {
    slug: "portfolio",
    title: "Portfolio & Creatives",
    desc: "Portfolio websites for influencers, photographers, designers, and freelancers.",
    tag: "Creative",
    short: "Portfolio & Creatives",
    icon: "camera",
    intro:
      "Portfolio sites for studios and independent creatives — fast-loading galleries that present the work without getting in its way.",
    builds: [
      "Image and video galleries",
      "Project and case presentation",
      "Service and package pages",
      "Client enquiry flows",
      "Fast media delivery",
      "Self-editable content",
    ],
    sectors: ["Media Production"],
  },
  {
    slug: "custom",
    title: "Custom Requirements",
    desc: "Every business is unique — we build tailor-made websites and software to match.",
    tag: "Custom",
    short: "Custom Requirements",
    icon: "sliders",
    intro:
      "If your requirement doesn't fit a category, that's usually a sign it needs custom software. We scope it, architect it, and build it around how you actually work.",
    builds: [
      "Requirement and architecture design",
      "Custom web and mobile applications",
      "Business process automation",
      "Third-party and legacy integration",
      "AI agents and automated workflows",
      "Ongoing support and iteration",
    ],
  },
];
