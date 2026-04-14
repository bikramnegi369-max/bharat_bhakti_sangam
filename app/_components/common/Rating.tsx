import clsx from "clsx";
import { Star } from "lucide-react";

type RatingProps = {
  value: number;
  onChange: (val: number) => void;
  className?: string;
};

export function Rating({ value, onChange, className }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={clsx("transition-transform hover:scale-110", className)}
          >
            <Star
              className={clsx(
                active ? "fill-primary text-primary" : "text-gray-300",
                "w-full h-full",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
