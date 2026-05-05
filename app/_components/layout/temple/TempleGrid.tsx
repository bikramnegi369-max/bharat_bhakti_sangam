import TempleCard from "@/_components/ui/temples/TempleCard";
import { temples } from "@/_lib/constants/temples.constants";

export default function TempleGrid() {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16"
      aria-label="List of famous temples in India"
    >
      {temples.map((temple, index) => (
        <TempleCard
          key={temple.slug}
          temple={temple}
          index={index}
          priority={index < 2} // first 2 = likely LCP candidates
        />
      ))}
    </section>
  );
}
