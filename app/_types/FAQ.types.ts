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
  /** Index of the item to be open by default. Use null for all closed. */
  defaultOpenIndex?: number | null;
}
