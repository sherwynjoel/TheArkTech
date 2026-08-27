export interface Industry {
  slug: string;
  title: string;
  /** Short rail label. Full titles wrap badly in the carousel rail. */
  short: string;
  desc: string;
  tag: string;
  /** Glyph name from components/Icon.astro */
  icon: string;
}

export const industries: Industry[] = [
  { slug: "ecommerce", title: "E-Commerce & Retail", short: "E-Commerce & Retail", tag: "Retail", icon: "bag",
    desc: "Fast, secure online stores with product management, payments, and order systems." },
  { slug: "healthcare", title: "Healthcare & Wellness", short: "Healthcare & Wellness", tag: "Health", icon: "pulse",
    desc: "Appointment systems, clinic management software, and websites for doctors and clinics." },
  { slug: "corporate", title: "Corporate & Business", short: "Corporate & Business", tag: "Business", icon: "building",
    desc: "Clean, modern business websites with branding and lead-generation features." },
  { slug: "education", title: "Education & E-Learning", short: "Education & E-Learning", tag: "Education", icon: "cap",
    desc: "Portals for academies, educators, courses, and online learning platforms." },
  { slug: "realestate", title: "Real Estate & Construction", short: "Real Estate", tag: "Property", icon: "home",
    desc: "Property listings, builder portfolios, and enquiry-driven landing pages." },
  { slug: "travel", title: "Travel & Tourism", short: "Travel & Tourism", tag: "Travel", icon: "plane",
    desc: "Travel agency websites, booking systems, itineraries, and lead-capture forms." },
  { slug: "finance", title: "Finance & Tax", short: "Finance & Tax", tag: "Finance", icon: "calculator",
    desc: "Professional sites for CA firms, finance consultants, and accounting companies." },
  { slug: "logistics", title: "Logistics & Manufacturing", short: "Logistics", tag: "Industry", icon: "truck",
    desc: "Inventory systems, corporate sites, product catalogs, and business automation." },
  { slug: "portfolio", title: "Portfolio & Creatives", short: "Portfolio & Creatives", tag: "Creative", icon: "camera",
    desc: "Portfolio websites for influencers, photographers, designers, and freelancers." },
  { slug: "custom", title: "Custom Requirements", short: "Custom Requirements", tag: "Custom", icon: "sliders",
    desc: "Every business works differently. We build tailor-made websites and software to match." },
];
