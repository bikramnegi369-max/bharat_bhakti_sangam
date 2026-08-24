import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import { Sparkles, MapPin, Clock, Compass } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";

export default function TempleListHero() {
  return (
    <section className="relative w-full min-h-125 md:min-h-140 lg:min-h-150 flex items-center justify-start overflow-hidden bg-[#240606]">
      {/* Background Image with Dark Vignette Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/temples-images/vishwanath/vishwanath-hero.webp"
          alt="Famous Temples of India sacred hero banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 brightness-90 saturate-125"
        />
        {/* Multilayered Devotional Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-[#200404]/98 via-[#2b0707]/85 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1b0303] via-transparent to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_60%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl text-left space-y-5">
          {/* Eyebrow Pill */}
          <ScrollReveal animation="fade-down" duration={700}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sacred Sanatana Pilgrimage & Heritage Shrines</span>
            </div>
          </ScrollReveal>

          {/* Main Heading */}
          <ScrollReveal animation="fade-right" duration={800} delay={80}>
            <h1
              className={`${playfair.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md`}
            >
              Famous{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-400 to-amber-500">
                Temples
              </span>{" "}
              <br className="hidden sm:inline" />
              of Bharat
            </h1>
          </ScrollReveal>

          {/* Subtitle / Description */}
          <ScrollReveal animation="fade-up" duration={800} delay={140}>
            <p
              className={`${poppins.className} text-stone-200/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-light`}
            >
              Journey through the divine sanctums of India — from the snow-clad
              Himalayan Jyotirlingas to the towering Dravidian Gopurams, each
              standing as an eternal bastion of faith, architecture, and spiritual
              awakening.
            </p>
          </ScrollReveal>

          {/* Interactive Pilgrim Assurance Pills */}
          <ScrollReveal animation="fade-up" duration={800} delay={200}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>12 Jyotirlingas & Char Dham</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily Aarti & Darshan Timings</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
                <Compass className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Complete Travel & Yatra Guides</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs sm:text-sm font-medium shadow-sm hover:bg-white/15 transition-colors">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pan-India Heritage</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
