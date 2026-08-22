import type {
  Temple,
  TempleFeaturePillar,
  TempleMilestone,
  TempleScheduleItem,
  TempleTravelGuide,
} from "@/_types/Temples.types";
import { temples } from "@/_lib/constants/temples.constants";

export interface TempleDetailConfig extends Partial<Temple> {
  slug: string;
}

/**
 * Rich bespoke configuration registry for all 18 temples in temples.constants.ts.
 * Every temple features detailed metadata matching the reference UI mockup.
 */
export const TEMPLE_DETAILS_CONFIG_REGISTRY: Record<string, Partial<Temple>> = {
  "kashi-vishwanath-temple": {
    subtitle: "The Sacred Abode of Lord Shiva",
    deity: "Lord Shiva (Vishwanath / Vishweshwara)",
    established: "1780 AD",
    rating: 4.9,
    ratingText: "4.9 (42k+ Reviews)",
    significance: "12 Jyotirlingas",
    statsPills: [
      "12 / 12 Jyotirlinga",
      "Traditional Hindu Heritage",
      "Open for Daily Darshan",
    ],
    spiritualQuote: {
      quote:
        "In Kashi, even time slows down to whisper prayers into the eternal flow of the Holy Ganga.",
      author: "Kashi Purana",
    },
    videoThumbnail: {
      image: "/temples-images/vishwanath/description/vishwanath-desc-1.webp",
      duration: "08:45 MINS",
      videoUrl: "https://www.youtube.com/watch?v=kashi_darshan",
    },
    timeline: [
      {
        year: "1100 AD",
        description: "Early historical records and construction by Gahadavala kings.",
      },
      {
        year: "1585 AD",
        description: "Reconstructed by Raja Todar Mal with Pandit Narayana Bhatta's guidance.",
      },
      {
        year: "1780 AD",
        description: "Grand reconstruction of the current temple structure by Queen Ahilyabai Holkar of Indore.",
      },
      {
        year: "2022 AD",
        description: "Inauguration of the state-of-the-art Kashi Vishwanath Dham Corridor connecting the temple to the Ganga ghats.",
      },
    ],
    originsParagraphs: [
      "Kashi Vishwanath Temple stands on the western bank of the holy River Ganga in Varanasi, one of the oldest living cities in human history. Revered as the spiritual heart of Hinduism, it is believed that Lord Shiva himself resides here as the king of liberation (Moksha).",
      "Historical chronicles tell of the temple's enduring spiritual energy despite undergoing reconstruction across different centuries. In 1780, the devout Maratha ruler Maharani Ahilyabai Holkar restored the sanctum, and in 1835, Maharaja Ranjit Singh of Punjab donated 1,000 kilograms of pure gold to plate its iconic towering spire (Shikhara).",
    ],
    facts: [
      "One of the 12 sacred Jyotirlingas of Lord Shiva across India.",
      "Spire is plated with 1,000 kg of pure gold donated by Maharaja Ranjit Singh.",
      "Rebuilt in 1780 by Queen Ahilyabai Holkar after several historical battles.",
      "Directly connected to the sacred Ganga ghats via the grand Kashi Vishwanath Corridor.",
      "Believed that a single darshan grants liberation from the cycle of rebirth.",
    ],
    factsBookImage: "/temples-images/vishwanath/history/vishwanath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "NAGARA HERITAGE",
        description:
          "Features quintessential Nagara-style architecture with an intricately sculpted gold-leaf shikhara, silver doorways, and ancient stone mandapas.",
        image: "/temples-images/vishwanath/features/vishwanath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "SACRED LORE",
        description:
          "According to Skanda Purana, Varanasi is unmovably anchored on the trident of Lord Shiva, making this temple indestructible by cosmic time.",
        image: "/temples-images/vishwanath/features/vishwanath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "DIVINE PUJAS",
        description:
          "Famous for 5 distinct daily aartis including the divine Mangala Aarti at 3:00 AM and the enchanting Sapta Rishi Aarti at night.",
        image: "/temples-images/vishwanath/location/vishwanath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Mangala Aarti (Pre-Dawn Ritual)", time: "3:00 AM" },
      { title: "Bhog Aarti & Morning Darshan", time: "11:15 AM – 12:20 PM" },
      { title: "Sandhya Aarti (Evening Ritual)", time: "7:00 PM – 8:15 PM" },
      { title: "Shringar & Sapta Rishi Aarti", time: "9:00 PM – 10:15 PM" },
      { title: "Shayan Aarti (Temple Closes)", time: "10:30 PM – 11:00 PM" },
    ],
    scheduleNote:
      "Darshan timings may extend during auspicious festivals such as Mahashivratri, Shravan Mondays, and Dev Deepawali.",
    travelGuide: {
      howToReach:
        "Varanasi Cantt Station (Junction) is 4.5 km away; Lal Bahadur Shastri International Airport (Babatpur) is 25 km.",
      stayAndFood:
        "Wide variety of comfortable pilgrim ashrams, luxury heritage hotels along the ghats, and pure satvik vegetarian cuisine.",
      dressCode:
        "Modest attire covering shoulders and knees; traditional Indian wear (dhotis/saris) is recommended for sanctum darshan.",
      bestTimeToVisit:
        "October to March when Varanasi weather is pleasantly cool; early morning boat rides on the Ganga are ideal.",
    },
    nearbyTempleSlugs: [
      "ayodhya-ram-temple",
      "somnath-temple",
      "kedarnath-temple",
      "badrinath-temple",
    ],
  },
  "konark-sun-temple": {
    subtitle: "The Magnificent Sun Chariot of Kalinga",
    deity: "Surya Dev (Sun God)",
    established: "13th Century AD (1250 AD)",
    rating: 4.8,
    ratingText: "4.8 (38k+ Reviews)",
    significance: "UNESCO World Heritage Site",
    statsPills: [
      "UNESCO World Heritage",
      "Kalinga Architectural Marvel",
      "24 Astronomical Wheels",
    ],
    spiritualQuote: {
      quote:
        "Here the language of stone surpasses the language of human art in paying homage to the cosmic Sun God.",
      author: "Rabindranath Tagore",
    },
    videoThumbnail: {
      image: "/temples-images/konark-sun/description/konark-desc-1.webp",
      duration: "06:50 MINS",
      videoUrl: "https://www.youtube.com/watch?v=konark_temple",
    },
    timeline: [
      {
        year: "1250 AD",
        description: "Commissioned by King Narasimhadeva I of the Eastern Ganga Dynasty over 12 years with 1,200 artisans.",
      },
      {
        year: "16th Century",
        description: "Endured coastal storms and historical conflicts, yet preserved its monumental stone assembly.",
      },
      {
        year: "1984 AD",
        description: "Inscribed as a prestigious UNESCO World Heritage Site celebrating ancient Indian astronomical brilliance.",
      },
      {
        year: "Present Day",
        description: "Hosts the world-renowned Konark Dance Festival each December against the illuminated stone backdrop.",
      },
    ],
    originsParagraphs: [
      "The Konark Sun Temple was conceived as an immense cosmic chariot for Surya, the Sun God, adorned with 24 intricately carved stone wheels drawn by seven galloping horses symbolizing the days of the week.",
      "Engineered with remarkable astronomical precision, the temple wheels act as accurate sundials where shadows cast by the spokes pinpoint the precise time of day down to minutes.",
    ],
    facts: [
      "Designed as a celestial 24-wheeled chariot pulled by 7 stone horses.",
      "The carved wheels function as precision sundials telling exact local solar time.",
      "Constructed entirely from Khondalite rocks using iron beams and magnetic lodestones.",
      "Declared a UNESCO World Heritage Site in 1984 for monumental artistic genius.",
    ],
    factsBookImage: "/temples-images/konark-sun/history/konark-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "KALINGA HERITAGE",
        description:
          "Pinnacle of Kalinga temple architecture featuring exquisitely carved erotic, musical, and mythological sculptures.",
        image: "/temples-images/konark-sun/features/konark-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "SOLAR HEALING",
        description:
          "Legend holds that Samba, son of Lord Krishna, built this temple to worship Surya and was cured of leprosy by solar grace.",
        image: "/temples-images/konark-sun/features/konark-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SOLAR FESTIVALS",
        description:
          "Celebrated with great grandeur during Magha Saptami (Chandrabhaga Mela) when pilgrims take holy dips at dawn.",
        image: "/temples-images/konark-sun/location/konark-location-1.webp",
      },
    ],
    schedules: [
      { title: "Monument & Complex Opens", time: "6:00 AM" },
      { title: "Morning Guided Solar Heritage Walks", time: "7:00 AM – 11:00 AM" },
      { title: "Afternoon Exploration & Museum", time: "11:30 AM – 4:30 PM" },
      { title: "Sunset Illumination & Sound-Light Show", time: "6:30 PM – 8:00 PM" },
    ],
    scheduleNote:
      "The Sun Temple is a preserved archaeological monument under the ASI; entry tickets can be pre-booked online.",
    travelGuide: {
      howToReach:
        "35 km from Puri Railway Station; 65 km from Biju Patnaik International Airport, Bhubaneswar via Marine Drive.",
      stayAndFood:
        "OTDC Panthanivas luxury eco-retreats along Chandrabhaga beach and traditional Odia cuisine eateries.",
      dressCode:
        "Comfortable walking shoes and modest casual or traditional clothing suitable for outdoor heritage exploration.",
      bestTimeToVisit:
        "October to March for pleasant coastal temperatures and the Konark Dance Festival in December.",
    },
    nearbyTempleSlugs: [
      "shri-jagannath-temple",
      "brihadeeswara-temple",
      "ramanathaswamy-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "brihadeeswara-temple": {
    subtitle: "The Great Living Chola Masterpiece",
    deity: "Lord Shiva (Peruvudaiyar / Rajarajeswaram)",
    established: "1010 AD",
    rating: 4.9,
    ratingText: "4.9 (41k+ Reviews)",
    significance: "UNESCO World Heritage Site",
    statsPills: [
      "1,000+ Years Old",
      "Solid Granite Architecture",
      "80-Tonne Kumbam Capstone",
    ],
    spiritualQuote: {
      quote:
        "Rajaraja Chola built not merely a temple of granite, but a mountain of devotion reaching into the eternal skies.",
      author: "Chola Inscriptions",
    },
    videoThumbnail: {
      image: "/temples-images/brihadeeswara/description/brihadeeswara-desc-1.webp",
      duration: "07:30 MINS",
      videoUrl: "https://www.youtube.com/watch?v=thanjavur_temple",
    },
    timeline: [
      {
        year: "1003 AD",
        description: "Construction initiated by Emperor Rajaraja Chola I to commemorate victory and spiritual devotion.",
      },
      {
        year: "1010 AD",
        description: "Consecrated with the installation of the massive 80-tonne granite Kumbam atop the 216-foot vimana.",
      },
      {
        year: "1987 AD",
        description: "Designated as a UNESCO World Heritage Site under the Great Living Chola Temples.",
      },
      {
        year: "2010 AD",
        description: "Celebrated 1,000th anniversary of completion with grand classical Bharatanatyam performances by 1,000 dancers.",
      },
    ],
    originsParagraphs: [
      "Brihadeeswara Temple, located in Thanjavur, Tamil Nadu, is one of the largest granite temples in the world and stands as an unparalleled triumph of Dravidian architecture.",
      "The entire temple was constructed without any binding mortar, utilizing interlocking granite blocks. The top dome (Kumbam) alone weighs over 80 tonnes and was elevated using an inclined ramp stretching kilometers.",
    ],
    facts: [
      "Built entirely of solid granite without any quarry within a 50 km radius.",
      "The massive single-stone Nandi bull statue at the entrance weighs over 20 tonnes.",
      "Features one of the tallest temple vimanas (towers) in the world at 66 meters.",
      "Ancient murals and Tamil/Sanskrit inscriptions adorn the inner ambulatory corridor.",
    ],
    factsBookImage: "/temples-images/brihadeeswara/history/brihadeeswara-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "DRAVIDIAN APEX",
        description:
          "Towering 16-tier hollow granite vimana constructed with pure interlocking geometry that has withstood 1,000 years of tremors.",
        image: "/temples-images/brihadeeswara/features/brihadeeswara-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "SHIVA TANDAVA",
        description:
          "Depicts all 108 Karanas (sacred dance poses) of Nataraja carved in stone along the upper sanctum walls.",
        image: "/temples-images/brihadeeswara/features/brihadeeswara-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "CHOLA AARTI",
        description:
          "Daily abhishekams to the 12-foot Shiva Lingam accompanied by sacred Tamil Thevaram hymns and Nadaswaram music.",
        image: "/temples-images/brihadeeswara/location/brihadeeswara-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Temple Doors Open", time: "6:00 AM" },
      { title: "Uchikala Pooja & Darshan", time: "12:00 PM – 12:30 PM" },
      { title: "Afternoon Break (Temple Closed)", time: "12:30 PM – 4:00 PM" },
      { title: "Sayaratchai Pooja (Evening Ritual)", time: "6:00 PM – 7:30 PM" },
      { title: "Arthajama Pooja & Closing", time: "8:30 PM" },
    ],
    scheduleNote:
      "Special abhishekams are conducted on Pradosham days and during Maha Shivaratri with thousands of devotees.",
    travelGuide: {
      howToReach:
        "Thanjavur Junction is 2 km away; Tiruchirappalli International Airport (Trichy) is 58 km away.",
      stayAndFood:
        "Comfortable heritage stays in Thanjavur and authentic South Indian vegetarian thali restaurants.",
      dressCode:
        "Traditional Indian clothing (dhotis/shirts, sarees, churidars) is strictly observed for sanctum darshan.",
      bestTimeToVisit:
        "October to March when Tamil Nadu weather is pleasant and comfortable for temple walks.",
    },
    nearbyTempleSlugs: [
      "ramanathaswamy-temple",
      "konark-sun-temple",
      "tirupati-balaji-temple",
      "somnath-temple",
    ],
  },
  "somnath-temple": {
    subtitle: "The Eternal First Jyotirlinga of Lord Shiva",
    deity: "Lord Shiva (Somnath / Lord of the Moon)",
    established: "Ancient Origins (Rebuilt 1951 AD)",
    rating: 4.9,
    ratingText: "4.9 (48k+ Reviews)",
    significance: "First of 12 Jyotirlingas",
    statsPills: [
      "1st of 12 Jyotirlingas",
      "Prabhas Kshetra Heritage",
      "Sea-Shore Divine Abode",
    ],
    spiritualQuote: {
      quote:
        "Somnath stands as an eternal monument to the triumph of faith over destruction, radiating light across the Arabian Sea.",
      author: "Rigveda Hymns",
    },
    videoThumbnail: {
      image: "/temples-images/somnath/description/somnath-desc-1.webp",
      duration: "07:15 MINS",
      videoUrl: "https://www.youtube.com/watch?v=somnath_darshan",
    },
    timeline: [
      {
        year: "Vedic Era",
        description: "Originally built by Soma (the Moon God) in gold, then rebuilt by Ravana in silver and Krishna in sandalwood.",
      },
      {
        year: "1026 AD",
        description: "Faced numerous historical invasions and destructions, yet continually rebuilt with unwavering devotion.",
      },
      {
        year: "1951 AD",
        description: "Reconstructed in magnificent Chalukya architectural style initiated by Sardar Vallabhbhai Patel.",
      },
      {
        year: "Present Day",
        description: "Attracts millions of devotees worldwide with its world-class sea promenade and sound-and-light spectacle.",
      },
    ],
    originsParagraphs: [
      "Somnath Temple is situated on the sacred coast of Prabhas Patan in Gujarat where the mythical River Saraswati meets the Arabian Sea. It is traditionally considered the very first among the twelve Jyotirlinga shrines.",
      "The temple is famously located at a unique geographic point where the Baan Stambh (Arrow Pillar) marks an uninterrupted straight sea-line all the way to Antarctica without a single piece of land in between.",
    ],
    facts: [
      "Revered as the Aadi Jyotirlinga (First Jyotirlinga) in Hindu scriptures.",
      "The Baan Stambh indicates zero landmass between Somnath and Antarctica.",
      "Rebuilt seven times throughout history, symbolizing faith's ultimate resurrection.",
      "Features a towering 155-foot shikhara with a 10-tonne Kalash flagmast atop.",
      "Hosts a mesmerizing daily sound and light show voiced by legendary artists.",
    ],
    factsBookImage: "/temples-images/somnath/history/somnath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "CHALUKYA HERITAGE",
        description:
          "Constructed in the grand Kailash Mahameru Prasad style with intricate sandstone carvings, pillars, and a towering 155-foot main spire.",
        image: "/temples-images/somnath/features/somnath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "LUNAR BLESSING",
        description:
          "Lord Shiva blessed the Moon God (Chandra Dev) here to regain his lost radiance, establishing the holy Prabhas Teerth.",
        image: "/temples-images/somnath/features/somnath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SEA-SHORE AARTI",
        description:
          "Mesmerizing daily trishul aartis accompanied by ocean breezes, conch shells, damru beats, and sacred Vedic chanting.",
        image: "/temples-images/somnath/location/somnath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Darshan Opens", time: "6:00 AM" },
      { title: "Pratah Aarti (Morning Hymns)", time: "7:00 AM" },
      { title: "Madhyahna Aarti (Noon Prayer)", time: "12:00 PM" },
      { title: "Sandhya Aarti (Evening Ritual)", time: "7:00 PM" },
      { title: "Sound & Light Show & Temple Closes", time: "8:00 PM – 10:00 PM" },
    ],
    scheduleNote:
      "Cameras and mobile phones are strictly prohibited inside the main temple premises; secure lockers are available.",
    travelGuide: {
      howToReach:
        "Veraval Railway Station is 6 km away; Diu Airport is 85 km, and Rajkot Airport is 200 km.",
      stayAndFood:
        "Somnath Trust VIP Guest Houses, Sagar Darshan hotel facing the sea, and pure Gujarati Thali dining halls.",
      dressCode:
        "Decent traditional attire; shorts and sleeveless clothing are not permitted inside the inner sanctum.",
      bestTimeToVisit:
        "October to March when the coastal climate is refreshing and ideal for sea breezes and temple darshan.",
    },
    nearbyTempleSlugs: [
      "ayodhya-ram-temple",
      "kashi-vishwanath-temple",
      "tirupati-balaji-temple",
      "brihadeeswara-temple",
    ],
  },
  "gangotri-temple": {
    subtitle: "The Holy Origin Shrine of Goddess Ganga",
    deity: "Goddess Ganga",
    established: "18th Century AD",
    rating: 4.8,
    ratingText: "4.8 (29k+ Reviews)",
    significance: "Char Dham Yatra Shrine",
    statsPills: [
      "Altitude: 3,100 meters",
      "Source of Sacred River Ganga",
      "Himalayan Char Dham",
    ],
    spiritualQuote: {
      quote:
        "Where Bhagirathi flows from the heights of Gangotri, purity washes over body, mind, and spirit.",
      author: "Skanda Purana",
    },
    videoThumbnail: {
      image: "/temples-images/gangotri/description/gangotri-desc-1.webp",
      duration: "06:15 MINS",
      videoUrl: "https://www.youtube.com/watch?v=gangotri_darshan",
    },
    timeline: [
      {
        year: "Vedic Era",
        description: "King Bhagirath performed intense penance on the sacred Bhagirath Shila to bring Ganga to Earth.",
      },
      {
        year: "18th Century",
        description: "White granite temple built by Gorkha Commander General Amar Singh Thapa.",
      },
      {
        year: "20th Century",
        description: "Renovated and expanded by the Maharaja of Jaipur into the present gleaming shrine.",
      },
      {
        year: "Present Day",
        description: "Key opening pilgrimage stop on the revered Uttarakhand Chota Char Dham circuit.",
      },
    ],
    originsParagraphs: [
      "Gangotri Temple is situated in the Uttarkashi district of Uttarakhand at an elevation of 3,100 meters, nestled among towering deodars and snow-capped Himalayan peaks.",
      "According to Hindu scriptures, this is where Goddess Ganga touched earth as Bhagirathi after Lord Shiva caught her mighty currents in his matted locks to save Earth from devastation.",
    ],
    facts: [
      "Located at an altitude of 3,100 meters on the banks of Bhagirathi River.",
      "The sacred Bhagirath Shila slab where King Bhagirath meditated lies adjacent to the temple.",
      "Temple remains open for 6 months from Akshaya Tritiya to Diwali before moving to Mukhba village.",
      "Submerged Shivling in the river is visible only during winter when water levels recede.",
    ],
    factsBookImage: "/temples-images/gangotri/history/gangotri-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "NAGARA GRANITE",
        description:
          "Built using pure white Himalayan granite featuring 5 spires that glisten brilliantly against snow-capped mountains.",
        image: "/temples-images/gangotri/features/gangotri-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "GANGA DESCENT",
        description:
          "Bhagirathi descended to liberate 60,000 sons of King Sagara from Sage Kapila's curse.",
        image: "/temples-images/gangotri/features/gangotri-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "GANGA AARTI",
        description:
          "High priests conduct sacred evening Ganga Aarti along the roaring glacial riverbanks with brass lamps and chants.",
        image: "/temples-images/gangotri/location/gangotri-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Temple Opens & Mangal Darshan", time: "6:15 AM" },
      { title: "Midday Darshan & Abhishek", time: "7:00 AM – 2:00 PM" },
      { title: "Afternoon Cleaning Break", time: "2:00 PM – 3:00 PM" },
      { title: "Evening Ganga Aarti at Ghat", time: "6:30 PM – 7:30 PM" },
      { title: "Shayan Aarti & Temple Closes", time: "9:30 PM" },
    ],
    scheduleNote:
      "Open seasonally from April/May (Akshaya Tritiya) until November (Diwali/Bhai Dooj).",
    travelGuide: {
      howToReach:
        "100 km from Uttarkashi by road; 240 km from Rishikesh Railway Station; 250 km from Dehradun Airport.",
      stayAndFood:
        "GMVN tourist guest houses, ashrams, and pure vegetarian North Indian dining options.",
      dressCode:
        "Warm woollen layers, thermals, and modest traditional attire for temple premises.",
      bestTimeToVisit:
        "May to June and September to October for pleasant Himalayan weather.",
    },
    nearbyTempleSlugs: [
      "yamunotri-temple",
      "kedarnath-temple",
      "badrinath-temple",
      "kainchi-dham",
    ],
  },
  "mata-vaishno-devi-cave": {
    subtitle: "The Divine Shakti Peeth of the Trikuta Mountains",
    deity: "Mata Vaishno Devi (Maha Kali, Maha Lakshmi, Maha Saraswati)",
    established: "Ancient Vedic Origins",
    rating: 4.9,
    ratingText: "4.9 (60k+ Reviews)",
    significance: "Supreme Shakti Shrine",
    statsPills: [
      "Altitude: 1,585 meters",
      "Holy Pindies Manifestation",
      "12 km Sacred Trek",
    ],
    spiritualQuote: {
      quote:
        "Chalo Bulawa Aaya Hai, Mata Ne Bulaya Hai — faith transforms the steepest mountain trek into divine bliss.",
      author: "Vaishno Devi Bhakti Lore",
    },
    videoThumbnail: {
      image: "/temples-images/vaishnodevi/description/vaishnodevi-desc-1.webp",
      duration: "08:10 MINS",
      videoUrl: "https://www.youtube.com/watch?v=vaishnodevi_darshan",
    },
    timeline: [
      {
        year: "Treta Yuga",
        description: "Mata Vaishno Devi manifested to defeat evil and meditated in the holy cave on Trikuta hills.",
      },
      {
        year: "Medieval Era",
        description: "Pandit Shridhar discovered the holy natural cave following divine visions.",
      },
      {
        year: "1986 AD",
        description: "Formation of Shri Mata Vaishno Devi Shrine Board (SMVDSB) leading to world-class pilgrim amenities.",
      },
      {
        year: "Present Day",
        description: "Over 8 million pilgrims visit annually via modern battery cars, ropeways, and helicopter services.",
      },
    ],
    originsParagraphs: [
      "Mata Vaishno Devi Temple is nestled in the Trikuta Hills of Jammu & Kashmir at an altitude of 1,585 meters. In the sanctum sanctorum, the Goddess is worshipped not in an idol, but in the form of three naturally formed sacred rock pindies.",
      "The divine pindies represent the supreme shaktis: Maha Kali (destruction of negativity), Maha Lakshmi (wealth and prosperity), and Maha Saraswati (wisdom and purity).",
    ],
    facts: [
      "Revered as one of the most visited pilgrimage sites in the world with over 8 million annual devotees.",
      "The holy cave contains no idols; darshan is of the three natural rock pindies immersed in Charan Ganga water.",
      "A 12 km scenic track connects base camp Katra with the holy Bhawan.",
      "Visiting the Bhairavnath Temple at the summit is considered essential to complete the pilgrimage.",
    ],
    factsBookImage: "/temples-images/vaishnodevi/history/vaishnodevi-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "NATURAL CAVE SHAKTI",
        description:
          "A subterranean limestone natural cave with crystal-clear holy waters of Charan Ganga washing the divine pindies.",
        image: "/temples-images/vaishnodevi/features/vaishnodevi-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "BHAIRAVNATH LIBERATION",
        description:
          "The Goddess assumed her fierce form to vanquish Bhairavnath, granting him moksha upon his repentance.",
        image: "/temples-images/vaishnodevi/features/vaishnodevi-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "ATKA AARTI",
        description:
          "Divine sunrise and sunset Atka Aartis with live devotional bhajans by renowned artists broadcast globally.",
        image: "/temples-images/vaishnodevi/location/vaishnodevi-location-1.webp",
      },
    ],
    schedules: [
      { title: "Temple Darshan", time: "Open 24 Hours Daily" },
      { title: "Morning Maha Aarti", time: "6:00 AM – 8:00 AM" },
      { title: "Evening Maha Aarti", time: "6:00 PM – 8:00 PM" },
      { title: "Bhairavnath Ropeway Operations", time: "7:00 AM – 5:00 PM" },
    ],
    scheduleNote:
      "Mandatory free Yatra Registration Slip (RFID card) must be collected at Katra before commencing the trek.",
    travelGuide: {
      howToReach:
        "Shri Mata Vaishno Devi Katra Railway Station connects directly to major Indian cities; Jammu Airport is 50 km away.",
      stayAndFood:
        "SMVDSB guest houses, private 5-star hotels in Katra, and free satvik langar facilities along the track.",
      dressCode:
        "Comfortable walking tracksuits/shoes for the trek and modest traditional attire for the inner Bhawan.",
      bestTimeToVisit:
        "March to October for clear mountain trekking weather; Navratri festivals offer supreme spiritual energy.",
    },
    nearbyTempleSlugs: [
      "shri-amarnath-cave",
      "golden-temple",
      "kedarnath-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "shri-jagannath-temple": {
    subtitle: "The Lord of the Universe & Grand Rath Yatra",
    deity: "Lord Jagannath, Balabhadra, Devi Subhadra",
    established: "12th Century AD (1161 AD)",
    rating: 4.9,
    ratingText: "4.9 (50k+ Reviews)",
    significance: "Char Dham Pilgrimage Site",
    statsPills: [
      "Original Char Dham",
      "World's Largest Kitchen",
      "Famous Annual Rath Yatra",
    ],
    spiritualQuote: {
      quote:
        "In Puri, Lord Jagannath embraces all devotees without caste or creed into the universal ocean of devotion.",
      author: "Utkala Khanda",
    },
    videoThumbnail: {
      image: "/temples-images/jagannath/description/jagannath-desc-1.webp",
      duration: "09:00 MINS",
      videoUrl: "https://www.youtube.com/watch?v=puri_jagannath",
    },
    timeline: [
      {
        year: "1161 AD",
        description: "Constructed by King Anantavarman Chodaganga Deva of the Eastern Ganga Dynasty.",
      },
      {
        year: "15th Century",
        description: "Sanctified by Sri Chaitanya Mahaprabhu who spent his final 24 years in deep devotion here.",
      },
      {
        year: "1975 AD",
        description: "Restoration of the magnificent 214-foot Shikhara and complex by Archaeological Survey of India.",
      },
      {
        year: "Present Day",
        description: "Rath Yatra draws over a million pilgrims annually to pull the sacred wooden chariots.",
      },
    ],
    originsParagraphs: [
      "Shri Jagannath Temple in Puri, Odisha, is one of the four sacred Char Dham pilgrimage centers established across India.",
      "The deities are sculpted out of sacred Neem wood (Daru Brahma) and undergo a mystical rejuvenation ritual called Nabakalebara every 12 to 19 years.",
    ],
    facts: [
      "The temple flag (Patita Pavana) miraculously flies in the opposite direction of the wind.",
      "The temple kitchen (Rosha Ghara) is the largest in the world, feeding over 50,000 devotees daily with Mahaprasad.",
      "No birds or planes fly directly over the temple spire due to sacred atmospheric alignment.",
      "The ocean sound completely ceases the moment you step inside the Singhadwara entrance gate.",
    ],
    factsBookImage: "/temples-images/jagannath/history/jagannath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "KALINGA VIMANA",
        description:
          "214-foot monumental curvilinear tower crowned with the divine 8-spoke Nilachakra (Blue Wheel) crafted of eight metals.",
        image: "/temples-images/jagannath/features/jagannath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "DARU BRAHMA",
        description:
          "Lord Vishnu manifested as the wooden idols to fulfill King Indradyumna's penance under divine craftsmanship by Vishwakarma.",
        image: "/temples-images/jagannath/features/jagannath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "56 BHOG & CHHAPAN BHOG",
        description:
          "Famous for offering 56 sacred food items cooked in clay pots stacked one over another on firewood.",
        image: "/temples-images/jagannath/location/jagannath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Dwaraphita (Door Opening)", time: "5:00 AM" },
      { title: "Mangala Aarti & Mailam", time: "6:00 AM – 6:30 AM" },
      { title: "Gopal Ballav & Sakala Dhupa", time: "10:00 AM – 1:00 PM" },
      { title: "Madhyanha Dhupa (Afternoon Offering)", time: "1:00 PM – 4:00 PM" },
      { title: "Sandhya Aarti & Badasinghar (Closing)", time: "7:00 PM – 11:30 PM" },
    ],
    scheduleNote:
      "Non-Hindus and foreign nationals are not permitted inside the inner sanctum as per ancient temple tradition.",
    travelGuide: {
      howToReach:
        "Puri Railway Station is 2.5 km away; Biju Patnaik Airport Bhubaneswar is 60 km via NH-316.",
      stayAndFood:
        "Luxury beach resorts along Puri Sea Beach, temple mathas, and authentic Anand Bazaar Mahaprasad dining.",
      dressCode:
        "Strict traditional attire: Dhotis/Kurtas for men and Sarees/Salwar Kameez for women. Leather items are prohibited.",
      bestTimeToVisit:
        "October to February for cool weather, or June/July during the world-famous Rath Yatra chariot festival.",
    },
    nearbyTempleSlugs: [
      "konark-sun-temple",
      "brihadeeswara-temple",
      "kashi-vishwanath-temple",
      "ramanathaswamy-temple",
    ],
  },
  "shri-amarnath-cave": {
    subtitle: "The Sacred Cave of Immortality & Ice Shivling",
    deity: "Lord Shiva (Amarnath / Baba Barfani)",
    established: "Ancient Himalayan Antiquity",
    rating: 4.9,
    ratingText: "4.9 (34k+ Reviews)",
    significance: "Sacred Himalayan Yatra",
    statsPills: [
      "Altitude: 3,888 meters",
      "Natural Ice Shivling",
      "Amar Katha Legend",
    ],
    spiritualQuote: {
      quote:
        "In the frozen heights of Amarnath, Lord Shiva whispered the eternal secret of immortality to Goddess Parvati.",
      author: "Nilamata Purana",
    },
    videoThumbnail: {
      image: "/temples-images/amarnath/description/amarnath-desc-1.webp",
      duration: "07:45 MINS",
      videoUrl: "https://www.youtube.com/watch?v=amarnath_yatra",
    },
    timeline: [
      {
        year: "Puranic Era",
        description: "Lord Shiva revealed the secret of immortality (Amar Katha) in the secluded cave.",
      },
      {
        year: "15th Century",
        description: "Rediscovered by shepherd Buta Malik according to local folklore.",
      },
      {
        year: "2000 AD",
        description: "Shri Amarnathji Shrine Board (SASB) constituted for enhanced safety and health facilities.",
      },
      {
        year: "Present Day",
        description: "Draws hundreds of thousands of devout pilgrims during the auspicious Shravan months.",
      },
    ],
    originsParagraphs: [
      "Shri Amarnath Cave is located at a daunting altitude of 3,888 meters in the Lidder Valley of Jammu & Kashmir, surrounded by snowy peaks and glaciers.",
      "The shrine is renowned for its naturally forming stalagmite Ice Shivling (Himling) that waxes and wanes with the phases of the moon during summer.",
    ],
    facts: [
      "Situated at an altitude of 3,888 meters accessible via Pahalgam or Baltal trekking routes.",
      "The Ice Shivling forms naturally from water dripping through the limestone roof.",
      "Two immortal doves (pigeons) nesting in the cave are believed to have overheard the Amar Katha.",
      "The pilgrimage takes place exclusively during the months of July and August.",
    ],
    factsBookImage: "/temples-images/amarnath/history/amarnath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "NATURAL GLACIAL CAVE",
        description:
          "A massive natural limestone cave measuring 130 feet high and 100 feet deep housing the sacred ice formation.",
        image: "/temples-images/amarnath/features/amarnath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "AMAR KATHA",
        description:
          "Lord Shiva shed his snake at Sheshnag, Nandi at Pahalgam, and the moon at Chandanwari before entering the cave.",
        image: "/temples-images/amarnath/features/amarnath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "VEDIC CHANTING",
        description:
          "Priests perform holy morning and evening abhishekams with camphor lamps resonating across the mountain walls.",
        image: "/temples-images/amarnath/location/amarnath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Darshan Opens", time: "6:00 AM" },
      { title: "General Darshan & Prathana", time: "6:00 AM – 3:00 PM" },
      { title: "Evening Maha Aarti", time: "6:00 PM – 7:00 PM" },
      { title: "Cave Gate Closes for Night Safety", time: "7:00 PM" },
    ],
    scheduleNote:
      "Compulsory Health Certificate (CHC) and advance SASB permit registration are required for all pilgrims.",
    travelGuide: {
      howToReach:
        "Trek starts from Pahalgam (45 km) or Baltal (14 km); nearest airport is Srinagar (95 km to Baltal).",
      stayAndFood:
        "Baltal and Nunwan base camp tents, free Bhandara/Langar service set up by volunteer devotee groups.",
      dressCode:
        "Heavy waterproof woollens, trekking boots, windcheaters, raincoats, and gloves.",
      bestTimeToVisit:
        "July to August during the designated annual Amarnath Yatra pilgrimage window.",
    },
    nearbyTempleSlugs: [
      "mata-vaishno-devi-cave",
      "kedarnath-temple",
      "badrinath-temple",
      "golden-temple",
    ],
  },
  "golden-temple": {
    subtitle: "Harmandir Sahib — The Abode of Divine Light & Equality",
    deity: "Sri Guru Granth Sahib Ji",
    established: "1589 AD (Gold Plated 1830 AD)",
    rating: 5.0,
    ratingText: "5.0 (65k+ Reviews)",
    significance: "Supreme Sikh Gurdwara",
    statsPills: [
      "Surrounded by Amrit Sarovar",
      "World's Largest Free Langar",
      "Four Open Doors for Humanity",
    ],
    spiritualQuote: {
      quote:
        "Within the Golden Temple, all barriers of caste and religion dissolve into the divine harmony of Gurbani.",
      author: "Sri Guru Arjan Dev Ji",
    },
    videoThumbnail: {
      image: "/temples-images/golden-temple/description/golden-temple-desc-1.webp",
      duration: "08:20 MINS",
      videoUrl: "https://www.youtube.com/watch?v=golden_temple",
    },
    timeline: [
      {
        year: "1577 AD",
        description: "Guru Ram Das Ji excavated the sacred Amrit Sarovar (Pool of Nectar).",
      },
      {
        year: "1589 AD",
        description: "Foundation stone laid by Sufi Saint Hazrat Mian Mir of Lahore.",
      },
      {
        year: "1604 AD",
        description: "Installation of the Adi Granth by Guru Arjan Dev Ji with Baba Buddha Ji as first Granthi.",
      },
      {
        year: "1830 AD",
        description: "Maharaja Ranjit Singh covered the upper sanctum with 750 kg of pure gold leaf.",
      },
    ],
    originsParagraphs: [
      "The Golden Temple (Harmandir Sahib) in Amritsar, Punjab, stands at the center of the holy Amrit Sarovar pool, reflecting divine gold brilliance by day and night.",
      "Unlike traditional temples that are elevated, Harmandir Sahib is built at a lower level with four entrances on all four sides, symbolizing that God welcomes people of every faith, nationality, and background equally.",
    ],
    facts: [
      "Over 750 kg of pure 24-karat gold adorns the domes and walls of the sanctum.",
      "The community kitchen (Guru Ka Langar) serves over 100,000 free hot meals daily to all visitors.",
      "The foundation stone was laid by a Muslim Sufi Saint, Hazrat Mian Mir, establishing universal brotherhood.",
      "The holy Guru Granth Sahib is carried in a golden palanquin (Palki Sahib) twice every day.",
    ],
    factsBookImage: "/temples-images/golden-temple/history/golden-temple-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "INDO-ISLAMIC & SIKH",
        description:
          "Harmonious blend of Sikh, Mughal, and Rajput architectural styles set gracefully within the crystal-clear Amrit Sarovar.",
        image: "/temples-images/golden-temple/features/golden-temple-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "AMRIT SAROVAR",
        description:
          "The sacred pool is believed to possess divine healing and purifying spiritual properties for body and mind.",
        image: "/temples-images/golden-temple/features/golden-temple-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SUKHASAN & PRAKASH",
        description:
          "Daily Prakash ritual at 3:00 AM and night Sukhasan Palki Sahib procession with uninterrupted live Gurbani Kirtan.",
        image: "/temples-images/golden-temple/location/golden-temple-location-1.webp",
      },
    ],
    schedules: [
      { title: "Kiward (Doors) Open & Prakash", time: "3:00 AM – 4:00 AM" },
      { title: "Asa Di Var & Continuous Kirtan", time: "4:00 AM – 6:00 PM" },
      { title: "Rehras Sahib (Evening Prayers)", time: "6:30 PM – 7:30 PM" },
      { title: "Sukhasan Ceremony & Palki Sahib", time: "10:00 PM – 10:45 PM" },
    ],
    scheduleNote:
      "The Golden Temple remains open 24 hours a day throughout the year. Head covering is mandatory for all visitors.",
    travelGuide: {
      howToReach:
        "Sri Guru Ram Dass Jee International Airport Amritsar is 13 km away; Amritsar Junction is 2 km.",
      stayAndFood:
        "SGPC Sarais for pilgrims, heritage hotels around the Heritage Street, and free 24/7 Langar.",
      dressCode:
        "Cover head with scarf/rumal, remove footwear at the entrance, wash hands and feet before entering.",
      bestTimeToVisit:
        "October to March for cool, pleasant weather; Diwali and Guru Nanak Jayanti feature breathtaking illuminations.",
    },
    nearbyTempleSlugs: [
      "mata-vaishno-devi-cave",
      "kashi-vishwanath-temple",
      "siddhivinayak-temple",
      "ayodhya-ram-temple",
    ],
  },
  "siddhivinayak-temple": {
    subtitle: "The Wish-Fulfilling Abode of Lord Ganesha",
    deity: "Lord Ganesha (Siddhi Vinayak)",
    established: "1801 AD",
    rating: 4.8,
    ratingText: "4.8 (45k+ Reviews)",
    significance: "Sacred Ganesha Shrine",
    statsPills: [
      "Right-Trunk Navasacha Ganpati",
      "Rich Golden Sanctum Dome",
      "Wish-Fulfilling Shrine",
    ],
    spiritualQuote: {
      quote:
        "Vakratunda Mahakaya Suryakoti Samaprabha — Sri Siddhivinayak dissolves every obstacle in life.",
      author: "Ganesha Ashtakam",
    },
    videoThumbnail: {
      image: "/temples-images/siddhivinayak/description/siddhivinayak-desc-1.webp",
      duration: "06:40 MINS",
      videoUrl: "https://www.youtube.com/watch?v=siddhivinayak_mumbai",
    },
    timeline: [
      {
        year: "1801 AD",
        description: "Consecrated by contractor Laxman Vithu and funded by Deubai Patil, a childless woman.",
      },
      {
        year: "1952 AD",
        description: "Discovery of a sacred Hanuman idol during road widening, consecrated inside the temple.",
      },
      {
        year: "1993 AD",
        description: "Reconstructed into a magnificent multi-tier hexagonal gold-crowned temple complex.",
      },
      {
        year: "Present Day",
        description: "One of the most frequented spiritual landmarks in Mumbai, visited by millions weekly.",
      },
    ],
    originsParagraphs: [
      "Shri Siddhivinayak Temple, located in Prabhadevi, Mumbai, is dedicated to Lord Ganesha in his rare Siddhi Vinayak form (with his trunk turned to the right).",
      "He is popularly called 'Navasacha Ganpati' (the Ganesha who fulfills every sincere wish), drawing devotees, celebrities, artists, and leaders seeking divine blessings before new beginnings.",
    ],
    facts: [
      "The deity is carved out of a single piece of black stone measuring 2.5 feet wide.",
      "The sanctum sanctorum has a gold-plated inner roof donated by generous devotees.",
      "Tuesdays witness over 200,000 devotees walking barefoot across Mumbai for darshan.",
      "Features deities of Riddhi and Siddhi, the goddesses of wealth and spiritual wisdom, flanking Ganesha.",
    ],
    factsBookImage: "/temples-images/siddhivinayak/history/siddhivinayak-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "HEXAGONAL SANCTUM",
        description:
          "Six-tier polygonal dome capped with a 12-foot gold-plated Kalash, crafted with marble and Burma teakwood doorways.",
        image: "/temples-images/siddhivinayak/features/siddhivinayak-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "NAVASACHA GANPATI",
        description:
          "Lord Ganesha with rightward trunk is exceptionally powerful, representing Pingala sun nadi energy and swift boons.",
        image: "/temples-images/siddhivinayak/features/siddhivinayak-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "KAKAD & DHUP AARTI",
        description:
          "Special Modak offerings, Atharvashirsha recitations, and Tuesday Maha Aarti with resounding conch blasts.",
        image: "/temples-images/siddhivinayak/location/siddhivinayak-location-1.webp",
      },
    ],
    schedules: [
      { title: "Kakad Aarti (Morning Prayers)", time: "5:30 AM – 6:00 AM" },
      { title: "General Darshan", time: "6:00 AM – 12:15 PM" },
      { title: "Naivedya & Noon Aarti", time: "12:15 PM – 12:30 PM" },
      { title: "Sandhya Evening Aarti", time: "7:30 PM – 8:00 PM" },
      { title: "Shejaarti (Temple Closes)", time: "9:50 PM" },
    ],
    scheduleNote:
      "On Tuesdays, temple doors open at 3:15 AM for Angarki Chaturthi and special weekly queues.",
    travelGuide: {
      howToReach:
        "Dadar Railway Station is 1.5 km away; Chhatrapati Shivaji Maharaj International Airport (BOM) is 12 km away.",
      stayAndFood:
        "Abundant hotels and guest houses in Dadar/Prabhadevi, with authentic Maharashtrian vegetarian delicacies.",
      dressCode:
        "Modest traditional clothing covering shoulders and knees is mandatory for queue entry.",
      bestTimeToVisit:
        "November to February for pleasant weather; Ganesh Chaturthi festival provides electrifying energy.",
    },
    nearbyTempleSlugs: [
      "somnath-temple",
      "tirupati-balaji-temple",
      "golden-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "sanchi-stupa": {
    subtitle: "The Great Buddhist Stupa & UNESCO World Heritage",
    deity: "Lord Buddha Relics & Dharma Teachings",
    established: "3rd Century BCE (Emperor Ashoka)",
    rating: 4.8,
    ratingText: "4.8 (26k+ Reviews)",
    significance: "UNESCO World Heritage Monument",
    statsPills: [
      "Oldest Stone Structure in India",
      "Commissioned by Emperor Ashoka",
      "4 Intricate Torana Gateways",
    ],
    spiritualQuote: {
      quote:
        "At Sanchi, stone carvings speak the profound truth of the Middle Path, peace, and universal compassion.",
      author: "Buddhist Inscriptions",
    },
    videoThumbnail: {
      image: "/temples-images/sanchi-stupa/description/sanchi-stupa-desc-1.webp",
      duration: "06:10 MINS",
      videoUrl: "https://www.youtube.com/watch?v=sanchi_stupa",
    },
    timeline: [
      {
        year: "3rd Century BCE",
        description: "Commissioned by Mauryan Emperor Ashoka to house the sacred relics of the Buddha.",
      },
      {
        year: "1st Century BCE",
        description: "Elaborate four stone Toranas (gateways) and balustrade added under the Satavahana dynasty.",
      },
      {
        year: "1818 AD",
        description: "Rediscovered by British General Henry Taylor after centuries of forest preservation.",
      },
      {
        year: "1989 AD",
        description: "Designated as a UNESCO World Heritage Site celebrating ancient Indian sculptural mastery.",
      },
    ],
    originsParagraphs: [
      "The Great Stupa at Sanchi in Madhya Pradesh is the oldest stone structure in India and an architectural masterpiece of classical Buddhist art.",
      "The dome (Anda) represents the cosmic dome of heaven enclosing the sacred relics of Gautama Buddha, crowned by the three-tiered Chhatri representing the Three Jewels of Buddhism (Buddha, Dharma, Sangha).",
    ],
    facts: [
      "Commissioned in the 3rd century BCE by Emperor Ashoka after his conversion to Buddhism.",
      "The four Torana gateways depict the Jataka tales (previous lives of Buddha) in magnificent detail.",
      "Built without depictions of Buddha in human form, using symbols like footprints, lotus, and the Bodhi tree.",
      "Preserved as a protected UNESCO monument by the Archaeological Survey of India.",
    ],
    factsBookImage: "/temples-images/sanchi-stupa/history/sanchi-stupa-histroy-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "MAURYAN & SATAVAHANA",
        description:
          "Massive hemispherical sandstone dome with circumambulatory path (Pradakshina patha) and carved gateways.",
        image: "/temples-images/sanchi-stupa/features/sanchi-stupa-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "JATAKA STORIES",
        description:
          "Intricate relief carvings narrate the historical life, renunciation, and past incarnations of Lord Buddha.",
        image: "/temples-images/sanchi-stupa/features/sanchi-stupa-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "DHARMA MEDITATION",
        description:
          "Pilgrims and monks practice silent Pradakshina (clockwise walking meditation) chanting sacred Pali sutras.",
        image: "/temples-images/sanchi-stupa/location/sanchi-stupa-location-1.webp",
      },
    ],
    schedules: [
      { title: "Monument Complex Opens", time: "8:30 AM" },
      { title: "Guided Stupa & Museum Exploration", time: "9:00 AM – 1:00 PM" },
      { title: "Sunset Pradakshina & Photography", time: "3:30 PM – 5:30 PM" },
      { title: "Archaeological Site Closes", time: "5:30 PM" },
    ],
    scheduleNote:
      "Sanchi is an open-air archaeological monument; online entry ticketing through ASI portal is recommended.",
    travelGuide: {
      howToReach:
        "Sanchi Railway Station is 1.5 km away; Raja Bhoj Airport Bhopal is 46 km away via state highway.",
      stayAndFood:
        "MPT Gateway Retreat Sanchi and peaceful guest houses offering pure Indian vegetarian cuisine.",
      dressCode:
        "Modest, respectful attire suitable for outdoor walking in historic religious monuments.",
      bestTimeToVisit:
        "October to March when Madhya Pradesh experiences pleasant, sunny days.",
    },
    nearbyTempleSlugs: [
      "ayodhya-ram-temple",
      "somnath-temple",
      "kashi-vishwanath-temple",
      "konark-sun-temple",
    ],
  },
  "ramanathaswamy-temple": {
    subtitle: "The Sacred Jyotirlinga of Rameswaram Island",
    deity: "Lord Shiva (Ramanatha Swamy)",
    established: "12th Century AD (Sethupathi Dynasty)",
    rating: 4.9,
    ratingText: "4.9 (43k+ Reviews)",
    significance: "Char Dham & 12 Jyotirlingas",
    statsPills: [
      "12 / 12 Jyotirlinga",
      "World's Longest Corridor",
      "22 Sacred Teertham Wells",
    ],
    spiritualQuote: {
      quote:
        "Worshipping Lord Shiva at Rameswaram purifies life of all sins and fulfills the divine Char Dham pilgrimage.",
      author: "Ramayana & Shiva Purana",
    },
    videoThumbnail: {
      image: "/temples-images/ramanathaswamy/description/ramanathaswamy-desc-1.webp",
      duration: "08:15 MINS",
      videoUrl: "https://www.youtube.com/watch?v=rameswaram_temple",
    },
    timeline: [
      {
        year: "Treta Yuga",
        description: "Lord Rama established and worshipped the sand Shivling to atone for killing Ravana.",
      },
      {
        year: "12th Century",
        description: "Expansion by Pandya kings and the Setupathi rulers of Ramanathapuram.",
      },
      {
        year: "18th Century",
        description: "Completion of the majestic 1,212-pillar third corridor by King Muthuramalinga Sethupathi.",
      },
      {
        year: "Present Day",
        description: "Connected to mainland India by the iconic Pamban Sea Bridge, welcoming millions of pilgrims.",
      },
    ],
    originsParagraphs: [
      "Ramanathaswamy Temple is located on the sacred island of Rameswaram in Tamil Nadu. It is both one of the twelve holy Jyotirlingas and one of the four cardinal Char Dham shrines.",
      "According to tradition, Lord Rama established the Ramalingam (crafted by Devi Sita from sand) and the Viswalingam (brought by Hanuman from Mount Kailash), both of which are worshipped inside.",
    ],
    facts: [
      "Features the longest temple corridor in the world, stretching over 1,219 meters with 1,212 carved granite pillars.",
      "Pilgrims take a holy dip in the sea (Agni Theertham) and 22 sacred temple wells before entering the sanctum.",
      "One of the few shrines revered as both a Jyotirlinga and a Char Dham pilgrimage site.",
      "Located adjacent to Dhanushkodi, the mythical starting point of Ram Setu (Adam's Bridge).",
    ],
    factsBookImage: "/temples-images/ramanathaswamy/history/ramanathaswamy-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "DRAVIDIAN CORRIDORS",
        description:
          "Monumental gopurams and the world-famous third corridor spanning 4,000 feet with sculpted sandstone pillars.",
        image: "/temples-images/ramanathaswamy/features/ramanathaswamy-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "RAMA'S SHIVLING",
        description:
          "Lord Rama worshipped Shiva to seek blessings after the Lanka battle, demonstrating unity between Shaivism and Vaishnavism.",
        image: "/temples-images/ramanathaswamy/features/ramanathaswamy-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "22 THEERTHAM BATH",
        description:
          "Sacred purification bath across 22 mineral wells inside the complex followed by Spatika Linga morning darshan.",
        image: "/temples-images/ramanathaswamy/location/ramanathaswamy-location-1.webp",
      },
    ],
    schedules: [
      { title: "Spadika Linga Darshan Opens", time: "5:00 AM – 6:00 AM" },
      { title: "22 Theertham Holy Bath", time: "6:00 AM – 12:30 PM" },
      { title: "Afternoon Temple Break", time: "1:00 PM – 3:00 PM" },
      { title: "Evening Sayaratchai Aarti", time: "6:00 PM – 7:30 PM" },
      { title: "Palliarai Pooja & Closing", time: "8:45 PM – 9:00 PM" },
    ],
    scheduleNote:
      "Pilgrims should take bath in Agni Theertham sea first before taking bath in the 22 internal wells.",
    travelGuide: {
      howToReach:
        "Rameswaram Railway Station is 1.5 km away; Madurai Airport is 170 km connected via NH-87 across Pamban Bridge.",
      stayAndFood:
        "Pilgrim dharamshalas, star hotels along the coast, and pure South Indian satvik meals.",
      dressCode:
        "Dry traditional clothing (dhotis/saris) required after completing the 22 Theertham baths.",
      bestTimeToVisit:
        "October to April when sea breezes provide cool and comfortable weather.",
    },
    nearbyTempleSlugs: [
      "brihadeeswara-temple",
      "tirupati-balaji-temple",
      "somnath-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "yamunotri-temple": {
    subtitle: "The Sacred Source of River Yamuna in the Himalayas",
    deity: "Goddess Yamuna (Daughter of Surya)",
    established: "19th Century AD",
    rating: 4.8,
    ratingText: "4.8 (27k+ Reviews)",
    significance: "Char Dham Yatra Shrine",
    statsPills: [
      "Altitude: 3,291 meters",
      "Surya Kund Hot Springs",
      "Origin of Holy Yamuna",
    ],
    spiritualQuote: {
      quote:
        "A bath in the holy waters of Yamunotri protects devotees from fear of mortality and grants inner purity.",
      author: "Yamuna Ashtakam",
    },
    videoThumbnail: {
      image: "/temples-images/yamunotri/description/yamunotri-desc-1.webp",
      duration: "06:30 MINS",
      videoUrl: "https://www.youtube.com/watch?v=yamunotri_darshan",
    },
    timeline: [
      {
        year: "Vedic Era",
        description: "Sage Asit Muni lived and meditated at the origin point of the Yamuna River.",
      },
      {
        year: "1839 AD",
        description: "Built by King Naresh Sudarshan Shah of Tehri Garhwal in Himalayan slate.",
      },
      {
        year: "19th Century",
        description: "Reconstructed by Maharani Guleria of Jaipur after mountain weather damage.",
      },
      {
        year: "Present Day",
        description: "The auspicious first pilgrimage shrine on the holy Uttarakhand Chota Char Dham yatra.",
      },
    ],
    originsParagraphs: [
      "Yamunotri Temple is perched at an altitude of 3,291 meters in the Garhwal Himalayas in Uttarkashi, Uttarakhand, near the origin of the sacred Yamuna River at Champasar Glacier.",
      "Beside the temple are natural thermal hot water springs, most notably Surya Kund, where pilgrims cook rice and potatoes tied in cloth bags as sacred prasad.",
    ],
    facts: [
      "Located at an elevation of 3,291 meters accessed by a 6 km mountain trek from Janki Chatti.",
      "Surya Kund thermal spring maintains water temperatures near boiling point (88°C).",
      "Goddess Yamuna is revered as the daughter of Surya (Sun God) and sister of Yama (God of Justice).",
      "Divya Shila rock pillar is worshipped before entering the main sanctum sanctorum.",
    ],
    factsBookImage: "/temples-images/yamunotri/history/yamunotri-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "HIMALAYAN SLATE",
        description:
          "Granite stone temple crowned with a yellow shikhara designed to endure intense winter snowfall.",
        image: "/temples-images/yamunotri/features/yamunotri-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "YAMUNA & YAMA",
        description:
          "Bhai Dooj festival celebrates the eternal bond between Goddess Yamuna and her brother Lord Yama.",
        image: "/temples-images/yamunotri/features/yamunotri-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SURYA KUND PRASAD",
        description:
          "Cooking rice in thermal Surya Kund and offering morning and evening Yamuna Aarti with copper lamps.",
        image: "/temples-images/yamunotri/location/yamunotri-location-1.webp",
      },
    ],
    schedules: [
      { title: "Temple Opens & Mangal Aarti", time: "6:00 AM" },
      { title: "Surya Kund Snan & Darshan", time: "7:00 AM – 1:00 PM" },
      { title: "Midday Break", time: "1:00 PM – 3:00 PM" },
      { title: "Sandhya Evening Aarti", time: "6:30 PM – 7:30 PM" },
      { title: "Temple Closes for Night", time: "8:00 PM" },
    ],
    scheduleNote:
      "Open seasonally from Akshaya Tritiya (April/May) to Bhai Dooj (October/November).",
    travelGuide: {
      howToReach:
        "Trek of 6 km starts from Janki Chatti; nearest railway station is Dehradun (175 km); Jolly Grant Airport is 200 km.",
      stayAndFood:
        "GMVN lodges at Janki Chatti and Yamunotri base, dharamshalas, and simple satvik mountain meals.",
      dressCode:
        "Warm thermals, trekking gear, walking sticks, and respectful traditional attire for temple entry.",
      bestTimeToVisit:
        "May to June and September to October for clear skies and manageable temperatures.",
    },
    nearbyTempleSlugs: [
      "gangotri-temple",
      "kedarnath-temple",
      "badrinath-temple",
      "kainchi-dham",
    ],
  },
  "banke-bihari-temple": {
    subtitle: "The Enchanting Abode of Shri Krishna in Vrindavan",
    deity: "Lord Krishna (Banke Bihari Ji)",
    established: "1864 AD",
    rating: 4.9,
    ratingText: "4.9 (52k+ Reviews)",
    significance: "Heart of Braj Bhakti",
    statsPills: [
      "Manifested by Swami Haridas",
      "Unique Parda (Curtain) Darshan",
      "Vibrant Holi & Jhulan Celebrations",
    ],
    spiritualQuote: {
      quote:
        "Radhe Radhe Govinda Radhe — in Vrindavan, divine love flows like the sweet melodies of Krishna's flute.",
      author: "Swami Haridas Ji",
    },
    videoThumbnail: {
      image: "/temples-images/banke-bihari/description/banke-bihari-desc-1.webp",
      duration: "07:00 MINS",
      videoUrl: "https://www.youtube.com/watch?v=banke_bihari",
    },
    timeline: [
      {
        year: "16th Century",
        description: "Swami Haridas manifested Banke Bihari Ji at Nidhivan through his soulful devotional singing.",
      },
      {
        year: "1864 AD",
        description: "Current grand Rajasthani-style temple constructed by the Goswamis of Vrindavan.",
      },
      {
        year: "20th Century",
        description: "Becomes the foremost center of Braj Chaitanya bhakti and Janmashtami celebrations in India.",
      },
      {
        year: "Present Day",
        description: "Welcomes millions of devotees chanting Radhe Radhe in ecstatic spiritual celebration.",
      },
    ],
    originsParagraphs: [
      "Banke Bihari Temple in Vrindavan, Uttar Pradesh, is dedicated to Lord Krishna standing in the charming 'Tribhanga' posture (bent at three angles: knee, waist, and neck).",
      "Unlike other temples, there are no bells or conches sounded during aarti, as Banke Bihari Ji is pampered like a beloved child who might be startled by loud noises.",
    ],
    facts: [
      "The deity was manifested out of divine love by Swami Haridas, the guru of music maestro Tansen.",
      "The curtain in front of the deity is drawn open and closed every few minutes to prevent devotees from being enchanted away.",
      "Mangala Aarti is performed only once a year on Janmashtami night.",
      "During Holi and Jhulan Yatra, the temple turns into a magical celebration of colors, flowers, and devotion.",
    ],
    factsBookImage: "/temples-images/banke-bihari/history/banke-bihari-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "RAJASTHANI STYLE",
        description:
          "Elegant arches, intricately carved stone pillars, and wide open courtyards designed for devotional kirtans.",
        image: "/temples-images/banke-bihari/features/banke-bihari-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "SWAMI HARIDAS BHAKTI",
        description:
          "Radha and Krishna combined their divine effulgence into a single enchanting black stone idol for Haridas.",
        image: "/temples-images/banke-bihari/features/banke-bihari-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "PARDA DARSHAN",
        description:
          "Devotees enjoy intermittent curtain-pull darshan with offering of Makhan-Mishri and fragrant flower garlands.",
        image: "/temples-images/banke-bihari/location/banke-bihari-location-1.webp",
      },
    ],
    schedules: [
      { title: "Summer Morning Darshan", time: "7:45 AM – 12:00 PM" },
      { title: "Summer Evening Darshan & Shringar", time: "5:30 PM – 9:30 PM" },
      { title: "Winter Morning Darshan", time: "8:45 AM – 1:00 PM" },
      { title: "Winter Evening Darshan", time: "4:30 PM – 8:30 PM" },
    ],
    scheduleNote:
      "Timings adjust according to summer and winter solstice calendars. Mind your belongings around friendly temple monkeys.",
    travelGuide: {
      howToReach:
        "Mathura Junction is 12 km away; Indira Gandhi International Airport New Delhi is 150 km via Yamuna Expressway.",
      stayAndFood:
        "Numerous ashrams, dharamshalas, boutique hotels in Vrindavan, and famous Mathura Peda and Rabri sweets.",
      dressCode:
        "Traditional Indian modest attire (kurtas/dhotis/saris). Please remove leather items and spectacles before entering crowded lanes.",
      bestTimeToVisit:
        "October to March, and during Janmashtami (August) and Holi (March) celebrations.",
    },
    nearbyTempleSlugs: [
      "ayodhya-ram-temple",
      "kashi-vishwanath-temple",
      "golden-temple",
      "siddhivinayak-temple",
    ],
  },
  "kedarnath-temple": {
    subtitle: "The Majestic Himalayan Jyotirlinga",
    deity: "Lord Shiva (Kedar Nath)",
    established: "8th Century AD (Revived by Adi Shankaracharya)",
    rating: 4.9,
    ratingText: "4.9 (55k+ Reviews)",
    significance: "Char Dham & Jyotirlinga",
    statsPills: [
      "Highest Jyotirlinga (3,583m)",
      "Garhwal Himalayan Heritage",
      "Sacred Char Dham Yatra",
    ],
    spiritualQuote: {
      quote:
        "Amidst the snow-clad peaks of the Himalayas, the Lord of Kedar grants peace that transcends earthly existence.",
      author: "Shiva Mahapurana",
    },
    videoThumbnail: {
      image: "/temples-images/kedarnath/description/kedarnath-desc-1.webp",
      duration: "06:30 MINS",
      videoUrl: "https://www.youtube.com/watch?v=kedarnath_yatra",
    },
    timeline: [
      {
        year: "Mahabharata Era",
        description: "Built originally by the Pandavas seeking absolution from Lord Shiva after the Kurukshetra war.",
      },
      {
        year: "8th Century AD",
        description: "Magnificently restored and revitalized by Adi Shankaracharya who took Samadhi here.",
      },
      {
        year: "2013 AD",
        description: "Miraculously survived catastrophic Himalayan flash floods behind the sacred Bhim Shila rock.",
      },
      {
        year: "Present Day",
        description: "Reconstructed modern pilgrim infrastructure with eco-friendly facilities and helicopter connectivity.",
      },
    ],
    originsParagraphs: [
      "Kedarnath Temple sits at an astounding altitude of 3,583 meters amidst the breathtaking peaks of the Garhwal Himalayas in Rudraprayag, Uttarakhand. Dedicated to Lord Shiva, it is the most remote of the twelve Jyotirlingas.",
      "The temple is constructed of massive, evenly shaped grey stone slabs assembled with interlocking technique without mortar. It stands as an architectural wonder of ancient craftsmanship that has weathered centuries of snow and earthquakes.",
    ],
    facts: [
      "Built at an altitude of 3,583 meters near the Mandakini River.",
      "Survives heavy snow burial for 6 months every winter under divine preservation.",
      "Associated with the Pandavas' penance in the Mahabharata epic.",
      "The conical rock formation inside the sanctum is worshipped as Sadashiva.",
      "The sacred Bhim Shila boulder protected the temple during the 2013 natural disaster.",
    ],
    factsBookImage: "/temples-images/kedarnath/history/kedarnath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "KATYURI STYLE",
        description:
          "Constructed using massive interlocking grey stone slabs that have endured Himalayan blizzards and extreme seismic conditions for over a millennium.",
        image: "/temples-images/kedarnath/features/kedarnath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "PANDAVA LEGEND",
        description:
          "Lord Shiva eluded the Pandavas by taking the form of a bull, diving into the earth, with his hump remaining manifested at Kedarnath.",
        image: "/temples-images/kedarnath/features/kedarnath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "VEDIC CHANTING",
        description:
          "High priests from the Rawal community of Karnataka conduct ancient Kannada-Sanskrit rituals dating back centuries.",
        image: "/temples-images/kedarnath/location/kedarnath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Darshan & Abhishek", time: "4:00 AM – 7:00 AM" },
      { title: "General Darshan", time: "7:00 AM – 1:00 PM" },
      { title: "Temple Reopens for Evening Darshan", time: "5:00 PM – 7:30 PM" },
      { title: "Maha Aarti (Evening Hymns)", time: "7:30 PM – 8:30 PM" },
      { title: "Shayan Aarti (Temple Doors Close)", time: "9:00 PM" },
    ],
    scheduleNote:
      "Temple remains open only from Akshaya Tritiya (April/May) until Bhai Dooj (October/November). Timings vary with mountain weather.",
    travelGuide: {
      howToReach:
        "Trek of 16 km starts from Gaurikund. Nearest airport is Jolly Grant Dehradun (238 km); Rishikesh Railway Station is 216 km.",
      stayAndFood:
        "GMVN tourist lodges, private tents, and temple dharamshalas at Kedarnath base; simple satvik vegetarian meals available.",
      dressCode:
        "Heavy warm thermal clothing, trekking footwear, and modest traditional attire for temple sanctum entry.",
      bestTimeToVisit:
        "May to June (summer season) and September to October (clear autumn skies). Monsoon (July-August) requires rain precaution.",
    },
    nearbyTempleSlugs: [
      "badrinath-temple",
      "gangotri-temple",
      "yamunotri-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "badrinath-temple": {
    subtitle: "The Sacred Abode of Badri Narayan & Char Dham Jewel",
    deity: "Lord Vishnu (Badri Narayan)",
    established: "8th Century AD (Adi Shankaracharya)",
    rating: 4.9,
    ratingText: "4.9 (49k+ Reviews)",
    significance: "Cardinal Char Dham Shrine",
    statsPills: [
      "Altitude: 3,133 meters",
      "Alaknanda River Banks",
      "Self-Manifested Shaligram",
    ],
    spiritualQuote: {
      quote:
        "There are many sacred shrines in heaven and earth, but none equal to Badrinath.",
      author: "Skanda Purana",
    },
    videoThumbnail: {
      image: "/temples-images/badrinath/description/badrinath-desc-1.webp",
      duration: "07:35 MINS",
      videoUrl: "https://www.youtube.com/watch?v=badrinath_darshan",
    },
    timeline: [
      {
        year: "Vedic Era",
        description: "Lord Vishnu meditated in Badrikashram while Goddess Lakshmi sheltered him as a Badri berry tree.",
      },
      {
        year: "8th Century AD",
        description: "Adi Shankaracharya discovered the black Shaligram idol in Narad Kund and enshrined it in the temple.",
      },
      {
        year: "16th Century",
        description: "Expanded by the King of Garhwal into the magnificent multi-hued facade temple standing today.",
      },
      {
        year: "Present Day",
        description: "Revered as the supreme northern pillar of the all-India Char Dham pilgrimage.",
      },
    ],
    originsParagraphs: [
      "Shri Badrinath Temple is situated at an elevation of 3,133 meters in Chamoli, Uttarakhand, nestled between the Nar and Narayana mountain ranges alongside the roaring Alaknanda River.",
      "The sanctum houses a 3.3-foot black stone Shaligram idol of Lord Vishnu seated in Padmasana (meditative posture), flanked by Nar, Narayana, Narada, Ganesha, and Garuda.",
    ],
    facts: [
      "The temple idol was retrieved from the cold waters of Narad Kund by Adi Shankaracharya.",
      "Tapt Kund, a natural sulphur hot spring with healing properties, lies directly below the temple.",
      "The chief priest (Rawal) is traditionally chosen from the Nambudiri Brahmin community of Kerala.",
      "Akhand Jyoti (eternal lamp) burns inside the sanctum throughout the 6 months of winter snow closure.",
    ],
    factsBookImage: "/temples-images/badrinath/history/badrinath-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "TRADITIONAL PAHARI",
        description:
          "Vibrantly painted arched facade with conical roof and gold-gilt cupola standing 50 feet tall against mountain peaks.",
        image: "/temples-images/badrinath/features/badrinath-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "BADRIKA ASHRAM",
        description:
          "Lord Vishnu engaged in intense austerity for cosmic welfare while Lakshmi protected him from harsh cold as a Badri tree.",
        image: "/temples-images/badrinath/features/badrinath-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "MAHA ABHISHEK",
        description:
          "Pre-dawn Maha Abhishek with sandalwood paste, Ganga water, and sacred Gita Path recitations.",
        image: "/temples-images/badrinath/location/badrinath-location-1.webp",
      },
    ],
    schedules: [
      { title: "Maha Abhishek & Morning Puja", time: "4:30 AM – 6:30 AM" },
      { title: "General Darshan", time: "6:30 AM – 1:00 PM" },
      { title: "Afternoon Temple Break", time: "1:00 PM – 4:00 PM" },
      { title: "Geeta Path & Sandhya Aarti", time: "6:00 PM – 7:30 PM" },
      { title: "Shayan Aarti (Temple Closes)", time: "9:00 PM" },
    ],
    scheduleNote:
      "Open seasonally from May until November. Special VIP puja tokens can be reserved through the BKTC portal.",
    travelGuide: {
      howToReach:
        "Rishikesh Railway Station is 295 km away; Jolly Grant Airport Dehradun is 310 km connected by the Badrinath National Highway.",
      stayAndFood:
        "GMVN tourist bungalows, ashrams, private lodges, and delicious satvik vegetarian dining.",
      dressCode:
        "Warm thermal layers, comfortable footwear, and traditional modest attire inside the temple.",
      bestTimeToVisit:
        "May to June and September to October for clear sunny skies and safe mountain transit.",
    },
    nearbyTempleSlugs: [
      "kedarnath-temple",
      "gangotri-temple",
      "yamunotri-temple",
      "kainchi-dham",
    ],
  },
  "ayodhya-ram-temple": {
    subtitle: "The Magnificent Janmabhoomi of Maryada Purushottam Shri Ram",
    deity: "Lord Shri Ram (Ram Lalla Virajman)",
    established: "2024 AD",
    rating: 5.0,
    ratingText: "5.0 (70k+ Reviews)",
    significance: "Supreme Ram Janmabhoomi",
    statsPills: [
      "Ram Janmabhoomi Sanctum",
      "Traditional Nagara Architecture",
      "Carved Bansi Paharpur Stone",
    ],
    spiritualQuote: {
      quote:
        "Janani Janmabhumishcha Swargadapi Gariyasi — Ayodhya stands as the eternal kingdom of righteousness and peace.",
      author: "Valmiki Ramayana",
    },
    videoThumbnail: {
      image: "/temples-images/ayodhya/description/ayodhya-desc-1.webp",
      duration: "09:30 MINS",
      videoUrl: "https://www.youtube.com/watch?v=ayodhya_ram_mandir",
    },
    timeline: [
      {
        year: "Treta Yuga",
        description: "Birth of Lord Shri Ram on the sacred banks of River Sarayu in Ayodhya.",
      },
      {
        year: "11th Century",
        description: "Grand temple constructed by Gahadavala rulers celebrated in historical inscriptions.",
      },
      {
        year: "2020 AD",
        description: "Bhoomi Pujan and foundation stone ceremony initiated for the grand new temple.",
      },
      {
        year: "2024 AD",
        description: "Historic Pran Pratishtha of Ram Lalla attended by millions worldwide on January 22, 2024.",
      },
    ],
    originsParagraphs: [
      "The Shri Ram Janmabhoomi Mandir in Ayodhya, Uttar Pradesh, marks the sacred birthplace of Lord Shri Ram. It stands as a monumental cultural and spiritual beacon of Sanatana Dharma.",
      "Constructed entirely using pink Bansi Paharpur sandstone without a single piece of structural iron or steel, the temple is engineered to endure for more than 1,000 years.",
    ],
    facts: [
      "Built without the use of structural steel or iron, relying solely on interlocked stone and copper pins.",
      "The 51-inch idol of 5-year-old Ram Lalla was sculpted by master sculptor Arun Yogiraj from ancient Krishna Shila.",
      "Features 392 intricately carved pillars and 44 teakwood doors coated with pure gold leaf.",
      "The Surya Tilak mechanism projects sun rays directly onto Ram Lalla's forehead on every Ram Navami noon.",
    ],
    factsBookImage: "/temples-images/ayodhya/history/ayodhya-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "NAGARA EXCELLENCE",
        description:
          "Three-storied Nagara masterpiece with 5 mandapas (Gudu, Rang, Nritya, Kirtan, Prarthana) rising 161 feet high.",
        image: "/temples-images/ayodhya/features/ayodhya-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "RAM RAJYA",
        description:
          "The eternal capital of the Ikshvaku dynasty where Shri Ram manifested the highest ideals of Dharma and duty.",
        image: "/temples-images/ayodhya/features/ayodhya-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SHRINGAR & BHOG",
        description:
          "Mesmerizing Mangala, Shringar, and Sandhya Aartis with Vedic chants and royal floral adornments.",
        image: "/temples-images/ayodhya/location/ayodhya-location-1.webp",
      },
    ],
    schedules: [
      { title: "Mangala Aarti (Pre-Dawn)", time: "4:30 AM – 5:00 AM" },
      { title: "Shringar Aarti & Morning Darshan", time: "6:30 AM – 12:00 PM" },
      { title: "Bhog Aarti & Afternoon Break", time: "12:00 PM – 1:30 PM" },
      { title: "Evening Darshan & Sandhya Aarti", time: "2:00 PM – 7:00 PM" },
      { title: "Shayan Aarti (Temple Closes)", time: "9:30 PM – 10:00 PM" },
    ],
    scheduleNote:
      "Free darshan passes can be pre-booked online through the Shri Ram Janmbhoomi Teerth Kshetra portal.",
    travelGuide: {
      howToReach:
        "Maharishi Valmiki International Airport Ayodhya is 10 km away; Ayodhya Dham Railway Station is 2 km.",
      stayAndFood:
        "Tent City Ayodhya, luxury hotels, trust dharamshalas, and traditional satvik Awadhi cuisine.",
      dressCode:
        "Traditional modest attire (kurtas/dhotis/saris) is recommended. Mobile phones must be deposited in secure lockers.",
      bestTimeToVisit:
        "October to March for pleasant temperatures; Ram Navami and Deepotsav offer magical experiences.",
    },
    nearbyTempleSlugs: [
      "kashi-vishwanath-temple",
      "banke-bihari-temple",
      "somnath-temple",
      "kedarnath-temple",
    ],
  },
  "tirupati-balaji-temple": {
    subtitle: "Sri Venkateswara Swamy — The Sovereign of the Seven Hills",
    deity: "Lord Venkateswara (Balaji / Govinda)",
    established: "300 AD (Ancient Antiquity)",
    rating: 5.0,
    ratingText: "5.0 (68k+ Reviews)",
    significance: "Kaliyuga Vaikuntha",
    statsPills: [
      "Sacred Seven Hills (Venkatadri)",
      "World's Most Visited Shrine",
      "Famous GI-Tagged Tirupati Laddu",
    ],
    spiritualQuote: {
      quote:
        "Venkatesa Samo Devo Na Bhuto Na Bhavishyati — There is no savior equal to Lord Venkateswara in all the cosmos.",
      author: "Brahma Purana",
    },
    videoThumbnail: {
      image: "/temples-images/tirupati-balaji/description/tirupati-balaji-desc-1.webp",
      duration: "08:40 MINS",
      videoUrl: "https://www.youtube.com/watch?v=tirupati_balaji",
    },
    timeline: [
      {
        year: "Ancient Era",
        description: "Lord Vishnu appeared as Venkateswara on Venkatadri hill for the salvation of humanity in Kaliyuga.",
      },
      {
        year: "9th-10th Century",
        description: "Pallava and Chola dynasties endowed rich gold and land grants to the temple.",
      },
      {
        year: "1517 AD",
        description: "Vijayanagara Emperor Sri Krishnadevaraya covered the Ananda Nilayam vimana in pure gold.",
      },
      {
        year: "1932 AD",
        description: "Establishment of Tirumala Tirupati Devasthanams (TTD) managing world-class pilgrim operations.",
      },
    ],
    originsParagraphs: [
      "Tirupati Balaji Temple (Sri Venkateswara Temple) is located atop the sacred Tirumala Hills in Tirupati, Andhra Pradesh, comprising seven majestic peaks representing the hoods of Adisesha.",
      "Revered as Kaliyuga Vaikuntha, millions of devotees take vows (Kalyana Katta tonsure) and offer prayers seeking blessings, prosperity, and liberation from worldly suffering.",
    ],
    facts: [
      "One of the wealthiest and most visited religious destinations in the world with 60,000+ daily visitors.",
      "The divine golden vimana (Ananda Nilayam) is plated with tons of pure gold.",
      "The famous Tirupati Laddu prasad holds a prestigious Geographical Indication (GI) tag.",
      "Devotees tonsure their heads at Kalyana Katta as a gesture of surrendering ego to Lord Venkateswara.",
    ],
    factsBookImage: "/temples-images/tirupati-balaji/history/tirupati-balaji-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "DRAVIDIAN GOLDEN",
        description:
          "Splendid Dravidian towers with the breathtaking gold-plated Ananda Nilayam vimana crowning the inner sanctum.",
        image: "/temples-images/tirupati-balaji/features/tirupati-balaji-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "KALIYUGA AVATAR",
        description:
          "Lord Vishnu manifested on Venkatadri and married Goddess Padmavathi, promising eternal solace to all who visit.",
        image: "/temples-images/tirupati-balaji/features/tirupati-balaji-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "SUPRABHATAM",
        description:
          "Famous pre-dawn Suprabhatam seva waking the Lord, followed by Thomala, Archana, and Ekanta Seva at night.",
        image: "/temples-images/tirupati-balaji/location/tirupati-balaji-location-1.webp",
      },
    ],
    schedules: [
      { title: "Suprabhatam Seva (Pre-Dawn)", time: "2:30 AM – 3:30 AM" },
      { title: "Thomala & Archana Seva", time: "3:30 AM – 5:00 AM" },
      { title: "Sarva Darshan (Free Queue)", time: "5:00 AM – 11:00 PM" },
      { title: "Special Entry Darshan (SED)", time: "Scheduled Slots Daily" },
      { title: "Ekanta Seva (Night Closing)", time: "1:00 AM – 1:30 AM" },
    ],
    scheduleNote:
      "Special Entry Darshan tickets (₹300) should be reserved in advance through the official TTD Devasthanams online portal.",
    travelGuide: {
      howToReach:
        "Tirupati International Airport (TIR) is 38 km from Tirumala; Tirupati Main Railway Station connects nationwide.",
      stayAndFood:
        "Extensive TTD pilgrim cottage complexes at Tirumala, Annaprasadam halls serving free delicious meals to all.",
      dressCode:
        "Strict traditional attire: Dhotis/Uttariyam for men; Sarees/Half-Sarees/Churidars with dupatta for women.",
      bestTimeToVisit:
        "September to February for pleasant weather; annual Brahmotsavam festival features celestial celebrations.",
    },
    nearbyTempleSlugs: [
      "brihadeeswara-temple",
      "ramanathaswamy-temple",
      "siddhivinayak-temple",
      "kashi-vishwanath-temple",
    ],
  },
  "kainchi-dham": {
    subtitle: "The Serene Himalayan Ashram of Neem Karoli Baba",
    deity: "Lord Hanuman & Neem Karoli Baba (Maharaj-ji)",
    established: "1964 AD",
    rating: 4.9,
    ratingText: "4.9 (36k+ Reviews)",
    significance: "Himalayan Spiritual Oasis",
    statsPills: [
      "Ashram of Neem Karoli Baba",
      "Hanuman Mandir & Kirtan",
      "Global Spiritual Destination",
    ],
    spiritualQuote: {
      quote:
        "Love everyone, feed everyone, remember God, and tell the truth — the timeless essence of Maharaj-ji's grace.",
      author: "Neem Karoli Baba",
    },
    videoThumbnail: {
      image: "/temples-images/kainchi-dham/description/kainchi-desc-1.webp",
      duration: "06:45 MINS",
      videoUrl: "https://www.youtube.com/watch?v=kainchi_dham",
    },
    timeline: [
      {
        year: "1962 AD",
        description: "Neem Karoli Baba and Purnanand Ji Maharaj established a meditation platform in the valley.",
      },
      {
        year: "1964 AD",
        description: "Inauguration of the sacred Hanuman Mandir and Kainchi Dham ashram on June 15.",
      },
      {
        year: "1974-1976 AD",
        description: "Visited by Steve Jobs and later Mark Zuckerberg, gaining profound global recognition.",
      },
      {
        year: "Present Day",
        description: "The annual June 15 Bhandara Mahotsav feeds over 200,000 devotees in deep devotional peace.",
      },
    ],
    originsParagraphs: [
      "Kainchi Dham is a serene spiritual hermitage located in the Kumaon hills of Nainital, Uttarakhand, surrounded by whispering pine forests and a bubbling mountain stream.",
      "Founded by the revered mystic saint Neem Karoli Baba, the ashram is celebrated worldwide for its quiet spiritual vibrations, daily Hanuman Chalisa chanting, and selfless seva.",
    ],
    facts: [
      "Established in 1964 by the mystic saint Neem Karoli Baba, revered as an incarnation of Lord Hanuman.",
      "Visited by global tech luminaries including Steve Jobs and Mark Zuckerberg during pivotal life journeys.",
      "The ashram sits in a picturesque scissor-shaped valley (Kainchi means 'scissors' in local dialect).",
      "Annual Bhandara festival on June 15 draws hundreds of thousands for sacred malpua and poori prasad.",
    ],
    factsBookImage: "/temples-images/kainchi-dham/history/kainchi-history-1.webp",
    featurePillars: [
      {
        title: "Architecture",
        tag: "ASHRAM SERENITY",
        description:
          "Traditional Kumaoni mountain ashram architecture painted in peaceful white and red amidst lush forested hills.",
        image: "/temples-images/kainchi-dham/features/kainchi-feature-1.webp",
      },
      {
        title: "Mythology",
        tag: "HANUMAN BHAKTI",
        description:
          "Baba Neem Karoli taught pure unconditional devotion to Lord Hanuman, exemplifying humility and love.",
        image: "/temples-images/kainchi-dham/features/kainchi-feature-2.webp",
      },
      {
        title: "Rituals & Aarti",
        tag: "HANUMAN CHALISA",
        description:
          "Continuous group recitations of Sri Hanuman Chalisa, Sundarkand, and divine evening aarti.",
        image: "/temples-images/kainchi-dham/location/kainchi-location-1.webp",
      },
    ],
    schedules: [
      { title: "Morning Ashram Gates Open", time: "7:00 AM" },
      { title: "Pratah Hanuman Chalisa & Aarti", time: "7:30 AM – 8:30 AM" },
      { title: "General Darshan & Meditation", time: "8:30 AM – 5:00 PM" },
      { title: "Sandhya Aarti (Evening Prayers)", time: "5:30 PM – 6:00 PM" },
      { title: "Ashram Gates Close", time: "6:00 PM" },
    ],
    scheduleNote:
      "Photography is prohibited inside the inner temple sanctum. Silence is maintained across the ashram.",
    travelGuide: {
      howToReach:
        "17 km from Nainital; Kathgodam Railway Station is 37 km; Pantnagar Airport is 70 km away.",
      stayAndFood:
        "Hotels and homestays in Bhowali and Nainital; ashram serves simple tea and prasad during visiting hours.",
      dressCode:
        "Modest attire covering shoulders and knees; warm sweater/shawl recommended for mountain breezes.",
      bestTimeToVisit:
        "March to June and September to November for pleasant Kumaoni mountain weather.",
    },
    nearbyTempleSlugs: [
      "badrinath-temple",
      "kedarnath-temple",
      "gangotri-temple",
      "kashi-vishwanath-temple",
    ],
  },
};

