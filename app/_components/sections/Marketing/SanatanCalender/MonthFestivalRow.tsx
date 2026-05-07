import { clsx } from "clsx";
import type { SanatanCalenderFestival } from "@/_features/sanatan-calender/types";
import FestivalMedia from "./FestivalMedia";

type MonthFestivalRowProps = {
  festival: SanatanCalenderFestival;
  index: number;
  isLastRow: boolean;
};

export default function MonthFestivalRow({
  festival,
  index,
  isLastRow,
}: MonthFestivalRowProps) {
  const rowBorderClass = isLastRow ? "" : "border-b border-[#d9d9d9]";

  return (
    <tr>
      <td
        className={clsx(
          "align-middle text-center text-[clamp(1rem,calc(0.911rem+0.446vw),1.313rem)] font-semibold text-para",
          rowBorderClass,
          "border-r border-[#d9d9d9] px-3 py-4",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </td>
      <td className={clsx(rowBorderClass, "px-4 py-4 align-middle")}>
        <div className="flex items-center gap-3 md:gap-4">
          <FestivalMedia festival={festival.festival} image={festival.image} />
          <div className="min-w-0">
            <p className="text-[clamp(1rem,calc(0.911rem+0.446vw),1.438rem)] font-semibold text-heading">
              {festival.festival}
            </p>
            <div className="mt-1 text-sm leading-relaxed text-para md:hidden">
              <p>{festival.displayDate}</p>
              <p>{festival.dayLabel}</p>
            </div>
          </div>
        </div>
      </td>
      <td
        className={clsx(
          rowBorderClass,
          "hidden border-l border-[#d9d9d9] px-4 py-4 align-middle text-[clamp(1rem,calc(0.911rem+0.446vw),1.313rem)] text-para md:table-cell",
        )}
      >
        {festival.displayDate}
      </td>
      <td
        className={clsx(
          rowBorderClass,
          "hidden border-l border-[#d9d9d9] px-4 py-4 align-middle text-[clamp(1rem,calc(0.911rem+0.446vw),1.313rem)] text-para md:table-cell",
        )}
      >
        {festival.dayLabel}
      </td>
    </tr>
  );
}
