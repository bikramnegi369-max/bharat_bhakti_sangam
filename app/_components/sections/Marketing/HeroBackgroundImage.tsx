"use client";

import Image from "next/image";
import { cloudinaryImageLoader, isCloudinaryUrl } from "@/_lib/helpers";

type HeroBackgroundImageProps = {
  backgroundImage?: string;
};

export default function HeroBackgroundImage({
  backgroundImage,
}: HeroBackgroundImageProps) {
  if (!backgroundImage) {
    return null;
  }

  const shouldUseCloudinaryLoader = isCloudinaryUrl(backgroundImage);

  return (
    <Image
      src={backgroundImage}
      alt=""
      fill
      loader={shouldUseCloudinaryLoader ? cloudinaryImageLoader : undefined}
      priority
      fetchPriority="high"
      aria-hidden="true"
      sizes="100vw"
      className="object-cover object-center"
      quality={50}
    />
  );
}
