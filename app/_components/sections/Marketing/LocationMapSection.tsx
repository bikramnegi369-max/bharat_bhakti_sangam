import { Compass, LocateFixed, MapPin, Navigation } from "lucide-react";
import { cinzel } from "@/_lib/fonts";

const COORDINATES = "28.395722,76.967194";
const MAP_QUERY = encodeURIComponent(COORDINATES);
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&z=16&output=embed`;
const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export default function LocationMapSection() {
  return (
    <section className="bg-secondary py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-lg border border-primary/35 bg-white p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] shadow-2xl shadow-primary/10">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/70 to-transparent" />
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary text-black shadow-lg shadow-primary/25">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="h-px flex-1 bg-primary/30" />
              </div>

              <h2
                className={`text-[clamp(1.75rem,calc(1.321rem+2.143vw),3.25rem)] font-bold leading-tight text-heading ${cinzel.className}`}
              >
                Event Location
              </h2>

              <p className="mt-3 text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">
                Find us on Google Maps
              </p>

              <p className="mt-5 max-w-md text-sm leading-7 text-para sm:text-base">
                A clear pinned location for smooth arrival, parking handoff,
                and quick turn-by-turn directions to the gathering.
              </p>

              <div className="mt-8 grid gap-5 border-y border-heading/10 py-6">
                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <LocateFixed className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sub_text">
                      Venue
                    </p>
                    <p className="mt-1 text-[clamp(1rem,calc(0.929rem+0.357vw),1.25rem)] font-semibold text-heading">
                      Bharat Bhakti Sangam Venue
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sub_text">
                      Arrival
                    </p>
                    <p className="mt-1 text-sm leading-6 text-para sm:text-base">
                      Open the map before you leave for the most accurate route.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={MAP_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-primary px-5 py-3.5 text-sm font-bold text-black shadow-lg shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/40 active:translate-y-0 active:scale-95 sm:min-w-52"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
          </div>
        </div>

        <div className="min-h-[22rem] overflow-hidden rounded-lg border-3 border-primary bg-white shadow-2xl lg:min-h-[30rem]">
          <iframe
            title="Bharat Bhakti Sangam Google Map"
            src={MAP_EMBED_URL}
            className="h-full min-h-[22rem] w-full border-0 lg:min-h-[30rem]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
