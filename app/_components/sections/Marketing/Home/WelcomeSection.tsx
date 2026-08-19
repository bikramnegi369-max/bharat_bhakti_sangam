import { CTAButton } from "@/_components/ui/CTAButton";
import { playfair, poppins } from "@/_lib/fonts";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="relative overflow-hidden py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      {/* Background Image with Opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/welcome_bg.webp')] bg-no-repeat bg-position-[180px_-170px] lg:bg-position-[35%_-200%] xl:bg-position-[35%_-150%] bg-size-[860px_540px] opacity-40"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
        <div className="min-w-0 w-full">
          <p
            className={`text-[14px] uppercase tracking-widest text-heading mb-3.5`}
          >
            Welcome to
          </p>

          <h2 className={`${playfair.className} text-[48px] leading-14`}>
            Bharat Bhakti <br />{" "}
            <span className={`text-heading ${poppins.className} font-medium`}>
              Sangam
            </span>
          </h2>

          <p className="mt-6 text-[16px] text-para leading-relaxed">
            India&apos;s most energetic devotional music experience where
            traditional bhajans, kirtans, and mantra chanting blend with modern
            beats and live performances.
          </p>

          <p className="mt-4 text-[16px] text-para leading-relaxed">
            Book your{" "}
            <Link
              href={"/booking"}
              className="font-semibold text-black underline hover:text-primary transition inline"
            >
              Bhajan Clubbing Tickets
            </Link>{" "}
            , join immersive spiritual EDM nights, and experience devotion like
            never before.
          </p>
          <div className="flex flex-wrap items-center mt-8 gap-4">
            <CTAButton label="Book Tickets" href="/bookings" />
            <CTAButton
              label="Know More About Us"
              href="/about"
              variant="secondary"
            />
          </div>
        </div>

        <div className="relative w-full max-w-125 aspect-square rounded-lg overflow-hidden mx-auto">
          <Image
            src="/welcome.webp"
            alt="Bhajan Clubbing Experience"
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
          />
        </div>
      </div>
    </section>
  );
}
