import { clsx } from "clsx";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export function SponsorSection() {
  return (
    <section className="lg:w-196.5 mx-auto flex justify-center py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="w-full max-w-7xl  lg:mx-auto mx-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]  px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] border-3 border-primary rounded-md p-6 lg:p-8 bg-primary_light">
        <h2
          className={clsx(
            "text-[clamp(1.313rem,calc(1.063rem+1.25vw),2.188rem)] font-bold mb-[clamp(1rem,calc(0.714rem+1.429vw),2rem)]",
            cinzel.className,
          )}
        >
          Our <span className="text-primary">Sponsors</span>
        </h2>
      </div>
    </section>
  );
}
