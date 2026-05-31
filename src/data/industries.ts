export interface Industry { slug: string; title: string; desc: string; tag: string; }

export const industries: Industry[] = [
  { slug: "ecommerce", title: "E-Commerce & Retail", desc: "Fast, secure online stores with product management, payments, and order systems.", tag: "Retail" },
  { slug: "healthcare", title: "Healthcare & Wellness", desc: "Appointment systems, clinic management software, and websites for doctors and clinics.", tag: "Health" },
  { slug: "corporate", title: "Corporate & Business", desc: "Clean, modern business websites with branding and lead-generation features.", tag: "Business" },
  { slug: "education", title: "Education & E-Learning", desc: "Portals for academies, educators, courses, and online learning platforms.", tag: "Education" },
  { slug: "food", title: "Food & Restaurants", desc: "Restaurant websites, digital menus, online ordering, and delivery platforms.", tag: "Food" },
  { slug: "realestate", title: "Real Estate & Construction", desc: "Property listings, builder portfolios, and enquiry-driven landing pages.", tag: "Property" },
  { slug: "jewellery", title: "Jewellery & Luxury", desc: "High-end e-commerce with premium UI, product zoom, filters, and secure checkout.", tag: "Luxury" },
  { slug: "travel", title: "Travel & Tourism", desc: "Travel agency websites, booking systems, itineraries, and lead-capture forms.", tag: "Travel" },
  { slug: "finance", title: "Finance & Tax", desc: "Professional sites for CA firms, finance consultants, and accounting companies.", tag: "Finance" },
  { slug: "logistics", title: "Logistics & Manufacturing", desc: "Inventory systems, corporate sites, product catalogs, and business automation.", tag: "Industry" },
  { slug: "portfolio", title: "Portfolio & Creatives", desc: "Portfolio websites for influencers, photographers, designers, and freelancers.", tag: "Creative" },
  { slug: "custom", title: "Custom Requirements", desc: "Every business is unique — we build tailor-made websites and software to match.", tag: "Custom" },
];
