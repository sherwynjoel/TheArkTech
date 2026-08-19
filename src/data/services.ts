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
    desc: "Fast, secure, responsive websites engineered for performance and built to scale with your business.",
    included: [
      "Responsive UI/UX design",
      "CMS integration (editable content)",
      "Semantic HTML & metadata setup",
      "Accessibility & Core Web Vitals tuning",
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
    title: "Cloud & DevOps",
    icon: "commit",
    desc: "Reliable cloud infrastructure with automated delivery pipelines, monitoring, and backups — so releases are routine, not risky.",
    included: [
      "Cloud architecture & provisioning",
      "CI/CD pipeline automation",
      "Containerisation & orchestration",
      "Monitoring, logging & alerting",
      "Automated backups & recovery",
      "Security hardening & access control",
    ],
    tech: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform", "Nginx"],
  },
  {
    num: "06",
    title: "API & Systems Integration",
    icon: "grid",
    desc: "Connect the systems your business already runs on — ERPs, CRMs, payment gateways, and third-party services — into one dependable whole.",
    included: [
      "REST & GraphQL API development",
      "Payment gateway integration",
      "ERP / CRM data synchronisation",
      "Legacy system modernisation",
      "Webhook & event-driven pipelines",
      "API documentation & versioning",
    ],
    tech: ["Node.js", "Python", "GraphQL", "PostgreSQL", "Redis", "REST"],
  },
  {
    num: "07",
    title: "AI Agents & Automation",
    icon: "cpu",
    desc: "Production AI systems — calling agents, custom bots, and automated workflows — engineered and monitored to run reliably at scale.",
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
