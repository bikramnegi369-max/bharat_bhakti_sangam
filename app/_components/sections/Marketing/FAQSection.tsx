import AccordionSection from "./AccordionSection";
import { FAQSectionProps } from "@/_types/FAQ.types";

export default function FAQSection({
  items,
  title,
  highlightWord,
  className,
  defaultOpenIndex = 0,
}: FAQSectionProps) {
  return (
    <AccordionSection
      items={items}
      title={title}
      highlightWord={highlightWord}
      className={className}
      defaultOpenIndex={defaultOpenIndex}
      indicatorVariant="chevron"
    />
  );
}
