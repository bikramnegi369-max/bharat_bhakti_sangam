"use client";

import { Cinzel } from "next/font/google";
import clsx from "clsx";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

type AboutEventSectionProps = {
  description?: string;
  instruments?: string[];
  hashtags?: string[];
};

export default function AboutEventSection({
  description = "An enchanting night of Krishna bhajans, featuring traditional instruments and soul-stirring Maha Mantra kirtan. Open to all devotees.",
  instruments = ["Sitar", "Tabla", "Guitar", "Harmonium"],
  hashtags = [
    "#bhajan",
    "#bhajanclubbing",
    "#devotionalmusic",
    "#kirtan",
    "#krishna",
    "#livemusic",
    "#spiritualvibes",
    "#VIP",
    "#GeneralStanding",
  ],
}: AboutEventSectionProps) {
  return (
    <section className="h-full">
      <div className="h-full border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light flex flex-col">
        {/* Heading */}
        <h2
          className={clsx(
            "text-[clamp(1.25rem,calc(0.982rem+1.339vw),2.188rem)] font-bold mb-6",
            cinzel.className,
          )}
        >
          About the <span className="text-primary">event</span>
        </h2>

        {/* Description */}
        <p className="text-para text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)] font-medium leading-relaxed">
          {description}
        </p>

        {/* Instruments */}
        {instruments.length > 0 && (
          <div className="mt-8">
            <p className="font-semibold text-para text-[clamp(0.813rem,calc(0.652rem+0.804vw),1.375rem)] mb-3 uppercase">
              Instruments
            </p>

            <div className="flex flex-wrap gap-3">
              {instruments.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 rounded-full border border-primary bg-secondary text-para text-[clamp(0.563rem,calc(0.455rem+0.536vw),0.938rem)] font-medium hover:bg-primary/10 transition"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {hashtags.length > 0 && (
          <>
            <div className="my-8 h-px w-full bg-para/30" />

            <div>
              <div className="flex flex-wrap gap-3">
                {hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full border border-heading text-para text-[clamp(0.563rem,calc(0.455rem+0.536vw),0.938rem)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
