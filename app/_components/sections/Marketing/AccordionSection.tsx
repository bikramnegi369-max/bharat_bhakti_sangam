import { playfair } from "@/_lib/fonts";
import {
  AccordionIndicatorVariant,
  AccordionSectionProps,
} from "@/_types/Accordion.types";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

function renderTitle(
  title?: string,
  highlightWord?: string,
  highlightClassName = "text-primary",
) {
  if (!title) return null;
  if (!highlightWord) return title;

  const regex = new RegExp(`(${highlightWord})`, "gi");
  const parts = title.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === highlightWord.toLowerCase() ? (
      <span key={index} className={highlightClassName}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function AccordionIndicator({
  variant,
}: {
  variant: AccordionIndicatorVariant;
}) {
  if (variant === "plus-minus") {
    return (
      <span
        aria-hidden="true"
        className="relative flex h-7 w-7 shrink-0 items-center justify-center text-heading"
      >
        <span className="absolute text-2xl leading-none transition-opacity duration-200 group-open:opacity-0">
          +
        </span>
        <span className="absolute text-2xl leading-none opacity-0 transition-opacity duration-200 group-open:opacity-100">
          -
        </span>
      </span>
    );
  }

  return (
    <ChevronDown
      className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
      aria-hidden="true"
    />
  );
}

export default function AccordionSection({
  items,
  title,
  highlightWord,
  className,
  containerClassName,
  itemClassName,
  summaryClassName,
  contentClassName,
  defaultOpenIndex = 0,
  indicatorVariant = "chevron",
  groupName,
}: AccordionSectionProps) {
  if (!items?.length) return null;

  return (
    <section
      className={clsx(
        "py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div
          className={clsx(
            "rounded-md border-3 border-primary bg-primary_light p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]",
            containerClassName,
          )}
        >
          {title ? (
            <h2
              className={clsx(
                "mb-10 text-center text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold",
                playfair.className,
              )}
            >
              {renderTitle(title, highlightWord)}
            </h2>
          ) : null}

          <div className="space-y-4">
            {items.map((item, index) => (
              <details
                key={`${item.title}-${index}`}
                name={groupName}
                className={clsx(
                  "group overflow-hidden rounded-xl border-2 border-primary bg-secondary",
                  itemClassName,
                )}
                open={defaultOpenIndex === index}
              >
                <summary
                  className={clsx(
                    "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                    summaryClassName,
                  )}
                >
                  <span className="text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-heading">
                    {item.title}
                  </span>

                  <AccordionIndicator variant={indicatorVariant} />
                </summary>

                <div
                  className={clsx(
                    "px-5 pb-4 text-[clamp(0.75rem,calc(0.661rem+0.446vw),1.063rem)] leading-relaxed text-para",
                    contentClassName,
                  )}
                >
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
