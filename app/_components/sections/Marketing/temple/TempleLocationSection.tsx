import OverlappingImages from "../../../common/OverlappingImages";
import SectionHeading from "./SectionHeading";

interface TempleLocationSectionProps {
  title: string;           // e.g. "Konark Sun Temple Location"
  description: string;
  locationImages: string[]; // temple.location.locationImages — exactly 2
}

/**
 * Location section.
 * Mobile  → text stacked above images.
 * Desktop → images on LEFT, text on RIGHT (flipped from features).
 */
export default function TempleLocationSection({
  title,
  description,
  locationImages,
}: TempleLocationSectionProps) {
  return (
    <section
      className="py-10 border-t border-stone-100"
      aria-labelledby="location-heading"
    >
      {/* ── Mobile layout ── */}
      <div className="flex flex-col gap-8 lg:hidden">
        <div className="space-y-4">
          <SectionHeading title={title} accentStrategy="first-word" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <OverlappingImages images={locationImages} anchor="left" />
      </div>

      {/* ── Desktop layout: images left, text right ── */}
      <div className="hidden lg:flex items-start gap-16">
        <OverlappingImages images={locationImages} anchor="left" />
        <div className="flex-1 space-y-5">
          <SectionHeading title={title} accentStrategy="first-word" />
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
