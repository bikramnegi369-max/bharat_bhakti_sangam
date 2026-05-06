import OverlappingImages from "@/_components/common/OverlappingImages";
import { cinzel } from "@/_lib/fonts";

type FestivalSectionProps = {
  title: string;
  description: string;
  images: string[];
  descriptionAnchor?: "left" | "right"; // default to "left"
};

export default function festivalSection({
  title,
  description,
  images,
  descriptionAnchor = "left",
}: FestivalSectionProps) {
  return (
    <section className="py-10" aria-labelledby="festival-heading">
      <div className="flex flex-col lg:flex-row gap-8">
        {descriptionAnchor === "left" ? (
          <>
            <div className="space-y-4">
              <h2
                id="festival-heading"
                className={`${cinzel.className} text-amber-500 text-2xl font-bold leading-snug`}
              >
                {title}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>
            {images.length > 0 && (
              <OverlappingImages images={images} anchor="left" />
            )}
          </>
        ) : (
          <>
            {images.length > 0 && (
              <OverlappingImages images={images} anchor="left" />
            )}
            <div className="space-y-4">
              <h2
                id="festival-heading"
                className={`${cinzel.className} text-amber-500 text-2xl font-bold leading-snug`}
              >
                {title}
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
