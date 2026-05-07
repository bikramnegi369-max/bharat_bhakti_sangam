export type SanatanCalenderApiItem = {
  festival: string;
  month: string;
  date: string;
  image: string;
};

export type SanatanCalenderFestival = {
  festival: string;
  monthLabel: string;
  date: string;
  displayDate: string;
  dayLabel: string;
  image: string;
};

export type SanatanCalenderMonthSection = {
  monthKey: string;
  monthLabel: string;
  year: number;
  festivals: SanatanCalenderFestival[];
};
