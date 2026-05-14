import type { ReactNode } from "react";

export type AccordionIndicatorVariant = "chevron" | "plus-minus";

export type AccordionItem = {
  title: string;
  content: ReactNode;
};

export interface AccordionSectionProps {
  items: AccordionItem[];
  title?: string;
  highlightWord?: string;
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  summaryClassName?: string;
  contentClassName?: string;
  defaultOpenIndex?: number | null;
  indicatorVariant?: AccordionIndicatorVariant;
  groupName?: string; // For accessibility: all accordions with the same groupName are treated as a single accordion (only one item open at a time)
}
