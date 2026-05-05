import Image from "next/image";

interface OverlappingImagesProps {
  images: string[];
  alts?: string[];
  /** Which side the larger (back) image anchors to */
  anchor?: "left" | "right";
}

/**
 * Renders two images in an overlapping stack layout.
 * Fixed container height prevents CLS.
 * Anchor controls which side the back image sits on.
 */
export default function OverlappingImages({
  images,
  alts = [],
  anchor = "left",
}: OverlappingImagesProps) {
  const isLeft = anchor === "left";

  return (
    /* Fixed dimensions → zero CLS */
    <div className="relative h-52 sm:h-64 w-full max-w-[18rem] shrink-0 mx-auto lg:mx-0">
      {/* Back image — larger, sits behind */}
      <div
        className={[
          "absolute w-44 sm:w-52 h-36 sm:h-44 rounded-xl overflow-hidden shadow-lg",
          isLeft ? "top-0 left-0" : "top-0 right-0",
        ].join(" ")}
      >
        <Image
          src={images[0]}
          alt={alts[0] ?? "Temple image"}
          fill
          sizes="(max-width: 640px) 176px, 208px"
          quality={80}
          className="object-cover"
        />
      </div>

      {/* Front image — smaller, overlaps diagonally */}
      {images[1] && (
        <div
          className={[
            "absolute w-36 sm:w-44 h-28 sm:h-36 rounded-xl overflow-hidden",
            "shadow-xl border-2 border-white",
            isLeft ? "bottom-0 right-0" : "bottom-0 left-0",
          ].join(" ")}
        >
          <Image
            src={images[1]}
            alt={alts[1] ?? "Temple image"}
            fill
            sizes="(max-width: 640px) 144px, 176px"
            quality={80}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
