import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
};

export default function CarouselSlide({ src, alt }: Props) {
  return (
    <div className="w-full relative overflow-hidden aspect-video sm:aspect-21/9">
      <div className="parallax h-full w-full">
        <div className="parallax__layer relative h-full w-full">
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            className="object-cover scale-110"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
