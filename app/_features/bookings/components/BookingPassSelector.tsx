import React from "react";
import clsx from "clsx";
import { Check, Star, BookOpen, Crown, Sparkles, CheckCircle2 } from "lucide-react";
import { BookingStepBadge } from "./BookingStepBadge";
import { playfair, poppins } from "@/_lib/fonts";
import { PassTierItem } from "@/_components/sections/Marketing/Event/PassTiersSection";

interface BookingPassSelectorProps {
  passes: PassTierItem[];
  selectedPassName: string;
  onSelectPass: (pass: PassTierItem) => void;
}

function renderTierIcon(name: string, isSelected: boolean) {
  const lower = name.toLowerCase();
  const iconClass = clsx(
    "w-5 h-5",
    isSelected ? "text-[#740E0A]" : "text-[#9CA3AF]",
  );

  if (lower.includes("vip") || lower.includes("vvip")) {
    return <Crown className={iconClass} />;
  }
  if (lower.includes("premium") || lower.includes("gold")) {
    return <Sparkles className={iconClass} />;
  }
  return <BookOpen className={iconClass} />;
}

export function BookingPassSelector({
  passes,
  selectedPassName,
  onSelectPass,
}: BookingPassSelectorProps) {
  return (
    <section
      id="step-choose-pass-section"
      aria-labelledby="step-choose-pass"
      className="w-full space-y-4 scroll-mt-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
        <BookingStepBadge step="02" title="CHOOSE YOUR PASS" />
        <span
          className={clsx(
            poppins.className,
            "text-xs text-gray-500 font-normal pl-11 sm:pl-0",
          )}
        >
          Select the experience that suits you best
        </span>
      </div>

      {/* Dynamic Grid: Adapts for 1, 2, 3, or N passes */}
      <div
        className={clsx(
          "grid gap-4 sm:gap-5 md:gap-6 items-stretch pt-3",
          passes.length === 1 && "grid-cols-1 max-w-sm mx-auto",
          passes.length === 2 && "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto",
          passes.length === 3 && "grid-cols-1 md:grid-cols-3",
          passes.length >= 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {passes.map((pass, index) => {
          const isSelected =
            pass.name.toLowerCase().trim() ===
              selectedPassName.toLowerCase().trim() ||
            pass.passId === selectedPassName ||
            pass.id === selectedPassName;

          const isMostPopular =
            pass.isPopular ||
            (passes.length === 3 && index === 1) ||
            pass.name.toLowerCase().includes("premium");

          return (
            <div
              key={pass.id || pass.passId || index}
              onClick={() => onSelectPass(pass)}
              className={clsx(
                "relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer text-center",
                isSelected
                  ? "bg-[#FFFBF5] border-2 border-[#D4AF37] shadow-[0_8px_30px_rgba(212,175,55,0.18)] scale-[1.02] z-10"
                  : "bg-white border border-gray-200/90 shadow-xs hover:border-gray-300 hover:shadow-md opacity-75 hover:opacity-100",
              )}
            >
              {/* Most Popular Ribbon Badge */}
              {isMostPopular && (
                <div
                  className={clsx(
                    poppins.className,
                    "absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5A0E0B] text-[#FDE68A] text-[0.625rem] sm:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1",
                  )}
                >
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                {/* Tier Top Icon */}
                <div
                  className={clsx(
                    "w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-3 transition-colors",
                    isSelected ? "bg-[#FEE2E2]" : "bg-gray-100",
                  )}
                >
                  {isMostPopular ? (
                    <Star
                      className={clsx(
                        "w-5 h-5",
                        isSelected ? "text-[#E5A83B] fill-[#E5A83B]" : "text-gray-400",
                      )}
                    />
                  ) : (
                    renderTierIcon(pass.name, isSelected)
                  )}
                </div>

                {/* Pass Name & Subtitle */}
                <h3
                  className={clsx(
                    playfair.className,
                    "text-sm sm:text-base font-bold tracking-wider uppercase",
                    isSelected ? "text-[#5A0E0B]" : "text-gray-700",
                  )}
                >
                  {pass.name}
                </h3>

                {/* Price Display */}
                <div className="mt-2 mb-1">
                  <span
                    className={clsx(
                      playfair.className,
                      "text-2xl sm:text-3xl font-extrabold",
                      isSelected ? "text-[#1F2937]" : "text-gray-600",
                    )}
                  >
                    ₹{pass.price}
                  </span>
                </div>

                <p className="text-xs text-gray-500 font-medium mb-4">
                  {pass.subtitle || "General Entry"}
                </p>

                {/* Separator */}
                <div className="w-full h-px bg-gray-200/80 mb-4" />

                {/* Feature List */}
                <ul className="space-y-2.5 text-left mb-6">
                  {pass.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <Check
                        className={clsx(
                          "w-3.5 h-3.5 shrink-0 stroke-[2.5]",
                          isSelected ? "text-[#E86A17]" : "text-gray-400",
                        )}
                      />
                      <span
                        className={clsx(
                          poppins.className,
                          "text-xs leading-relaxed",
                          isSelected ? "text-gray-800 font-medium" : "text-gray-500",
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select / Selected Button */}
              <div className="mt-auto pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPass(pass);
                  }}
                  className={clsx(
                    "w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer",
                    isSelected
                      ? "bg-[#5A0E0B] text-white hover:bg-[#430A08] ring-2 ring-[#5A0E0B]/20"
                      : "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400",
                  )}
                >
                  {isSelected ? (
                    <>
                      <span>SELECTED</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </>
                  ) : (
                    <span>SELECT PASS</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
