import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Sparkles, Calendar, Heart, MapPin } from "lucide-react";

export default function FestivalHero() {
  return (
    <section className="relative w-full min-h-[460px] md:min-h-[520px] lg:min-h-[560px] flex items-center justify-start overflow-hidden bg-[#240606]">
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/festivals/slider/image-1.webp"
          alt="Famous Festivals of India hero banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 brightness-90 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#200404]/95 via-[#2b0707]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0303] via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl text-left space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sacred Celebrations of Sanatana Dharma</span>
          </div>

          {/* Main Heading */}
          <h1
            className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md`}
          >
            Famous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
              Festivals
            </span>{" "}
            of India
          </h1>

          {/* Subtitle / Description */}
          <p
            className={`${poppins.className} text-stone-200/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light`}
          >
            Celebrate the divine tapestry of India&apos;s timeless sacred
            festivals, spiritual traditions, colorful harvests, and joyous
            community gatherings.
          </p>

          {/* Interactive Feature Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Panchang Timings</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Sacred Rituals</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Pan-India Heritage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
