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
    title: "Retail Commerce Platform",
    sector: "E-commerce",
    type: "Website + Admin",
    summary:
      "A fast online storefront with product discovery, secure checkout flow, and an owner-friendly product management dashboard.",
    image: "/industries/ecommerce.png",
    metrics: [
      { value: "42%", label: "faster browsing" },
      { value: "3x", label: "simpler updates" },
    ],
    tags: ["Astro", "React", "Payments", "Admin"],
  },
  {
    title: "Clinic Appointment System",
    sector: "Healthcare",
    type: "Web App",
    summary:
      "A responsive booking workflow for patients, with staff-side schedule visibility and automated consultation reminders.",
    image: "/industries/healthcare.png",
    metrics: [
      { value: "65%", label: "less manual follow-up" },
      { value: "24/7", label: "booking access" },
    ],
    tags: ["Automation", "Dashboard", "Forms", "WhatsApp"],
  },
  {
    title: "Real Estate Lead Website",
    sector: "Real Estate",
    type: "Landing Site",
    summary:
      "A premium property showcase with project pages, enquiry prompts, location highlights, and mobile-first lead capture.",
    image: "/industries/realestate.png",
    metrics: [
      { value: "2.4s", label: "target load time" },
      { value: "18+", label: "lead touchpoints" },
    ],
    tags: ["SEO", "UI/UX", "Gallery", "Lead Gen"],
  },
  {
    title: "Opal Media Productions",
    sector: "Media Production",
    type: "Brand Website",
    summary:
      "A full-service agency website presenting media production, photography, digital marketing, branding, and website development services.",
    image: "/industries/portfolio.png",
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
    image: "/industries/healthcare.png",
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
    image: "/industries/education.png",
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
    image: "/industries/corporate.png",
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
    image: "/industries/food.png",
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
    image: "/industries/corporate.png",
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
    image: "/industries/custom.png",
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
    image: "/industries/healthcare.png",
    url: "https://www.gracedentalcarekovai.com/",
    metrics: [
      { value: "10+", label: "years experience" },
      { value: "1-stop", label: "dental facility" },
    ],
    tags: ["Dental", "Healthcare", "Treatments", "Appointments"],
  },
  {
    title: "Social Media Lead Generation",
    sector: "Fashion Retail",
    type: "Instagram Growth",
    summary:
      "A social media lead generation campaign for Sthri by Saranya, growing a new boutique profile into a sales-ready Instagram presence for cotton saree enquiries.",
    image: "/portfolio/sthriby-saranya-after.jpeg",
    gallery: [
      "/portfolio/sthriby-saranya-before.jpeg",
      "/portfolio/sthriby-saranya-after.jpeg",
    ],
    metrics: [
      { value: "0 to 10K", label: "followers grown" },
      { value: "14", label: "content posts" },
    ],
    tags: ["Instagram", "Lead Gen", "Fashion", "WhatsApp"],
  },
];
