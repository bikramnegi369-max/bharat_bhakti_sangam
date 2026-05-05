// CarouselSlide.tsx
import Image from "next/image";

export default function CarouselSlide({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  return (
    <div className="relative h-[clamp(14.375rem,calc(6.339rem+40.179vw),42.5rem)] w-full overflow-hidden">
      <div className="parallax absolute inset-0 scale-110">
        <Image
          src={src}
          alt={title ?? ""}
          fill
          priority
          className="object-cover"
        />
      </div>

      {title && (
        <div className="absolute bottom-10 left-10 text-white text-3xl z-10">
          {title}
        </div>
      )}
    </div>
  );
}
