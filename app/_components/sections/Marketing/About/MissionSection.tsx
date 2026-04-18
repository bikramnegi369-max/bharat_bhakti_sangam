import { cinzel } from "@/_lib/fonts";
import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid lg:grid-cols-2 gap-[clamp(1.25rem,calc(0.75rem+2.5vw),3rem)] items-center">
        {/* TEXT CONTENT */}
        <div>
          <div className="flex justify-center items-center gap-2">
            <h2
              className={`${cinzel.className} text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold uppercase tracking-widest text-heading text-center`}
            >
              Our
            </h2>

            <h2
              className={`${cinzel.className} text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] text-primary font-bold leading-widest text-center`}
            >
              Mission
            </h2>
          </div>

          <div className="mt-6 text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)] text-para text-lg leading-relaxed text-center flex flex-col gap-4">
            <span>
              Our mission is to create a new-age devotional experience where
              people can chant, celebrate, connect, and feel spiritual energy
              together through immersive bhajan clubbing concerts, interactive
              kirtan sessions, and modern bhakti music festivals across India.
            </span>
            <span>
              We aim to build a community where spirituality feels joyful,
              inclusive, and alive for everyone — especially the younger
              generation.
            </span>
          </div>
        </div>

        {/* IMAGE */}
        <div className="relative w-[clamp(15.813rem,calc(10.491rem+26.607vw),34.438rem)] h-[clamp(10.313rem,calc(6.866rem+17.232vw),22.375rem)] rounded-lg overflow-hidden mx-auto group aspect-video border-3 border-primary">
          <Image
            src="/about_mission.webp"
            alt="Our Mission"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />

          {/* Glow Layer */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>
      </div>
    </section>
  );
}
