import type { SanatanCalenderFestival } from "@/_features/sanatan-calender/types";
import MonthFestivalRow from "./MonthFestivalRow";

type MonthFestivalTableProps = {
  festivals: SanatanCalenderFestival[];
};

export default function MonthFestivalTable({
  festivals,
}: MonthFestivalTableProps) {
  return (
    <div className="p-4 sm:p-5 md:p-6">
      <div className="overflow-hidden rounded-2xl border border-[#cfcfcf] bg-white">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-white">
            <tr>
              <th className="w-16 border-b border-r border-[#d9d9d9] px-3 py-4 text-center text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-heading">
                #
              </th>
              <th className="border-b border-[#d9d9d9] px-4 py-4 text-left text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-heading">
                Festival
              </th>
              <th className="hidden border-b border-l border-[#d9d9d9] px-4 py-4 text-left text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-heading md:table-cell">
                Date
              </th>
              <th className="hidden border-b border-l border-[#d9d9d9] px-4 py-4 text-left text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)] font-semibold text-heading md:table-cell">
                Day
              </th>
            </tr>
          </thead>
          <tbody>
            {festivals.map((festival, index) => (
              <MonthFestivalRow
                key={`${festival.festival}-${festival.date}-${index}`}
                festival={festival}
                index={index}
                isLastRow={index === festivals.length - 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
