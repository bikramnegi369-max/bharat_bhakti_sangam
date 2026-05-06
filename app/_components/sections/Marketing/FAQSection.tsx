import { cinzel } from "@/_lib/fonts";
import { FAQSectionProps } from "@/_types/FAQ.types";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

export default function FAQSection({
  items,
  title,
  highlightWord,
  className,
  defaultOpenIndex = 0,
}: FAQSectionProps) {
  // Guard: If no items are provided, don't render the section
  if (!items || items.length === 0) return null;

  const renderTitle = () => {
    if (!title) return null;
    if (!highlightWord) return title;

    // Use RegExp with capture group to split while keeping the separator
    // This handles the "string | undefined" TS error and allows case-insensitive matching
    const regex = new RegExp(`(${highlightWord})`, "gi");
    const parts = title.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === highlightWord.toLowerCase() ? (
        <span key={i} className="text-primary">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <section
      className={clsx(
        "py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light">
          <h2
            className={clsx(
              "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-10 text-center",
              cinzel.className,
            )}
          >
            {renderTitle()}
          </h2>

          <div className="space-y-4">
            {items?.map((faq, index) => (
              <details
                key={`${faq.title}-${index}`}
                className="group border-2 border-primary rounded-xl bg-secondary overflow-hidden"
                open={defaultOpenIndex === index}
              >
                <summary className="flex list-none items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                  <span className="font-semibold text-heading text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)]">
                    {faq.title}
                  </span>

                  <ChevronDown
                    className="w-5 h-5 text-primary transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="px-5 pb-4 text-[clamp(0.75rem,calc(0.661rem+0.446vw),1.063rem)] text-para leading-relaxed">
                  {faq.content}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
