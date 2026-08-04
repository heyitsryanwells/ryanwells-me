"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  contact,
  contactFormAccessKey,
  contactFormEndpoint,
  contactFormReady,
  site,
} from "@/lib/content";

/* ---------------------------------------------------------------------------
   Contact form.

   The only client component the document needs. The page shell around it stays
   a server component, so the interactive surface is this file and nothing else.

   The site is a static export on GitHub Pages: no server, no API route, no
   action to post to. The browser posts straight to a hosted form service
   instead, which is why the endpoint lives in lib/content.ts as a value anyone
   can read. While that value is still the placeholder, the send button is
   disabled and the page says why. Posting into a URL that cannot exist would
   throw away a message somebody had already finished writing. Telling them
   before they start costs nothing and hands them a link that works.
--------------------------------------------------------------------------- */

const copy = contact.form;

type FieldName = "name" | "email" | "reason" | "message";

const FIELD_ORDER: FieldName[] = ["name", "email", "reason", "message"];

const EMPTY: Record<FieldName, string> = {
  name: "",
  email: "",
  reason: "",
  message: "",
};

type Errors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Deliberately loose. A contact form's job is to catch the typo that would
 * make a reply bounce, so it checks for one @ with text either side and a dot
 * in the domain. Anything stricter starts rejecting addresses that work.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGE_MINIMUM = 12;

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  const f = copy.fields;

  if (!values.name.trim()) errors.name = f.name.required;

  const email = values.email.trim();
  if (!email) errors.email = f.email.required;
  else if (!EMAIL_PATTERN.test(email)) errors.email = f.email.invalid;

  if (!values.reason) errors.reason = f.reason.required;

  const message = values.message.trim();
  if (!message) errors.message = f.message.required;
  else if (message.length < MESSAGE_MINIMUM) errors.message = f.message.tooShort;

  return errors;
}

const BUTTON_BASE = "type-label inline-block px-5 py-3 transition-colors";

const BUTTON_LIVE = `${BUTTON_BASE} cursor-pointer bg-accent text-on-accent hover:bg-ink`;

/**
 * Three looks, because a button that is working and a button that is switched
 * off should not read the same. Sending keeps the accent fill and dims it, so
 * it still looks like the live control it is; the off state drops to a flat
 * line fill that reads as inert.
 */
// 75 rather than a deeper fade: below that the near-black label stops clearing
// 4.5:1 against the dimmed fill.
const BUTTON_BUSY = `${BUTTON_BASE} cursor-wait bg-accent text-on-accent opacity-75`;

const BUTTON_OFF = `${BUTTON_BASE} cursor-not-allowed bg-line text-muted`;

const linkedIn = site.socials.find((s) => s.label === "LinkedIn");

