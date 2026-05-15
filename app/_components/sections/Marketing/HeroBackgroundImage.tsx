import Image from "next/image";
import { preload } from "react-dom";
import {
  getCloudinaryImageSrcSet,
  getCloudinaryImageUrl,
  isCloudinaryUrl,
} from "@/_lib/helpers";

const HERO_IMAGE_SIZES = "100vw";
const HERO_IMAGE_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const HERO_FALLBACK_WIDTH = 1200;

type HeroBackgroundImageProps = {
  backgroundImage?: string;
};

export default function HeroBackgroundImage({
  backgroundImage,
}: HeroBackgroundImageProps) {
  if (!backgroundImage) {
    return null;
  }

  if (!isCloudinaryUrl(backgroundImage)) {
    return (
      <Image
        src={backgroundImage}
        alt=""
        fill
        preload
        aria-hidden="true"
        sizes={HERO_IMAGE_SIZES}
        className="object-cover object-bottom-right"
      />
    );
  }

  const src = getCloudinaryImageUrl(backgroundImage, {
    width: HERO_FALLBACK_WIDTH,
  });
  const srcSet = getCloudinaryImageSrcSet(backgroundImage, {
    widths: HERO_IMAGE_WIDTHS,
  });

  preload(src, {
    as: "image",
    imageSrcSet: srcSet,
    imageSizes: HERO_IMAGE_SIZES,
    fetchPriority: "high",
  });

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={HERO_IMAGE_SIZES}
      alt=""
      loading="eager"
      decoding="async"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-bottom-right"
    />
  );
}
