import {
  NumerologyHeroData,
  NumerologyNumberProfile,
  NumerologyFeature,
  NumerologyJourneyStep,
  NumerologyBenefitItem,
  NumerologyBeginJourneyData,
} from "../types/numerology.types";




export const NUMEROLOGY_HERO_DATA: NumerologyHeroData = {
  eyebrow: "» THE ANCIENT SCIENCE OF NUMBERS «",
  titleLines: {
    line1: "YOUR",
    line2: "NUMBERS.",
    line3: "YOUR KARMA.",
  },
  description:
    "Discover the spiritual energy hidden within your birth date and name through the timeless wisdom of Numerology.",
  ctaText: "DISCOVER YOUR NUMBERS",
  ctaHref: "#calculator-section",
  imageSrc: "/numerology/numerology_hero.webp",
  imageAlt: "Vedic Numerology Sacred Geometry Wheel and Lotus Yantra with Temple Architecture",
};

export const NUMEROLOGY_NUMBERS_DATA: NumerologyNumberProfile[] = [
  {
    number: 1,
    slug: "number-1",
    planet: "Surya (Sun)",
    deity: "Lord Shiva / Surya Narayana",
    title: "The Pioneer & Natural Leader",
    traits: ["Visionary", "Independent", "Ambitious", "Creative"],
    element: "Fire",
    gemstone: "Ruby (Manik)",
    luckyColor: "Gold / Orange",
    mantra: "Om Suryaya Namaha",
    description:
      "Ruled by Surya, Number 1 individuals possess intense vitality, boundless initiative, and supreme confidence. They are destined to lead, innovate, and illuminate pathways for others.",
  },
  {
    number: 2,
    slug: "number-2",
    planet: "Chandra (Moon)",
    deity: "Lord Shiva / Gauri",
    title: "The Harmonizer & Intuitive Healer",
    traits: ["Diplomatic", "Empathetic", "Graceful", "Artistic"],
    element: "Water",
    gemstone: "Pearl (Moti)",
    luckyColor: "White / Silver",
    mantra: "Om Chandraya Namaha",
    description:
      "Reflecting the calm grace of Chandra, Number 2 brings profound emotional depth, peacemaking wisdom, and artistic sensitivity to every environment.",
  },
  {
    number: 3,
    slug: "number-3",
    planet: "Guru / Brihaspati (Jupiter)",
    deity: "Lord Brahma / Saraswati",
    title: "The Sage & Creator",
    traits: ["Wisdom", "Expressive", "Optimistic", "Spiritual"],
    element: "Fire",
    gemstone: "Yellow Sapphire (Pukhraj)",
    luckyColor: "Yellow / Saffron",
    mantra: "Om Brihaspataye Namaha",
    description:
      "Guided by the Guru of the Gods, Number 3 radiates wisdom, eloquence, jovial optimism, and higher philosophical knowledge.",
  },
  {
    number: 4,
    slug: "number-4",
    planet: "Rahu (North Node)",
    deity: "Lord Ganesha / Durga",
    title: "The Architect & Game-Changer",
    traits: ["Disciplined", "Strategic", "Practical", "Tenacious"],
    element: "Earth",
    gemstone: "Hessonite (Gomed)",
    luckyColor: "Electric Blue / Smoke Grey",
    mantra: "Om Rahave Namaha",
    description:
      "Channeling the transformative energy of Rahu, Number 4 builds sturdy foundations, masters technical complexity, and thrives in breakthrough ventures.",
  },
  {
    number: 5,
    slug: "number-5",
    planet: "Budha (Mercury)",
    deity: "Lord Vishnu / Saraswati",
    title: "The Adaptable Communicator",
    traits: ["Dynamic", "Curious", "Charismatic", "Free-Spirited"],
    element: "Air",
    gemstone: "Emerald (Panna)",
    luckyColor: "Green",
    mantra: "Om Budhaya Namaha",
    description:
      "Ruled by Mercury, the intellect planet, Number 5 represents swift versatility, sharp mercantile acumen, and vibrant communicative power.",
  },
  {
    number: 6,
    slug: "number-6",
    planet: "Shukra (Venus)",
    deity: "Maa Lakshmi / Kartikeya",
    title: "The Divine Nurturer & Aesthetic",
    traits: ["Harmonious", "Loving", "Compassionate", "Artistic"],
    element: "Water",
    gemstone: "Diamond (Heera) / White Opal",
    luckyColor: "Pastel Pink / Turquoise",
    mantra: "Om Shukraya Namaha",
    description:
      "Embodying the grace of Shukra, Number 6 attracts beauty, artistic excellence, boundless unconditional love, and family harmony.",
  },
  {
    number: 7,
    slug: "number-7",
    planet: "Ketu (South Node)",
    deity: "Lord Ganesha / Matsya",
    title: "The Mystic Seeker & Philosopher",
    traits: ["Intuitive", "Analytical", "Spiritual", "Reflective"],
    element: "Water / Ether",
    gemstone: "Cat's Eye (Lehsuniya)",
    luckyColor: "Light Grey / Sea Green",
    mantra: "Om Ketave Namaha",
    description:
      "Guided by Ketu's introspective power, Number 7 dives deep into metaphysical research, inner meditation, and occult mysteries.",
  },
  {
    number: 8,
    slug: "number-8",
    planet: "Shani (Saturn)",
    deity: "Lord Shani / Lord Shiva",
    title: "The Karmic Master & Authority",
    traits: ["Resilient", "Persevering", "Organized", "Visionary"],
    element: "Earth / Air",
    gemstone: "Blue Sapphire (Neelam)",
    luckyColor: "Dark Blue / Charcoal",
    mantra: "Om Sham Shanaicharaya Namaha",
    description:
      "Ruled by Shani Bhagwan, Number 8 teaches righteous karma, long-term mastery, supreme resilience, and profound material and spiritual wealth.",
  },
  {
    number: 9,
    slug: "number-9",
    planet: "Mangal (Mars)",
    deity: "Lord Hanuman / Murugan",
    title: "The Warrior & Universal Humanitarian",
    traits: ["Courageous", "Compassionate", "Protector", "Generous"],
    element: "Fire",
    gemstone: "Red Coral (Moonga)",
    luckyColor: "Crimson / Coral Red",
    mantra: "Om Mangalaya Namaha",
    description:
      "Fueled by Mars and blessed by Lord Hanuman, Number 9 embodies divine courage, selfless protection, and completion of universal cosmic cycles.",
  },
];


