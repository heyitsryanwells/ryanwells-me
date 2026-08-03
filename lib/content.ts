/**
 * Every word on the site lives here.
 *
 * Edit this file to change copy. Components read from it and never hardcode
 * text. Anything tagged PLACEHOLDER is invented and needs your real numbers
 * before launch. See CONTENT-TODO.md for the full list.
 */

export const site = {
  name: "Ryan Wells",
  url: "https://ryanwells.me",
  role: "Revenue Operations",
  // PLACEHOLDER: confirm how you want to describe your years in the field.
  tagline:
    "I build the revenue systems behind go-to-market teams. Salesforce architecture, GTM automation, and the reporting that executives actually trust.",
  monogram: "RW",
  // Pre-sized WebP (1100px). Rendered grayscale to match the printed feel.
  portrait: "/portrait.webp",
  email: "hello@ryanwells.me", // PLACEHOLDER: set the address you want public.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ryanwells" }, // PLACEHOLDER: real profile URL.
    { label: "GitHub", href: "https://github.com/heyitsryanwells" },
    { label: "Email", href: "mailto:hello@ryanwells.me" },
  ],
};

export const footer = {
  madeWith: "Made with",
  madeWithEmphasis: "love",
  madeWithPlace: "in Knoxville",
};

export const nav = [
  { label: "Index", href: "/" },
  { label: "About", href: "/about" },
  { label: "Guides", href: "/guides" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  greeting: "Hi, I'm",
  firstName: "Ryan",
  // PLACEHOLDER: swap in your own framing.
  intro:
    "I run revenue operations at a go-to-market software company, where I own the Salesforce architecture, the bookings model, and the automation that keeps both honest. I write about the parts nobody documents.",
  primaryCta: { label: "Read the newsletter", href: "/newsletter" },
  secondaryCta: { label: "Browse the guides", href: "/guides" },
  portraitAlt: "Portrait of Ryan Wells",
};

export const proofBar = {
  // PLACEHOLDER: replace with logos of tools you're certified in, companies
  // you've worked with, or publications that have run your writing.
  heading: "Systems of record",
  items: ["Salesforce", "HubSpot", "n8n", "Clay", "Gong", "Linear"],
};

export const expertise = {
  heading: "Areas of work",
  subheading:
    "Six areas taken end to end, in production, with revenue riding on the outcome.",
  areas: [
    {
      ref: "1.0",
      title: "Salesforce Architecture",
      body: "Data models that hold up under real deal structures. Contracts and orders, line-item economics, validation rules, and a permission model built on permission sets rather than a sprawl of profiles.",
    },
    {
      ref: "2.0",
      title: "Bookings & Revenue Reporting",
      body: "ACV, TCV, and retention modeled from line items rather than guessed at the header. Reporting that reconciles to the signed paper, so finance and sales stop arguing about whose number is right.",
    },
    {
      ref: "3.0",
      title: "GTM Automation & AI",
      body: "Workflow automation across n8n, Zapier, and the CRM itself, plus AI agents wired directly into the stack through MCP. The goal is removing manual steps that quietly break every quarter.",
    },
    {
      ref: "4.0",
      title: "Data Quality & Enrichment",
      body: "Contact lifecycle design, deduplication, departure detection, and enrichment pipelines that fill gaps without spending credits twice. Clean data is a process, not a cleanup project.",
    },
    {
      ref: "5.0",
      title: "Pipeline & Campaign Operations",
      body: "Campaign hierarchy, inbound routing, list sync between marketing and sales systems, and attribution that survives contact with the actual funnel.",
    },
    {
      ref: "6.0",
      title: "Systems Governance",
      body: "Role hierarchy, access reviews, change management, and documentation that outlives the person who wrote it. The unglamorous work that keeps an org from calcifying.",
    },
  ],
};

/**
 * PLACEHOLDER: every entry below is invented to show the layout.
 * Replace with real issues as you publish them, or delete the section until
 * you have three.
 */
export const newsletterIssues = [
  {
    no: "012",
    title: "Your bookings number is wrong and here's where it breaks",
    dek: "Most CRMs compute ACV at the opportunity header. That quietly misstates every multi-year and partial-term deal. Here's the line-item model that fixes it.",
    date: "2026-07-28",
    href: "/newsletter",
    tag: "Reporting",
  },
  {
    no: "011",
    title: "Stop asking for a new field. Ask what decision it changes.",
    dek: "A framework for triaging field requests that kills 80% of them before they reach the object, and makes the survivors much easier to defend.",
    date: "2026-07-14",
    href: "/newsletter",
    tag: "Governance",
  },
  {
    no: "010",
    title: "I wired Claude directly into Salesforce. Here's what broke.",
    dek: "Running an AI agent against a production CRM through MCP, what it handled well, and the three guardrails I'd put in before you try it.",
    date: "2026-06-30",
    href: "/newsletter",
    tag: "AI & Automation",
  },
];

export const newsletter = {
  name: "The Operating Layer", // PLACEHOLDER: name it.
  pitch:
    "A twice-monthly letter on revenue operations. Real systems, real failures, and the fixes that held up.",
  // PLACEHOLDER: real subscriber count once you have one.
  socialProof: "Written for operators who own the system, not just the report.",
  cadence: "Twice monthly",
  ctaLabel: "Subscribe",
  placeholder: "you@company.com",
  // Drop your Beehiiv / Kit / Substack embed URL here to make the form live.
  formAction: "",
  disclaimer: "No spam. Unsubscribe in one click.",
  promises: [
    "A real system I built or broke, with the reasoning behind the decisions.",
    "Queries, field specs, and report definitions you can lift directly.",
    "The failure modes I hit, so you can skip that part.",
  ],
};

/**
 * PLACEHOLDER: invented guides to show the layout and the gated-download
 * pattern. Replace with real assets or trim the list.
 */
export const guides = [
  {
    ref: "A",
    title: "The Salesforce Contract & Order Data Model",
    dek: "How to structure contracts, orders, and line items so renewals, expansions, and mid-term changes all reconcile without manual patching.",
    href: "/guides",
    format: "PDF + template",
    featured: true,
  },
  {
    ref: "B",
    title: "Bookings Reporting That Survives an Audit",
    dek: "A reporting model for ACV, TCV, and net retention that ties every number back to a signed line item. Includes report definitions you can deploy.",
    href: "/guides",
    format: "PDF + report pack",
    featured: true,
  },
  {
    ref: "C",
    title: "The RevOps Guide to AI Agents in Production",
    dek: "Where AI agents earn their keep inside a revenue stack, which tasks to keep human-gated, and how to wire them in without handing over write access to everything.",
    href: "/guides",
    format: "PDF",
    featured: true,
  },
  {
    ref: "D",
    title: "Contact Hygiene Field Guide",
    dek: "The lifecycle model, the departure flags, and the enrichment sequence that keeps a contact database usable past year three.",
    href: "/guides",
    format: "PDF + field spec",
    featured: false,
  },
  {
    ref: "E",
    title: "Permission Sets Over Profiles",
    dek: "A migration path from profile sprawl to a permission-set-led access model, with the audit queries to prove nothing broke.",
    href: "/guides",
    format: "PDF",
    featured: false,
  },
];

/**
 * Tools list. These are real; adjust the notes to match your own take.
 */
export const toolCategories = [
  {
    ref: "1.0",
    category: "Core CRM & GTM",
    tools: [
      { name: "Salesforce", note: "The system of record. Everything else reconciles back to it.", href: "https://salesforce.com" },
      { name: "HubSpot", note: "Marketing side of the house. Sync direction matters more than people think.", href: "https://hubspot.com" },
      { name: "Gong", note: "Call data, and increasingly the fastest way to answer a deal question.", href: "https://gong.io" },
    ],
  },
  {
    ref: "2.0",
    category: "Automation & AI",
    tools: [
      { name: "Claude Code", note: "Where most of my systems work happens now, wired to the CRM through MCP.", href: "https://claude.com/claude-code" },
      { name: "n8n", note: "Self-hosted workflow automation for anything that outgrows native tooling.", href: "https://n8n.io" },
      { name: "Zapier", note: "Still the fastest path for a simple two-system handoff.", href: "https://zapier.com" },
    ],
  },
  {
    ref: "3.0",
    category: "Data & Enrichment",
    tools: [
      { name: "Clay", note: "Enrichment orchestration when a single provider will not cover the list.", href: "https://clay.com" },
      { name: "Lusha", note: "Email enrichment. Worth gating on the company field before you trust a match.", href: "https://lusha.com" },
      { name: "Wiza", note: "LinkedIn-sourced contact data with usable export volume.", href: "https://wiza.co" },
    ],
  },
  {
    ref: "4.0",
    category: "Process & Documentation",
    tools: [
      { name: "Linear", note: "Every RevOps request becomes an issue. No exceptions, no Slack-only asks.", href: "https://linear.app" },
      { name: "Granola", note: "Meeting notes that stay searchable months later.", href: "https://granola.ai" },
      { name: "Slack Canvas", note: "Where self-serve documentation actually gets read.", href: "https://slack.com" },
    ],
  },
];

export const about = {
  heading: "About",
  // PLACEHOLDER: this is a sketch. Replace with your real history.
  lede: "I'm a revenue operations leader who spends most of his time in the layer between the go-to-market team and the systems they depend on.",
  paragraphs: [
    "My work sits where deal structure, data architecture, and reporting meet. That means owning the Salesforce data model end to end: how a signed order form becomes a contract, how a contract becomes recognized bookings, and how all of it rolls into a number an executive can defend in a board meeting.",
    "I came to operations through the practical route. I learned the systems because reports kept disagreeing with each other and someone had to go find out why. That habit stuck, and it still shapes how I work: start from the source record, follow the data to wherever it breaks, then fix the process rather than the symptom.",
    "Lately most of my leverage comes from AI. I run agents directly against production systems through MCP for auditing, migration, and reporting work that used to take days. It is genuinely different from the last automation wave, and I write about what actually holds up versus what demos well.",
    "I write this newsletter because revenue operations is full of hard-won knowledge that never gets documented. People solve the same problems in isolation, badly, over and over. Publishing what worked is the cheapest way to shorten that loop for someone else.",
  ],
  // PLACEHOLDER: replace with your real timeline.
  timeline: [
    { period: "Now", role: "Revenue Operations", org: "Ambition", detail: "Own the Salesforce architecture, bookings model, and GTM automation stack." },
    { period: "Before", role: "Add your prior role", org: "Company name", detail: "One line on what you owned and what changed because of you." },
    { period: "Before that", role: "Add your prior role", org: "Company name", detail: "One line on what you owned and what changed because of you." },
  ],
  // PLACEHOLDER: these are the highest-value thing you can send me. Real
  // numbers here do more for the site than any design decision.
  wins: [
    "Rebuilt the bookings model so ACV derives from line items, ending recurring disputes between sales and finance.",
    "Collapsed a 25-role hierarchy into 7, cutting access-review time and removing years of accumulated exceptions.",
    "Replaced a five-figure enrichment vendor with a cost-neutral stack that returned better data.",
    "Wired AI agents into the CRM through MCP for audits and migrations that previously took days of manual work.",
  ],
};

export const contact = {
  heading: "Contact",
  lede: "The best way to reach me is email. I read everything, and I answer anything specific.",
  reasons: [
    { ref: "1.0", title: "You're stuck on a systems problem", body: "Describe it in a few sentences. If I've hit the same wall I'll tell you what worked." },
    { ref: "2.0", title: "You want to talk about advisory work", body: "Tell me the scope and the timeline and we'll figure out whether I'm the right fit." },
    { ref: "3.0", title: "You want me to write or speak", body: "Send the audience, the topic, and the date." },
  ],
};

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(iso: string) {
  return new Date(`${iso}T12:00:00Z`)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");
}
