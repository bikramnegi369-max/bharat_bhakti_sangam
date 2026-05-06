import OverlappingImages from "@/_components/common/OverlappingImages";
import { cinzel } from "@/_lib/fonts";
import { FestivalSection } from "@/_types/festivals.types";

export default function festivalSection({
  title,
  description,
  images,
  descriptionAnchor = "left",
}: FestivalSection) {
  return (
    <section className="py-5" aria-labelledby="festival-heading">
      <div className="hidden lg:flex flex-col lg:flex-row gap-8 lg:gap-16">
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
      <div className="lg:hidden flex flex-col gap-16 ">
        <div className="space-y-4 text-center lg:text-start">
          <h2
            id="festival-heading"
            className={`${cinzel.className} text-amber-500 text-2xl font-bold leading-snug `}
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
      </div>
    </section>
  );
}
