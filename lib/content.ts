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
  avatar: "/avatar-cutout-v2.webp",
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
  { label: "Home", href: "/" },
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
   * brand colour: 9 of the 14 measure below 90 mean luminance and would have
   * disappeared against the black band. Whitening also makes 14 different
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
    { name: "Wispr Flow", logo: "/logos/wisprflow.webp" },
  ],
};

export const expertise = {
  heading: "Areas of work",
  subheading:
    "Eight areas I own at Ambition. Each one is live, and each one has broken on me at least once.",
  // Skills, not prose. This section answers "what can he do", so a scannable
  // list beats a sentence that has to be read to be mined. Five per card so
  // the row heights stay even.
  // Count is 8 on purpose: the grid runs 1/2/4 columns, and 8 is the only
  // nearby count that divides all three. 7 leaves an orphan row, which
  // shows the container's line colour as a solid block.
  // Order is a priority signal, and the top row carries the most weight.
  // Deal desk sits at 05 on purpose: it is real work, and it is the least
  // interesting thing here to a reader deciding whether to keep going.
  areas: [
    {
      ref: "01",
      icon: "architecture",
      title: "Salesforce Architecture",
      skills: [
        "Data model design",
        "Contracts and orders",
        "Line-item economics",
        "Validation rules",
        "Permission sets and sharing",
      ],
    },
    {
      ref: "02",
      icon: "dataQuality",
      title: "Data Quality & Enrichment",
      skills: [
        "Contact lifecycle design",
        "Deduplication and merging",
        "Departure detection",
        "Enrichment pipelines",
        "Email deliverability",
      ],
    },
    {
      ref: "03",
      icon: "automation",
      title: "GTM Automation & AI",
      skills: [
        "Workflow automation",
        "CRM flows and triggers",
        "AI agents in production",
        "Systems integration",
        "Process design",
      ],
    },
    {
      ref: "04",
      icon: "support",
      title: "CX Operations",
      skills: [
        "Support platform administration",
        "Help center migration",
        "Operational workflow design",
        "AI triage and deflection",
        "CSAT and volume reporting",
      ],
    },
    {
      ref: "05",
      icon: "pipeline",
      title: "Campaigns & Attribution",
      skills: [
        "Campaign hierarchy",
        "Inbound lead routing",
        "Marketing and sales list sync",
        "Attribution modeling",
        "Pipeline reporting",
      ],
    },
    {
      ref: "06",
      icon: "reporting",
      title: "Deal Desk & Reporting",
      skills: [
        "Deal structure review",
        "Quote and order modeling",
        "ACV, TCV and bookings",
        "Renewal and expansion tracking",
        "Executive reporting",
      ],
    },
    {
      ref: "07",
      icon: "stack",
      title: "Vendor & Stack Management",
      skills: [
        "Vendor evaluation",
        "Implementation and rollout",
        "Renewal and spend review",
        "Offboarding and data migration",
        "Stack consolidation",
      ],
    },
    {
      ref: "08",
      icon: "governance",
      title: "Governance & Enablement",
      skills: [
        "Role hierarchy design",
        "Access reviews",
        "Change management",
        "Documentation",
        "Team training",
      ],
    },
    // `as const` so each `icon` narrows to a literal and indexes the icon map
    // without a cast. A typo here becomes a build error, not a blank card.
  ] as const,
};

/**
 * Tools list, matching the confirmed stack. Deliberately names only: the
 * per-tool commentary that used to sit here was written by Claude, not Ryan,
 * and inventing takes for the newer entries would have put that straight back.
 *
 * One category per job the stack does, which leaves six of the nine holding a
 * single tool. That is the signal: the function is covered by exactly one
 * thing.
 *
 * The category is the heading on the page, so there are no refs here.
 *
 * `note` is the write-up. It is optional on purpose: the page renders a tool
 * with just its mark and name until a note exists, and grows a paragraph the
 * moment one is added. Nothing here is written for Ryan. The per-tool
 * commentary that used to sit in this file was written by Claude, it read like
 * it, and it was cut. Leave a note out until he has written it.
 */
export type Tool = { name: string; href: string; note?: string };
export type ToolCategory = { category: string; blurb?: string; tools: Tool[] };

export const toolCategories: ToolCategory[] = [
  {
    category: "CRM",
    tools: [{ name: "Salesforce", href: "https://salesforce.com" }],
  },
  {
    category: "Marketing Automation",
    tools: [{ name: "HubSpot", href: "https://hubspot.com" }],
  },
  {
    category: "Support & Customer Lifecycle",
    tools: [{ name: "Pylon", href: "https://usepylon.com" }],
  },
  {
    category: "Call Intelligence",
    tools: [{ name: "Gong", href: "https://gong.io" }],
  },
  {
    category: "Sales Engagement",
    tools: [{ name: "Outreach", href: "https://outreach.io" }],
  },
  {
    category: "Inbound Routing",
    tools: [{ name: "RevenueHero", href: "https://revenuehero.io" }],
  },
  {
    category: "AI & Orchestration",
    tools: [
      { name: "Claude", href: "https://claude.com" },
      { name: "n8n", href: "https://n8n.io" },
    ],
  },
  {
    category: "Data Enrichment & Signals",
    tools: [
      { name: "Wiza", href: "https://wiza.co" },
      { name: "Vector", href: "https://vector.co" },
    ],
  },
  {
    category: "Where Work Happens",
    tools: [
      { name: "Linear", href: "https://linear.app" },
      { name: "Granola", href: "https://granola.ai" },
      { name: "Slack", href: "https://slack.com" },
      { name: "Wispr Flow", href: "https://wisprflow.ai" },
    ],
  },
];

