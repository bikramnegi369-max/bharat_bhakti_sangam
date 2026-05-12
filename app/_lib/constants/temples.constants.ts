import { FAQItem } from "@/_types/FAQ.types";
import { Temples } from "@/_types/Temples.types";

export const temples: Temples = [
  {
    slug: "konark-sun-temple",
    name: "Konark Sun Temple",
    heroImage: "/temples-images/konark-sun/konark-sun-hero.webp",
    description:
      "The Konark Sun Temple is a magnificent 13th-century temple dedicated to Surya (Sun God), designed as a grand stone chariot with intricately carved wheels and horses. A UNESCO World Heritage Site, it reflects the brilliance of ancient Indian architecture and devotion. The temple stands as a timeless symbol of art, science, and spirituality.",
    descriptionImages: [
      "/temples-images/konark-sun/description/konark-desc-1.webp",
      "/temples-images/konark-sun/description/konark-desc-2.webp",
    ],
    features: {
      title: "Features of Konark Sun Temple",
      featuresList: [
        "Unique chariot-shaped architecture with 24 intricately carved wheels",
        "Detailed stone carvings depicting life, culture, and mythology",
        "Alignment designed to capture the first rays of the sun",
        "A masterpiece of Kalinga architecture and engineering",
      ],
      featuresImages: [
        "/temples-images/konark-sun/features/konark-feature-1.webp",
        "/temples-images/konark-sun/features/konark-feature-2.webp",
      ],
    },
    location: {
      title: "Konark Sun Temple Location",
      description:
        "Situated in Konark town, Puri district, Odisha, India. Around 35 km from Puri and 65 km from Bhubaneswar",
      locationImages: [
        "/temples-images/konark-sun/location/konark-location-1.webp",
        "/temples-images/konark-sun/location/konark-location-2.webp",
      ],
    },
    history: {
      title: "History of Konark Sun Temple",
      description:
        "The Konark Sun Temple was built in the 13th century by King Narasimhadeva I of the Eastern Ganga Dynasty. It was constructed to honor the Sun God and showcase the kingdom&rsquo;s power and devotion. Over time, parts of the temple collapsed due to natural and historical factors, but its grandeur still stands strong, attracting devotees, historians, and travelers from across the world.",
      historyImages: [
        "/temples-images/konark-sun/history/konark-history-1.webp",
        "/temples-images/konark-sun/history/konark-history-2.webp",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open: 6:00 AM – 8:00 PM (Daily)",
    entryFee:
      "INR 40 for Indian citizens, INR 600 for foreign tourists, free for children under 15 years",
  },
  {
    slug: "brihadeeswara-temple",
    name: "Brihadeeswara Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03219.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03219.jpg",
    description:
      "Brihadeeswara Temple, also known as the “Big Temple,” is a majestic shrine dedicated to Lord Shiva and a masterpiece of Chola architecture. Built entirely of granite, it is renowned for its towering vimana and grand scale. This UNESCO World Heritage Site reflects the glory, devotion, and engineering brilliance of ancient India.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brihadeeswarar_Temple_Thanjavur_India.jpg/2560px-Brihadeeswarar_Temple_Thanjavur_India.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/The_vimana_of_the_Brihadisvara_Temple.jpg/2560px-The_vimana_of_the_Brihadisvara_Temple.jpg",
    ],
    features: {
      title: "Features of Brihadeeswara Temple",
      featuresList: [
        "Massive vimana (tower) rising over 60 meters high",
        "One of the largest Shiva Lingams in India",
        "Huge monolithic Nandi statue at the entrance",
        "Intricate Chola-era carvings and murals",
        "Built entirely using granite without modern tools",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Brihadeeswara_Temple_Thanjavur_shiva_lingam.jpg/1280px-Brihadeeswara_Temple_Thanjavur_shiva_lingam.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Thanjavur_Nandi.jpg/2560px-Thanjavur_Nandi.jpg",
      ],
    },
    location: {
      title: "Brihadeeswara Temple Location",
      description:
        "Located in Thanjavur, Tamil Nadu, India. Around 350 km from Chennai, well connected via road and rail networks",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Brihadeeswarar_Temple_Thanjavur_India.jpg/2560px-Brihadeeswarar_Temple_Thanjavur_India.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/The_vimana_of_the_Brihadisvara_Temple.jpg/2560px-The_vimana_of_the_Brihadisvara_Temple.jpg",
      ],
    },
    history: {
      title: "History of Brihadeeswara Temple",
      description:
        "Constructed in the 11th century by the great Chola king Rajaraja I, the Brihadeeswara Temple stands as a symbol of the empire&rsquo;s power and devotion to Lord Shiva. It was built to showcase architectural excellence and spiritual dedication. Even after a thousand years, the temple remains a living heritage site, admired for its precision, strength, and timeless beauty.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Thanjavur_Temple_Gopuram_at_Night.jpg/2560px-Thanjavur_Temple_Gopuram_at_Night.jpg",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open: 6:00 AM – 12:30 PM, Reopens: 4:00 PM – 8:30 PM",
    entryFee: "Free entry for all visitors",
  },
  {
    slug: "somnath-temple",
    name: "Somnath Temple",
    heroImage: "/temples-images/somnath/somnath_hero.webp",
    description:
      "Somnath Temple is one of the twelve sacred Jyotirlingas of Lord Shiva and a powerful symbol of faith and resilience. Located on the shores of the Arabian Sea, it radiates divine energy and timeless devotion. The temple stands as a testimony to India&rsquo;s spiritual strength, having been rebuilt multiple times through history.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Somnath_temple_Gujarat.jpg/2560px-Somnath_temple_Gujarat.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Somnath_Temple_front_view.jpg/2560px-Somnath_Temple_front_view.jpg",
    ],
    features: {
      title: "Features of Somnath Temple",
      featuresList: [
        "One of the 12 Jyotirlingas of Lord Shiva",
        "Scenic location by the Arabian Sea",
        "Grand Chalukya-style architecture",
        "Famous light and sound show depicting history",
        "Spiritual and historical significance",
      ],
      featuresImages: [
        "/temples-images/somnath/features/somnath-feature-1.webp",
        "/temples-images/somnath/features/somnath-feature-2.webp",
      ],
    },
    location: {
      title: "Somnath Temple Location",
      description:
        "Situated in Prabhas Patan, near Veraval, Gujarat, India. Around 80 km from Junagadh, Well connected via road and rail (Veraval Railway Station nearby)",
      locationImages: [
        "/temples-images/somnath/location/somnath-location-1.webp",
        "/temples-images/somnath/location/somnath-location-2.webp",
      ],
    },
    history: {
      title: "History of Somnath Temple",
      description:
        "Somnath Temple is believed to have been originally built by the Moon God (Soma) and later reconstructed by various kings. It faced several invasions and destructions over centuries but was rebuilt each time, symbolizing unwavering faith and devotion. The present structure was reconstructed in 1951 under the guidance of Sardar Vallabhbhai Patel, restoring its divine glory.",
      historyImages: [
        "/temples-images/somnath/history/somnath-history-1.webp",
        "/temples-images/somnath/history/somnath-history-2.webp",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open: 6:00 AM – 10:00 PM (Daily)",
    entryFee: "Free entry for all devotees",
  },
  {
    slug: "gangotri-temple",
    name: "Gangotri Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Gangotri_Temple_Uttarakhand.jpg/2560px-Gangotri_Temple_Uttarakhand.jpg",
    description:
      "Gangotri Temple is a sacred shrine dedicated to Goddess Ganga, marking the origin of the holy River Ganges. Nestled in the serene Himalayas, it is one of the Char Dham pilgrimage sites. The temple radiates purity, devotion, and spiritual tranquility.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Gangotri_Temple_Uttarakhand.jpg/2560px-Gangotri_Temple_Uttarakhand.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Gangotri_Temple.jpg/2560px-Gangotri_Temple.jpg",
    ],
    features: {
      title: "Features of Gangotri Temple",
      featuresList: [
        "Origin point of the sacred River Ganga (Bhagirathi)",
        "Part of the revered Char Dham Yatra",
        "Surrounded by snow-clad Himalayan peaks",
        "Peaceful and spiritually uplifting environment",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bhagirathi_River_at_Gangotri.jpg/2560px-Bhagirathi_River_at_Gangotri.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Gangotri_Temple_Uttarakhand.jpg/2560px-Gangotri_Temple_Uttarakhand.jpg",
      ],
    },
    location: {
      title: "Gangotri Temple Location",
      description:
        "Located in Gangotri, Uttarkashi district, Uttarakhand, India. Around 100 km from Uttarkashi, Accessible by road, followed by a short walk to the temple",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Gangotri_Temple_entrance.jpg/2560px-Gangotri_Temple_entrance.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Gangotri_Temple.jpg/2560px-Gangotri_Temple.jpg",
      ],
    },
    history: {
      title: "History of Gangotri Temple",
      description:
        "The Gangotri Temple was built in the 18th century by the Gorkha commander Amar Singh Thapa. It is believed that Goddess Ganga descended to Earth here after King Bhagirath&rsquo;s intense penance to purify the souls of his ancestors. Since then, the temple has been a sacred center of devotion and pilgrimage for millions of devotees.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gangotri_Temple_Surroundings.jpg/2560px-Gangotri_Temple_Surroundings.jpg",
      ],
    },
    bestTimeToVisit: "May to June & September to October",
    timings: "Open: 6:15 AM – 2:00 PM & Reopens: 3:00 PM – 9:30 PM",
    entryFee: "Free entry for all devotees",
  },
  {
    slug: "mata-vaishno-devi-cave",
    name: "Mata Vaishno Devi Cave",
    heroImage: "/temples-images/vaishnodevi/vaishnodevi-hero.webp",
    description:
      "Mata Vaishno Devi Temple is one of the most sacred pilgrimage sites dedicated to Goddess Vaishno Devi. Nestled in the Trikuta Mountains, it attracts millions of devotees seeking blessings, strength, and spiritual fulfillment. The divine journey to the holy cave is a powerful experience of faith and devotion.",
    descriptionImages: [
      "/temples-images/vaishnodevi/description/vaishnodevi-desc-1.webp",
      "/temples-images/vaishnodevi/description/vaishnodevi-desc-2.webp",
    ],
    features: {
      title: "Features of Mata Vaishno Devi Cave",
      featuresList: [
        "Sacred cave shrine (Bhawan) of Mata Vaishno Devi",
        "Holy trek of around 12–13 km from Katra",
        "Scenic views of the Trikuta Mountains",
        "Strong spiritual energy and devotional atmosphere",
      ],
      featuresImages: [
        "/temples-images/vaishnodevi/features/vaishnodevi-feature-1.webp",
        "/temples-images/vaishnodevi/features/vaishnodevi-feature-2.webp",
      ],
    },
    location: {
      title: "Mata Vaishno Devi Cave Location",
      description:
        "Located in Katra, Reasi district, Jammu and Kashmir, India. Around 50 km from Jammu city",
      locationImages: [
        "/temples-images/vaishnodevi/location/vaishnodevi-location-1.webp",
        "/temples-images/vaishnodevi/location/vaishnodevi-location-2.webp",
      ],
    },
    history: {
      title: "History of Mata Vaishno Devi Cave",
      description:
        "According to Hindu beliefs, Mata Vaishno Devi manifested to uphold Dharma and meditated in the Trikuta Mountains. She is believed to have defeated the demon Bhairavnath, after which he was granted liberation. The temple has since become one of the most important Shakti Peeths, drawing devotees from all over the world.",
      historyImages: [
        "/temples-images/vaishnodevi/history/vaishnodevi-history-1.webp",
        "/temples-images/vaishnodevi/history/vaishnodevi-history-2.webp",
      ],
    },
    bestTimeToVisit: "March to October",
    timings: "Open 24 hours (Daily)",
    entryFee:
      "Free entry for all devotees, Registration for yatra is mandatory",
  },
  {
    slug: "kashi-vishwanath-temple",
    name: "Kashi Vishwanath Temple",
    heroImage: "/temples-images/vishwanath/vishwanath-hero.webp",
    description:
      "Kashi Vishwanath Temple is one of the most sacred Jyotirlingas of Lord Shiva, located in the spiritual city of Varanasi. Revered as the abode of Lord Shiva, it draws millions of devotees seeking liberation (moksha). The temple radiates divine energy, devotion, and timeless spiritual significance.",
    descriptionImages: [
      "/temples-images/vishwanath/description/vishwanath-desc-1.webp",
      "/temples-images/vishwanath/description/vishwanath-desc-2.webp",
    ],
    features: {
      title: "Features of Kashi Vishwanath Temple",
      featuresList: [
        "One of the 12 Jyotirlingas of Lord Shiva",
        "Located near the sacred Ganga River ghats",
        "Newly developed Kashi Vishwanath Corridor",
        "Deep spiritual connection with moksha (liberation)",
      ],
      featuresImages: [
        "/temples-images/vishwanath/features/vishwanath-feature-1.webp",
        "/temples-images/vishwanath/features/vishwanath-feature-2.webp",
      ],
    },
    location: {
      title: "Kashi Vishwanath Temple Location",
      description:
        "Situated in Varanasi, Uttar Pradesh, India, Close to Dashashwamedh Ghat on the Ganga River",
      locationImages: [
        "/temples-images/vishwanath/location/vishwanath-location-1.webp",
        "/temples-images/vishwanath/location/vishwanath-location-2.webp",
      ],
    },
    history: {
      title: "History of Kashi Vishwanath Temple",
      description:
        "The temple has a long and sacred history, believed to be thousands of years old. It has been destroyed and rebuilt multiple times due to invasions. The current structure was rebuilt in 1780 by Queen Ahilyabai Holkar. Today, it stands as a symbol of unwavering faith, devotion, and the eternal presence of Lord Shiva in Kashi.",
      historyImages: [
        "/temples-images/vishwanath/history/vishwanath-history-1.webp",
        "/temples-images/vishwanath/history/vishwanath-history-2.webp",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open: 3:00 AM – 11:00 PM",
    entryFee: "No Entry Fees",
  },
  {
    slug: "shri-jagannath-temple",
    name: "Shri Jagannath Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jagannath_Temple_Puri_01.jpg/1280px-Jagannath_Temple_Puri_01.jpg",
    description:
      "Shri Jagannath Temple is a sacred shrine dedicated to Lord Jagannath (a form of Lord Vishnu) along with Balabhadra and Subhadra. Located in Puri, it is one of the Char Dham pilgrimage sites and a center of immense devotion. The temple is world-famous for its grand Rath Yatra festival and deep spiritual significance.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jagannath_Temple_Puri_01.jpg/2560px-Jagannath_Temple_Puri_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puri_Jagannath_Temple_Vimana.jpg/2560px-Puri_Jagannath_Temple_Vimana.jpg",
    ],
    features: {
      title: "Features of Shri Jagannath Temple",
      featuresList: [
        "One of the sacred Char Dham Yatra sites",
        "Famous Rath Yatra (Chariot Festival)",
        "Unique wooden idols of Jagannath, Balabhadra, and Subhadra",
        "Temple kitchen is one of the largest in the world",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jagannath_Temple_Puri_01.jpg/2560px-Jagannath_Temple_Puri_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puri_Jagannath_Temple_Vimana.jpg/2560px-Puri_Jagannath_Temple_Vimana.jpg",
      ],
    },
    location: {
      title: "Shri Jagannath Temple Location",
      description:
        "Located in Puri, Odisha, India, Around 60 km from Bhubaneswar",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jagannath_Temple_Puri_01.jpg/2560px-Jagannath_Temple_Puri_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Puri_Jagannath_Temple_Vimana.jpg/2560px-Puri_Jagannath_Temple_Vimana.jpg",
      ],
    },
    history: {
      title: "History of Shri Jagannath Temple",
      description:
        "The Jagannath Temple was built in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga Dynasty. It has been a major center of Vaishnav tradition and devotion for centuries. The temple&rsquo;s unique rituals, traditions, and festivals continue to attract millions of devotees from across the world.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Jagannath_Temple_Puri_01.jpg/2560px-Jagannath_Temple_Puri_01.jpg",
      ],
    },
    bestTimeToVisit: "October to February",
    timings: "5:00 AM – 11:30 PM (Daily)",
    entryFee: "Free entry for devotees",
  },
  {
    slug: "shri-amarnath-cave",
    name: "Shri Amarnath Cave",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amarnath_cave_01.jpg/1280px-Amarnath_cave_01.jpg",
    description:
      "Shri Amarnath Cave is a sacred shrine dedicated to Lord Shiva, famous for the naturally formed ice Shivling. Located high in the Himalayas, it is one of the most revered pilgrimage sites in India. The journey to the cave is a profound spiritual experience filled with devotion, faith, and endurance.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amarnath_cave_01.jpg/2560px-Amarnath_cave_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Amarnath_Yatra_-_Trek_to_Cave.jpg/2560px-Amarnath_Yatra_-_Trek_to_Cave.jpg",
    ],
    features: {
      title: "Features of Shri Amarnath Cave",
      featuresList: [
        "Naturally formed ice Shivling (Himling)",
        "Located at an altitude of around 3,888 meters",
        "Challenging yet sacred trek pilgrimage",
        "Deep spiritual and mythological significance",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amarnath_cave_01.jpg/2560px-Amarnath_cave_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Amarnath_Yatra_-_Trek_to_Cave.jpg/2560px-Amarnath_Yatra_-_Trek_to_Cave.jpg",
      ],
    },
    location: {
      title: "Shri Amarnath Cave Location",
      description:
        "Situated in Anantnag district, Jammu and Kashmir, India, Accessible via two main routes: Pahalgam and Baltal",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amarnath_cave_01.jpg/2560px-Amarnath_cave_01.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Amarnath_Yatra_-_Trek_to_Cave.jpg/2560px-Amarnath_Yatra_-_Trek_to_Cave.jpg",
      ],
    },
    history: {
      title: "History of Shri Amarnath Cave",
      description:
        "According to Hindu beliefs, Lord Shiva revealed the secret of immortality (Amar Katha) to Goddess Parvati in this very cave. To ensure secrecy, he left behind all companions on the way. Since then, the cave has become a sacred place of immense devotion, attracting lakhs of pilgrims every year who undertake this divine journey.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Amarnath_cave_01.jpg/2560px-Amarnath_cave_01.jpg",
      ],
    },
    bestTimeToVisit: "Amarnath Yatra (June to August)",
    timings: "Early morning to afternoon",
    entryFee: "Free Entry for Devotees",
  },
  {
    slug: "golden-temple",
    name: "Golden Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Golden_Temple_nighttime.jpg/960px-Golden_Temple_nighttime.jpg",
    description:
      "The Golden Temple, also known as Harmandir Sahib, is the holiest shrine of Sikhism and a symbol of peace, equality, and devotion. Surrounded by the sacred Amrit Sarovar, its golden structure reflects divine beauty and serenity. It welcomes people of all faiths, embodying unity and selfless service.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Golden_Temple_-_Amritsar_-_Punjab_-_0001.jpg/2560px-Golden_Temple_-_Amritsar_-_Punjab_-_0001.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Golden_Temple%2C_Amritsar.jpg/2560px-Golden_Temple%2C_Amritsar.jpg",
    ],
    features: {
      title: "Features of Golden Temple",
      featuresList: [
        "Holiest shrine of Sikhism",
        "Surrounded by the sacred Amrit Sarovar (holy tank)",
        "World’s largest free community kitchen (Langar)",
        "Covered in gold plating with stunning architecture",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Golden_Temple%2C_Amritsar_02.jpg/2560px-Golden_Temple%2C_Amritsar_02.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Golden_Temple%2C_Amritsar_04.jpg/2560px-Golden_Temple%2C_Amritsar_04.jpg",
      ],
    },
    location: {
      title: "Golden Temple Location",
      description:
        "Located in Amritsar, Punjab, India, Around 13 km from Sri Guru Ram Dass Jee International Airport",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Hamandir_Sahib_%28Golden_Temple%29.jpg/2560px-Hamandir_Sahib_%28Golden_Temple%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Golden_Temple_-_Amritsar_India.jpg/2560px-Golden_Temple_-_Amritsar_India.jpg",
      ],
    },
    history: {
      title: "History of Golden Temple",
      description:
        "The Golden Temple was founded by Guru Ram Das in the 16th century and later completed by Guru Arjan Dev, who also installed the Guru Granth Sahib here. Over time, it was adorned with gold by Maharaja Ranjit Singh. It stands today as a symbol of faith, humility, and universal brotherhood.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Golden_Temple_-_Amritsar_-_Punjab_-_0001.jpg/2560px-Golden_Temple_-_Amritsar_-_Punjab_-_0001.jpg",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open 24 hrs open",
    entryFee: "Free Entry",
  },
  {
    slug: "siddhivinayak-temple",
    name: "Siddhivinayak Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Siddhivinayak_Temple_Prabhadevi.jpg/1280px-Siddhivinayak_Temple_Prabhadevi.jpg",
    description:
      "Siddhivinayak Temple is one of the most revered temples dedicated to Lord Ganesha, known as the remover of obstacles and giver of success. Located in Mumbai, it attracts millions of devotees, including celebrities and leaders. The temple radiates faith, hope, and divine blessings.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Siddhivinayak_temple_mumbai.jpg/2560px-Siddhivinayak_temple_mumbai.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Siddhivinayak_Temple_Prabhadevi.jpg/2560px-Siddhivinayak_Temple_Prabhadevi.jpg",
    ],
    features: {
      title: "Features of Siddhivinayak Temple",
      featuresList: [
        "Famous idol of Lord Ganesha (Siddhivinayak)",
        "One of the richest temples in Mumbai",
        "Strong belief in wish fulfillment",
        "High-profile devotees and global popularity",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Inside_Siddhivinayak_temple.jpg/1280px-Inside_Siddhivinayak_temple.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Siddhivinayak_temple_mumbai.jpg/2560px-Siddhivinayak_temple_mumbai.jpg",
      ],
    },
    location: {
      title: "Siddhivinayak Temple Location",
      description:
        "Located in Prabhadevi, Mumbai, Maharashtra, India, Well connected via local trains, buses, and taxis",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Siddhivinayak_Temple_Prabhadevi.jpg/2560px-Siddhivinayak_Temple_Prabhadevi.jpg",
      ],
    },
    history: {
      title: "History of Siddhivinayak Temple",
      description:
        "The Siddhivinayak Temple was established in 1801 by Laxman Vithu and Deubai Patil. Over the years, it has grown into one of the most significant Ganesha temples in India. Devotees believe that sincere prayers here fulfill wishes and bring success and prosperity.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Siddhivinayak_temple_mumbai.jpg/2560px-Siddhivinayak_temple_mumbai.jpg",
      ],
    },
    bestTimeToVisit: "November to February",
    timings: "5:30 AM – 9:50 PM (Daily)",
    entryFee:
      "Free entry for devotees, Special darshan passes available (paid)",
  },
  {
    slug: "sanchi-stupa",
    name: "Sanchi Stupa",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sanchi_Stupa_-_Madhya_Pradesh.jpg/1280px-Sanchi_Stupa_-_Madhya_Pradesh.jpg",
    description:
      "Sanchi Stupa is one of the oldest and most significant Buddhist monuments in India, symbolizing peace, wisdom, and spiritual enlightenment. Famous for its grand dome and beautifully carved gateways, it reflects the rich heritage of Buddhist art and architecture. This UNESCO World Heritage Site attracts pilgrims, historians, and travelers from around the world.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sanchi_Stupa_-_Madhya_Pradesh.jpg/2560px-Sanchi_Stupa_-_Madhya_Pradesh.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/North_Gateway%2C_Sanchi.jpg/2560px-North_Gateway%2C_Sanchi.jpg",
    ],
    features: {
      title: "Features of Sanchi Stupa",
      featuresList: [
        "One of the oldest Buddhist stupas in India",
        "Magnificent stone gateways (Toranas) with intricate carvings",
        "UNESCO World Heritage Site",
        "Symbol of peace, meditation, and Buddhist teachings",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/North_Gateway%2C_Sanchi.jpg/2560px-North_Gateway%2C_Sanchi.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sanchi_Stupa_No_3_Gateway.jpg/2560px-Sanchi_Stupa_No_3_Gateway.jpg",
      ],
    },
    location: {
      title: "Sanchi Stupa Location",
      description:
        "Located in Sanchi, Raisen district, Madhya Pradesh, India, Around 46 km from Bhopal",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Sanchi_Stupa_-_Madhya_Pradesh.jpg/2560px-Sanchi_Stupa_-_Madhya_Pradesh.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Sanchi_Stupa_Madhya_Pradesh_11.jpg/2560px-Sanchi_Stupa_Madhya_Pradesh_11.jpg",
      ],
    },
    history: {
      title: "History of Sanchi Stupa",
      description:
        "The Great Stupa at Sanchi was originally commissioned by Emperor Ashoka in the 3rd century BCE after embracing Buddhism. Over time, it was expanded and decorated by later rulers and devotees. The site became a major center of Buddhist learning and spirituality, preserving centuries of India&rsquo;s cultural and religious heritage.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Sanchi_Stupa_Madhya_Pradesh_11.jpg/2560px-Sanchi_Stupa_Madhya_Pradesh_11.jpg",
      ],
    },
    bestTimeToVisit: "October to March",
    timings: "Open: 8:30 AM – 5:30 PM (Daily)",
    entryFee:
      "Indians: Approx. ₹40, Foreign Tourists: Approx. ₹600, Free entry for children below 15 years",
  },
  {
    slug: "ramanathaswamy-temple",
    name: "Ramanathaswamy Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rameswaram_Temple_Corridor.jpg/1280px-Rameswaram_Temple_Corridor.jpg",
    description:
      "Ramanathaswamy Temple is one of the holiest temples dedicated to Lord Shiva and a sacred part of the Char Dham Yatra. Located in Rameswaram, it is renowned for its magnificent corridors, towering gopurams, and deep spiritual significance. The temple beautifully reflects devotion, architecture, and the legacy of Lord Rama.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rameswaram_Temple_Corridor.jpg/2560px-Rameswaram_Temple_Corridor.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rameswaram_Temple_Gopuram.jpg/2560px-Rameswaram_Temple_Gopuram.jpg",
    ],
    features: {
      title: "Features of Ramanathaswamy Temple",
      featuresList: [
        "One of the sacred 12 Jyotirlingas of Lord Shiva",
        "Part of the revered Char Dham pilgrimage",
        "Famous for the world&rsquo;s longest temple corridor",
        "Sacred wells (Theerthams) used for ritual purification",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Corridor_Rameswaram.jpg/2560px-Corridor_Rameswaram.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rameswaram_Temple_Corridor.jpg/2560px-Rameswaram_Temple_Corridor.jpg",
      ],
    },
    location: {
      title: "Ramanathaswamy Temple Location",
      description:
        "Situated in Rameswaram, Tamil Nadu, India, Connected to mainland India via the famous Pamban Bridge, Easily accessible via road and rail",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rameswaram_Temple_Gopuram.jpg/2560px-Rameswaram_Temple_Gopuram.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rameswaram_Temple_Corridor.jpg/2560px-Rameswaram_Temple_Corridor.jpg",
      ],
    },
    history: {
      title: "History of Ramanathaswamy Temple",
      description:
        "According to Hindu tradition, Lord Rama worshipped Lord Shiva here after defeating Ravana in Lanka. It is believed that Rama established the Shivling to seek blessings and purification. The temple was expanded over centuries by various South Indian dynasties, making it one of India&rsquo;s most important spiritual landmarks.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rameswaram_Temple_Gopuram.jpg/2560px-Rameswaram_Temple_Gopuram.jpg",
      ],
    },
    bestTimeToVisit: "October to April",
    timings: "Open: 5:00 AM – 1:00 PM, Reopens: 3:00 PM – 9:00 PM",
    entryFee:
      "Free entry for devotees, Special darshan and ritual charges may apply",
  },
  {
    slug: "yamunotri-temple",
    name: "Yamunotri Temple",
    heroImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Yamunotri_Temple_Uttarakhand.jpg/1280px-Yamunotri_Temple_Uttarakhand.jpg",
    description:
      "Yamunotri Temple is a sacred shrine dedicated to Goddess Yamuna and marks the origin of the holy Yamuna River. Nestled in the Garhwal Himalayas, it is one of the revered Char Dham pilgrimage sites. Surrounded by snow-covered peaks and natural hot springs, the temple offers a deeply spiritual and serene experience.",
    descriptionImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Yamunotri_Temple_Uttarakhand.jpg/2560px-Yamunotri_Temple_Uttarakhand.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yamunotri_River_Valley.jpg/2560px-Yamunotri_River_Valley.jpg",
    ],
    features: {
      title: "Features of Yamunotri Temple",
      featuresList: [
        "Source shrine of the sacred Yamuna River",
        "Part of the holy Char Dham Yatra",
        "Famous Surya Kund hot springs near the temple",
        "Scenic Himalayan trekking pilgrimage",
      ],
      featuresImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Yamunotri_Temple_Uttarakhand.jpg/2560px-Yamunotri_Temple_Uttarakhand.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yamunotri_River_Valley.jpg/2560px-Yamunotri_River_Valley.jpg",
      ],
    },
    location: {
      title: "Yamunotri Temple Location",
      description:
        "Located in Uttarkashi district, Uttarakhand, India, Around 220 km from Dehradun, Accessible via road till Janki Chatti, followed by a trek",
      locationImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Yamunotri_Temple_Uttarakhand.jpg/2560px-Yamunotri_Temple_Uttarakhand.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Yamunotri_River_Valley.jpg/2560px-Yamunotri_River_Valley.jpg",
      ],
    },
    history: {
      title: "History of Yamunotri Temple",
      description:
        "The Yamunotri Temple was originally built by Maharaja Pratap Shah of Tehri Garhwal and later renovated multiple times due to harsh weather conditions. According to Hindu beliefs, Goddess Yamuna is the daughter of Surya Dev and sister of Yama, the God of Death. Worshipping here is believed to protect devotees from untimely death and bring purity and blessings.",
      historyImages: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Yamunotri_Temple_Uttarakhand.jpg/2560px-Yamunotri_Temple_Uttarakhand.jpg",
      ],
    },
    bestTimeToVisit: "May to June and September to October",
    timings: "Open: 6:00 AM – 8:00 PM (Daily)",
    entryFee: "Free entry for all devotees",
  },
];

