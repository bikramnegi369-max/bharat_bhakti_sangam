import { CarouselSlideData } from "@/_types/Carousel.types";
import { FAQItem } from "@/_types/FAQ.types";
import { FestivalSection } from "@/_types/festivals.types";
import { FESTIVAL_DETAILS_CONFIG_REGISTRY } from "@/_config/festival-details.config";

export const famousFestivalsCarousel: CarouselSlideData[] = [
  {
    id: 1,
    src: "/festivals/slider/image-1.webp",
    alt: "Dhanteras festival",
  },
  {
    id: 2,
    src: "/festivals/slider/image-2.webp",
    alt: "Holi festival",
  },
  {
    id: 3,
    src: "/festivals/slider/image-3.webp",
    alt: "Diwali festival",
  },
  {
    id: 4,
    src: "/festivals/slider/image-4.webp",
    alt: "Dhanteras festival",
  },
];

export interface PopularFestivalCardItem {
  slug: string;
  title: string;
  shortDescription: string;
  dateBadge: {
    day: string;
    month: string;
  };
  image: string;
}

export const popularFestivalsList: PopularFestivalCardItem[] = [
  {
    slug: "makar-sankranti",
    title: "Makar Sankranti",
    shortDescription:
      "The joyous solar harvest festival celebrated with colorful kites and sesame jaggery treats.",
    dateBadge: { day: "14", month: "Jan" },
    image: "/festivals/slider/image-1.webp",
  },
  {
    slug: "holi",
    title: "Holi",
    shortDescription:
      "The vibrant festival of colors, blooming spring, and divine love of Radha-Krishna.",
    dateBadge: { day: "25", month: "Mar" },
    image: "/festivals/holi/holi-1.webp",
  },
  {
    slug: "diwali",
    title: "Diwali",
    shortDescription:
      "The radiant festival of lights, honoring Lord Rama and the blessings of Goddess Lakshmi.",
    dateBadge: { day: "01", month: "Nov" },
    image: "/festivals/diwali/diwali-1.webp",
  },
  {
    slug: "navratri",
    title: "Navratri",
    shortDescription:
      "Nine sacred nights of fasting, prayers, and Garba honoring the forms of Goddess Durga.",
    dateBadge: { day: "03", month: "Oct" },
    image: "/festivals/navratri/navratri-1.webp",
  },
  {
    slug: "ganesh-chaturthi",
    title: "Ganesh Chaturthi",
    shortDescription:
      "Welcoming Lord Ganesha with devotion, sweets, and grand immersion processions.",
    dateBadge: { day: "07", month: "Sep" },
    image: "/festivals/ganesh-chaturthi/ganesh-chaturthi-1.webp",
  },
];

export interface FestivalListingCardItem {
  slug: string;
  title: string;
  shortDescription: string;
  season: string;
  region: string;
  significance: string;
  image: string;
}

