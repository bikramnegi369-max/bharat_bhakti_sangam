import clsx from "clsx";
import { playfair, poppins } from "@/_lib/fonts";

import ScrollReveal from "@/_components/common/ScrollReveal";

export interface LocationMapSectionProps {
  title?: string;
  subheading?: string;
  companyName?: string;
  addressLines?: string[];
  contactHeading?: string;
  phone?: string;
  email?: string;
  ctaText?: string;
  ctaHref?: string;
  mapQuery?: string;
  className?: string;
}

const DEFAULT_ADDRESS = [
  "Bharat Bhakti Sangam,",
  "Plot No. 190, KH No. 114 1st Flr, Vipin Garden Extn,",
  "G.No. 37, Uttam Nagar, New Delhi - 110059, Delhi",
];

const DEFAULT_MAP_QUERY =
  "Plot No.190,KH No.114 1st Flr, Vipin Garden Extn,G.No.37, Uttam Nagar, New Delhi 110059";

export default function LocationMapSection({
  title = "Our Location",
  subheading = "FIND US HERE",
  companyName = "Bharat Bhakti Sangam",
  addressLines = DEFAULT_ADDRESS,
  contactHeading = "CONTACT US",
  phone = "+91 8796086743",
  email = "contact@bharatbhaktisangam.com",
  ctaText = "Get Directions",
  ctaHref,
  mapQuery = DEFAULT_MAP_QUERY,
  className,
}: LocationMapSectionProps) {
  const encodedQuery = encodeURIComponent(mapQuery);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl =
    ctaHref ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`;

  return (
    <section
      aria-labelledby="our-location-heading"
      className={clsx(
        "relative w-full py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)] overflow-hidden",
        className,
      )}
    >
      <div className="relative max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        {/* Outer Card Container matching design */}
        <div
          className={clsx(
            "relative w-full rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden",
            "bg-[#FFFDF9] border border-[#F2E8DC]",
            "shadow-[0_8px_30px_rgba(116,14,10,0.04)]",
            "grid grid-cols-1 lg:grid-cols-12",
          )}
        >
          {/* Left Column: Location & Contact Details (5 cols on lg / 1024px) */}
          <ScrollReveal
            animation="fade-right"
            duration={850}
            threshold={0.15}
            className={clsx(
              "lg:col-span-5 flex flex-col justify-between",
              "p-[clamp(1.75rem,calc(1.25rem+2vw),3.25rem)]",
              "bg-[#FFFDF9]",
            )}
          >
            <div>
              {/* Heading */}
              <h2
                id="our-location-heading"
                className={clsx(
                  playfair.className,
                  "text-[#740E0A] font-semibold tracking-tight",
                  "text-[clamp(2rem,calc(1.5rem+1.8vw),3rem)] leading-tight",
                  "mb-6 sm:mb-8",
                )}
              >
                {title}
              </h2>

              {/* Address Block */}
              <address className="not-italic flex flex-col gap-1.5 mb-6 sm:mb-8">
                <span
                  className={clsx(
                    poppins.className,
                    "text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C49A70] uppercase mb-1",
                  )}
                >
                  {subheading}
                </span>

                <div
                  className={clsx(
                    poppins.className,
                    "text-[#5A4A42] text-[clamp(0.925rem,calc(0.875rem+0.2vw),1.05rem)] leading-relaxed font-normal",
                  )}
                >
                  {addressLines.map((line, idx) => (
                    <p key={idx} className="leading-snug mb-0.5 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
              </address>

              {/* Contact Block */}
              <div className="flex flex-col gap-1.5 mb-8 sm:mb-10">
                <span
                  className={clsx(
                    poppins.className,
                    "text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C49A70] uppercase mb-1",
                  )}
                >
                  {contactHeading}
                </span>

                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className={clsx(
                      poppins.className,
                      "text-[#5A4A42] text-[clamp(0.925rem,calc(0.875rem+0.2vw),1.05rem)] font-normal transition-colors duration-200 hover:text-[#740E0A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm w-fit",
                    )}
                  >
                    {phone}
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className={clsx(
                      poppins.className,
                      "text-[#5A4A42] text-[clamp(0.925rem,calc(0.875rem+0.2vw),1.05rem)] font-normal transition-colors duration-200 hover:text-[#740E0A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm w-fit break-all",
                    )}
                  >
                    {email}
                  </a>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  poppins.className,
                  "inline-flex items-center justify-center text-center",
                  "px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl sm:rounded-2xl",
                  "bg-[#740E0A] hover:bg-[#5E0B08] text-white font-medium text-[15px] sm:text-[16px]",
                  "shadow-[0_4px_16px_rgba(116,14,10,0.25)] hover:shadow-[0_6px_20px_rgba(116,14,10,0.35)]",
                  "transition-all duration-200 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#740E0A] focus-visible:ring-offset-2",
                )}
                aria-label={`Get directions to ${companyName} on Google Maps`}
              >
                {ctaText}
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Google Maps Embed (7 cols on lg / 1024px) */}
          <ScrollReveal
            animation="fade-left"
            delay={120}
            duration={850}
            threshold={0.15}
            className="lg:col-span-7 relative min-h-75 sm:min-h-95 lg:min-h-110 w-full bg-[#F4EDE4]"
          >
            <iframe
              title={`${companyName} Location Map`}
              src={mapEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

