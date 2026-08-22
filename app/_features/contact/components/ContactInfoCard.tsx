import React from "react";
import clsx from "clsx";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { playfair, poppins } from "@/_lib/fonts";
import { ContactInfoItem } from "@/_config/contact.data";

const iconMap = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

interface ContactInfoCardProps {
  item: ContactInfoItem;
}

export function ContactInfoCard({ item }: ContactInfoCardProps) {
  const Icon = iconMap[item.iconType] || MapPin;

  return (
    <div
      className={clsx(
        "relative w-full bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-6",
        "border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
        "flex items-start gap-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-amber-200/80 group",
        "overflow-hidden",
      )}
    >
      {/* Left Red Accent Line matching UI */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#8A110D] group-hover:w-2 transition-all duration-300"
      />

      {/* Circular Icon Container */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-[#8A110D] shrink-0 group-hover:bg-[#8A110D] group-hover:text-white transition-colors duration-300">
        <Icon className="w-5 h-5 stroke-[1.75]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={clsx(
            poppins.className,
            "text-sm sm:text-base font-bold text-stone-900 mb-1 tracking-tight",
          )}
        >
          {item.title}
        </h3>

        <div className="space-y-0.5 sm:space-y-1">
          {item.lines.map((line, idx) => (
            <p
              key={idx}
              className={clsx(
                poppins.className,
                "text-xs sm:text-[13px] text-stone-600 font-normal leading-relaxed",
              )}
            >
              {line.href ? (
                <a
                  href={line.href}
                  className="hover:text-[#8A110D] hover:underline transition-colors"
                >
                  {line.text}
                </a>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
