export interface PortfolioProject {
  title: string;
  sector: string;
  type: string;
  summary: string;
  image: string;
  gallery?: string[];
  metrics: { value: string; label: string }[];
  tags: string[];
  url?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Hars Jewellery",
    sector: "Jewelry Retail",
    type: "Premium E-Commerce",
    summary:
      "A luxurious e-commerce platform for a premium jewelry brand, showcasing handcrafted gold and diamond collections with an elegant, immersive shopping experience.",
    image: "/portfolio/harsjewellery.webp",
    url: "https://harsjewellery.in",
    metrics: [
      { value: "Premium", label: "brand design" },
      { value: "100%", label: "authenticity" },
    ],
    tags: ["E-Commerce", "Jewelry", "Luxury", "Online Store"],
  },
  {
    title: "Zetra Electronics",
    sector: "E-Commerce",
    type: "Online Store",
    summary:
      "India's premium destination for electronic components, sensors, IoT modules, and robotics kits. A complete e-commerce experience.",
    image: "/portfolio/zetraelectronics.webp",
    url: "https://zetraelectronics.com",
    metrics: [
      { value: "5000+", label: "products listed" },
      { value: "24/7", label: "sales automation" },
    ],
    tags: ["E-Commerce", "Electronics", "IoT", "Robotics"],
  },

  {
    title: "Opal Media Productions",
    sector: "Media Production",
    type: "Brand Website",
    summary:
      "A full-service agency website presenting media production, photography, digital marketing, branding, and website development services.",
    image: "/portfolio/opalmediaproductions.webp",
    url: "https://www.opalmediaproductions.com/",
    metrics: [
      { value: "5+", label: "service verticals" },
      { value: "24h", label: "response promise" },
    ],
    tags: ["Brand Site", "Media", "Marketing", "Lead Gen"],
  },
  {
    title: "Dr. Alam's Skin Clinic",
    sector: "Healthcare",
    type: "Clinic Website",
    summary:
      "A dermatologist-led clinic website for advanced skin, hair, laser, and dermatosurgery treatments with consultation-focused patient journeys.",
    image: "/portfolio/dralamdermcentre.webp",
    url: "https://dralamdermcentre.com/",
    metrics: [
      { value: "500+", label: "Google reviews" },
      { value: "4.9", label: "review rating" },
    ],
    tags: ["Healthcare", "SEO", "Booking", "Gallery"],
  },
  {
    title: "LearnMore Projects",
    sector: "Education & R&D",
    type: "Training Website",
    summary:
      "A project-center website for final year engineering projects, training, domain discovery, student outcomes, and WhatsApp-led enquiries.",
    image: "/portfolio/learnmoreprojects.webp",
    url: "https://learnmoreprojects.in/",
    metrics: [
      { value: "7,000+", label: "students supported" },
      { value: "5,000+", label: "projects delivered" },
    ],
    tags: ["Education", "R&D", "Training", "Lead Gen"],
  },
  {
    title: "Axis Upgraders",
    sector: "Business Services",
    type: "Business Website",
    summary:
      "A live business website for Axis Upgraders with clear service positioning, mobile-friendly presentation, and direct enquiry flow.",
    image: "/portfolio/axisupgraders.webp",
    url: "https://axisupgraders.com/",
    metrics: [
      { value: "Live", label: "website project" },
      { value: "24/7", label: "online presence" },
    ],
    tags: ["Business Site", "Responsive", "Lead Gen", "SEO"],
  },
  {
    title: "Deva Sea Food",
    sector: "Food & Export",
    type: "Business Website",
    summary:
      "A business website for a frozen seafood import and export brand, focused on product credibility, company presence, and direct enquiry flow.",
    image: "/portfolio/devaseafood.webp",
    url: "https://devaseafood.com/",
    metrics: [
      { value: "B2B", label: "export presence" },
      { value: "24/7", label: "online visibility" },
    ],
    tags: ["Food Export", "Business Site", "Responsive", "Lead Gen"],
  },
  {
    title: "Southern Group of Companies",
    sector: "Conglomerate",
    type: "Corporate Website",
    summary:
      "A corporate website for a South India group spanning scrap trading, clean energy, logistics, commodity trading, and real estate divisions.",
    image: "/portfolio/southerngoc.webp",
    url: "https://southerngoc.com/",
    metrics: [
      { value: "6", label: "group companies" },
      { value: "2015", label: "founded" },
    ],
    tags: ["Corporate", "Multi-Sector", "Clean Energy", "Logistics"],
  },
  {
    title: "FD Sports Infrastructure",
    sector: "Sports Infrastructure",
    type: "Business Website",
    summary:
      "A sports infrastructure website for turf construction, courts, cricket nets, project galleries, process education, and consultation-led enquiries.",
    image: "/portfolio/fdsports.webp",
    url: "https://fdsports.in/",
    metrics: [
      { value: "10+", label: "years experience" },
      { value: "40+", label: "team members" },
    ],
    tags: ["Sports", "Infrastructure", "Gallery", "Lead Gen"],
  },
  {
    title: "Grace Dental Care Kovai",
    sector: "Healthcare",
    type: "Clinic Website",
    summary:
      "A dental clinic website for patient education, treatment discovery, doctor profiles, international patient support, and direct appointment enquiries.",
    image: "/portfolio/gracedentalcarekovai.webp",
    url: "https://www.gracedentalcarekovai.com/",
    metrics: [
      { value: "10+", label: "years experience" },
      { value: "1-stop", label: "dental facility" },
    ],
    tags: ["Dental", "Healthcare", "Treatments", "Appointments"],
  },
];

