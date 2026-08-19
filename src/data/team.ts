// Team and company story for /about.
//
// Nothing in here is invented. FOUNDED_YEAR, TEAM_SIZE, STORY and TEAM are
// deliberately left empty — an About page is the one place where made-up
// details do real damage, both to trust and to any funding or credit
// application that cross-checks it.
//
// Every section on /about renders only when its data exists, so the page is
// complete and honest right now, and gets stronger as you fill these in.

/** e.g. "2023". Shown as "Founded 2023" and in the schema. */
export const FOUNDED_YEAR = "";

/** e.g. "6" or "5-10". Shown as "N people". */
export const TEAM_SIZE = "";

/** Two or three paragraphs on why the company exists. Each string is a <p>. */
export const STORY: string[] = [];

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/sherwyn.jpg". Initials shown if absent. */
  photo?: string;
  /** One line on what they do here. */
  bio?: string;
  linkedin?: string;
}

/** Named people. Leave empty until you have real names and roles to publish. */
export const TEAM: TeamMember[] = [];

/** How an engagement actually runs, start to finish. */
export const PROCESS: { step: string; title: string; detail: string }[] = [
  {
    step: "01",
    title: "Discovery",
    detail:
      "We work out what you actually need, what it should cost, and how long it takes — before anyone writes code. You get a written scope.",
  },
  {
    step: "02",
    title: "Architecture & design",
    detail:
      "We decide the stack, data model, and interface, and show you the plan. Changing direction here is cheap; changing it later is not.",
  },
  {
    step: "03",
    title: "Build",
    detail:
      "Development in short cycles with something reviewable at the end of each one, so you see progress rather than waiting for a reveal.",
  },
  {
    step: "04",
    title: "Test & launch",
    detail:
      "Functional and cross-device testing, performance tuning, then deployment to your infrastructure with documentation handed over.",
  },
  {
    step: "05",
    title: "Support",
    detail:
      "A post-launch support window on every project, and optional ongoing maintenance covering updates, backups, and priority fixes.",
  },
];
