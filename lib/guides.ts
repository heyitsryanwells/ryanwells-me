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

/**
 * Guide formats. A playbook tells you how to build the thing; a template is
 * the thing, ready to fill in. The emoji is the only full-colour element on
 * the site, so each one has to survive at 11px next to mono type.
 */
export const guideFormats = {
  playbook: { label: "Playbook", emoji: "\u{1F4D8}" },
  template: { label: "Template", emoji: "\u{1F4D0}" },
} as const;

export type GuideFormat = keyof typeof guideFormats;

export type Guide = {
  slug: string;
  title: string;
  dek: string;
  format: GuideFormat;
  published: string;
  cover?: { src: string; alt: string };
  featured: boolean;
  metaDescription: string;
  sections: { heading: string; blocks: Block[] }[];
};

export const guides: Guide[] = [
  {
    slug: "launchpad-slack-app",
    title: "LaunchPad: build a Slack app that writes implementation plans",
    dek: "I built a Slack app because implementation plans that take an hour mostly don't get written. There's a Claude prompt at the top of the playbook to get you started.",
    format: "playbook",
    published: "August 2026",
    cover: {
      src: "/launchpad-cover.webp",
      alt: "LaunchPad's Slack app icon: a pixel-art rocket lifting off under a moon",
    },
    featured: true,
    metaDescription:
      "How to build a Slack app that turns one slash command into a scheduled, assigned customer implementation plan, with the prompt to start from and the Slack scopes and credentials you need first.",
    sections: [
      {
        heading: "TL;DR",
        blocks: [
          {
            type: "p",
            text: "A CSM types one slash command with an account name and a launch date. A minute later the channel holds a Slack List carrying every phase and subtask, each one dated and assigned to the right person, with a summary message and a bookmark above it. Underneath: a Bolt app in Socket Mode, a template list copied per customer, one CRM query that resolves the three owners, two small model calls that handle ownership and dates, and a cron job that posts progress every Friday. About a dozen files and no database.",
          },
          {
            type: "p",
            text: "You need a Slack workspace where you can create an app, a CRM you can query for an account and its owners, an Anthropic API key, and somewhere to run a Node process that stays up. Section 05 covers each one.",
          },
          {
            type: "p",
            text: "Paste the prompt below into Claude with an empty directory open. It produces a skeleton close enough to the real thing that what is left is credentials, the template list, and taste. Swap the role and phase names for whatever your implementations actually use.",
          },
          {
            type: "code",
            caption: "Copy from here",
            code: `Build a Slack app that turns one slash command into a
scheduled, assigned customer implementation plan.

STACK
Node, CommonJS. @slack/bolt v4 in Socket Mode.
@anthropic-ai/sdk for the model calls. jsforce for the CRM
lookup. node-cron for the weekly job. Phase names and role
overrides live in a JSON config file read at startup.
No database, no web framework.

THE OBJECT
A plan belongs to one customer account. It has a launch date,
a length in days, three owners (CSM, SA, AE), ordered phases,
and subtasks under each phase. Every subtask carries one due
date and one assignee.

TEMPLATE LIST
Plan structure lives in a Slack List I build by hand and copy
per customer. Keep it out of the code. Phases are top-level
rows, subtasks are child rows. Read the copied list's schema
at runtime and find the assignee column, the due-date column
and a single-select column with "owner" in its name by type,
never by hardcoded column id. Subtask columns can differ from
parent columns; fall back to the parent schema when they do.

COMMANDS
Register one slash command and dispatch on the first token.
  /launch <account> <date>   create the plan
  /launch status <account>   phase progress and overdue items
  /launch reschedule <acct>  new date, re-date every task
  /launch complete <acct>    close it, stop the weekly job
  /launch summary <acct>     run the weekly summary on demand
  /launch list               every plan, active and completed
  /launch help               the command list
Accept MM-DD-YYYY, MM/DD/YYYY and YYYY-MM-DD. Anything only
the caller needs goes out as an ephemeral message.

CREATE FLOW
1. Ack the command immediately. Parse the account name and
   the date out of the command text.
2. Open a modal prefilled with the account, a date picker, an
   editable day count computed from today to the launch date,
   and three user pickers showing "Loading...".
3. In the background, query the CRM for the account's three
   owner emails, resolve them with users.lookupByEmail, and
   update the open modal in place.
4. If that lookup fails, leave the modal open, show a warning
   in a context block, and let the user pick the three people
   by hand. Never block plan creation on the CRM.
5. Recompute the day count whenever the date picker changes.
6. On submit: post a placeholder message, copy the template
   list, date and assign every row, share the list into the
   channel, add it as a channel bookmark, save the plan
   record, and edit the placeholder into the final summary.

THE TWO MODEL CALLS
Use a small fast model. Both calls return JSON and nothing
else. Strip markdown fences before parsing.

Call one classifies ownership. Send the subtask names plus a
one-paragraph description of each of the three roles. Expect:
  { "Subtask name": "CSM" | "SA" | "AE" }
Role pins in the config file override the model. Filter the
pinned subtasks out before building the prompt. If the parse
fails, fall back to the owner on the parent phase and finish
the run.

Call two builds the schedule. Send the phases, their
subtasks, the day count, and the computed start and launch
dates. Expect:
  {
    "phases": {
      "Phase name": { "startDate": "...", "endDate": "..." }
    },
    "subtasks": { "Subtask name": "YYYY-MM-DD" }
  }
State these rules in the prompt: phases are sequential and
cannot overlap; all dates are weekdays; every subtask appears
in the output; every date falls inside the window; short
timelines compress admin work and front-load the critical
path while technical work keeps real time; long timelines
give the technical phases extra room.
Do not use fixed day offsets. The same template has to
schedule a seven-day rollout and a six-month one.
Validate in code after the call: push weekend dates to
Monday, and collect any subtask the model dropped into a
warnings list shown in the confirmation message.

STORAGE
Assume the container filesystem is ephemeral and that the host
provides a mounted volume. Write one store module with init,
save, get, list and listActive. Read the directory from
DATA_DIR and fall back to a local file when it is unset, so the
same build runs locally and deployed. Prime an in-memory cache
at startup so reads stay synchronous. Keep every path decision
inside this module.
Store per plan: list id, channel id, launch date, length in
days, the three owner user ids, status, created and completed
dates, and last week's task snapshot.

WEEKLY JOB
node-cron at 8am Friday in a named timezone, one summary per
active plan. Before deciding anything, pull the last seven
days of channel messages including thread replies, and diff
current task state against the snapshot stored on the plan.
Send the model the phase progress, what completed this week,
what is overdue, what went overdue this week, the incomplete
tasks and the conversation. Rule: a task is a risk only when
it is overdue and the conversation shows no evidence of
progress. Where the conversation suggests the work happened,
list it under a heading that asks someone to tick the box.
Pin the output format, cap it at 200 words, and save the new
snapshot on the plan record.

ERRORS
Every command answers, including on failure. Wrap each
handler so an exception becomes a message a human can read.

BUILD ORDER
Project layout and the slash command first. Then the create
flow with hardcoded owners and fixed dates. Then the two
model calls. Then storage. Then the rest of the commands.`,
          },
          {
            type: "p",
            text: "That is the whole thing if you want it working by this afternoon. Everything past here is what the prompt is doing and why each decision went the way it did. Read on, or come back when something breaks and you need to know where to look.",
          },
        ],
      },
      {
        heading: "The problem",
        blocks: [
          {
            type: "p",
            text: "Customer implementations run on a plan that somebody has to write. The usual version of that plan is the last customer's plan, copied, renamed, re-dated by hand, and assigned from memory. It takes the better part of an hour, and that hour is the whole problem.",
          },
          {
            type: "quote",
            text: "A plan that costs an hour to build often does not get built.",
          },
          {
            type: "p",
            text: "Implementations then run without one. Nobody decides that, it happens one busy week at a time. And where a plan does exist it becomes the only record of where things stand, so anyone outside the account team who wants an update walks into the channel and asks a person to go look.",
          },
          {
            type: "p",
            text: "Two things have to be true for a fix to land. Building the plan has to be cheaper than skipping it, and reading the plan has to be free for everyone outside the account team. Miss the second and you have automated the busywork while keeping every interruption.",
          },
        ],
      },
      {
        heading: "What you are building",
        blocks: [
          {
            type: "p",
            text: "The surface is one slash command, run in the customer's implementation channel.",
          },
          { type: "code", code: "/launch Acme Corp 06-15-2026" },
          {
            type: "p",
            text: "A modal opens already filled in: the account name, the launch date, an implementation length in days computed from today to that date and still editable, and three user pickers for the CSM, the SA and the AE, resolved from the CRM account record. The person confirms. Under a minute later the channel holds a Slack List carrying every phase and subtask, each one dated and assigned to a person, a summary message linking to it, and a bookmark pinned to the top of the channel.",
          },
          {
            type: "p",
            text: "Three roles run an implementation and the app has to know the difference between them. The CSM owns the relationship, the scheduling, the onboarding sessions and enablement. The SA owns the technical work: integrations, SSO, API configuration, data imports. The AE owns a handful of pre-sale handoff tasks. Automatic assignment is only worth building because those three differ.",
          },
          {
            type: "p",
            text: "After creation the plan keeps working. A cron job posts a progress summary into every active implementation channel on Friday morning, and six more commands cover reading a plan, re-dating it, closing it out and finding it again.",
          },
        ],
      },
      {
        heading: "How it works",
        blocks: [
          {
            type: "p",
            text: "Six moving parts, and the whole thing fits in about a dozen files.",
          },
          {
            type: "list",
            items: [
              "A Bolt app in Socket Mode holds the slash command, the modal, the date-picker action and the two view submissions. Socket Mode opens an outbound WebSocket, so there is no public URL to host, verify or renew a certificate for.",
              "A template Slack List, built once by hand, carries the plan structure. Every new plan is a copy of it.",
              "A CRM query turns an account name into three owner emails, and users.lookupByEmail turns those into Slack user IDs.",
              "Two model calls decide who owns each subtask and when each one is due.",
              "A JSON store holds one record per plan: list ID, channel ID, launch date, length in days, the team, a status, and last week's task snapshot.",
              "A cron job reads that store every Friday and posts one summary per active plan.",
            ],
          },
          {
            type: "p",
            text: "The create path runs in this order.",
          },
          {
            type: "code",
            caption: "Create path",
            code: `/launch [account] [date]
  -> ack within 3s
  -> open modal
  -> CRM lookup, in the background
       -> update the open modal in place

on submit
  -> copy the template list
  -> generate the timeline        [model call]
  -> classify subtask roles       [model call]
  -> write due date + assignee on every row
  -> share the list into the channel
  -> edit the placeholder into the summary`,
          },
          {
            type: "p",
            text: "Post that placeholder before any slow work and edit it when the work finishes. Rewriting a hundred list rows one API call at a time takes long enough that silence reads as failure.",
          },
        ],
      },
      {
        heading: "Access and credentials",
        blocks: [
          {
            type: "p",
            text: "Line all of this up before you write code.",
          },
          {
            type: "p",
            text: "Slack first. Create the app, switch on Socket Mode, generate an app-level token, register the slash command, and enable interactivity so modal submissions and the date-picker action reach you. Then the bot token scopes, each one earned by a specific call.",
          },
          {
            type: "list",
            items: [
              "commands, for the slash command itself.",
              "chat:write, which covers chat.postMessage, chat.postEphemeral and chat.update.",
              "channels:join, so the app can add itself to a public channel before posting. chat:write.public covers the same ground if you prefer that it post without joining.",
              "channels:history, for the week of conversation the Friday summary depends on. Add groups:history if implementations run in private channels, and remember the app has to be invited to those by a human.",
              "users:read and users:read.email, to turn a CRM email address into a Slack user ID.",
              "bookmarks:write, for pinning the list to the top of the channel.",
              "lists:read and lists:write, for the Slack Lists calls.",
              "connections:write on the app-level token, for Socket Mode.",
            ],
          },
          {
            type: "p",
            text: "auth.test, views.open and views.update need no scope of their own. Check the Lists scopes against current Slack docs before you file a request. lists:read and lists:write are what my code documents and what the calls run on, and whether copying a list or setting its channel access wants anything beyond those two is something I cannot confirm from the code alone.",
          },
          {
            type: "p",
            text: "Then the template list. Build it once, by hand. Phases are top-level rows, subtasks are child rows underneath them. The list needs a to-do assignee column, a to-do due-date column, and a single-select column with owner in its name carrying the role for each phase. The app finds those columns by type at runtime, then copies the list per customer. Edit the template and no deploy is needed. Keep its ID in the environment.",
          },
          {
            type: "p",
            text: "CRM access needs an integration user with the API enabled, read on the account object, and read on the three user-lookup fields that hold the owning trio. jsforce logs in with a username, a password and a security token appended to it. If your org restricts login IP ranges, allowlist the host's outbound IP. Log it on the first connection so you are not hunting for it later.",
          },
          {
            type: "p",
            text: "The Anthropic client reads its key from the environment, so the constructor takes no arguments.",
          },
          {
            type: "code",
            caption: "Environment. Names only, values live in the host.",
            code: `SLACK_BOT_TOKEN        xoxb-, from OAuth and Permissions
SLACK_APP_TOKEN        xapp-, app-level, connections:write
SLACK_SIGNING_SECRET   from Basic Information
TEMPLATE_LIST_ID       the list every plan is copied from
ANTHROPIC_API_KEY      read by the SDK with no arguments
SF_LOGIN_URL           the login or sandbox host
SF_USERNAME
SF_PASSWORD
SF_SECURITY_TOKEN      appended to the password on login
DATA_DIR               the mounted volume path, unset locally
PORT`,
          },
          {
            type: "p",
            text: "Hosting is a process that stays up. Socket Mode leaves no inbound URL to terminate TLS on, so anything that runs Node will do. I used Railway.",
          },
        ],
      },
      {
        heading: "The two model calls",
        blocks: [
          {
            type: "p",
            text: "Both calls run on a small fast model, each with a narrow job and a JSON contract. Neither is asked to be clever.",
          },
          {
            type: "p",
            text: "The first classifies ownership. The template is a list of subtask names, and hardcoding an owner for each one means editing code every time the template changes. Send the names with a one-paragraph description of each role and get back a name-to-role map. Config pins any individual task and the pins win, which turns a wrong answer into a one-line config fix. Filter the pinned names out before you build the prompt, so you only pay for the ones still in question.",
          },
          {
            type: "p",
            text: "The second builds the schedule, and it is the harder problem. The same template has to work for a seven-day velocity deal and a six-month enterprise rollout. Fixed day offsets break at both ends of that range: everything piles onto day one for short implementations, and the spacing drifts into meaninglessness for long ones. Send the phases, their subtasks, the total day count and the two boundary dates, then state the rules the answer has to hold to.",
          },
          {
            type: "code",
            caption: "The two contracts",
            code: `Call one, classify:
{ "Subtask name": "CSM" | "SA" | "AE" }

Call two, schedule:
{
  "phases": {
    "Phase name": { "startDate": "...", "endDate": "..." }
  },
  "subtasks": { "Subtask name": "YYYY-MM-DD" }
}`,
          },
          {
            type: "p",
            text: "The rules that belong in the scheduling prompt: phases are sequential and cannot overlap, every date is a weekday, every subtask comes back in the output, and every date falls inside the window. Short timelines compress the administrative work and front-load the critical path while the technical phases keep enough room to be real. Long timelines give those technical phases more room still.",
          },
          {
            type: "p",
            text: "Then check all of it again in code. Push weekend dates to the following Monday, and collect any subtask the model dropped into a warnings list you show the user in the confirmation message. A model that is right most of the time still needs a floor under it.",
          },
          {
            type: "p",
            text: "Strip markdown fences before parsing, because both calls will occasionally wrap their JSON in a code block. A parse failure on the classifier should fall back to the owner on the parent phase and let the run finish. A parse failure on the schedule has nothing to fall back to, so let it throw and surface the message.",
          },
        ],
      },
      {
        heading: "The command surface",
        blocks: [
          {
            type: "p",
            text: "Ship the create command alone and the first question you get is how to see the plan. It arrives the same day.",
          },
          {
            type: "quote",
            text: "Anything that creates work has to answer for it.",
          },
          {
            type: "list",
            items: [
              "/launch [account] [date] creates the plan.",
              "/launch status [account] reads it: phase-by-phase progress and anything overdue.",
              "/launch reschedule [account] updates it. Launches slip. This opens a date picker and re-dates every task in place, leaving assignees alone.",
              "/launch complete [account] closes it, so the Friday summary stops reporting on customers who went live months ago.",
              "/launch summary [account] runs the Friday summary on demand, for people who want it on their own schedule.",
              "/launch list shows every plan with its launch date, each one linked to its list. This started as a diagnostic and turned into the most-used read command.",
              "/launch help, which you need the moment the surface passes four commands.",
            ],
          },
          {
            type: "p",
            text: "A command that creates an object implies one to read it, one to change it, one to close it out, and something to find things with. Create, read, update, close, find is the shape of any object in any system, and sketching it first costs an afternoon and saves a month of small releases.",
          },
          {
            type: "p",
            text: "Two details worth copying. Register one slash command and dispatch on the first token, because seven registered commands is seven things to configure and seven things to remember. And send anything only the caller needs as an ephemeral message: usage errors, the help text and the plan list all qualify, and none of them belong in a customer channel.",
          },
        ],
      },
      {
        heading: "Where the data lives",
        blocks: [
          {
            type: "p",
            text: "You need one small record per plan. List ID, channel ID, launch date, implementation length, the three owners, a status, and last week's task snapshot. That is the entire schema. A JSON file sitting next to the code is the simplest thing that works, and it works right up until the first redeploy.",
          },
          {
            type: "quote",
            text: "Treat the disk as ephemeral from the first commit.",
          },
          {
            type: "p",
            text: "Container filesystems do not survive a deploy. Railway has a clean answer: attach a volume, mount it, and write the file to the mounted path. That is the whole fix, it costs one setting, and it is where this can reasonably stop.",
          },
          {
            type: "p",
            text: "Write the store module so the path is a runtime decision anyway. Read the mount point from the environment and fall back to a local file when it is unset, so the same build runs on your laptop and on the host. A volume does tie the app to whoever provides it, and if you later move somewhere with no volumes on offer, swapping the file for an object in a bucket is a change inside that one module.",
          },
          {
            type: "code",
            caption: "The storage rule, as a comment in the store module",
            code: `// Storage backend. Container disks do not survive a
// deploy, so the file has to live on a mounted volume.
//   - DATA_DIR set:   write accounts.json there.
//   - DATA_DIR unset: fall back to a local file, for dev.
// Nothing above this module knows which one it got.`,
          },
          {
            type: "p",
            text: "Prime an in-memory cache at startup so reads stay synchronous and no command handler pays a network round trip to answer a question. Writes go through the cache and out to storage.",
          },
          {
            type: "p",
            text: "If the volume is ever shared, or if you do move to a bucket later, namespace the file under a per-application prefix from the environment. A bare accounts.json collides with whatever else is in there.",
          },
          {
            type: "p",
            text: "If you do move the store, migrate with a one-time task and delete the task in the commit right after it runs. Migration code left in the repo runs again by accident, usually at a worse moment.",
          },
        ],
      },
      {
        heading: "The weekly summary",
        blocks: [
          {
            type: "p",
            text: "A cron job posts a progress summary into every active implementation channel on Friday morning. The obvious version reads the task list, finds anything past its due date, and calls it a risk. That version is wrong often enough to be annoying, and a report nobody trusts is a report nobody opens.",
          },
          {
            type: "p",
            text: "A task can be overdue and completely fine. The work happened, the customer confirmed it in the channel, and nobody went back to tick the box.",
          },
          {
            type: "p",
            text: "So give the summary its evidence before it judges anything. Pull the last seven days of channel messages with thread replies included, diff the current task states against the snapshot you saved last week, and hand the model all of it at once: phase progress, what got completed, what is overdue, what went overdue this week, the incomplete task list, and the conversation. Then the rule. A task counts as a risk only when it is overdue and nothing in the conversation shows progress. Where the conversation suggests the work is done, it goes in a section that asks somebody to tick the box.",
          },
          {
            type: "p",
            text: "Pin the output format in the prompt and cap the length. Progress, risks, next steps, and the tick-the-box section, two or three bullets each, dropped entirely when empty. That one change moves the Friday message from noise into something people open.",
          },
          {
            type: "code",
            caption: "What lands in the channel on a Friday",
            code: `Weekly Progress Summary - Acme Corp
Jun 12 - Jun 19

Overall: 4/42 tasks (10%) | 0 done this week | 0 overdue

  Introduction & Pre-Kickoff .... 4/6
  Kickoff ....................... 0/7
  Technical Implementation ...... 0/19
  Build Out & Configuration ..... 0/0
  Launch ........................ 0/6
  Post Launch ................... 0/4

Progress
- Team is in Phase 1 with 4 of 6 tasks completed.
- Kickoff deck preparation is underway.
- No tasks were formally marked complete this week,
  though work is actively progressing.

Risks
- No risks this week.

Next Steps
- Complete remaining Phase 1 tasks to advance to Kickoff.
- Schedule and conduct the kickoff call.
- Begin Technical Implementation, starting with the
  Technical Success Document and validation.

Needs Attention
- "Schedule kick-off call" appears in progress: the CSM is
  preparing the kickoff deck. Consider marking it complete
  once the call is scheduled.`,
          },
          {
            type: "p",
            text: "That last section is the one worth building. Nothing is overdue in this example, so the risks list correctly says so, and the model still noticed a task sitting open while the channel showed the work happening. A summary that only counts what is late would have had nothing to say.",
          },
        ],
      },
      {
        heading: "What to get right",
        blocks: [
          {
            type: "list",
            items: [
              "Sketch the whole lifecycle before you build the first command. Create, read, update, close, find.",
              "Ship the read path with the write path. They are one feature wearing two names.",
              "Give each model call a narrow job and a JSON contract, then validate the output in code anyway.",
              "Let config beat the model, so a wrong classification is a one-line fix with no deploy.",
              "Build the create path end to end with hardcoded owners and fixed dates, then swap the model calls in once the plumbing holds.",
              "Assume the disk is ephemeral before the platform teaches you.",
              "Delete migration code in the commit after it runs.",
              "Acknowledge inside three seconds, then do the slow work behind a placeholder message you edit in place.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "wispr-flow-voice-dictation",
    title: "Wispr Flow: Middle Mouse Button will make you work faster",
    dek: "I dictate almost everything now. You should try it too, but let me try to convince you to get a mouse with a scroll wheel and headset microphone first.",
    format: "playbook",
    published: "August 2026",
    featured: true,
    metaDescription:
      "How I set up Wispr Flow to dictate at 170 words a minute: the middle mouse button as the trigger, why AirPods make it worse, and what changed about how I write.",
    sections: [
      {
        heading: "The short version",
        blocks: [
          {
            type: "p",
            text: "Wispr Flow is dictation that sits on top of whatever you are already typing into. Hold a button, talk, let go, and the text lands in the active window with the filler words and the false starts cleaned out. I get up to 170 words per minute out of it, and I use it for most of what I write in a day: Slack, Linear issues, documentation, and the long briefs I hand to AI agents.",
          },
          {
            type: "p",
            text: "Two pieces of hardware are what took it from a novelty to the thing I reach for. Get a mouse with a scroll wheel you can press, and a headset with a dedicated microphone. Bind dictation to the scroll wheel click, talk into the headset, and the rest of this is why those two and what changed once they were in place.",
          },
        ],
      },
      {
        heading: "Bind it to your mouse",
        blocks: [
          {
            type: "p",
            text: "Flow ships bound to Fn on a Mac and Ctrl+Win on Windows. Both work fine. If you dictate into one window all day you may never want anything else.",
          },
          {
            type: "p",
            text: "My day does not look like that. I am clicking into a Slack thread, then a Linear description, then a terminal, then the prompt box of whatever agent is running. The mouse is how I get to every one of those boxes. With the trigger on middle click, pressing the scroll wheel down, the click that puts my cursor where I want it and the button that starts dictation are the same hand in the same place, and I start talking without moving.",
          },
          {
            type: "p",
            text: "That is the whole gain, and it compounds across a day of short bursts into a lot of different places. After about a week I stopped noticing I was pressing it, which is the point where a tool disappears and you just use it.",
          },
          {
            type: "p",
            text: "Flow is specific about which buttons it accepts. Middle click and mouse buttons four through ten work, alone or behind a keyboard modifier. Left and right click are out. So is the Apple Magic Mouse, so are built-in trackpads, and so is anything with three buttons or fewer. On a bare laptop you are stuck with a key.",
          },
        ],
      },
      {
        heading: "Then fix the microphone",
        blocks: [
          {
            type: "p",
            text: "I went through three before it was right, and the order is worth knowing because the middle one looks like a solution.",
          },
          {
            type: "p",
            text: "The MacBook microphone sits up by the hinge and hears the entire room. Your distance from it changes every time you shift in your chair, so the input level moves around while you talk, and it picks up your own keystrokes.",
          },
          {
            type: "p",
            text: "AirPods were the obvious next try and they were not it either. Bluetooth drops to a much lower audio bandwidth the moment the microphone opens, so the same earbuds that sound excellent playing music are a downgrade the second you talk into them.",
          },
          {
            type: "p",
            text: "A wired headset with a boom microphone solved it. The mic holds one distance from your mouth whether you are leaning back or hunched over a spreadsheet, and it sits close enough that the room stops registering. With that on, Flow is basically flawless for me.",
          },
          {
            type: "quote",
            text: "The mouse gets you using it. The microphone makes it worth using.",
          },
        ],
      },
      {
        heading: "What I get out of it",
        blocks: [
          {
            type: "p",
            text: "The first thing that changed was length. Background that used to stay in my head because typing it out was a chore now goes into the prompt. Agent briefs are the clearest case: they want the contract terms, the history, and the reason this particular account is strange, and every one of those sentences used to cost something to produce. At talking speed you just say all of it.",
          },
          {
            type: "p",
            text: "The second is where a first draft comes from. An empty box is a hard place to start. Talking gets a rough, badly organized version of the whole thing out in one pass, and editing a rough version is a different job from writing one. For a Linear issue I say all of it badly and then clean it up, and by the time I start editing the structure is already there.",
          },
          {
            type: "p",
            text: "The rest is small and adds up. It pastes into whatever window has focus, so Slack, a Linear description, a terminal and an agent prompt all work the same way. It strips filler and keeps the correction when you talk over yourself mid-sentence. It learns the words you fix, so after a few weeks it stops mangling your product names and your colleagues.",
          },
        ],
      },
      {
        heading: "What it noticed about me",
        blocks: [
          {
            type: "p",
            text: "Flow keeps an Insights page in the desktop app. One tab counts the measurable things, and another builds a Voice Profile out of how you actually talk. That one is the fun part.",
          },
          {
            type: "p",
            text: "Mine currently reads Structure Refiner, described like this: voice is your go-to tool for refining complex structures, whether it is reworking Salesforce workflows or clarifying project details. Your dictations often focus on streamlining processes and ensuring every detail aligns with broader goals.",
          },
          {
            type: "list",
            items: [
              "Catchphrase: I think we can",
              "Most used word: should",
              "Most corrected word: and",
              "Peak time and place: Thursday at 2pm, in Slack",
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
