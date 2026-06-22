export interface PortfolioProject {
  title: string;
  sector: string;
  type: string;
  summary: string;
  image: string;
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
];