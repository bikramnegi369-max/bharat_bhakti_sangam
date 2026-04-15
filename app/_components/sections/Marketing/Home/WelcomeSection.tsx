import { Cinzel } from "next/font/google";
import Image from "next/image";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function WelcomeSection() {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid lg:grid-cols-2 gap-[clamp(1.25rem,calc(0.75rem+2.5vw),3rem)] items-center">
        {/* TEXT CONTENT */}
        <div>
          <h2
            className={`${cinzel.className} text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] font-bold uppercase tracking-widest text-heading text-center`}
          >
            Welcome to
          </h2>

          <h2
            className={`${cinzel.className} text-[clamp(1.25rem,calc(0.625rem+3.125vw),3.438rem)] text-primary font-bold leading-widest text-center`}
          >
            Bhajanclubbing
          </h2>

          <p className="mt-6 text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)] text-para text-lg leading-relaxed text-center">
            India’s most energetic devotional music experience where traditional
            bhajans, kirtans, and mantra chanting blend with modern beats and
            live performances.
          </p>

          <p className="mt-4 text-[clamp(0.75rem,calc(0.607rem+0.714vw),1.25rem)] text-para text-lg leading-relaxed text-center">
            Book your{" "}
            <span className="font-semibold text-black">
              Bhajan Clubbing tickets
            </span>{" "}
            , join immersive spiritual EDM nights, and experience devotion like
            never before.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative w-[clamp(15.813rem,calc(10.491rem+26.607vw),34.438rem)] h-[clamp(10.313rem,calc(6.866rem+17.232vw),22.375rem)] rounded-lg overflow-hidden mx-auto group aspect-video border-3 border-primary">
          <Image
            src="/welcome.png" // replace with your image
            alt="Bhajan Clubbing Experience"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={false}
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
