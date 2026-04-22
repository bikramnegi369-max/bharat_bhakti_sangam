import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { cinzel } from "@/_lib/fonts";

type FAQItem = {
  title: string;
  content: string;
};

type FAQSectionProps = {
  faqs?: FAQItem[];
};

export default function FAQSection({
  faqs = [
    {
      title: "Ticket Categories & Access",
      content:
        "General and Premium seating available. Premium includes closer stage access and priority entry.",
    },
    {
      title: "Description",
      content:
        "Experience divine bhajans blended with modern live concert energy.",
    },
    {
      title: "Location",
      content: "E Block Club Park, Vatika India Next Sec-82 Gurugram, Haryana",
    },
    {
      title: "Important Note",
      content:
        "Entry is subject to venue rules. Please arrive 30 minutes early.",
    },
    {
      title: "Want to Sponsor this event?",
      content:
        "Reach out to us for sponsorship opportunities and brand collaborations.",
    },
  ],
}: FAQSectionProps) {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light">
          <h2
            className={clsx(
              "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-10 text-center",
              cinzel.className,
            )}
          >
            <span className="text-primary">Event</span> Guide
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={`${faq.title}-${index}`}
                className="group border-2 border-primary rounded-xl bg-secondary overflow-hidden"
                open={index === 0}
              >
                <summary className="flex list-none items-center justify-between px-5 py-4 text-left cursor-pointer">
                  <span className="font-semibold text-heading text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)]">
                    {faq.title}
                  </span>

                  <ChevronDown className="w-5 h-5 text-primary transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <div className="px-5 pb-4 text-[clamp(0.75rem,calc(0.661rem+0.446vw),1.063rem)] text-para">
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