/** Both failure panels carry the same escape hatch. */
function Fallback() {
  return (
    <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
      {linkedIn ? (
        <a
          href={linkedIn.href}
          target="_blank"
          rel="noreferrer"
          className="type-label bracket-link text-ink transition-colors hover:text-accent"
        >
          {linkedIn.label}
        </a>
      ) : null}
      <a
        href={`mailto:${site.email}`}
        className="type-label bracket-link text-ink transition-colors hover:text-accent"
      >
        {copy.fallbackEmail}
      </a>
    </p>
  );
}

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [detail, setDetail] = useState<string | null>(null);
  const [sentName, setSentName] = useState("");

  const honeypot = useRef<HTMLInputElement>(null);
  const controls = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});
  const firstField = useRef<HTMLInputElement>(null);

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;
  const hintId = (name: string) => `${uid}-${name}-hint`;
  const noticeId = `${uid}-notice`;

  const describedBy = (name: FieldName, hasHint: boolean) =>
    [hasHint ? hintId(name) : null, errors[name] ? errorId(name) : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const set = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Only re-check a field that is already showing an error, so nobody gets
    // told their email is wrong while they are still typing it.
    if (errors[name]) {
      setErrors((prev) => {
        const next = validate({ ...values, [name]: value });
        const merged = { ...prev };
        if (next[name]) merged[name] = next[name];
        else delete merged[name];
        return merged;
      });
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !contactFormReady) return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      controls.current[firstInvalid]?.focus();
      return;
    }

    // Anything that filled the hidden field is a bot. Report success and post
    // nothing, so it has no signal to learn from.
    if (honeypot.current?.value) {
      setSentName(values.name.trim());
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setDetail(null);

    const payload: Record<string, string> = {
      name: values.name.trim(),
      email: values.email.trim(),
      reason: values.reason,
      message: values.message.trim(),
      // Becomes the subject line on Web3Forms, Getform and Basin. Formspree
      // reads `_subject` instead, so rename this key if you land there.
      subject: `${copy.subjectPrefix}: ${values.reason}`,
    };
    if (contactFormAccessKey) payload.access_key = contactFormAccessKey;

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`The form service answered ${response.status}.`);
      }
      setSentName(values.name.trim());
      setValues(EMPTY);
      setErrors({});
      setStatus("success");
    } catch (error) {
      setDetail(
        error instanceof Error
          ? error.message
          : "The request never reached the form service.",
      );
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setValues(EMPTY);
    setErrors({});
    setDetail(null);
    // The form is remounting around this call, so hand focus back on the next
    // frame rather than to the node that is about to be replaced.
    requestAnimationFrame(() => firstField.current?.focus());
  }

  const announcement =
    status === "submitting"
      ? "Sending your message."
      : status === "success"
        ? copy.success.heading
        : status === "error"
          ? `${copy.error.heading}. ${copy.error.body}`
          : "";

  return (
    <div className="max-w-2xl">
      {/* One live region for the whole component. Panels below are plain text,
          so a state change is announced exactly once. */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      {status === "success" ? (
        <div className="form-panel form-panel--ok">
          <p className="type-label text-tertiary">{copy.success.heading}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            {copy.success.body.replace("{name}", sentName)}
          </p>
          <button type="button" onClick={reset} className={`${BUTTON_LIVE} mt-5`}>
            {copy.success.again}
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} aria-busy={status === "submitting"}>
          {!contactFormReady ? (
            <div className="form-panel mb-8" id={noticeId}>
              <p className="type-label text-accent">{copy.unconfigured.heading}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {copy.unconfigured.body}
              </p>
              <Fallback />
            </div>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor={fieldId("name")} className="type-label block text-ink">
                {copy.fields.name.label}
              </label>
              <input
                id={fieldId("name")}
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                className="field-control mt-2"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy("name", false)}
                ref={(node) => {
                  controls.current.name = node;
                  firstField.current = node;
                }}
              />
              {errors.name ? (
                <p id={errorId("name")} className="field-message">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={fieldId("email")} className="type-label block text-ink">
                {copy.fields.email.label}
              </label>
              <input
                id={fieldId("email")}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={200}
                className="field-control mt-2"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy("email", true)}
                ref={(node) => {
                  controls.current.email = node;
                }}
              />
              <p id={hintId("email")} className="field-hint">
                {copy.fields.email.hint}
              </p>
              {errors.email ? (
                <p id={errorId("email")} className="field-message">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor={fieldId("reason")} className="type-label block text-ink">
              {copy.fields.reason.label}
            </label>
            <select
              id={fieldId("reason")}
              name="reason"
              className="field-control field-control--select mt-2"
              value={values.reason}
              onChange={(e) => set("reason", e.target.value)}
              aria-invalid={errors.reason ? true : undefined}
              aria-describedby={describedBy("reason", false)}
              ref={(node) => {
                controls.current.reason = node;
              }}
            >
              <option value="">{copy.fields.reason.prompt}</option>
              {contact.reasons.map((reason) => (
                <option key={reason.ref} value={reason.option}>
                  {reason.option}
                </option>
              ))}
              <option value={copy.otherOption}>{copy.otherOption}</option>
            </select>
            {errors.reason ? (
              <p id={errorId("reason")} className="field-message">
                {errors.reason}
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <label htmlFor={fieldId("message")} className="type-label block text-ink">
              {copy.fields.message.label}
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={7}
              maxLength={4000}
              className="field-control mt-2"
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", true)}
              ref={(node) => {
                controls.current.message = node;
              }}
            />
            <p id={hintId("message")} className="field-hint">
              {copy.fields.message.hint}
            </p>
            {errors.message ? (
              <p id={errorId("message")} className="field-message">
                {errors.message}
              </p>
            ) : null}
          </div>

          {/* Spam trap. Off the screen, out of the tab order, and hidden from
              screen readers, so only something filling fields by name finds
              it. A submission that touches it is dropped in handleSubmit. */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor={fieldId("company")}>Company</label>
            <input
              id={fieldId("company")}
              name="_gotcha"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              ref={honeypot}
            />
          </div>

          {status === "error" ? (
            <div className="form-panel mt-8">
              <p className="type-label text-accent">{copy.error.heading}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {copy.error.body}
              </p>
              {detail ? <p className="field-hint mt-2">{detail}</p> : null}
              <Fallback />
            </div>
          ) : null}

          <div className="mt-8">
            <button
              type="submit"
              className={
                status === "submitting"
                  ? BUTTON_BUSY
                  : contactFormReady
                    ? BUTTON_LIVE
                    : BUTTON_OFF
              }
              disabled={!contactFormReady || status === "submitting"}
              aria-describedby={contactFormReady ? undefined : noticeId}
            >
              {status === "submitting" ? `${copy.submitting}...` : copy.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
