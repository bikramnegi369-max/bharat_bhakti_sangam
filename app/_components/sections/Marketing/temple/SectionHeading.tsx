import { cinzel } from "@/_lib/fonts";

interface SectionHeadingProps {
  title: string;
  /**
   * Strategy for which part of the title to colour amber:
   *
   * "after-of"  → colour everything after " of "
   *              "Features of Konark Sun Temple" → amber: "Konark Sun Temple"
   *
   * "first-word" → colour the first word only
   *              "Konark Sun Temple Location" → amber: "Konark"
   *
   * "before-last-word" → colour everything except the last word
   *              "History of Shri Badrinath Temple" → amber: "Shri Badrinath"
   *              (used for history titles where last word is plain)
   */
  accentStrategy: "after-of" | "first-word" | "before-last-word";
}

/**
 * Reusable section heading that applies an amber accent
 * to a portion of the title string, controlled by `accentStrategy`.
 * Always uses the Cinzel display font for visual consistency.
 */
export default function SectionHeading({
  title,
  accentStrategy,
}: SectionHeadingProps) {
  let plain = "";
  let amber = "";
  let suffix = "";

  if (accentStrategy === "after-of") {
    const idx = title.indexOf(" of ");
    if (idx !== -1) {
      plain = title.slice(0, idx + 4); // "Features of "
      amber = title.slice(idx + 4);    // "Konark Sun Temple"
    } else {
      plain = title;
    }
  } else if (accentStrategy === "first-word") {
    const idx = title.indexOf(" ");
    if (idx !== -1) {
      amber = title.slice(0, idx);  // "Konark"
      suffix = title.slice(idx);    // " Sun Temple Location"
    } else {
      amber = title;
    }
  } else if (accentStrategy === "before-last-word") {
    // "History of Shri Badrinath Temple"
    //  plain = "History of "   amber = "Shri Badrinath"  suffix = " Temple"
    const ofIdx = title.indexOf(" of ");
    if (ofIdx !== -1) {
      plain = title.slice(0, ofIdx + 4);
      const rest = title.slice(ofIdx + 4);
      const lastSpace = rest.lastIndexOf(" ");
      if (lastSpace !== -1) {
        amber = rest.slice(0, lastSpace);
        suffix = rest.slice(lastSpace);
      } else {
        amber = rest;
      }
    } else {
      plain = title;
    }
  }

  return (
    <h2
      className={`${cinzel.className} text-xl sm:text-2xl font-bold text-stone-800 leading-snug`}
    >
      {plain}
      {amber && <span className="text-amber-500">{amber}</span>}
      {suffix}
    </h2>
  );
}
