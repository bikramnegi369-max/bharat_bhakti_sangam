import { Rating } from "@/_components/common/Rating";
import {
  FEEDBACK_FORM_CONTENT,
  FEEDBACK_RATINGS,
} from "@/_lib/constants/feedback.constants";
import { playfair, poppins } from "@/_lib/fonts";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { Controller, useFormContext } from "react-hook-form";
import ScrollReveal from "@/_components/common/ScrollReveal";

export function FeedbackRatings() {
  const {
    control,
    formState: { errors },
  } = useFormContext<FeedbackFormData>();

  return (
    <ScrollReveal animation="fade-up" duration={700} delay={60}>
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 sm:space-y-8 transition-shadow duration-300 hover:shadow-[0_15px_45px_rgba(116,14,10,0.06)]">
        {/* Heading with Golden Accent */}
        <div className="text-center sm:text-left pb-1">
          <h2
            className={`${playfair.className} text-xl sm:text-2xl lg:text-[1.75rem] font-bold text-heading tracking-tight`}
          >
            {FEEDBACK_FORM_CONTENT.heading}
          </h2>
          <p
            className={`${poppins.className} mt-1 text-xs sm:text-[13px] text-stone-500 font-normal`}
          >
            Rate your overall experience with our devotional gathering
          </p>
          <div
            aria-hidden="true"
            className="w-12 h-0.5 bg-[#D4AF37] mt-2.5 rounded-full"
          />
        </div>

        {/* Ratings List */}
        <div className="space-y-4 sm:space-y-6 divide-y divide-stone-100">
          {FEEDBACK_RATINGS.map((item, idx) => (
            <ScrollReveal
              key={item.key}
              animation="fade-up"
              duration={650}
              delay={100 + idx * 80}
            >
              <div className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span
                    className={`${poppins.className} text-sm sm:text-base font-semibold text-stone-800 tracking-wide`}
                  >
                    {item.label}
                  </span>
                  <p className="text-[11px] sm:text-xs text-stone-400 font-normal">
                    {item.key === "food"
                      ? "Prasadam quality & taste"
                      : item.key === "management"
                        ? "Arrangements & organization"
                        : "Vibe, energy & atmosphere"}
                  </p>
                </div>

                <Controller
                  name={`ratings.${item.key}`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col sm:items-end gap-1">
                      <Rating
                        value={field.value}
                        onChange={(val) => {
                          field.onChange(val);
                          field.onBlur();
                        }}
                        className="w-7 h-7 sm:w-8 sm:h-8"
                      />
                      {errors.ratings?.[item.key] && (
                        <span className="text-[10.5px] text-red-500 font-medium">
                          {errors.ratings[item.key]?.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
