import Image from "next/image";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";
import { Camera } from "lucide-react";

export default function FestivalDetailMoments({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  if (!festival.momentsGallery || festival.momentsGallery.items.length === 0) {
    return null;
  }

  // Alternating corner styles for each sequential moment card
  const getCardCornerStyle = (index: number) => {
    return index % 2 === 0
      ? "rounded-tl-[40px] sm:rounded-tl-[50px] rounded-br-[40px] sm:rounded-br-[50px] rounded-tr-xl rounded-bl-xl"
      : "rounded-tr-[40px] sm:rounded-tr-[50px] rounded-bl-[40px] sm:rounded-bl-[50px] rounded-tl-xl rounded-br-xl";
  };

  return (
    <section className="w-full py-12 md:py-16 bg-[#FFFDF9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Highlights</span>
          </div>
          <h2
            className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading`}
          >
            {festival.momentsGallery.title}
          </h2>
        </div>

        {/* 5-Card Moments Grid with Alternating Diagonal Leaf Shapes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {festival.momentsGallery.items.map((moment, index) => (
            <div
              key={index}
              className={`group flex flex-col bg-white border border-amber-100/90 shadow-2xs hover:shadow-md overflow-hidden transition-all duration-300 ${getCardCornerStyle(
                index,
              )}`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 text-center bg-white">
                <span
                  className={`${poppins.className} text-xs font-semibold text-stone-700 group-hover:text-primary transition-colors`}
                >
                  {moment.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
