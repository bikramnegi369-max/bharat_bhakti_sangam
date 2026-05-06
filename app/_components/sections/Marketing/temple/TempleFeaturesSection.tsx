import OverlappingImages from "../../../common/OverlappingImages";
import SectionHeading from "./SectionHeading";

interface TempleFeaturesSectionProps {
  title: string; // e.g. "Features of Konark Sun Temple"
  featuresList: string[];
  featuresImages: string[]; // exactly 2 from Temple type
}

/**
 * Features section.
 * Mobile  → text stacked above images (full width).
 * Desktop → text on LEFT, images on RIGHT (text-left layout).
 */
export default function TempleFeaturesSection({
  title,
  featuresList,
  featuresImages,
}: TempleFeaturesSectionProps) {
  return (
    <section
      className="py-10 border-t border-stone-100"
      aria-labelledby="features-heading"
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-8 lg:hidden">
        <div className="space-y-4">
          <SectionHeading title={title} accentStrategy="after-of" />
          <FeatureBullets items={featuresList} />
        </div>
        <OverlappingImages images={featuresImages} anchor="left" />
      </div>

      {/* ── Desktop layout: text left, images right ── */}
      <div className="hidden lg:flex items-start gap-16">
        <div className="flex-1 space-y-5">
          <SectionHeading title={title} accentStrategy="after-of" />
          <FeatureBullets items={featuresList} />
        </div>
        <OverlappingImages images={featuresImages} anchor="left" />
      </div>
    </section>
  );
}

function FeatureBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-stone-600 text-sm sm:text-base leading-relaxed"
        >
          <span className="text-amber-500 shrink-0 mt-0.5" aria-hidden="true">
            •
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
