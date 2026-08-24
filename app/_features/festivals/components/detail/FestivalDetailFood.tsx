import Image from "next/image";
import { FestivalDetailData } from "@/_types/festivals.types";
import { playfair, poppins } from "@/_lib/fonts";
import { Utensils } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";

export default function FestivalDetailFood({
  festival,
}: {
  festival: FestivalDetailData;
}) {
  return (
    <section className="w-full py-14 md:py-20 bg-[#FFFDF9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <ScrollReveal animation="fade-down" duration={700}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>Culinary Traditions</span>
            </div>

            <h2
              className={`${playfair.className} text-3xl sm:text-4xl font-bold text-heading leading-tight`}
            >
              {festival.traditionalFoods.title}
            </h2>

            {festival.traditionalFoods.subtitle && (
              <p
                className={`${poppins.className} text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed`}
              >
                {festival.traditionalFoods.subtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* 2-Column Split: Circular Delicacy Badges on Left, Showcase Image on Right */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Circular Badges Grid */}
          <div className="w-full lg:w-5/12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-center">
            {festival.traditionalFoods.items.map((food, index) => (
              <ScrollReveal
                key={index}
                animation="scale-up"
                duration={650}
                delay={index * 90}
              >
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-300 shadow-md group-hover:scale-105 group-hover:border-amber-500 transition-all duration-300 bg-amber-50">
                    <Image
                      src={food.image || festival.traditionalFoods.showcaseImage}
                      alt={food.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center group-hover:rotate-3 transition-transform duration-500"
                    />
                  </div>
                  <span
                    className={`${poppins.className} text-xs sm:text-sm font-semibold text-stone-800 mt-2 group-hover:text-primary transition-colors`}
                  >
                    {food.name}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Showcase Image with Alternate Curved Shape */}
          <div className="w-full lg:w-7/12 flex justify-center">
            <ScrollReveal
              animation="scale-up"
              duration={850}
              delay={150}
              className="w-full flex justify-center"
            >
              <div className="relative w-full aspect-16/10 rounded-tl-[80px] sm:rounded-tl-[110px] md:rounded-tl-[130px] rounded-br-[80px] sm:rounded-br-[110px] md:rounded-br-[130px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-xl border border-amber-200/90 group">
                <Image
                  src={festival.traditionalFoods.showcaseImage}
                  alt={festival.traditionalFoods.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
