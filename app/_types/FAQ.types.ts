import type { ReactNode } from "react";

export type FAQItem = {
  title: string;
  content: ReactNode;
};

export interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  highlightWord?: string;
  className?: string;
  groupName?: string; // For accessibility: all accordions with the same groupName are treated as a single accordion (only one item open at a time)
  /** Index of the item to be open by default. Use null for all closed. */
  defaultOpenIndex?: number | null;
}