export const NUMEROLOGY_FEATURES: NumerologyFeature[] = [
  {
    id: "mulank",
    title: "Mulank (Root Number)",
    description: "Calculated from your birth day alone, revealing your core psychic nature, innate talents, and planetary ruler.",
    iconName: "sun",
  },
  {
    id: "bhagyank",
    title: "Bhagyank (Destiny Number)",
    description: "Derived from your full date of birth, reflecting your life path, destiny milestones, and cosmic purpose.",
    iconName: "compass",
  },
  {
    id: "namank",
    title: "Namank (Name Number)",
    description: "Calculated from your full vibrational name sounds, influencing your public charisma, career resonance, and relationships.",
    iconName: "sparkles",
  },
];

export const NUMEROLOGY_LANGUAGE_DATA = {
  eyebrow: "WHY DID ANCIENT RISHIS STUDY NUMBERS?",
  title: {
    line1: "Numbers Are The",
    line2: "Language",
    line3: "Of The Universe",
  },
  paragraphs: [
    "Ancient Indian wisdom has always believed that the universe speaks through patterns.",
    "Just as planets influence time and seasons, numbers represent unique vibrations that accompany every individual throughout life.",
    "Numerology is one of the many ways to reflect upon these patterns and understand ourselves more deeply.",
  ],
  quote: {
    line1: "It does not bind your destiny,",
    line2: "it helps you walk your path with awareness.",
  },
  imageSrc: "/numerology/numerology_language.webp",
  imageAlt: "Sacred Numerology Mandala Chart showing Personality, Purpose, Strengths, Growth, Challenges, and Relationships",
};