export const templesFAQs: FAQItem[] = [
  {
    title: "Which are the most famous temples in India?",
    content:
      "Some of the most famous temples include Kedarnath Temple, Badrinath Temple, Kashi Vishwanath Temple, Tirupati Balaji Temple, and Somnath Temple.",
  },
  {
    title: "What is the best time to visit temples in India?",
    content:
      "The best time is generally October to March, when the weather is pleasant. However, visiting during festivals enhances the spiritual experience.",
  },
  {
    title: "Are there any entry fees for temples in India?",
    content:
      "Most temples in India offer free entry, but some may have charges for special darshan or aarti.",
  },
  {
    title: "What should I wear while visiting temples?",
    content:
      "Devotees are advised to wear modest and traditional attire, covering shoulders and knees, as a mark of respect.",
  },
  {
    title: "Can foreigners visit Indian temples?",
    content:
      "Yes, most temples allow foreigners, but some temples (like Jagannath Temple) have entry restrictions.",
  },
  {
    title: "What are Char Dham temples?",
    content:
      "The Char Dham includes Badrinath Temple, Dwarkadhish Temple, Jagannath Temple, and Rameswaram Temple—considered the most sacred pilgrimage sites.",
  },
  {
    title: "Which temple is the richest in India?",
    content:
      "Tirupati Balaji Temple is considered the richest temple in India.",
  },
  {
    title: "Are mobile phones allowed inside temples?",
    content:
      "Rules vary by temple. Some allow phones, while others restrict them for security and spiritual reasons.",
  },
  {
    title: "How can I plan a temple tour in India?",
    content:
      "Plan based on location, weather, and festivals. Grouping nearby temples (like Varanasi temples or South India temples) helps in a smooth spiritual journey.",
  },
];
