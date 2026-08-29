import { HighlightCardData } from "@/_types/calendar.types";
import { calculatePanchangForDate } from "./panchang";

export interface DailyWisdomPoolItem {
  sanskritScript: string;
  source: string; // e.g. "Bhagavad Gita 2.47"
  translation: string;
  commentary: string;
  wisdomTitle: string;
  wisdomQuote: string;
  wisdomReflection: string;
}

export const SACRED_SHLOKAS_POOL: DailyWisdomPoolItem[] = [
  {
    sanskritScript:
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    source: "Bhagavad Gita 2.47",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.",
    commentary: "Perform actions with wholehearted dedication as an offering to the Divine without anxiety over results.",
    wisdomTitle: "Selfless Action (Nishkama Karma)",
    wisdomQuote: "Purity of mind is the greatest pilgrimage. Practice quiet contemplation today.",
    wisdomReflection: "When the lake of the mind is undisturbed by worldly anxieties, the divine reflection of the true Self shines crystal clear.",
  },
  {
    sanskritScript:
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
    source: "Bhagavad Gita 18.66",
    translation: "Abandon all varieties of dharmas and simply surrender unto Me alone.",
    commentary: "Lord Krishna assures complete liberation and spiritual protection when one surrenders with pure devotion.",
    wisdomTitle: "Total Surrender (Sharanagati)",
    wisdomQuote: "Devotion is not an obligation; it is the natural fragrance of a loving soul.",
    wisdomReflection: "Surrendering egoistic control allows divine grace to flow seamlessly into every aspect of life.",
  },
  {
    sanskritScript:
      "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    source: "Bhagavad Gita 4.7",
    translation: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself.",
    commentary: "The Divine manifests in the cosmic order to protect the righteous and restore universal harmony.",
    wisdomTitle: "Triumph of Righteousness",
    wisdomQuote: "Truth alone triumphs, not falsehood (Satyameva Jayate).",
    wisdomReflection: "Aligning your daily actions with Dharma creates an unbreakable shield of inner peace.",
  },
  {
    sanskritScript:
      "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय॥ ॐ शान्तिः शान्तिः शान्तिः॥",
    source: "Brihadaranyaka Upanishad 1.3.28",
    translation: "Lead me from untruth to truth; lead me from darkness to light; lead me from death to immortality.",
    commentary: "An ancient Vedic invocation seeking the dawn of divine knowledge over the shadows of ignorance.",
    wisdomTitle: "The Dawn of Inner Light",
    wisdomQuote: "The light you seek in the universe is already glowing within your own spiritual heart.",
    wisdomReflection: "Meditation dissolves outer chaos and reveals the unshakeable stillness of pure consciousness.",
  },
  {
    sanskritScript:
      "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात्परं ब्रह्म तस्मै श्रीगुरवे नमः॥",
    source: "Guru Gita (Skanda Purana)",
    translation: "The Guru is Brahma, the Guru is Vishnu, the Guru is Shiva. The Guru is verily the supreme Brahman. Salutations to that Holy Guru.",
    commentary: "Reverence to the spiritual master who dispels the darkness of ignorance and guides the soul to liberation.",
    wisdomTitle: "The Guiding Grace of Guru",
    wisdomQuote: "A single blessing from a true master can illuminate lifetimes of wandering.",
    wisdomReflection: "Express gratitude to your teachers and parents today for bestowing wisdom and values upon your life.",
  },
  {
    sanskritScript:
      "वसुधैव कुटुम्बकम्॥\nउदारचरितानां तु वसुधैव कुटुम्बकम्॥",
    source: "Maha Upanishad 6.71",
    translation: "The whole world is one single family for those of noble heart.",
    commentary: "Transcend narrow divisions of nationality and creed; embrace all beings with boundless love and compassion.",
    wisdomTitle: "Universal Brotherhood",
    wisdomQuote: "See God in every living being and treat all with unconditional kindness.",
    wisdomReflection: "Compassion is the highest religion; when you heal others, you heal yourself.",
  },
  {
    sanskritScript:
      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
    source: "Bhagavad Gita 2.48",
    translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.",
    commentary: "True yoga is not merely physical postures, but mental poise and tranquility in both joy and sorrow.",
    wisdomTitle: "Equanimity in Life (Samatvam)",
    wisdomQuote: "A peaceful mind is the highest wealth a human being can possess.",
    wisdomReflection: "Do not let fleeting worldly praise or criticism disturb your inner sanctuary of peace.",
  },
];

/**
 * Computes deterministic daily highlights for any given date.
 */
export function getDailyHighlightsForDate(
  year: number,
  month: number,
  day: number,
  customHighlights?: HighlightCardData[],
): HighlightCardData[] {
  if (customHighlights && customHighlights.length > 0) {
    return customHighlights;
  }

  const dateObj = new Date(year, month - 1, day);
  const dayOfYear = Math.floor(
    (dateObj.getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Pick deterministic shloka from sacred pool
  const shlokaIndex = Math.abs((year * 365 + dayOfYear) % SACRED_SHLOKAS_POOL.length);
  const shlokaItem = SACRED_SHLOKAS_POOL[shlokaIndex] || SACRED_SHLOKAS_POOL[0];

  // Compute exact Panchang for the day
  const panchang = calculatePanchangForDate(year, month, day);

  return [
    {
      id: `daily-shloka-${year}-${month}-${day}`,
      tag: "TODAY'S SHLOKA",
      tagColor: "gold",
      sanskritScript: shlokaItem.sanskritScript,
      title: shlokaItem.source,
      subtitle: shlokaItem.translation,
      description: shlokaItem.commentary,
      ctaText: "Read Meaning & Commentary",
      ctaHref: "/sanatana-dharma",
    },
    {
      id: `daily-muhurat-${year}-${month}-${day}`,
      tag: "AUSPICIOUS MUHURAT",
      tagColor: "orange",
      sanskritScript: "ॐ नमो भगवते वासुदेवाय नमः",
      title: "Abhijit Muhurat",
      subtitle: `${panchang.abhijitMuhurat} (Most Auspicious Midday Window)`,
      description: `Brahma Muhurat: ${panchang.brahmaMuhurat} • Tithi: ${panchang.tithiName} • Rahu Kaal: ${panchang.rahuKaal} (Inauspicious).`,
      ctaText: "View Full Panchang",
      ctaHref: "/calendar",
    },
    {
      id: `daily-wisdom-${year}-${month}-${day}`,
      tag: "SPIRITUAL WISDOM",
      tagColor: "amber",
      title: shlokaItem.wisdomTitle,
      subtitle: shlokaItem.wisdomQuote,
      description: shlokaItem.wisdomReflection,
      ctaText: "Read More Insights",
      ctaHref: "/blog",
    },
  ];
}
