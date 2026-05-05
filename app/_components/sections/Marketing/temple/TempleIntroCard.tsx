import Image from "next/image";
import { cinzel } from "@/_lib/fonts";

interface TempleIntroCardProps {
  name: string;
  description: string;
  /** temple.descriptionImages — exactly 2 URLs */
  descriptionImages: string[];
}

/**
 * Amber-bordered intro card that appears directly below the hero.
 * On mobile: card stacked above overlapping images.
 * On desktop: card centred, images below it (matching reference UI).
 */
export default function TempleIntroCard({
  name,
  description,
  descriptionImages,
}: TempleIntroCardProps) {
  return (
    <section
      className="mx-4 sm:mx-6 lg:mx-auto lg:max-w-3xl my-8 space-y-8"
      aria-label="Temple introduction"
    >
      {/* Bordered intro card */}
      <div className="border border-amber-300 rounded-2xl bg-amber-50/70 px-6 py-8 text-center shadow-sm">
        <h1
          className={`${cinzel.className} text-xl sm:text-2xl lg:text-3xl font-bold text-amber-600 leading-snug`}
        >
          {name}
        </h1>
        <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Overlapping description images */}
      {descriptionImages.length > 0 && (
        <div className="lg:hidden relative h-52 sm:h-64 w-full max-w-[18rem] shrink-0 mx-auto">
          {/* Back image */}
          <div className="absolute top-0 left-0 w-40 sm:w-48 h-36 sm:h-44 rounded-tl-4xl overflow-hidden shadow-lg">
            <Image
              src={descriptionImages[0]}
              alt={`${name} view 1`}
              fill
              sizes="(max-width: 640px) 160px, 192px"
              quality={80}
              className="object-cover"
            />
          </div>
          {/* Front image — overlaps bottom-right */}
          {descriptionImages[1] && (
            <div className="absolute bottom-0 right-0 w-40 sm:w-48 h-36 sm:h-44 rounded-br-4xl overflow-hidden shadow-xl border-2 border-white">
              <Image
                src={descriptionImages[1]}
                alt={`${name} view 2`}
                fill
                sizes="(max-width: 640px) 144px, 176px"
                quality={80}
                className="object-cover"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
