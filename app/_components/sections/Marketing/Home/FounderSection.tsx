import { playfair, poppins } from "@/_lib/fonts";
import { CTAButton } from "@/_components/ui/CTAButton";
import Image from "next/image";

interface FounderSectionProps {
  name?: string;
  role?: string;
  imageSrc?: string;
  quote?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FounderSection({
  name = "Deepak Kothari",
  role = "Our Founder",
  imageSrc = "/founder.webp",
  quote = "Our Culture is not just our Past, it is our Eternal Inspiration.",
  description = "A visionary leader, spiritual guide and the heart behind Bharat Bhakti Sangam. His mission is to spread devotion, preserve our cultural heritage and bring people together through the power of bhakti.",
  ctaHref = "/about",
  ctaLabel = "Know more",
}: FounderSectionProps) {
  return (
    <section className="relative overflow-x-clip py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      {/* Rotated Mandala Background Image overflowing top & anchored to right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 sm:-top-44 md:-top-56 -right-42 lg:-right-72 w-115 sm:w-140 md:w-175 lg:w-200 aspect-16/10 opacity-35 rotate-90 select-none z-0"
      >
        <Image
          src="/welcome_bg.webp"
          alt=""
          fill
          className="object-contain object-right"
          priority={false}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Framed Arch Image & Floating Quote Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-105 sm:max-w-115 pb-8 sm:pb-10">
            {/* Outer Arch Border Frame */}
            <div className="relative p-2.5 sm:p-3.5 rounded-t-full rounded-b-none border-2 border-[#F7DCB1] bg-[#FAF6F0]/50">
              {/* Inner Image Container with Arch Mask */}
              <div className="relative w-full aspect-4/5 rounded-t-full rounded-b-none overflow-hidden bg-[#ECE4D8]">
                <Image
                  src={imageSrc}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 440px, 460px"
                  priority={false}
                />
              </div>
            </div>

            {/* Floating Quote Card */}
            <div
              className="absolute bottom-0 -left-2 sm:-bottom-2 sm:-left-6 w-[80%] sm:w-[72%] max-w-70 sm:max-w-77.5 bg-primary text-white p-5 sm:p-6 rounded-2xl shadow-[0_20px_40px_rgba(63,6,5,0.28)] transition-transform duration-300 hover:-translate-y-1 z-20"
              aria-label="Founder Quote"
            >
              {/* Decorative Quotation Mark Icon */}
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-white/50 mb-2.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="text-xs sm:text-sm italic font-normal leading-relaxed text-white/95 tracking-wide">
                &ldquo;{quote}&rdquo;
              </blockquote>

              {/* Accent Line */}
              <div className="w-8 h-1 bg-white/70 rounded-full mt-3.5" />
            </div>
          </div>
        </div>

        {/* Right Column: Founder Details & Biography */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <h2
            className={`${playfair.className} text-[clamp(2.25rem,4vw,3.25rem)] text-heading font-medium leading-tight tracking-tight`}
          >
            {role}
          </h2>

          <h3
            className={`${poppins.className} mt-1 sm:mt-2 text-[clamp(1.125rem,1.8vw,1.375rem)] font-medium text-sub_text`}
          >
            {name}
          </h3>

          <p className="mt-5 sm:mt-6 text-[clamp(0.938rem,1.1vw,1.063rem)] text-para leading-relaxed sm:leading-loose">
            {description}
          </p>

          <div className="flex items-center mt-7 sm:mt-9">
            <CTAButton label={ctaLabel} href={ctaHref} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