export const NUMEROLOGY_JOURNEY_STEPS: NumerologyJourneyStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "YOUR NAME",
    description: "The letters in your name carry a unique vibration.",
    iconName: "user",
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "YOUR BIRTH DATE",
    description: "The numbers of your birth date hold divine patterns.",
    iconName: "calendar",
    isHighlighted: true,
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "YOUR NUMBERS",
    description: "These patterns are revealed through numbers.",
    iconName: "chakra",
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "YOUR PERSONALITY",
    description: "Understand your natural traits and tendencies.",
    iconName: "personality",
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "YOUR PURPOSE",
    description: "Discover why you are here and your life direction.",
    iconName: "purpose",
  },
  {
    id: "step-6",
    stepNumber: 6,
    title: "YOUR GROWTH",
    description: "Use this awareness to grow, evolve and create impact.",
    iconName: "growth",
  },
];

export const NUMEROLOGY_BENEFITS_DATA: NumerologyBenefitItem[] = [
  {
    id: "benefit-1",
    title: "Self-Discovery",
    description: "Gain deep clarity about your core strengths, natural temperament, and subconscious behavioral tendencies.",
    iconName: "brain",
  },
  {
    id: "benefit-2",
    title: "Energy Harmony",
    description: "Align your daily decisions with your cosmic planetary vibrations to dissolve friction and invite balance.",
    iconName: "flame",
  },
  {
    id: "benefit-3",
    title: "Fulfilling Career",
    description: "Identify professional paths, business ventures, and leadership roles that naturally resonate with your destiny number.",
    iconName: "target",
  },
  {
    id: "benefit-4",
    title: "Mindful Decisions",
    description: "Make confident life choices with timing awareness, turning uncertainties into opportunities for conscious growth.",
    iconName: "compass",
  },
  {
    id: "benefit-5",
    title: "Relationship Resonance",
    description: "Understand interpersonal dynamics, compatibility factors, and empathy bridges with family, partners, and team members.",
    iconName: "heart",
  },
  {
    id: "benefit-6",
    title: "Spiritual Evolution",
    description: "Connect with your karmic milestones, Navagraha mantras, and sacred dharmic purpose for lasting fulfillment.",
    iconName: "award",
  },
];

export const NUMEROLOGY_BEGIN_JOURNEY_DATA: NumerologyBeginJourneyData = {
  title: "BEGIN YOUR SPIRITUAL JOURNEY",
  subtitleLines: [
    "Numbers are not just symbols, they are vibrations of your soul.",
    "Understand them. Embrace them. Elevate your life.",
  ],
  ctaText: "DISCOVER YOUR NUMBERS",
  ctaHref: "#calculator-section",
  bgImageSrc: "/numerology/begin_journey.webp",
  bgImageAlt: "Sacred Meditation Yogi in Lotus Posture with Golden Yantra Mandala Altar",
  pillars: [
    {
      id: "pillar-1",
      title: "ROOTED IN SANATAN DHARMA",
      description: "Guided by ancient wisdom and spiritual values.",
      iconName: "user",
    },
    {
      id: "pillar-2",
      title: "AUTHENTIC & RESPONSIBLE",
      description: "We promote awareness, not fear or dependency.",
      iconName: "user",
    },
    {
      id: "pillar-3",
      title: "FOR SELF-AWARENESS",
      description: "Empowering you to make better life choices.",
      iconName: "user",
    },
    {
      id: "pillar-4",
      title: "SIMPLE & MEANINGFUL",
      description: "Complex concepts explained in a clear way.",
      iconName: "user",
    },
  ],
};





