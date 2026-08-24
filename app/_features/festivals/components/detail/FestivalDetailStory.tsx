import Image from "next/image";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";

export default function FestivalDetailStory({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  const sections = [
    {
      key: "about",
      title: festival.aboutStory.title,
      paragraphs: festival.aboutStory.paragraphs,
      image: festival.aboutStory.image,
      imageAlt: festival.aboutStory.imageAlt || festival.aboutStory.title,
      imageFirst: false, // Text left, Image right (Section 1: rounded Top-Left & Bottom-Right)
      cornerStyle:
        "rounded-tl-[80px] sm:rounded-tl-[110px] md:rounded-tl-[130px] rounded-br-[80px] sm:rounded-br-[110px] md:rounded-br-[130px] rounded-tr-2xl rounded-bl-2xl",
    },
    {
      key: "history",
      title: festival.historyStory.title,
      paragraphs: festival.historyStory.paragraphs,
      image: festival.historyStory.image,
      imageAlt: festival.historyStory.imageAlt || festival.historyStory.title,
      imageFirst: true, // Image left, Text right (Section 2: alternate: rounded Top-Right & Bottom-Left)
      cornerStyle:
        "rounded-tr-[80px] sm:rounded-tr-[110px] md:rounded-tr-[130px] rounded-bl-[80px] sm:rounded-bl-[110px] md:rounded-bl-[130px] rounded-tl-2xl rounded-br-2xl",
    },
    ...(festival.legendStory
      ? [
          {
            key: "legend",
            title: festival.legendStory.title,
            paragraphs: festival.legendStory.paragraphs,
            image: festival.legendStory.image,
            imageAlt: festival.legendStory.imageAlt || festival.legendStory.title,
            imageFirst: false, // Text left, Image right (Section 3: alternate: rounded Top-Left & Bottom-Right)
            cornerStyle:
              "rounded-tl-[80px] sm:rounded-tl-[110px] md:rounded-tl-[130px] rounded-br-[80px] sm:rounded-br-[110px] md:rounded-br-[130px] rounded-tr-2xl rounded-bl-2xl",
          },
        ]
      : []),
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-[#FFFDF9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {sections.map((sec) => (
          <div
            key={sec.key}
            className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-14 ${
              sec.imageFirst ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text Side */}
            <div className="w-full lg:w-1/2 space-y-4 text-left">
              <h2
                className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading leading-tight`}
              >
                {sec.title}
              </h2>

              <div className="space-y-3.5">
                {sec.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={`${poppins.className} text-stone-600 text-sm sm:text-base leading-relaxed font-normal`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Image Side with Alternating Diagonal Curved Leaf Framing */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div
                className={`relative w-full max-w-md aspect-4/3 sm:aspect-16/11 overflow-hidden shadow-xl border border-amber-100/90 group ${sec.cornerStyle}`}
              >
                <Image
                  src={sec.image}
                  alt={sec.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