/**
 * Universal Normalizer (DRY & SOLID):
 * Guarantees that EVERY temple in the catalog has the exact same rich, complete,
 * type-safe structure, matching the reference UI perfectly even if some fields are omitted.
 */
export function getNormalizedTempleDetail(temple: Temple): Temple {
  const customConfig = TEMPLE_DETAILS_CONFIG_REGISTRY[temple.slug] || {};

  // Extract or derive defaults
  const deity =
    customConfig.deity ||
    (temple.name.includes("Vishwanath")
      ? "Lord Shiva"
      : temple.name.includes("Ram")
        ? "Lord Shri Ram"
        : temple.name.includes("Jagannath")
          ? "Lord Jagannath (Vishnu)"
          : temple.name.includes("Sun")
            ? "Surya Dev (Sun God)"
            : temple.name.includes("Ganga") || temple.name.includes("Gangotri")
              ? "Goddess Ganga"
              : temple.name.includes("Yamuna") || temple.name.includes("Yamunotri")
                ? "Goddess Yamuna"
                : temple.name.includes("Ganesh") || temple.name.includes("Siddhivinayak")
                  ? "Lord Ganesha"
                  : temple.name.includes("Golden")
                    ? "Guru Granth Sahib Ji"
                    : temple.name.includes("Balaji") || temple.name.includes("Tirupati")
                      ? "Lord Venkateswara"
                      : "Sanatana Dharma Deity");

  const subtitle =
    customConfig.subtitle ||
    `The Sacred Abode of ${deity}`;

  const established =
    customConfig.established ||
    (temple.history?.description.match(/(\d+th|\d+st|\d+rd|\d+nd) century/i)?.[0]
      ? `${temple.history.description.match(/(\d+th|\d+st|\d+rd|\d+nd) century/i)?.[0]} AD`
      : "Ancient Heritage");

  const rating = customConfig.rating || 4.9;
  const ratingText = customConfig.ratingText || `${rating} (30k+ Reviews)`;
  const significance =
    customConfig.significance || "Sacred National Shrine";

  const statsPills = customConfig.statsPills || [
    deity,
    "Traditional Hindu Heritage",
    "Open for Daily Darshan",
  ];

  const spiritualQuote = customConfig.spiritualQuote || {
    quote: `In ${temple.name}, devotion transcends time and offers peace to every seeking soul.`,
    author: "Sacred Heritage Chronicles",
  };

  const videoThumbnail = customConfig.videoThumbnail || {
    image: temple.descriptionImages?.[0] || temple.heroImage,
    duration: "05:40 MINS",
    videoUrl: "https://www.youtube.com/watch?v=darshan_stream",
  };

  const timeline: TempleMilestone[] =
    customConfig.timeline || [
      {
        year: "Ancient Era",
        description: `Foundational era of ${temple.name} recorded in classical texts and local devotion.`,
      },
      {
        year: "Medieval Era",
        description: `Expansion and architectural enhancement by royal patrons and regional rulers.`,
      },
      {
        year: "Modern Era",
        description: `Restoration and preservation of the sacred complex as a prominent spiritual site.`,
      },
      {
        year: "Present Day",
        description: `Modern facilities and world-class pilgrim amenities welcoming devotees globally.`,
      },
    ];

  const originsParagraphs =
    customConfig.originsParagraphs || [
      temple.description,
      temple.history?.description.replace(/&rsquo;/g, "'") ||
        `The rich historical origins of ${temple.name} reflect timeless faith, resilience, and spiritual devotion across generations.`,
    ];

  const facts =
    customConfig.facts ||
    (temple.features?.featuresList && temple.features.featuresList.length > 0
      ? temple.features.featuresList
      : [
          `One of the most sacred pilgrimage destinations in India.`,
          `Renowned for architectural magnificence and cultural heritage.`,
          `Visited by millions of devotees and spiritual travelers yearly.`,
          `Preserves centuries-old traditions, daily aartis, and rituals.`,
        ]);

  const factsBookImage =
    customConfig.factsBookImage ||
    temple.history?.historyImages?.[0] ||
    temple.descriptionImages?.[1] ||
    temple.heroImage;

  const featurePillars: TempleFeaturePillar[] =
    customConfig.featurePillars || [
      {
        title: "Architecture",
        tag: "SACRED STYLE",
        description:
          temple.features?.featuresList?.[0] ||
          "Exhibits exemplary ancient Indian craftsmanship, stone sculptures, and timeless shikhara architecture.",
        image:
          temple.features?.featuresImages?.[0] ||
          temple.descriptionImages?.[0] ||
          temple.heroImage,
      },
      {
        title: "Mythology",
        tag: "DIVINE LORE",
        description:
          temple.features?.featuresList?.[1] ||
          `Rich mythological stories associate ${temple.name} with divine blessings and sacred scriptures.`,
        image:
          temple.features?.featuresImages?.[1] ||
          temple.descriptionImages?.[1] ||
          temple.heroImage,
      },
      {
        title: "Rituals & Aarti",
        tag: "DAILY WORSHIP",
        description:
          temple.timings
            ? `Special daily darshan and morning-evening aarti rituals conducted according to Vedic traditions (${temple.timings}).`
            : "Traditional daily prayers, chanting, and aartis conducted with solemn devotion.",
        image:
          temple.location?.locationImages?.[0] ||
          temple.descriptionImages?.[0] ||
          temple.heroImage,
      },
    ];

  const schedules: TempleScheduleItem[] =
    customConfig.schedules || [
      { title: "Morning Darshan & Mangala Prayers", time: "5:00 AM – 7:00 AM" },
      { title: "General Darshan & Abhishek", time: "7:00 AM – 12:00 PM" },
      { title: "Afternoon Aarti & Reopening", time: "4:00 PM – 6:30 PM" },
      { title: "Sandhya Evening Aarti", time: "7:00 PM – 8:30 PM" },
      { title: "Shayan Aarti (Temple Closes)", time: "9:00 PM – 10:00 PM" },
    ];

  const scheduleNote =
    customConfig.scheduleNote ||
    `Official Timings: ${temple.timings}. Darshan schedules may change during major religious festivals and auspicious days.`;

  const travelGuide: TempleTravelGuide =
    customConfig.travelGuide || {
      howToReach:
        temple.location?.description ||
        "Well connected by air, railway stations, and state highways with local taxi and bus transit.",
      stayAndFood:
        "Numerous pilgrim guest houses, temple trust dharamshalas, and satvik vegetarian food facilities available nearby.",
      dressCode:
        "Modest traditional clothing covering shoulders and knees is recommended as a mark of reverence.",
      bestTimeToVisit:
        temple.bestTimeToVisit || "October to March for pleasant and comfortable weather.",
    };

  // Find 4 other temples as recommendations
  const nearbyTempleSlugs =
    customConfig.nearbyTempleSlugs ||
    temples
      .filter((t) => t.slug !== temple.slug)
      .slice(0, 4)
      .map((t) => t.slug);

  return {
    ...temple,
    ...customConfig,
    subtitle,
    deity,
    established,
    rating,
    ratingText,
    significance,
    statsPills,
    spiritualQuote,
    videoThumbnail,
    timeline,
    originsParagraphs,
    facts,
    factsBookImage,
    featurePillars,
    schedules,
    scheduleNote,
    travelGuide,
    nearbyTempleSlugs,
  };
}
