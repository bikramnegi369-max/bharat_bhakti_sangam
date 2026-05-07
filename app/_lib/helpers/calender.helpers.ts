import { calenderMonths } from "@/_lib/constants/calender.constants";
import type {
  SanatanCalenderApiItem,
  SanatanCalenderFestival,
  SanatanCalenderMonthSection,
} from "@/_features/sanatan-calender/types";

type NormalizedFestival = SanatanCalenderFestival & {
  sortValue: number;
};

const fullDateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const weekdayFormatter = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  timeZone: "Asia/Kolkata",
});

const monthFormatter = new Intl.DateTimeFormat("en-IN", {
  month: "long",
  timeZone: "Asia/Kolkata",
});

const monthLabelByValue = new Map(
  calenderMonths.map(({ label, value }) => [value, label]),
);

const monthLabelLookup = new Map(
  calenderMonths.flatMap(({ label, value }) => [
    [label.toLowerCase(), label],
    [value.toLowerCase(), label],
  ]),
);

function getMonthLabel(month: string, date: string) {
  const monthLabel = monthLabelLookup.get(month.trim().toLowerCase());

  if (monthLabel) {
    return monthLabel;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return month.trim();
  }

  return monthFormatter.format(parsedDate);
}

function normalizeFestival(
  item: SanatanCalenderApiItem,
): NormalizedFestival {
  const parsedDate = new Date(item.date);
  const hasValidDate = !Number.isNaN(parsedDate.getTime());

  return {
    festival: item.festival.trim(),
    monthLabel: getMonthLabel(item.month, item.date),
    date: item.date.trim(),
    displayDate: hasValidDate ? fullDateFormatter.format(parsedDate) : item.date,
    dayLabel: hasValidDate ? weekdayFormatter.format(parsedDate) : "TBA",
    image: item.image.trim(),
    sortValue: hasValidDate ? parsedDate.getTime() : Number.MAX_SAFE_INTEGER,
  };
}

export function buildSanatanCalenderMonths(
  items: SanatanCalenderApiItem[],
): SanatanCalenderMonthSection[] {
  const festivals = items.map(normalizeFestival);
  const fallbackYear =
    festivals
      .map((festival) => new Date(festival.date))
      .find((date) => !Number.isNaN(date.getTime()))
      ?.getFullYear() ?? new Date().getFullYear();

  const groupedFestivals = new Map<string, NormalizedFestival[]>(
    calenderMonths.map(({ value }) => [value, []]),
  );

  festivals.forEach((festival) => {
    const monthKey = festival.monthLabel.toLowerCase();
    const monthFestivals = groupedFestivals.get(monthKey);

    if (monthFestivals) {
      monthFestivals.push(festival);
    }
  });

  return calenderMonths.map<SanatanCalenderMonthSection>(({ label, value }) => {
    const monthFestivals = [...(groupedFestivals.get(value) ?? [])].sort(
      (left, right) => {
        if (left.sortValue === right.sortValue) {
          return left.festival.localeCompare(right.festival);
        }

        return left.sortValue - right.sortValue;
      },
    );

    const firstFestivalYear = monthFestivals.find(
      (festival) => !Number.isNaN(new Date(festival.date).getTime()),
    );

    return {
      monthKey: value,
      monthLabel: monthLabelByValue.get(value) ?? label,
      year: firstFestivalYear
        ? new Date(firstFestivalYear.date).getFullYear()
        : fallbackYear,
      festivals: monthFestivals.map((festival) => ({
        festival: festival.festival,
        monthLabel: festival.monthLabel,
        date: festival.date,
        displayDate: festival.displayDate,
        dayLabel: festival.dayLabel,
        image: festival.image,
      })),
    };
  });
}

export function getSanatanCalenderYear(
  months: SanatanCalenderMonthSection[],
) {
  return months.find((month) => month.festivals.length > 0)?.year ?? new Date().getFullYear();
}

export function getSanatanCalenderFestivalCount(
  months: SanatanCalenderMonthSection[],
) {
  return months.reduce(
    (total, month) => total + month.festivals.length,
    0,
  );
}

export function getSanatanCalenderDescription(
  year: number,
  totalFestivals: number,
) {
  return `Explore the Sanatan Calender ${year} with ${totalFestivals} month-wise Hindu festival dates and observances.`;
}
