import AccordionSection from "../AccordionSection";
import { SanatanCalenderMonthSection } from "@/_features/sanatan-calender/types";
import EmptyMonthState from "./EmptyMonthState";
import MonthFestivalTable from "./MonthFestivalTable";

type SanatanCalenderSectionProps = {
  months: SanatanCalenderMonthSection[];
};

export default function SanatanCalenderSection({
  months,
}: SanatanCalenderSectionProps) {
  const defaultOpenIndex = months.findIndex(
    (month) => month.festivals.length > 0,
  );

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
      groupName="Sanatan-Calender"
    />
  );
}
