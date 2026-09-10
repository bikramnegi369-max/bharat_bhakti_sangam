import Image from "next/image";
import Link from "next/link";
import { playfair, poppins } from "@/_lib/fonts";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { routes } from "@/_config/Routes.config";

export default function StatusHero() {
  return (
    <section className="relative w-full min-h-75 sm:min-h-85 md:min-h-90 flex items-center justify-start overflow-hidden bg-[#240606]">
      {/* Background Image matching mockup temple atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/festivals/slider/image-1.webp"
          alt="Bhakti Status Hero Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 brightness-95 saturate-110 scale-100"
        />
        {/* Soft gradient from left to ensure text clarity without obscuring the temple */}
        <div className="absolute inset-0 bg-linear-to-r from-[#180303]/90 via-[#220505]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#150202]/70 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 w-full">
        <div className="max-w-2xl text-left space-y-3">
          {/* Semantic Breadcrumb Navigation matching mockup */}
          <ScrollReveal animation="fade-down" duration={500}>
            <nav aria-label="Breadcrumb" className="inline-flex items-center">
              <ol className="flex items-center gap-1.5 text-xs sm:text-[13px] font-medium">
                <li>
                  <Link
                    href={routes.home}
                    className="text-stone-300 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-stone-400">
                  <ChevronRight size={13} className="opacity-70" />
                </li>
                <li>
                  <span
                    aria-current="page"
                    className="text-amber-400 font-semibold"
                  >
                    Bhakti Status
                  </span>
                </li>
              </ol>
            </nav>
          </ScrollReveal>

          {/* Main Heading with Sacred Om Accent */}
          <ScrollReveal animation="fade-right" duration={600} delay={80}>
            <div className="space-y-1">
              <h1
                className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md`}
              >
                Bhakti Status
              </h1>
              <div className="flex items-center gap-2 text-amber-400">
                <span className="text-lg sm:text-xl font-serif leading-none">
                  ॐ
                </span>
                <span className="h-0.5 w-10 bg-linear-to-r from-amber-400 to-transparent" />
              </div>
            </div>
          </ScrollReveal>

          {/* Subtitle description matching the mockup */}
          <ScrollReveal animation="fade-right" duration={600} delay={140}>
            <div
              className={`${poppins.className} space-y-0.5 text-stone-200/90 text-xs sm:text-sm md:text-[15px] font-light`}
            >
              <p className="font-normal text-amber-200/90">
                Feel the devotion, Share the divinity.
              </p>
              <p className="text-stone-300">
                Explore soulful moments, bhajans, mantras and more. Download
                9:16 vertical videos for WhatsApp, Instagram Stories & Reels.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
