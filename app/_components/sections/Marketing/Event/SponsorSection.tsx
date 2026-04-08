import { clsx } from "clsx";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export function SponsorSection() {
  return (
    <section className="md:w-[clamp(41.063rem,calc(27.991rem+27.232vw),52.5rem)] mx-auto flex justify-center pt-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="w-full max-w-7xl  lg:mx-auto mx-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] md:mx-auto  px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] border-3 border-primary rounded-md p-6 lg:p-8 bg-primary_light">
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
    </section>
  );
}
