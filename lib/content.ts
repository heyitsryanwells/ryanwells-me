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
  // Pixel-art portrait, 1100px WebP. Brings its own starfield and lunar
  // horizon, so it is framed rather than cut out.
  // NOTE: GitHub Pages serves assets with max-age=14400 and Cloudflare caches
  // on top, so replacing the image requires a NEW FILENAME. Editing in place
  // leaves visitors on the stale copy for hours.
  portrait: "/portrait-pixel.webp",
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
  // PLACEHOLDER: swap in your own framing.
  intro:
    "I run revenue operations at a go-to-market software company, where I own the Salesforce architecture, the bookings model, and the automation that keeps both honest. I write about the parts nobody documents.",
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
 * Tools list, matching the confirmed stack. Deliberately names only: the
 * per-tool commentary that used to sit here was written by Claude, not Ryan,
 * and inventing takes for the newer entries would have put that straight back.
 */
export const toolCategories = [
  {
    ref: "1.0",
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
    ref: "2.0",
    category: "Automation & AI",
    tools: [
      { name: "Claude", href: "https://claude.com" },
      { name: "n8n", href: "https://n8n.io" },
    ],
  },
  {
    ref: "3.0",
    category: "Data & Signal",
    tools: [
      { name: "Wiza", href: "https://wiza.co" },
      { name: "Vector", href: "https://vector.co" },
    ],
  },
  {
    ref: "4.0",
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
  // PLACEHOLDER: this is a sketch. Replace with your real history.
  lede: "I'm a revenue operations leader who spends most of his time in the layer between the go-to-market team and the systems they depend on.",
  paragraphs: [
    "My work sits where deal structure, data architecture, and reporting meet. That means owning the Salesforce data model end to end: how a signed order form becomes a contract, how a contract becomes recognized bookings, and how all of it rolls into a number an executive can defend in a board meeting.",
    "I came to operations through the practical route. I learned the systems because reports kept disagreeing with each other and someone had to go find out why. That habit stuck, and it still shapes how I work: start from the source record, follow the data to wherever it breaks, then fix the process rather than the symptom.",
    "Lately most of my leverage comes from AI. I run agents directly against production systems through MCP for auditing, migration, and reporting work that used to take days. It is genuinely different from the last automation wave, and I write about what actually holds up versus what demos well.",
    "I publish what I learn because revenue operations is full of hard-won knowledge that never gets documented. People solve the same problems in isolation, badly, over and over. Writing it down is the cheapest way to shorten that loop for someone else.",
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
