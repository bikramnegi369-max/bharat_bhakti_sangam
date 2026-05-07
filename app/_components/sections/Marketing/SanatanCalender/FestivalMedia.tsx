import Image from "next/image";
import { getCloudinaryImageUrl, isCloudinaryUrl } from "@/_lib/helpers";

type FestivalMediaProps = {
  festival: string;
  image?: string;
};

function getFestivalInitials(festival: string) {
  return festival
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function getFestivalImageSrc(image: string) {
  return isCloudinaryUrl(image)
    ? getCloudinaryImageUrl(image, { width: 160 })
    : image;
}

export default function FestivalMedia({
  festival,
  image,
}: FestivalMediaProps) {
  if (!image) {
    return (
      <div
        aria-hidden="true"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary_light text-primary shadow-sm"
        title={festival}
      >
        <span className="text-lg font-bold tracking-wide">
          {getFestivalInitials(festival)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/20 bg-primary_light shadow-sm">
      <Image
        src={getFestivalImageSrc(image)}
        alt={festival}
        fill
        sizes="64px"
        className="object-cover"
      />
    </div>
  );
}
