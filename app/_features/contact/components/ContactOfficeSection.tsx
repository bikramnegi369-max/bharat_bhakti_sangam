import clsx from "clsx";
import { MapPin, Clock, Train, ArrowRight } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { officeLocationData } from "@/_config/contact.data";

const socialIcons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-none stroke-current stroke-2"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-none stroke-current stroke-2"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  facebook: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-none stroke-current stroke-2"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  whatsapp: (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 fill-none stroke-current stroke-2"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  ),
};

export function ContactOfficeSection() {
  return (
    <section
      aria-labelledby="office-heading"
      className="relative w-full py-10 sm:py-14 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center pb-8 sm:pb-12">
          <h2
            id="office-heading"
            className={clsx(
              playfair.className,
              "text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-stone-900 tracking-tight",
            )}
          >
            Visit Our Office
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-0.75 bg-[#D4AF37] mx-auto mt-2.5 rounded-full"
          />
        </div>

        {/* 2-Column Responsive Layout for Office & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Interactive Map Frame */}
          <div className="lg:col-span-7 w-full h-72 sm:h-84 md:h-96 lg:h-full min-h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-sm relative bg-stone-100">
            <iframe
              title="Bharat Bhakti Sangam Office Location"
              src={officeLocationData.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Office Location Details, Subway & Socials */}
          <div className="lg:col-span-5 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between space-y-6">
            {/* Details List */}
            <div className="space-y-4 sm:space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#8A110D] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] text-stone-700 font-medium leading-relaxed",
                    )}
                  >
                    {officeLocationData.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#8A110D] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] text-stone-700 font-medium leading-relaxed",
                    )}
                  >
                    {officeLocationData.hours}
                  </p>
                </div>
              </div>

              {/* Nearest Metro */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#8A110D] shrink-0 mt-0.5">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <p
                    className={clsx(
                      poppins.className,
                      "text-xs sm:text-[13px] text-stone-700 font-medium leading-relaxed",
                    )}
                  >
                    <span className="font-semibold text-stone-900">
                      Nearest Metro:
                    </span>{" "}
                    {officeLocationData.metro.station} (
                    {officeLocationData.metro.line}) &ndash;{" "}
                    {officeLocationData.metro.distance}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-around sm:justify-start sm:gap-6 py-2">
                {officeLocationData.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 group text-stone-600 hover:text-[#8A110D] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full border border-stone-200 group-hover:border-[#8A110D]/50 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:bg-[#8A110D] group-hover:text-white">
                      {socialIcons[social.platform]}
                    </div>
                    <span
                      className={clsx(
                        poppins.className,
                        "text-[9.5px] sm:text-[10px] font-bold tracking-wider text-stone-500 group-hover:text-[#8A110D] uppercase transition-colors",
                      )}
                    >
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Get Directions Button */}
            <div>
              <a
                href={officeLocationData.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  poppins.className,
                  "w-full h-11 sm:h-12 px-6 rounded-xl sm:rounded-2xl bg-[#68110D] hover:bg-[#520c09] text-white font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200",
                )}
              >
                <span>Get Directions</span>
                <ArrowRight size={16} strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
