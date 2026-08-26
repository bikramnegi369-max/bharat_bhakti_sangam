import Image from "next/image";
import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";

type BlogHeroProps = {
  title?: string;
  subtitle?: string;
  categoryTag?: string;
};

export default function BlogHero({
  title = "Bharat Bhakti Journal",
  subtitle = "Chronicles of Devotion, Sacred Melodies & Eternal Cultural Gatherings",
  categoryTag = "DEVOTION, CULTURE & LIVING TRADITIONS",
}: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#2D0B0A] text-white py-16 sm:py-20 lg:py-28">
      {/* Background Sacred Atmosphere Image */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/home_hero.webp"
          alt="Bharat Bhakti Temple Journal Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />

        {/* Ambient Rich Crimson and Charcoal Scrim */}
        <div className="absolute inset-0 bg-linear-to-b from-[#2A0503]/95 via-[#4A0A08]/85 to-[#240403]/98" />

        {/* Subtle Radial Glow in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-[#D4AF37]/15 blur-[90px] rounded-full pointer-events-none" />

        {/* Glowing OM Watermark in center-backdrop */}
        <div
          aria-hidden="true"
          className={`${playfair.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl sm:text-9xl lg:text-[14rem] font-bold text-[#E5A93C]/10 blur-[1px] select-none pointer-events-none`}
        >
          ॐ
        </div>

        {/* Bottom edge blending gradient */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-linear-to-t from-secondary to-transparent" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Tagline Badge */}
        <ScrollReveal animation="fade-down" duration={600} delay={0}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#740E0A]/40 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5A93C] animate-pulse" />
            <p
              className={`${poppins.className} text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#FDE68A]`}
            >
              {categoryTag}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Journal Title */}
        <ScrollReveal animation="fade-up" duration={800} delay={100}>
          <h1
            className={`${playfair.className} mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFF8F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight`}
          >
            {title}
          </h1>
        </ScrollReveal>

        {/* Decorative Golden Line with Mandala motif */}
        <ScrollReveal animation="scale-up" duration={700} delay={200}>
          <div className="mt-4 flex items-center justify-center gap-3 w-full max-w-xs">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-serif">✦ ॐ ✦</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
          </div>
        </ScrollReveal>

        {/* Subtitle / Description */}
        <ScrollReveal animation="fade-up" duration={800} delay={280}>
          <p
            className={`${poppins.className} mt-5 max-w-2xl text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#F3E8E2]/90 sm:leading-relaxed`}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