export const about = {
  heading: "About",
  // Sits under the page title as the subheader.
  lede: "Senior Revenue Operations Manager",
  // The subheader is a job title, so metadata needs its own line.
  metaDescription:
    "Revenue operations at Ambition, working across Sales, Marketing, CX and Finance.",
  // Keep the year count here matching site.tagline and hero.intro. All three
  // say "over 10 years"; they used to disagree.
  paragraphs: [
    "I work across Sales, Marketing, CX and Finance, building the systems revenue actually runs through. Revenue operations is an art and a science. It takes creativity, collaboration, and restlessness. The science is the part that has to reconcile: the data model, clean records moving between Salesforce and HubSpot, attribution that ties back to something real, deal structure, and the automation holding it all together. The art is knowing which problems are worth solving, enabling the teams who use what I build, balancing stakeholders, and designing the customer journey.",
    "Most of the work is lining up strategy, tooling, and data so the people around me can do their best work without fighting the tools. Over 10 years of customer-facing work before this shaped how I approach that. I build for the person who has to live inside the system.",
    "Running revenue operations solo means I touch most parts of the business in a given week. I might commit a field change, wire up automation behind a new email campaign, join a renewal conversation, and ship a Salesforce dashboard, all in the same day.",
    "AI keeps moving where the ceiling sits, in revenue operations and in most of the roles I work alongside. I run agents against production systems through MCP, and audits and migrations that used to eat days now finish in an afternoon. \"You can just do things\" is the line I keep coming back to. It pushes me past the point where I would otherwise stop and wait for permission.",
  ],
  // Sidebar timeline. Restored: it used the column better than the flat
  // company row did.
  timeline: [
    {
      period: "Oct 2025 — Now",
      role: "Senior Revenue Operations Manager",
      org: "Ambition",
      detail:
        // Two sentences on purpose. The gerunds are work still underway, the
        // past tense is work that shipped. A single list would have to pick
        // one tense and misstate half of it.
        "Dedicated revenue operator across Sales, Marketing and CX. Cleaning and rebuilding our CRM foundations, standing up campaigns and attribution infrastructure. Moved CX onto a new support platform and put AI agents to work in production.",
    },
    {
      period: "2024 — 2025",
      role: "Manager, Support & Operations",
      org: "Ambition",
      detail:
        "Kept leading the support team while taking on the responsibility of Salesforce admin. Learned and owned the rest of the GTM stack while right-sizing it for our organization.",
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
      detail:
        "On the front line with customers, becoming a subject matter expert in our product, and contributing to new hire training and help documentation.",
    },
    {
      period: "2016 — 2019",
      role: "Service Desk & TechBar",
      org: "Clayton Homes",
      detail:
        "11,000 service requests in two years. Built the organization's first walk-up IT channel and the technician training plan.",
    },
    {
      period: "2010 — 2016",
      role: "Service & hospitality leadership",
      org: "Chick-fil-A, Blackberry Farm",
      detail:
        "Team Leader, then corporate Certified Trainer opening restaurants nationally, then front desk supervisor at a five-star property.",
    },
  ],
  // PLACEHOLDER: Ryan, this is the one section I cannot write for you.
  // Knoxville and the Vols are the only two things I actually know. Replace
  // the body with whatever you want people to know about you off the clock.
  personal: {
    heading: "Outside of ops",
    // Every fact here is Ryan's, including the Vols, which he confirmed.
    // The one extrapolation is the homeowner clause, which is true of every
    // homeowner alive and so cannot be repeated back to him as a claim he
    // made. Earlier drafts were funnier and invented more (a garage, morning
    // runs, knowing his air filter size by heart), which is the wrong trade in
    // the one paragraph an interviewer might quote at him.
    body: "Knoxville native, still here, with my beautiful wife and three kids. I run, mountain bike, and play video games. I'm a Costco dad and pretty much your stereotypical homeowner, so there is always one thing in the house I have been meaning to get to. During football, basketball, and baseball season, you will catch me cheering on the Vols.",
  },
};

export const contact = {
  heading: "Contact",
  metaDescription:
    "Get in touch with Ryan Wells on LinkedIn or by email.",
  intro: "Reach out to me on one of these.",
  note: "I like talking RevOps with people. Bring me a system you are untangling or a tool you are trying to pick.",
  // Two ways in, no form. The address is built from site.email so there is
  // still one place to change it.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hello-ryanwells/" },
    { label: "Email", href: `mailto:${site.email}` },
  ],
};
