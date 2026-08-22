import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import type { Temple } from "@/_types/Temples.types";

interface TempleAboutStoryProps {
  temple: Temple;
}

export default function TempleAboutStory({ temple }: TempleAboutStoryProps) {
  const introImage =
    temple.descriptionImages?.[0] ||
    temple.heroImage ||
    "/temples-images/vishwanath/description/vishwanath-desc-1.webp";

  const firstLetter = temple.description.charAt(0);
  const restOfFirstSentence = temple.description.slice(1);

  return (
    <section
      className="py-16 sm:py-20 border-b border-stone-200/60"
      aria-labelledby="about-temple-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill Badge */}
        <div className="flex items-center gap-2 mb-8">
          <span
            className={`${playfair.className} text-[20px] sm:text-[24px] font-bold uppercase tracking-[2.4px] leading-8 text-primary border-b-2 border-amber-500 pb-1 align-middle`}
          >
            ABOUT {temple.name.toUpperCase()}
          </span>
        </div>

        {/* Section Heading */}
        <div className="mb-8">
          <span
            className={`${poppins.className} block text-[11px] font-semibold tracking-widest text-amber-600/80 uppercase mb-1`}
          >
            01 OVERVIEW
          </span>
          <h2
            id="about-temple-heading"
            className={`${playfair.className} text-2xl sm:text-4xl font-bold text-primary leading-tight tracking-tight`}
          >
            A Timeless Shrine <br className="hidden sm:inline" />
            of Eternal Faith
          </h2>
        </div>

        {/* 2-Column Grid: Text + Arch Cutout Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Narrative with Drop-Cap, Pills & Quote */}
          <div className="lg:col-span-7 space-y-6">
            {/* Drop-Cap Description */}
            <p
              className={`${poppins.className} text-stone-700 text-sm sm:text-base leading-relaxed font-normal text-justify sm:text-left`}
            >
              <span
                className={`${playfair.className} float-left text-5xl sm:text-6xl font-bold text-amber-700 leading-none mr-3 mt-1`}
              >
                {firstLetter}
              </span>
              {restOfFirstSentence}
            </p>

            {/* Additional paragraph if available */}
            {temple.history?.description && (
              <p
                className={`${poppins.className} text-stone-600 text-sm sm:text-base leading-relaxed`}
                dangerouslySetInnerHTML={{
                  __html: temple.history.description.slice(0, 240) + "...",
                }}
              />
            )}

            {/* Feature Stat Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {temple.statsPills?.map((pill, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50 border border-amber-200/80 text-amber-800 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide shadow-2xs"
                >
                  {pill}
                </div>
              ))}
            </div>

            {/* Spiritual Quote Callout Box */}
            {temple.spiritualQuote && (
              <div className="border-l-4 border-amber-500 bg-amber-50/50 p-4 sm:p-5 rounded-r-xl mt-6">
                <blockquote
                  className={`${playfair.className} italic text-stone-800 text-sm sm:text-base leading-relaxed`}
                >
                  &ldquo;{temple.spiritualQuote.quote}&rdquo;
                </blockquote>
                <p
                  className={`${poppins.className} text-xs font-semibold text-amber-700 mt-2 tracking-wider uppercase`}
                >
                  — {temple.spiritualQuote.author}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Indian Temple Jharokha Arch Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-85 sm:max-w-95 aspect-4/5 p-2 bg-linear-to-b from-amber-200 via-amber-100 to-amber-300 rounded-t-[140px] rounded-b-2xl shadow-2xl">
              <div className="relative w-full h-full rounded-t-[132px] rounded-b-xl overflow-hidden border-2 border-amber-400/80 bg-stone-950">
                <Image
                  src={introImage}
                  alt={`${temple.name} Aarti and Darshan`}
                  fill
                  sizes="(max-width: 640px) 320px, 380px"
                  quality={85}
                  className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
