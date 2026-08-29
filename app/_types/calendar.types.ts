export type CalendarCategory =
  | "major-festival"
  | "vrat"
  | "tithi-muhurat"
  | "jayanti-shraadh"
  | "special-puja";

export interface CategoryLegendItem {
  id: CalendarCategory;
  label: string;
  dotColor: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  icon?: string;
  note?: string;
}

export interface CalendarDayDetail {
  dateFormatted: string; // e.g. "14 July, 2026"
  festivalName: string;
  categoryTag: string;
  categoryType: CalendarCategory;
  image: string;
  imageAlt: string;
  summary: string;
  schedule: ScheduleItem[];
  exploreHref?: string;
  exploreText?: string;
  fastingInfo?: {
    title: string;
    description: string;
  };
}

export interface CalendarEventItem {
  id: string;
  date: string; // "YYYY-MM-DD"
  dayNumber: number;
  monthNumber: number;
  yearNumber: number;
  title: string;
  subtitle?: string;
  category: CalendarCategory;
  badgeLabel?: string;
  tagColor?: string;
  image?: string;
  description?: string;
  isMajor?: boolean;
  deepLink?: string;
}

export interface CalendarDay {
  dateString: string; // "YYYY-MM-DD"
  dayNumber: number;
  monthNumber: number; // 1-12
  yearNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected?: boolean;
  tithiName?: string;
  isPurnima?: boolean;
  isAmavasya?: boolean;
  isEkadashi?: boolean;
  primaryEvent?: CalendarEventItem;
  events: CalendarEventItem[];
  detail?: CalendarDayDetail;
}

export interface HighlightCardData {
  id: string;
  tag: string;
  tagColor: "gold" | "orange" | "amber" | "crimson";
  sanskritScript?: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface MoonStatusData {
  tithiName: string;
  paksha: string; // "Shukla Paksha" | "Krishna Paksha"
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonPhase: string;
  nakshatra?: string;
  image?: string;
  viewDetailsHref?: string;
}

export interface MetricPill {
  id: string;
  category: CalendarCategory;
  count: string;
  title: string;
  subtitle: string;
  iconName: "Flame" | "Calendar" | "Sparkles" | "Compass" | "Moon";
  accentColor: string;
}

export interface HeroConfig {
  tagline: string;
  title: {
    prefix: string;
    highlight: string;
    suffix?: string;
  };
  description: string;
  metricPills: MetricPill[];
  heroImage: string;
  heroImageAlt: string;
}

export interface MonthConfig {
  monthIndex: number; // 1-12 (e.g. 7 for July)
  monthName: string; // "July"
  year: number; // 2026
  days: Record<string, {
    events: CalendarEventItem[];
    detail?: CalendarDayDetail;
    moonStatus?: Partial<MoonStatusData>;
  }>;
  monthEvents: CalendarEventItem[];
}

export interface YearCalendarConfig {
  year: number;
  hero: HeroConfig;
  months: Record<number, MonthConfig>;
  highlights: HighlightCardData[];
  defaultMoonStatus?: MoonStatusData;
  upcomingFestivals?: CalendarEventItem[];
  legend: CategoryLegendItem[];
}
