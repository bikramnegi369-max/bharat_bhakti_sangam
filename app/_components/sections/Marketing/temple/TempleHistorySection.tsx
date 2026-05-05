import OverlappingImages from "./OverlappingImages";
import SectionHeading from "./SectionHeading";

interface TempleHistorySectionProps {
  title: string;            // e.g. "History of Shri Badrinath Temple"
  description: string;      // may contain HTML entities like &rsquo;
  historyImages: string[];  // temple.history.historyImages — 1 or 2 images
}

/**
 * History section.
 * Mobile  → text stacked above images.
 * Desktop → text on LEFT, images on RIGHT (same as features).
 *
 * `dangerouslySetInnerHTML` is safe here because description comes from
 * your own static constants file — never from user input.
 */
export default function TempleHistorySection({
  title,
  description,
  historyImages,
}: TempleHistorySectionProps) {
  return (
    <section
      className="py-10 border-t border-stone-100"
      aria-labelledby="history-heading"
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-8 lg:hidden">
        <div className="space-y-4">
          <SectionHeading title={title} accentStrategy="before-last-word" />
          <p
            className="text-stone-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {historyImages.length > 0 && (
          <OverlappingImages images={historyImages} anchor="left" />
        )}
      </div>

      {/* ── Desktop layout: text left, images right ── */}
      <div className="hidden lg:flex items-start gap-16">
        <div className="flex-1 space-y-5">
          <SectionHeading title={title} accentStrategy="before-last-word" />
          <p
            className="text-stone-600 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {historyImages.length > 0 && (
          <OverlappingImages images={historyImages} anchor="right" />
        )}
      </div>
    </section>
  );
}
