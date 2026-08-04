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
  ref: string;
  title: string;
  dek: string;
  format: GuideFormat;
  published: string;
  featured: boolean;
  metaDescription: string;
  sections: { heading: string; blocks: Block[] }[];
};

export const guides: Guide[] = [
  {
    slug: "launchpad-slack-app",
    ref: "01",
    title: "LaunchPad: build a Slack app that writes implementation plans",
    dek: "One slash command, a modal, and a scheduled, fully assigned customer implementation plan in the channel a minute later. The architecture, the access you have to line up first, and a prompt you can paste into Claude to start building your own.",
    format: "playbook",
    published: "August 2026",
    featured: true,
    metaDescription:
      "A playbook for building a Slack app that turns one slash command into a scheduled, assigned customer implementation plan. Architecture, credentials, Slack scopes, and a copy-paste build prompt.",
    sections: [
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
            text: "Three roles run an implementation and the app has to know the difference between them. The CSM owns the relationship, the scheduling, the onboarding sessions and enablement. The SA owns the technical work: integrations, SSO, API configuration, data imports. The AE owns the pre-sale handoff, which is a small number of tasks. That distinction is what makes automatic assignment worth doing at all.",
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
            text: "The create path runs in this order. Acknowledge the command inside three seconds. Open the modal. Fetch the CRM record in the background and update the open modal in place. On submit, copy the template list, generate the timeline, classify the roles, write a due date and an assignee onto every row, share the list into the channel, and edit the placeholder message into the final summary.",
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
            text: "Line all of this up before you write code. Every item here blocks something.",
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
            text: "auth.test, views.open and views.update need no scope of their own. One honest caveat: the Lists API is the newest surface in this stack and the one I would check against current Slack docs before filing a scope request. lists:read and lists:write are what my code documents and what the slackLists calls run on. Whether copying a list and setting its channel access want anything beyond those two is something I cannot confirm from the code alone.",
          },
          {
            type: "p",
            text: "Then the template list. Build it once, by hand. Phases are top-level rows, subtasks are child rows underneath them. The list needs a to-do assignee column, a to-do due-date column, and a single-select column with owner in its name carrying the role for each phase. The app finds those columns by type at runtime and copies the whole list per customer, so the template can change without a deploy. Keep its ID in the environment.",
          },
          {
            type: "p",
            text: "CRM access needs an integration user with the API enabled, read on the account object, and read on the three user-lookup fields that hold the owning trio. jsforce logs in with a username, a password and a security token appended to it. If your org restricts login IP ranges, the host's outbound IP has to be allowlisted, and that IP is worth logging on the first connection so you can find it without guessing.",
          },
          {
            type: "p",
            text: "The Anthropic SDK reads its key straight out of the environment, so the client constructor takes no arguments. The same is true of the S3 client, which is built with no options and picks up its region and credentials from the standard environment variables or an attached role.",
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
AWS_S3_BUCKET_NAME     unset locally, set in production
ACCOUNTS_S3_KEY        per-app prefix inside a shared bucket
AWS_REGION             the S3 client is built with no options
PORT`,
          },
          {
            type: "p",
            text: "Hosting is a process that stays up. Socket Mode means there is no inbound URL to terminate TLS on, so anything that runs Node will do. I used Railway, picked because it turns a repo into a running service with almost no ceremony. When the thing you are testing is whether anyone types the command twice, the hosting decision should cost an afternoon at most.",
          },
        ],
      },
      {
        heading: "The two model calls",
        blocks: [
          {
            type: "p",
            text: "Both calls run on a small fast model. Both get a narrow job and a JSON contract. Neither one is asked to be clever.",
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
            type: "p",
            text: "This part is knowable before you write a line. A command that creates an object implies a command to read it, one to change it, and one to close it out, plus something to find things with. Sketch the whole lifecycle first, then build in whatever order suits you.",
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
            text: "Create, read, update, close, find. That is the shape of any object in any system. Sketching it costs an afternoon and saves a month of small releases.",
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
            text: "Container filesystems do not survive a deploy. On Railway that has a clean answer: attach a persistent volume and the file stays where you left it. Stopping there is a legitimate choice, and for a while it was the right one.",
          },
          {
            type: "p",
            text: "Object storage is the step after that. A volume ties the app to the host that provides it. A bucket travels. Write the store module so the backend is a runtime decision: with a bucket name in the environment, read and write a single JSON object; with no bucket name, fall back to a local file for development. The same build then runs in both places.",
          },
          {
            type: "code",
            caption: "The storage rule, as a comment in the store module",
            code: `// Storage backend:
//   - If AWS_S3_BUCKET_NAME is set (production), persist
//     accounts.json to object storage. Container disks are
//     ephemeral, so local files do not survive a redeploy.
//   - Otherwise (local dev), fall back to a JSON file on disk.`,
          },
          {
            type: "p",
            text: "Prime an in-memory cache at startup so reads stay synchronous and no command handler pays a network round trip to answer a question. Writes go through the cache and out to storage.",
          },
          {
            type: "p",
            text: "One wrinkle worth stealing: if the bucket is shared with other applications, a bare accounts.json key collides with whatever else is in there. Put the object under a per-application prefix that arrives as an environment variable.",
          },
          {
            type: "p",
            text: "Migrate with a one-time task that reads the old file and writes it to the bucket, then delete the task in the commit right after it runs. Migration code left in the repo runs again by accident, usually at a worse moment.",
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
        ],
      },
      {
        heading: "The build prompt",
        blocks: [
          {
            type: "p",
            text: "Paste this into Claude with an empty directory open. It produces a skeleton close enough to the real thing that what is left is credentials, the template list, and taste. Swap the role names and phase names for whatever your implementations actually use.",
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
Assume the filesystem is ephemeral. Write one store module
with init, save, get, list and listActive. With a bucket name
present in the environment, read and write a single JSON
object in object storage; with no bucket name, fall back to a
local file for development. Prime an in-memory cache at
startup so reads stay synchronous. Namespace the object key
under a per-app prefix from the environment, since the bucket
may be shared with other applications.
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
];

export const guidesIndex = {
  lede: "Written out of systems I actually built and had to keep running. Take what is useful.",
};
