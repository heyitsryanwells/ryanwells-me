/**
 * Guides. Long-form writing, one file so content.ts stays readable.
 *
 * Each guide renders at /guides/<slug>/. Blocks are deliberately a small,
 * closed set: prose, a list, a pull quote, and code. Anything that needs more
 * than that probably wants to be a different kind of page.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; caption?: string; code: string };

export type Guide = {
  slug: string;
  ref: string;
  title: string;
  dek: string;
  format: string;
  published: string;
  featured: boolean;
  metaDescription: string;
  sections: { heading: string; blocks: Block[] }[];
};

export const guides: Guide[] = [
  {
    slug: "launchpad-slack-app",
    ref: "01",
    title: "LaunchPad: a Slack app that builds implementation plans",
    dek: "A CSM types one slash command and gets a fully scheduled, fully assigned customer implementation plan in under a minute. How it was built, where the data ended up living, and why the command list is nothing like the one I designed.",
    format: "Case study",
    published: "August 2026",
    featured: true,
    metaDescription:
      "How I built LaunchPad, a Slack app that turns one slash command into a scheduled, assigned customer implementation plan on Railway.",
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Every customer implementation started the same way. A CSM opened the last customer's plan, copied it, renamed everything, guessed at dates, and assigned tasks from memory. It worked. It also ate the better part of an hour, produced a slightly different plan every time, and left the question of how an implementation was actually going answerable only by asking someone.",
          },
          {
            type: "list",
            items: [
              "Setup time scaled with the number of customers we signed",
              "No two plans had the same shape, so no two could be compared",
            ],
          },
          { type: "quote", text: "Progress lived in somebody's head." },
        ],
      },
      {
        heading: "What it does",
        blocks: [
          {
            type: "p",
            text: "LaunchPad is a Slack app. In the customer's implementation channel, a CSM runs one command with an account name and a launch date.",
          },
          { type: "code", code: "/launch Acme Corp 06-15-2026" },
          {
            type: "p",
            text: "A modal opens already filled in: the account, the launch date, the implementation length in days calculated from that date and still editable, and the CSM, SA and AE resolved from the Salesforce account record. They confirm. Under a minute later the channel has a Slack List carrying every phase and subtask, each one dated and assigned to a person, plus a summary message linking to it.",
          },
          {
            type: "p",
            text: "Three roles run an implementation and the app knows the difference between them. The CSM owns the relationship, the scheduling, the onboarding sessions and enablement. The SA owns the technical work: integrations, SSO, API configuration, data imports. The AE owns the pre-sale handoff, which is a small number of tasks. That distinction is the thing that makes automatic assignment worth doing at all.",
          },
        ],
      },
      {
        heading: "How the plan gets built",
        blocks: [
          {
            type: "p",
            text: "Two AI calls, both on a small fast model, both given a narrow job and a JSON contract. Neither one is asked to be clever.",
          },
          {
            type: "p",
            text: "The first classifies ownership. The template is a list of subtask names, and hardcoding an owner for each one means editing code every time the template changes. So the names go to the model with the three role descriptions and come back as a name-to-role map. Config can pin any individual task, and those pins win, which makes a wrong answer a one-line config fix.",
          },
          {
            type: "p",
            text: "The second builds the schedule, and it is the harder problem. The same template has to work for a seven-day velocity deal and a six-month enterprise rollout. Fixed day offsets were the first attempt and they broke immediately at both ends: everything piled up on day one for short implementations and drifted into meaninglessness for long ones. The phases and subtasks now go to the model with the total day count and a set of rules.",
          },
          {
            type: "code",
            caption: "Scheduling rules, from the timeline prompt",
            code: `- All dates must be weekdays (Mon-Fri). If a date falls on a
  weekend, use the following Monday.
- Subtasks within a phase should be spread across the phase
  window in a logical order.
- For short timelines (under 21 days): compress administrative
  tasks, front-load critical path items. Technical
  implementation should still get adequate time.
- For standard timelines (60-90 days): distribute phases
  proportionally.
- For long timelines (120+ days / enterprise): give extra
  breathing room to technical phases.`,
          },
          {
            type: "p",
            text: "Phases are sequential and cannot overlap. Every subtask has to come back in the output, and every date has to fall inside the window. Those constraints are in the prompt, and they are checked again on the way out.",
          },
          {
            type: "quote",
            text: "A model that is right most of the time still needs a floor.",
          },
        ],
      },
      {
        heading: "Standing it up",
        blocks: [
          {
            type: "p",
            text: "Bolt for the Slack surface, jsforce for Salesforce, node-cron for the weekly job, and the Anthropic SDK for the two model calls. That is the entire dependency list, and keeping it that short was deliberate.",
          },
          {
            type: "p",
            text: "The first deploy went to Railway, picked because it turns a Node repo into a running service with almost no ceremony. When the thing you are testing is whether anyone will type a slash command twice, the hosting decision should cost you an afternoon at most.",
          },
        ],
      },
      {
        heading: "Where the data lives",
        blocks: [
          {
            type: "p",
            text: "Account data started as a JSON file sitting next to the code, which is the simplest thing that could work and survives right up until the first redeploy. Container filesystems are ephemeral. On Railway that has a clean answer: attach a persistent volume, and the file stays where you left it. That is where it lived for a while, and at that stage it was the right call.",
          },
          {
            type: "p",
            text: "It ended up on S3 anyway. A volume ties the app to whatever host provides that volume, and object storage does not, so moving to S3 bought portability the volume could not. The code looks for a bucket name in the environment and uses S3 when it finds one, falling back to a local file for development, which means the same build runs in both places.",
          },
          {
            type: "code",
            caption: "src/accountStore.js",
            code: `// Storage backend:
//   - If AWS_S3_BUCKET_NAME is set (production), persist
//     accounts.json to S3. Container disks are ephemeral, so
//     local files do not survive a redeploy.
//   - Otherwise (local dev), fall back to a JSON file on disk.`,
          },
          {
            type: "p",
            text: "One wrinkle worth stealing: if the bucket is shared with other applications, a bare accounts.json key will collide with whatever else is in there. The object lives under a per-application prefix that comes in as an environment variable.",
          },
          {
            type: "p",
            text: "The migration itself was a one-time task that read the old file and wrote it to S3. It ran once, and the very next commit deleted it.",
          },
          {
            type: "quote",
            text: "Migration code left in the repo runs again by accident.",
          },
        ],
      },
      {
        heading: "Commands",
        blocks: [
          {
            type: "p",
            text: "The app shipped with /launch and nothing else, and I was writing /launch status the same day. The first question after \"can you build it\" was \"how do I see it\", which in hindsight is the obvious question and should not have been a surprise.",
          },
          {
            type: "quote",
            text: "Anything that creates work has to answer for it.",
          },
          {
            type: "p",
            text: "That part is knowable before you write a line. A command that creates an object implies a command to read it, one to change it, and one to close it out. LaunchPad has all four, plus two for finding things, and every command after the first got written under pressure because somebody had already walked into the gap.",
          },
          {
            type: "list",
            items: [
              "/launch creates the plan.",
              "/launch status reads it: phase-by-phase progress and anything overdue.",
              "/launch reschedule updates it. Launches slip, and this re-dates every task in place.",
              "/launch complete closes it, so the Friday summary stops reporting on customers who went live months ago.",
              "/launch summary runs the Friday summary on demand, for people who wanted it on their own schedule.",
              "/launch list shows every plan. It started as a diagnostic I built for myself and turned out to be the thing CS wanted most.",
              "/launch help, once the surface passed four commands and I stopped being able to answer from memory.",
            ],
          },
          {
            type: "p",
            text: "Create, read, update, close, find. That is the shape of any object in any system, and sketching it out first would have cost an afternoon and saved most of a month of small releases.",
          },
        ],
      },
      {
        heading: "Teaching the summary some restraint",
        blocks: [
          {
            type: "p",
            text: "A cron job posts a progress summary into every active implementation channel on Friday morning. The first version read the task list, found anything past its due date, and called it a risk.",
          },
          {
            type: "p",
            text: "That was wrong often enough to be annoying. A task can be overdue and completely fine, because the work happened, the customer confirmed it in the channel, and nobody went back to tick the box.",
          },
          {
            type: "quote",
            text: "A report nobody trusts is a report nobody reads.",
          },
          {
            type: "p",
            text: "So the summary reads the channel now, thread replies included, before it decides anything. A task counts as a risk only when it is overdue and nothing in the conversation shows progress. That one change is what moved the Friday message from noise into something people actually open.",
          },
        ],
      },
      {
        heading: "What I would tell someone building this",
        blocks: [
          {
            type: "list",
            items: [
              "Sketch the whole lifecycle before you build the first command. Create, read, update, close, find.",
              "Give the model a narrow job and a JSON contract, then validate the output anyway.",
              "Let config beat the model, so a wrong classification is a one-line config fix.",
              "Assume the disk is ephemeral before the platform teaches you.",
              "Delete migration code in the commit after it runs.",
              "Ship the read path with the write path. They are one feature wearing two names.",
            ],
          },
        ],
      },
    ],
  },
];

export const guidesIndex = {
  lede: "Written out of systems I actually built and had to keep running. Take what is useful.",
};
