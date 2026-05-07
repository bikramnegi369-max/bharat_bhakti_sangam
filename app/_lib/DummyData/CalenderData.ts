import type { SanatanCalenderApiItem } from "@/_features/sanatan-calender/types";

const festivalImages = [
  "/gallery/gallery_1.webp",
  "/gallery/gallery_2.webp",
  "/gallery/gallery_3.webp",
  "/artists/hansraj_raghuwanshi/image1.png",
  "/artists/hansraj_raghuwanshi/image2.png",
  "/artists/sachet_parampara/image1.png",
  "/artists/sachet_parampara/image2.png",
];

const baseSanatanCalenderData = [
  { festival: "Pongal", month: "January", date: "2026-01-11" },
  { festival: "Mahashivratri", month: "January", date: "2026-01-20" },
  { festival: "Makarsakrant", month: "January", date: "2026-01-25" },
  { festival: "Lohri", month: "January", date: "2026-01-31" },
  { festival: "Basant Panchami", month: "February", date: "2026-02-02" },
  { festival: "Magha Purnima", month: "February", date: "2026-02-12" },
  { festival: "Holika Dahan", month: "March", date: "2026-03-13" },
  { festival: "Holi", month: "March", date: "2026-03-14" },
  { festival: "Ram Navami", month: "April", date: "2026-04-06" },
  { festival: "Hanuman Jayanti", month: "April", date: "2026-04-13" },
  { festival: "Akshaya Tritiya", month: "May", date: "2026-05-01" },
  { festival: "Buddha Purnima", month: "May", date: "2026-05-12" },
  { festival: "Ganga Dussehra", month: "June", date: "2026-06-24" },
  { festival: "Jagannath Rath Yatra", month: "June", date: "2026-06-27" },
  { festival: "Guru Purnima", month: "July", date: "2026-07-21" },
  { festival: "Nag Panchami", month: "July", date: "2026-07-29" },
  { festival: "Raksha Bandhan", month: "August", date: "2026-08-09" },
  { festival: "Janmashtami", month: "August", date: "2026-08-16" },
  { festival: "Ganesh Chaturthi", month: "September", date: "2026-09-12" },
  { festival: "Anant Chaturdashi", month: "September", date: "2026-09-22" },
  { festival: "Sharad Navratri", month: "October", date: "2026-10-11" },
  { festival: "Dussehra", month: "October", date: "2026-10-20" },
  { festival: "Dhanteras", month: "November", date: "2026-11-08" },
  { festival: "Diwali", month: "November", date: "2026-11-10" },
  { festival: "Gita Jayanti", month: "December", date: "2026-12-15" },
  { festival: "Datta Jayanti", month: "December", date: "2026-12-24" },
] satisfies Array<Omit<SanatanCalenderApiItem, "image">>;

export const dummySanatanCalenderData: SanatanCalenderApiItem[] =
  baseSanatanCalenderData.map((festival, index) => ({
    ...festival,
    image: festivalImages[index % festivalImages.length],
  }));
