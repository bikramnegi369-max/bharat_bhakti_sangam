"use client";

import { Cinzel } from "next/font/google";
import clsx from "clsx";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type Artist = {
  name: string;
  role: string;
};

type AboutArtistSectionProps = {
  artists?: Artist[];
};

export default function AboutArtistSection({
  artists = [
    { name: "Shreya Ghoshal", role: "Singer" },
    { name: "Shreya Ghoshal", role: "Singer" },
    { name: "Shreya Ghoshal", role: "Singer" },
    { name: "Shreya Ghoshal", role: "Singer" },
  ],
}: AboutArtistSectionProps) {
  return (
    <section className="h-full">
      <div className="h-full border-3 border-primary rounded-md py-[clamp(1.5rem,calc(1.357rem+0.714vw),2rem)] px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light flex flex-col">
        {/* Heading */}
        <h2
          className={clsx(
            "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold mb-[clamp(1rem,calc(0.714rem+1.429vw),2rem)]",
            cinzel.className,
          )}
        >
          About <span className="text-primary">Artist</span>
        </h2>

        {/* Artist List */}
        <div className="space-y-4">
          {artists.map((artist, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-[clamp(0.813rem,calc(0.723rem+0.446vw),1.125rem)]"
            >
              {/* Name */}
              <p className="font-medium text-heading">{artist.name}</p>

              {/* Separator */}
              <span className="mx-4 text-para">—</span>

              {/* Role */}
              <p className="text-para">{artist.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
