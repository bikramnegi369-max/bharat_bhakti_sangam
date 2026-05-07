import AccordionSection from "../AccordionSection";
import { SanatanCalenderMonthSection } from "@/_features/sanatan-calender/types";
import { clsx } from "clsx";

type SanatanCalenderSectionProps = {
  months: SanatanCalenderMonthSection[];
};

function getFestivalInitials(festival: string) {
  return festival
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function FestivalAvatar({
  festival,
}: {
  festival: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary_light text-primary shadow-sm"
      title={festival}
    >
      <span className="text-lg font-bold tracking-wide">
        {getFestivalInitials(festival)}
      </span>
    </div>
  );
}

function EmptyMonthState({ monthLabel }: { monthLabel: string }) {
  return (
    <div className="px-5 py-6 text-sm text-para sm:px-6">
      Festival details for {monthLabel} will be announced soon.
    </div>
  );
}

function MonthFestivalTable({
  festivals,
}: {
  festivals: SanatanCalenderMonthSection["festivals"];
}) {
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
            {festivals.map((festival, index) => {
              const rowBorderClass =
                index === festivals.length - 1 ? "" : "border-b border-[#d9d9d9]";

              return (
                <tr key={`${festival.festival}-${festival.date}-${index}`}>
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
                    <div className="flex items-start gap-3 md:gap-4">
                      <FestivalAvatar festival={festival.festival} />
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
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SanatanCalenderSection({
  months,
}: SanatanCalenderSectionProps) {
  const defaultOpenIndex = months.findIndex((month) => month.festivals.length > 0);

  return (
    <AccordionSection
      className="pt-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]"
      items={months.map((month) => ({
        title: `${month.monthLabel} Monthly Hindu Calender - Sanatan Calender ${month.year}`,
        content:
          month.festivals.length > 0 ? (
            <MonthFestivalTable festivals={month.festivals} />
          ) : (
            <EmptyMonthState monthLabel={month.monthLabel} />
          ),
      }))}
      defaultOpenIndex={defaultOpenIndex >= 0 ? defaultOpenIndex : 0}
      indicatorVariant="plus-minus"
      containerClassName="border-none bg-transparent p-0"
      itemClassName="rounded-[1.4rem] border-primary bg-primary_light/75 shadow-[0_0.75rem_2rem_rgba(82,48,6,0.08)]"
      summaryClassName="px-5 py-4 sm:px-6 sm:py-5"
      contentClassName="p-0 text-base"
    />
  );
}
