export type SanatanCalenderApiItem = {
  festival: string;
  month: string;
  date: string;
};

export type SanatanCalenderFestival = {
  festival: string;
  monthLabel: string;
  date: string;
  displayDate: string;
  dayLabel: string;
};

export type SanatanCalenderMonthSection = {
  monthKey: string;
  monthLabel: string;
  year: number;
  festivals: SanatanCalenderFestival[];
};
