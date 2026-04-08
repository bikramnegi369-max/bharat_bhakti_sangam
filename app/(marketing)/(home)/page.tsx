import BookingSection from "@/_components/sections/Home/BookingSection";
import ExperienceSection from "@/_components/sections/Home/ExperienceSection";
import GallerySection from "@/_components/sections/Home/GallerySection";
import Hero from "@/_components/sections/Hero";
import WelcomeSection from "@/_components/sections/Home/WelcomeSection";

const IMAGES = [
  { src: "/gallery/gallery_1.png" },
  { src: "/gallery/gallery_2.png" },
  { src: "/gallery/gallery_3.png" },
];

export default function HomePage() {
  return (
    <>
      {/* Preload the hero image */}
      <link
        rel="preload"
        as="image"
        href="/home_hero.jpg"
        fetchPriority="high"
      />
      <Hero
        title="Midnight Krishna Kirtan"
        location="ISKCON Temple Hall | Hare Krishna Land, Juhu, Mumbai 400049"
        date="12 Nov, 2026 | 11:00 a.m - 6:00 p.m"
        backgroundImage="/home_hero.jpg"
        primaryCta={{
          label: "Book Now",
          href: "/booking",
        }}
        secondaryCta={{
          label: "Know More",
          href: "/event",
        }}
      />
      <WelcomeSection />
      <ExperienceSection />
      <BookingSection />
      <GallerySection images={IMAGES} />
    </>
  );
}
