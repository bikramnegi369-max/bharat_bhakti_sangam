import { cinzel } from "@/_lib/fonts";
import { clsx } from "clsx";

export function SponsorSection() {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light">
          <h2
            className={clsx(
              "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold mb-[clamp(1rem,calc(0.714rem+1.429vw),2rem)]",
              cinzel.className,
              "text-center",
            )}
          >
            Our <span className="text-primary">Sponsors</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
