import { stack } from "@/lib/content";
import { Label } from "./ui";

/**
 * Black band directly under the hero, carrying a continuously scrolling list
 * of the tools in the stack.
 *
 * The list is rendered twice and the track translates exactly -50%, so the
 * second copy is in the first copy's starting position at the moment the
 * animation loops. That is what makes it seamless rather than snapping.
 * The duplicate is aria-hidden so screen readers hear the list once.
 */
export function StackMarquee() {
  return (
    <section className="bg-black py-10 sm:py-16" aria-label={stack.heading}>
      <Label className="mb-7 text-center text-faint sm:mb-9">{stack.heading}</Label>

      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="marquee__group"
              aria-hidden={copy === 1 || undefined}
            >
              {stack.items.map((name) => (
                <li
                  key={name}
                  className="type-heading whitespace-nowrap text-2xl text-muted transition-colors hover:text-ink sm:text-3xl"
                >
                  {name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
