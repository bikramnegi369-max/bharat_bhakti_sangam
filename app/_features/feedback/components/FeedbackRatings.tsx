import { Rating } from "@/_components/common/Rating";
import {
  FEEDBACK_FORM_CONTENT,
  FEEDBACK_RATINGS,
} from "@/_lib/constants/feedback.constants";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { Cinzel } from "next/font/google";
import { Controller, useFormContext } from "react-hook-form";

const cinzel = Cinzel({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export function FeedbackRatings() {
  const { control, formState: { errors } } = useFormContext<FeedbackFormData>();

  return (
    <div
      className="space-y-8 border-2 border-primary px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
           py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)] rounded-lg shadow-2xl bg-white"
    >
      {/* Heading */}
      <h2
        className={`${cinzel.className}
      text-[clamp(1rem,calc(0.455rem+2.727vw),2.5rem)] font-semibold text-heading tracking-widest`}
      >
        {FEEDBACK_FORM_CONTENT.heading}
      </h2>

      {/* Ratings List */}
      <div className="space-y-4 lg:space-y-8">
        {FEEDBACK_RATINGS.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span className="text-[clamp(0.875rem,calc(0.511rem+1.818vw),1.875rem)] font-medium text-para tracking-wider">
              {item.label}
            </span>

            <Controller
              name={`ratings.${item.key}`}
              control={control}
              render={({ field }) => (
                <div className="flex flex-col items-end gap-1">
                  <Rating
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      field.onBlur();
                    }}
                    className="w-[clamp(1.25rem,calc(0.568rem+3.409vw),3.125rem)] h-[clamp(1.25rem,calc(0.568rem+3.409vw),3.125rem)]"
                  />
                  {errors.ratings?.[item.key] && (
                    <span className="text-xs text-red-500">
                      {errors.ratings[item.key]?.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
