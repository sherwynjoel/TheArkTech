export interface Service {
  num: string;
  title: string;
  desc: string;
  icon: string;
  included: string[];
  tech: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Website Development",
    icon: "window",
    desc: "Fast, secure, responsive websites that elevate your brand and generate real results, for startups, businesses, and professionals.",
    included: [
      "Custom responsive design",
      "CMS integration (editable content)",
      "On-page SEO setup",
      "Contact & lead-gen forms",
      "Performance optimisation",
      "1 month post-launch support",
    ],
    tech: ["Astro", "Next.js", "React", "Tailwind CSS", "WordPress"],
  },
  {
    num: "02",
    title: "E-Commerce Development",
    icon: "bag",
    desc: "Online stores with secure checkout, product management, invoices, and a simple, reliable shopping experience.",
    included: [
      "Product catalogue & filters",
      "Payment gateway integration",
      "Order & inventory management",
      "Admin dashboard",
      "Mobile-first checkout",
      "3 months post-launch support",
    ],
    tech: ["Next.js", "WooCommerce", "Shopify", "Stripe", "PostgreSQL"],
  },
  {
    num: "03",
    title: "Mobile App Development",
    icon: "mobile",
    desc: "Native and hybrid Android/iOS apps designed for speed, user experience, and scalability.",
    included: [
      "iOS & Android (single codebase)",
      "UI/UX design included",
      "REST API integration",
      "Push notifications",
      "App Store & Play Store submission",
      "Post-launch bug-fix window",
    ],
    tech: ["Flutter", "React Native", "Firebase", "Node.js", "Swift"],
  },
  {
    num: "04",
    title: "Custom Software & Automation",
    icon: "cpu",
    desc: "Automate your business with AI-powered tools, dashboards, CRMs, and custom-built software.",
    included: [
      "Requirement & architecture design",
      "Agile sprint-based development",
      "Third-party API & webhook integrations",
      "AI / automation pipelines",
      "Full QA & testing",
      "Technical documentation",
    ],
    tech: ["Node.js", "Python", "React", "PostgreSQL", "AWS", "OpenAI"],
  },
  {
    num: "05",
    title: "Branding & UI/UX",
    icon: "design",
    desc: "Clean, modern, intuitive design that sets your digital identity apart.",
    included: [
      "Logo design (3 concepts)",
      "Brand guidelines document",
      "UI style guide & design system",
      "High-fidelity Figma prototypes",
      "Unlimited revision rounds",
      "Source files handover",
    ],
    tech: ["Figma", "Adobe Illustrator", "Photoshop", "Framer"],
  },
  {
    num: "06",
    title: "SEO & Digital Marketing",
    icon: "growth",
    desc: "Boost your online visibility and grow your business with strategic SEO and marketing support.",
    included: [
      "Keyword research & strategy",
      "On-page & technical SEO",
      "Google Business Profile setup",
      "Monthly performance reports",
      "Content strategy & copywriting",
      "Search & social ad management",
    ],
    tech: ["Google Search Console", "SEMrush", "Google Analytics", "Google Ads", "Meta Ads"],
  },
  {
    num: "07",
    title: "AI Agents & Projects",
    icon: "cpu",
    desc: "Intelligent AI agents and projects, including AI calling agents, custom bots, and automated workflows designed to scale your operations.",
    included: [
      "Custom AI agent development",
      "AI calling & voice agents",
      "LLM integration (OpenAI, Anthropic)",
      "Automated workflows & pipelines",
      "Chatbot & support solutions",
      "AI performance monitoring",
    ],
    tech: ["OpenAI", "Python", "Node.js", "LangChain", "Vapi / ElevenLabs"],
  },
];