export const festivalListingCards: FestivalListingCardItem[] = [
  {
    slug: "diwali",
    title: "Diwali (Deepavali)",
    shortDescription:
      "The radiant festival of lights, honoring the return of Lord Rama to Ayodhya and the auspicious blessings of Goddess Lakshmi.",
    season: "Oct - Nov (Kartika)",
    region: "Pan-India & Global",
    significance: "Victory of Light over Darkness",
    image: "/festivals/diwali/diwali-2.webp",
  },
  {
    slug: "holi",
    title: "Holi (Rangotsav)",
    shortDescription:
      "The exuberant festival of colors, blooming spring, and divine devotion celebrating Radha-Krishna and the triumph of Bhakta Prahlad.",
    season: "Mar (Phalguna Purnima)",
    region: "Pan-India & Global",
    significance: "Spring, Joy & Divine Love",
    image: "/festivals/holi/holi-2.webp",
  },
  {
    slug: "navratri",
    title: "Navratri (Durga Puja)",
    shortDescription:
      "Nine holy nights celebrating the victory of Goddess Durga over evil forces with fasting, prayers, and spirited Garba dance.",
    season: "Oct (Ashwin)",
    region: "Gujarat, Bengal & India",
    significance: "Divine Feminine & Shakti",
    image: "/festivals/navratri/navratri-2.webp",
  },
  {
    slug: "ganesh-chaturthi",
    title: "Ganesh Chaturthi",
    shortDescription:
      "A 10-day grand festival honoring Lord Ganesha with home installations, pandals, modaks, and ecstatic visarjan processions.",
    season: "Sep (Bhadrapada)",
    region: "Maharashtra & India",
    significance: "Wisdom, Prosperity & Beginnings",
    image: "/festivals/ganesh-chaturthi/ganesh-chaturthi-2.webp",
  },
  {
    slug: "janmashtami",
    title: "Krishna Janmashtami",
    shortDescription:
      "The joyous midnight celebration of Lord Krishna’s birth with fasting, ecstatic kirtans, floral cradles, and thrilling Dahi Handi.",
    season: "Aug (Bhadrapada Ashtami)",
    region: "Mathura, Vrindavan & Global",
    significance: "Divine Incarnation & Dharma",
    image: "/festivals/janmashtami/janmashtami-2.webp",
  },
  {
    slug: "dusshera",
    title: "Dussehra (Vijayadashami)",
    shortDescription:
      "Vijayadashami honors Lord Rama vanquishing Ravana and Goddess Durga conquering Mahishasura with effigy burnings and weapon worship.",
    season: "Oct (Ashwin Dashami)",
    region: "Pan-India",
    significance: "Triumph of Dharma over Evil",
    image: "/festivals/dusshera/dussehra-2.webp",
  },
  {
    slug: "rath-yatra",
    title: "Jagannath Rath Yatra",
    shortDescription:
      "The monumental annual chariot festival in Puri where Lord Jagannath travels on giant wooden chariots to bless all mankind.",
    season: "Jul (Ashadha Dwitiya)",
    region: "Puri, Odisha & Worldwide",
    significance: "Universal Brotherhood & Grace",
    image: "/temples-images/jagannath/jagannath_hero.webp",
  },
  {
    slug: "pongal",
    title: "Pongal (Thai Pongal)",
    shortDescription:
      "The vibrant four-day Tamil harvest festival celebrating the Sun God, bounty of crops, and heartfelt reverence for cattle.",
    season: "Jan (Thai Month)",
    region: "Tamil Nadu & South India",
    significance: "Harvest Bounty & Gratitude",
    image: "/festivals/slider/image-4.webp",
  },
  {
    slug: "onam",
    title: "Onam (Thiruvonam)",
    shortDescription:
      "Kerala’s grand 10-day harvest festival featuring breathtaking floral carpets (Pookkalam), boat races, and royal Onasadya feast.",
    season: "Aug - Sep (Chingam)",
    region: "Kerala & South India",
    significance: "Harvest & King Mahabali",
    image: "/festivals/slider/image-3.webp",
  },
  {
    slug: "chhath-puja",
    title: "Chhath Puja",
    shortDescription:
      "A rigorous 4-day solar festival with water fasting, river ghat rituals, and offerings to the setting and rising Sun God.",
    season: "Nov (Kartika Shashthi)",
    region: "Bihar, UP, Jharkhand & India",
    significance: "Solar Vow & Ecological Purity",
    image: "/festivals/chhath-puja/chhath-puja-2.webp",
  },
  {
    slug: "raksha-bandhan",
    title: "Raksha Bandhan",
    shortDescription:
      "The beloved celebration of sibling love where sisters tie protective rakhis and brothers pledge unconditional protection.",
    season: "Aug (Shravana Purnima)",
    region: "Pan-India & Global",
    significance: "Sibling Bond & Sacred Trust",
    image: "/festivals/raksha-bandhan/raksha-bandhan-2.webp",
  },
  {
    slug: "radha-ashtami",
    title: "Radha Ashtami",
    shortDescription:
      "Appearance day of Shri Radharani, the soul of Vrindavan and supreme embodiment of selfless spiritual devotion.",
    season: "Sep (Bhadrapada Ashtami)",
    region: "Braj, Barsana & Worldwide",
    significance: "Prema Bhakti & Pure Devotion",
    image: "/festivals/radha-ashtami/radha-ashtmi-2.webp",
  },
  {
    slug: "dhanteras",
    title: "Dhanteras (Dhanatrayodashi)",
    shortDescription:
      "The opening day of Diwali celebrating Lord Dhanvantari and Kuber with the purchase of precious metals and good fortune.",
    season: "Oct (Kartika Trayodashi)",
    region: "Pan-India",
    significance: "Health, Vitality & Prosperity",
    image: "/festivals/dhanteras/dhanteras-2.webp",
  },
  {
    slug: "naraka-chaturdashi",
    title: "Naraka Chaturdashi (Choti Diwali)",
    shortDescription:
      "Choti Diwali marks Lord Krishna vanquishing Narakasura with sacred early-morning herbal oil baths and luminous diyas.",
    season: "Oct (Kartika Chaturdashi)",
    region: "Pan-India",
    significance: "Purification & Awakening",
    image: "/festivals/naraka-chaturdashi/naraka-chaturdashi-2.webp",
  },
  {
    slug: "govardhan-puja",
    title: "Govardhan Puja (Annakut)",
    shortDescription:
      "The Annakut festival honoring Lord Krishna lifting Mount Govardhan, accompanied by grand cow worship and food offerings.",
    season: "Nov (Kartika Pratipada)",
    region: "Braj & Pan-India",
    significance: "Nature Gratitude & Humility",
    image: "/festivals/govardhan-puja/govardhan-puja-2.webp",
  },
  {
    slug: "bhai-dooj",
    title: "Bhai Dooj (Yama Dwitiya)",
    shortDescription:
      "The conclusion of Diwali where sisters apply auspicious tilak to brothers for longevity and protection from Yama.",
    season: "Nov (Kartika Dwitiya)",
    region: "Pan-India & Nepal",
    significance: "Sibling Longevity & Divine Grace",
    image: "/festivals/bhai-dooj/bhai-dooj-2.webp",
  },
  {
    slug: "makar-sankranti",
    title: "Makar Sankranti",
    shortDescription:
      "The glorious solar harvest festival celebrating the Sun's transit into Capricorn with holy river baths, colorful kite flying, and sesame-jaggery treats.",
    season: "Jan (14-15 January)",
    region: "Pan-India & Global",
    significance: "Solar Uttarayan, Harvest & Sweet Harmony",
    image: "/festivals/slider/image-1.webp",
  },
];

