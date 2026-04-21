import Image from "next/image";
import clsx from "clsx";
import { cinzel } from "@/_lib/fonts";

type Artist = {
  name: string;
  description: string;
  images: string[];
};

type AboutArtistsDetailedSectionProps = {
  title?: string;
  highlightWord?: string;
  artists?: Artist[];
};

export default function AboutArtistsDetailedSection({
  title = "About Artist",
  highlightWord = "Artist",
  artists = [
    {
      name: "SACHET–PARAMPARA",
      description:
        "A powerful musical duo known for blending traditional bhajans with contemporary beats. Their devotional songs have strong emotional depth and are very popular among young listeners.",
      images: [
        "/artists/sachet_parampara/image1.png",
        "/artists/sachet_parampara/image2.png",
      ],
    },
    {
      name: "HANSRAJ RAGHUWANSHI",
      description:
        "Famous for Shiva bhajans like Mera Bhola Hai Bhandari, he brings a folk + spiritual energy that connects deeply with audiences.",
      images: [
        "/artists/hansraj_raghuwanshi/image1.png",
        "/artists/hansraj_raghuwanshi/image2.png",
      ],
    },
  ],
}: AboutArtistsDetailedSectionProps) {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Heading */}
        <h2
          className={clsx(
            "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-10 lg:mb-16 text-center",
            cinzel.className,
          )}
        >
          {title.split(highlightWord)[0]}
          <span className="text-primary">{highlightWord}</span>
        </h2>

        {/* Artists */}
        <div className="space-y-16 lg:space-y-24">
          {artists.map((artist, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={clsx(
                  "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 place-items-center",
                  isReverse && "lg:[&>div:first-child]:order-2",
                )}
              >
                {/* TEXT */}
                <div
                  className={clsx(
                    "max-w-lg text-center lg:text-left",
                    isReverse && "lg:ml-auto lg:text-right",
                  )}
                >
                  <h3 className="text-primary font-semibold tracking-[0.2em] mb-4 text-[clamp(1rem,calc(0.857rem+0.714vw),1.5rem)]">
                    {artist.name}
                  </h3>

                  <p className="text-para leading-relaxed text-[clamp(0.906rem,calc(0.822rem+0.42vw),1.2rem)]">
                    {artist.description}
                  </p>
                </div>

                {/* IMAGES */}
                <div className="w-full">
                  {/* Mobile (NO overflow, clean stacking) */}
                  <div className="grid gap-8 lg:hidden place-items-center">
                    {artist.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative w-[clamp(15.875rem,calc(13.482rem+11.964vw),24.25rem)] h-[clamp(8.875rem,calc(7.536rem+6.696vw),13.563rem)] rounded-lg overflow-hidden border-2 border-primary"
                      >
                        <Image
                          src={img}
                          alt={`${artist.name}-${i}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 90vw, 45vw"
                          loading={index === 0 && i === 0 ? undefined : "lazy"}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Desktop (staggered layout) */}
                  {artist.images.length >= 2 && (
                    <div className="hidden lg:block relative h-[clamp(25rem,calc(15.769rem+14.423vw),28.75rem)]">
                      {/* Image 1 */}
                      <div className="absolute left-0 top-0 w-[clamp(15.875rem,calc(13.482rem+11.964vw),24.25rem)] h-[clamp(8.875rem,calc(7.536rem+6.696vw),13.563rem)] rounded-lg overflow-hidden border-2 border-primary shadow-md group">
                        <Image
                          src={artist.images[0]}
                          alt={`${artist.name}-1`}
                          fill
                          sizes="(max-width: 1024px) 90vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Image 2 */}
                      <div className="absolute right-0 bottom-0 w-[clamp(15.875rem,calc(13.482rem+11.964vw),24.25rem)] h-[clamp(8.875rem,calc(7.536rem+6.696vw),13.563rem)] rounded-lg overflow-hidden border-2 border-primary shadow-md group">
                        <Image
                          src={artist.images[1]}
                          alt={`${artist.name}-2`}
                          fill
                          sizes="(max-width: 1024px) 90vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  )}

                  {artist.images.length === 1 && (
                    <div className="hidden lg:block relative h-[clamp(16rem,calc(12rem+8vw),20rem)]">
                      <div className="absolute inset-x-0 top-0 mx-auto w-[clamp(15.875rem,calc(13.482rem+11.964vw),24.25rem)] h-[clamp(8.875rem,calc(7.536rem+6.696vw),13.563rem)] rounded-lg overflow-hidden border-2 border-primary shadow-md group">
                        <Image
                          src={artist.images[0]}
                          alt={`${artist.name}-1`}
                          fill
                          sizes="(max-width: 1024px) 90vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
