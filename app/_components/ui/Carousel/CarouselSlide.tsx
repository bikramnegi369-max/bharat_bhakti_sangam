import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
};

export default function CarouselSlide({ src, alt, priority = false }: Props) {
  return (
    <div className="w-full relative overflow-hidden aspect-video sm:aspect-21/9">
      <div className="parallax h-full w-full">
        <div className="parallax__layer relative h-full w-full">
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            className="object-cover scale-110"
            priority={priority}
            sizes="100vw"
            quality={75}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>
    </div>
  );
}