export const festivalsFAQs: FAQItem[] = [
  {
    title: "What is the spiritual significance of Hindu festivals?",
    content:
      "Hindu festivals in Sanatana Dharma celebrate the eternal victory of Dharma (righteousness) over Adharma, harmonize human life with the astronomical cycles of the seasons, and deepen our devotion, family bonds, and reverence for nature and the Divine.",
  },
  {
    title: "Why do the dates of Indian festivals change every year on the English calendar?",
    content:
      "Indian festivals are determined by the Vedic Lunisolar Calendar (Panchang), which calculates auspicious moments (Tithis, Nakshatras, and solar transits). Because the lunar year is roughly 354 days compared to the 365-day Gregorian solar calendar, festival dates shift each year by about 10-11 days until an intercalary month (Adhik Maas) realigns them.",
  },
  {
    title: "What is the difference between major harvest festivals like Pongal, Onam, and Makar Sankranti?",
    content:
      "While all three mark agricultural abundance and solar transitions, they celebrate distinct regional traditions: Makar Sankranti marks the Sun entering Capricorn (Uttarayan) across northern and western India; Pongal is Tamil Nadu's 4-day thanksgiving to Surya Dev and farm cattle; and Onam is Kerala's 10-day harvest jubilee commemorating King Mahabali and Lord Vamana.",
  },
  {
    title: "Which major festivals involve sacred fasting (Vrat) and discipline?",
    content:
      "Festivals emphasizing rigorous fasting and inner purification include Chhath Puja (36-hour Nirjala waterless fast), Navratri (9 days of satvik/phalahar diet and Devi worship), Krishna Janmashtami (midnight fast until Rohini Nakshatra), and Karwa Chauth / Ekadashi observances.",
  },
  {
    title: "How are regional variations of festivals like Navratri or Holi celebrated across India?",
    content:
      "Indian festivals exhibit incredible cultural diversity: During Navratri, Gujarat celebrates with vibrant Garba and Dandiya Raas, Bengal worships Mahishasuramardini during Durga Puja, and South India sets up Golu doll displays. For Holi, Braj celebrates Lathmar and Phoolon ki Holi, whereas Anandpur Sahib hosts martial Hola Mohalla and Bengal celebrates Dol Jatra.",
  },
  {
    title: "What is the importance of traditional Prasad and festive foods in festivals?",
    content:
      "In Vedic tradition, festive food is first offered with heartfelt devotion to God as Naivedyam, sanctifying it into Prasad. Traditional delicacies like Gujiya (Holi), Modak (Ganesh Chaturthi), Makhan Mishri (Janmashtami), and Sakkarai Pongal (Pongal) nourish the body and symbolize spiritual grace, sweetness, and sharing with the entire community.",
  },
];

export const festivalsData: FestivalSection[] = Object.values(
  FESTIVAL_DETAILS_CONFIG_REGISTRY,
).map((fest) => ({
  title: fest.name,
  description: fest.listingCard.shortDescription,
  images: [fest.heroImage, fest.featuredOverviewImage || fest.heroImage],
  descriptionAnchor: "left",
  alts: [fest.name, `${fest.name} celebration`],
}));
