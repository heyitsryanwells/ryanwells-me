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
  tagline:
    "I'm a Revenue Operator drawing on over 10 years in CX to build systems that serve the people actually using them.",
  monogram: "RW",
  // Pixel-art portrait, 1100px WebP. Brings its own starfield and lunar
  // horizon, so it is framed rather than cut out.
  // NOTE: GitHub Pages serves assets with max-age=14400 and Cloudflare caches
  // on top, so replacing the image requires a NEW FILENAME. Editing in place
  // leaves visitors on the stale copy for hours.
  portrait: "/portrait-pixel.webp",
  // Circular photographic crop, so About reads differently from the hero.
  avatar: "/avatar-round.webp",
  email: "hellofromryanwells@gmail.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hello-ryanwells/" },
    { label: "GitHub", href: "https://github.com/heyitsryanwells" },
    { label: "Email", href: "mailto:hellofromryanwells@gmail.com" },
  ],
};

export const footer = {
  // The emphasised word leads and carries the accent colour.
  noteEmphasis: "Building Things",
  noteRest: "in Knoxville",
};

export const nav = [
  { label: "Index", href: "/" },
  { label: "About", href: "/about" },
  { label: "Guides", href: "/guides" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  greeting: "Hi, I'm",
  firstName: "Ryan",
  // Split so the role can carry the accent. site.tagline keeps the plain
  // string, since meta descriptions cannot hold markup.
  intro: {
    before: "I'm a ",
    emphasis: "Revenue Operator",
    after:
      " drawing on over 10 years in CX to build systems that serve the people actually using them.",
  },
  primaryCta: { label: "Browse the guides", href: "/guides" },
  secondaryCta: { label: "Get in touch", href: "/contact" },
  portraitAlt:
    "Pixel-art portrait of Ryan Wells standing on the moon, with a starfield behind him",
};

export const stack = {
  heading: "My current GTM stack",
  /**
   * Marks are normalized to trimmed transparent WebP at 120px tall by
   * scripts/logos.js. They are rendered as white silhouettes rather than in
   * brand colour: 7 of the 12 measured below 90 mean luminance and would have
   * disappeared against the black band. Whitening also makes 12 different
   * brand systems read as one set.
   *
   * An entry without `logo` falls back to its wordmark.
   */
  items: [
    { name: "Salesforce", logo: "/logos/salesforce.webp" },
    { name: "HubSpot", logo: "/logos/hubspot.webp" },
    { name: "Pylon", logo: "/logos/pylon.webp" },
    { name: "Gong", logo: "/logos/gong.webp" },
    { name: "Outreach", logo: "/logos/outreach.webp" },
    { name: "Claude", logo: "/logos/claude.webp" },
    { name: "n8n", logo: "/logos/n8n.webp" },
    { name: "Wiza", logo: "/logos/wiza.webp" },
    { name: "Linear", logo: "/logos/linear.webp" },
    { name: "Granola", logo: "/logos/granola.webp" },
    { name: "Slack", logo: "/logos/slack.webp" },
    { name: "Vector", logo: "/logos/vector.webp" },
    { name: "RevenueHero", logo: "/logos/revenuehero.webp" },
  ],
};

export const expertise = {
  heading: "Areas of work",
  subheading:
    "Six areas taken end to end, in production, with revenue riding on the outcome.",
  areas: [
    {
      ref: "01",
      title: "Salesforce Architecture",
      body: "Data models that hold up under real deal structures. Contracts and orders, line-item economics, validation rules, and a permission model built on permission sets rather than a sprawl of profiles.",
    },
    {
      ref: "02",
      title: "Bookings & Revenue Reporting",
      body: "ACV, TCV, and retention modeled from line items rather than guessed at the header. Reporting that reconciles to the signed paper, so finance and sales stop arguing about whose number is right.",
    },
    {
      ref: "03",
      title: "GTM Automation & AI",
      body: "Workflow automation across n8n, Zapier, and the CRM itself, plus AI agents wired directly into the stack through MCP. The goal is removing manual steps that quietly break every quarter.",
    },
    {
      ref: "04",
      title: "Data Quality & Enrichment",
      body: "Contact lifecycle design, deduplication, departure detection, and enrichment pipelines that fill gaps without spending credits twice. Clean data is a process, not a cleanup project.",
    },
    {
      ref: "05",
      title: "Pipeline & Campaign Operations",
      body: "Campaign hierarchy, inbound routing, list sync between marketing and sales systems, and attribution that survives contact with the actual funnel.",
    },
    {
      ref: "06",
      title: "Systems Governance",
      body: "Role hierarchy, access reviews, change management, and documentation that outlives the person who wrote it. The unglamorous work that keeps an org from calcifying.",
    },
  ],
};

/**
 * PLACEHOLDER: invented guides to show the layout and the gated-download
 * pattern. Replace with real assets or trim the list.
 */
export const guides = [
  {
    ref: "01",
    title: "The Salesforce Contract & Order Data Model",
    dek: "How to structure contracts, orders, and line items so renewals, expansions, and mid-term changes all reconcile without manual patching.",
    href: "/guides",
    format: "PDF + template",
    featured: true,
  },
  {
    ref: "02",
    title: "Bookings Reporting That Survives an Audit",
    dek: "A reporting model for ACV, TCV, and net retention that ties every number back to a signed line item. Includes report definitions you can deploy.",
    href: "/guides",
    format: "PDF + report pack",
    featured: true,
  },
  {
    ref: "03",
    title: "The RevOps Guide to AI Agents in Production",
    dek: "Where AI agents earn their keep inside a revenue stack, which tasks to keep human-gated, and how to wire them in without handing over write access to everything.",
    href: "/guides",
    format: "PDF",
    featured: true,
  },
  {
    ref: "04",
    title: "Contact Hygiene Field Guide",
    dek: "The lifecycle model, the departure flags, and the enrichment sequence that keeps a contact database usable past year three.",
    href: "/guides",
    format: "PDF + field spec",
    featured: false,
  },
  {
    ref: "05",
    title: "Permission Sets Over Profiles",
    dek: "A migration path from profile sprawl to a permission-set-led access model, with the audit queries to prove nothing broke.",
    href: "/guides",
    format: "PDF",
    featured: false,
  },
];

/**
 * Tools list, matching the confirmed stack. Deliberately names only: the
 * per-tool commentary that used to sit here was written by Claude, not Ryan,
 * and inventing takes for the newer entries would have put that straight back.
 */
export const toolCategories = [
  {
    ref: "01",
    category: "Core CRM & GTM",
    tools: [
      { name: "Salesforce", href: "https://salesforce.com" },
      { name: "HubSpot", href: "https://hubspot.com" },
      { name: "Pylon", href: "https://usepylon.com" },
      { name: "Gong", href: "https://gong.io" },
      { name: "Outreach", href: "https://outreach.io" },
      { name: "RevenueHero", href: "https://revenuehero.io" },
    ],
  },
  {
    ref: "02",
    category: "Automation & AI",
    tools: [
      { name: "Claude", href: "https://claude.com" },
      { name: "n8n", href: "https://n8n.io" },
    ],
  },
  {
    ref: "03",
    category: "Data & Signal",
    tools: [
      { name: "Wiza", href: "https://wiza.co" },
      { name: "Vector", href: "https://vector.co" },
    ],
  },
  {
    ref: "04",
    category: "Process & Documentation",
    tools: [
      { name: "Linear", href: "https://linear.app" },
      { name: "Granola", href: "https://granola.ai" },
      { name: "Slack", href: "https://slack.com" },
    ],
  },
];

export const about = {
  heading: "About",
  lede: "I got to revenue operations the long way around, through fifteen years of customer-facing work. It shows in what I build.",
  paragraphs: [
    "It started behind a counter at a Chick-fil-A in Alcoa, leading a team of sixty. Blackberry Farm came next, where a five-star welcome is the entire job description. Then an IT service desk at Clayton Homes: eleven thousand tickets in two years, plus the walk-up channel I built from scratch. Each one taught the same thing. You learn a system fastest standing at the point where it fails on somebody.",
    "Ambition hired me into support in 2019. I answered for the product when it broke, then ran the team that did, then took over the CRM underneath all of it. The work kept moving upstream: from the ticket, to the process, to the data model generating both.",
    "These days I own the Salesforce architecture, the bookings model, and the automation holding them together. A signed order form becomes a contract. A contract becomes recognized revenue. Every step has to reconcile when finance comes asking, and most of my job is making sure it does.",
    "A lot of my leverage now comes from AI agents wired straight into production systems through MCP. Audits and migrations that used to eat days finish in an afternoon. I write about which parts of that hold up once real data is involved.",
    "Revenue operations runs on knowledge nobody writes down. Teams solve identical problems in isolation, badly, over and over, and the answers stay locked in somebody's head. Publishing what worked shortens that loop for whoever hits it next.",
  ],
  // Real history, pulled from LinkedIn 2026-08-03.
  timeline: [
    {
      period: "Oct 2025 — Now",
      role: "Senior Revenue Operations Manager",
      org: "Ambition",
      detail:
        "Own the Salesforce data model end to end: contracts, orders, and the bookings that come off them. Build the GTM automation, and the reporting leadership actually makes calls on.",
    },
    {
      period: "2024 — 2025",
      role: "Manager, Support & Operations",
      org: "Ambition",
      detail:
        "Kept leading the support team while taking on the CRM. Became the Salesforce administrator, evaluated the GTM tech stack, and managed renewals.",
    },
    {
      period: "2022 — 2024",
      role: "Manager, Support",
      org: "Ambition",
      detail:
        "Ran escalations, retrospectives and root cause analysis. Hiring, training and coaching for the support team.",
    },
    {
      period: "2019 — 2022",
      role: "Senior Support Advisor",
      org: "Ambition",
      detail: "Front line with customers, on the product and the process.",
    },
    {
      period: "2017 — 2019",
      role: "Service Desk & TechBar",
      org: "Clayton Homes",
      detail:
        "11,000 service requests in two years. Built the organisation's first walk-up IT channel and the technician training plan.",
    },
    {
      period: "2010 — 2016",
      role: "Service & hospitality leadership",
      org: "Chick-fil-A, Blackberry Farm",
      detail:
        "Team Leader, then corporate Certified Trainer opening restaurants nationally, then front desk supervisor at a five-star property.",
    },
  ],
};

export const contact = {
  heading: "Contact",
  lede: "The best way to reach me is email. I read everything, and I answer anything specific.",
  reasons: [
    { ref: "01", title: "You're stuck on a systems problem", body: "Describe it in a few sentences. If I've hit the same wall I'll tell you what worked." },
    { ref: "02", title: "You want to talk about advisory work", body: "Tell me the scope and the timeline and we'll figure out whether I'm the right fit." },
    { ref: "03", title: "You want me to write or speak", body: "Send the audience, the topic, and the date." },
  ],
};
