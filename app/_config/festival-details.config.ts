import { FestivalDetailData } from "@/_types/festivals.types";

/**
 * Rich, production-grade configuration registry for all festivals.
 * Implements clean, reusable structure matching the design mockups.
 */
export const FESTIVAL_DETAILS_CONFIG_REGISTRY: Record<
  string,
  FestivalDetailData
> = {
  holi: {
    slug: "holi",
    name: "HOLI",
    tagline: "Festival of Colors & Devotion",
    dateBadge: { day: "25", month: "Mar" },
    heroImage: "/festivals/holi/holi-1.webp",
    featuredOverviewImage: "/festivals/holi/holi-2.webp",
    aboutStory: {
      title: "About Holi",
      paragraphs: [
        "Holi, the Festival of Colors, is one of the most vibrant and joyous celebrations in Sanatana Dharma. Celebrated on the full moon day (Purnima) of the Hindu lunar month of Phalguna, it heralds the arrival of spring and the blossoming of life.",
        "Across towns, villages, and sacred ghats, millions join together to smear colorful gulal and abir, shedding social divisions and embracing unity, forgiveness, and universal brotherhood in the spirit of supreme Bhakti.",
      ],
      image: "/festivals/holi/holi-2.webp",
      imageAlt: "Holi colors celebration",
    },
    historyStory: {
      title: "History of Holi",
      paragraphs: [
        "Holi has ancient Vedic roots and is described in early Sanskrit texts like the Ratnavali of Harsha, Puranas, and historical stone carvings in temples across Hampi and Vijayanagara.",
        "It commemorates the eternal divine love of Radha and Krishna in the holy lands of Braj, Mathura, and Vrindavan, where Krishna playfully sprayed colors on Radha and the gopis, giving birth to the world-renowned Lathmar and Phoolon Ki Holi traditions.",
      ],
      image: "/temples-images/banke-bihari/history/banke-bihari-history-1.webp",
      imageAlt: "Ancient scripture describing Holi and Radha Krishna",
    },
    legendStory: {
      title: "Legend of Prahlad & Holika",
      paragraphs: [
        "The core mythological narrative of Holi centers around young devotee Prahlad, an ardent follower of Lord Vishnu, and his demonic father Hiranyakashipu.",
        "When Hiranyakashipu's sister Holika—who possessed a fireproof cloak—sat in a roaring bonfire with Prahlad on her lap to destroy him, the divine wind blew the cloak onto Prahlad. Holika was consumed by flames while Prahlad emerged unharmed, demonstrating the ultimate victory of devotion over evil.",
      ],
      image: "/festivals/slider/image-2.webp",
      imageAlt: "Holika Dahan sacred bonfire",
    },
    rituals: {
      title: "Rituals of Holi",
      items: [
        {
          title: "Holika Dahan Bonfire",
          description:
            "Lighting sacred community pyres on the eve of Holi to cleanse spiritual impurities and negative energies.",
        },
        {
          title: "Rangwali Holi (Dhulandi)",
          description:
            "Playing with herbal gulal, splashing vibrant water colors, and singing traditional folk songs.",
        },
        {
          title: "Temple Darshan & Bhajan",
          description:
            "Visiting temples of Radha Krishna, offering colorful gulal at the deities' feet, and chanting hymns.",
        },
        {
          title: "Sharing Festive Delicacies",
          description:
            "Visiting neighbors, elders, and loved ones with boxes of freshly prepared Gujiya, Thandai, and Mathri.",
        },
        {
          title: "Forgiveness & New Beginnings",
          description:
            "Embracing rivals and releasing past grievances to foster harmony, goodwill, and peace.",
        },
      ],
      image: "/festivals/slider/image-1.webp",
      imageAlt: "Women celebrating Holi with colors",
    },
    traditionalFoods: {
      title: "Traditional Food",
      subtitle:
        "A feast of rich delicacies prepared with pure ghee, nuts, and aromatic spices to celebrate sweetness and togetherness.",
      items: [
        {
          name: "Gujiya",
          image: "/festivals/holi/holi-1.webp",
        },
        {
          name: "Thandai",
          image: "/festivals/slider/image-3.webp",
        },
        {
          name: "Malpua",
          image: "/festivals/slider/image-4.webp",
        },
        {
          name: "Dahi Vada",
          image: "/festivals/diwali/diwali-1.webp",
        },
        {
          name: "Mathri",
          image: "/festivals/diwali/diwali-2.webp",
        },
      ],
      showcaseImage: "/festivals/slider/image-4.webp",
    },
    panoramicBanner: {
      image: "/festivals/slider/image-2.webp",
      alt: "Panoramic view of Holi celebration across heritage temple ghats",
    },
    regionalCelebrations: {
      title: "Holi Across India",
      subtitle:
        "Each corner of India celebrates Holi with unique cultural charm, music, and divine folklore.",
      items: [
        {
          region: "Braj & Barsana",
          title: "Lathmar & Phoolon Ki Holi",
          description:
            "Women of Barsana playfully beat the shields of Nandgaon men with sticks, followed by flowers shower in Vrindavan temples.",
        },
        {
          region: "Varanasi (Kashi)",
          title: "Masane Ki Holi",
          description:
            "Devotees celebrate Holi on Manikarnika Ghat applying sacred ashes in honor of Lord Shiva's eternal dance.",
        },
        {
          region: "Shantiniketan (West Bengal)",
          title: "Basanta Utsav",
          description:
            "Poet Rabindranath Tagore introduced this cultural springtime festival with Rabindra Sangeet, dance, and yellow attire.",
        },
        {
          region: "Goa",
          title: "Shigmo Utsav",
          description:
            "Grand street parades with folklore tableaus, traditional percussion dhol beats, and colorful dances.",
        },
      ],
      image: "/festivals/slider/image-1.webp",
      imageAlt: "Holi across the ghats of Varanasi",
    },
    momentsGallery: {
      title: "Moments of Holi",
      items: [
        { title: "Rangotsav", image: "/festivals/holi/holi-1.webp" },
        { title: "Holika Dahan", image: "/festivals/slider/image-2.webp" },
        { title: "Family Harmony", image: "/festivals/slider/image-3.webp" },
        { title: "Festive Feasting", image: "/festivals/slider/image-4.webp" },
        { title: "Temple Aarti", image: "/festivals/holi/holi-2.webp" },
      ],
    },
    exploreMoreSlugs: ["diwali", "navratri", "janmashtami"],
    listingCard: {
      shortDescription:
        "The exuberant festival of colors, blooming spring, and divine devotion celebrating Radha-Krishna and the triumph of Bhakta Prahlad.",
      season: "Spring (Phalguna Purnima)",
      significance: "Victory of Good over Evil & Divine Love",
      region: "Pan-India & Global",
      category: "Spring Harvest",
    },
  },

  diwali: {
    slug: "diwali",
    name: "DIWALI",
    tagline: "Festival of Lights & Prosperity",
    dateBadge: { day: "01", month: "Nov" },
    heroImage: "/festivals/diwali/diwali-1.webp",
    featuredOverviewImage: "/festivals/diwali/diwali-2.webp",
    aboutStory: {
      title: "About Diwali",
      paragraphs: [
        "Deepavali, popularly known as Diwali, is India's premier spiritual festival celebrating the triumph of light over darkness, knowledge over ignorance, and good over evil.",
        "Observed during the Hindu month of Kartika on Amavasya (new moon night), millions of earthen lamps (diyas) illuminate courtyards, rooftops, and riversides, welcoming the grace of Goddess Lakshmi and Lord Ganesha into every household.",
      ],
      image: "/festivals/diwali/diwali-2.webp",
      imageAlt: "Diwali earthen diyas and rangoli",
    },
    historyStory: {
      title: "History of Diwali",
      paragraphs: [
        "Diwali marks the historic return of Lord Shri Ram, Mata Sita, and Lakshmana to Ayodhya after 14 years of exile and the defeat of the demon king Ravana.",
        "The citizens of Ayodhya illuminated the entire capital with rows of glowing ghee lamps to welcome their rightful king, giving birth to the tradition of Deepavali (row of lights).",
      ],
      image: "/temples-images/ayodhya/history/ayodhya-history-1.webp",
      imageAlt: "Ayodhya Deepotsav celebration",
    },
    legendStory: {
      title: "Legend of Samudra Manthan & Lakshmi",
      paragraphs: [
        "According to the Puranas, during the cosmic churning of the cosmic ocean (Samudra Manthan), Goddess Lakshmi emerged holding a golden lotus on the auspicious day of Kartika Amavasya.",
        "She chose Lord Vishnu as her eternal consort, and ever since, devotees perform Lakshmi Puja at twilight to invoke wealth, spiritual prosperity, and auspicious wisdom.",
      ],
      image: "/temples-images/ayodhya/features/ayodhya-feature-1.webp",
      imageAlt: "Goddess Lakshmi and Lord Ganesha blessings",
    },
    rituals: {
      title: "Rituals of Diwali",
      items: [
        {
          title: "Deepotsav & Diya Illumination",
          description:
            "Arranging rows of clay lamps filled with mustard oil and ghee at dusk to dispel darkness.",
        },
        {
          title: "Lakshmi-Ganesha Maha Puja",
          description:
            "Evening worship invoking health, wealth, knowledge, and ethical prosperity for homes and businesses.",
        },
        {
          title: "Rangoli Creation",
          description:
            "Designing geometric patterns at doorsteps using natural powders, rice flour, and marigold petals.",
        },
        {
          title: "Gift & Sweet Exchanges",
          description:
            "Sharing kaju katli, ladoos, and blessings with friends, family, and underprivileged communities.",
        },
        {
          title: "Chopda Pujan (Account Sanctification)",
          description:
            "Merchants sanctify ledger books and digital registers with swastika symbols for a blessed financial year.",
        },
      ],
      image: "/festivals/diwali/diwali-1.webp",
      imageAlt: "Family performing Diwali Aarti",
    },
    traditionalFoods: {
      title: "Traditional Food",
      subtitle:
        "Delectable traditional sweets and savory snacks crafted across homes to celebrate abundance.",
      items: [
        { name: "Kaju Katli", image: "/festivals/diwali/diwali-1.webp" },
        { name: "Besan Ladoo", image: "/festivals/diwali/diwali-2.webp" },
        { name: "Chakli", image: "/festivals/slider/image-1.webp" },
        { name: "Karanji", image: "/festivals/slider/image-3.webp" },
        { name: "Shakarpara", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/slider/image-3.webp",
    },
    panoramicBanner: {
      image: "/festivals/slider/image-3.webp",
      alt: "Lamps glowing across holy ghats during Diwali",
    },
    regionalCelebrations: {
      title: "Diwali Across India",
      subtitle:
        "From North to South, Diwali unites the nation under radiant lights and timeless customs.",
      items: [
        {
          region: "Ayodhya & North India",
          title: "Ayodhya Deepotsav",
          description:
            "World record-setting display of over 2.5 million diyas illuminating the sacred Saryu river ghats.",
        },
        {
          region: "West Bengal & Assam",
          title: "Kali Puja",
          description:
            "Devout midnight worship of Goddess Kali with hibiscus garlands and deep meditative chanting.",
        },
        {
          region: "South India (Tamil Nadu & Karnataka)",
          title: "Naraka Chaturdashi Oil Bath",
          description:
            "Pre-dawn ritual oil baths with herbal Ubtan celebrating Krishna's victory over Narakasura.",
        },
        {
          region: "Gujarat",
          title: "Bestu Varas (New Year)",
          description:
            "The day after Diwali marks the Gujarati New Year with prayers, new business books, and joyous greetings.",
        },
      ],
      image: "/temples-images/ayodhya/location/ayodhya-location-1.webp",
      imageAlt: "Ayodhya Deepotsav panoramic view",
    },
    momentsGallery: {
      title: "Moments of Diwali",
      items: [
        { title: "Deepotsav Lights", image: "/festivals/diwali/diwali-1.webp" },
        { title: "Rangoli Artistry", image: "/festivals/diwali/diwali-2.webp" },
        { title: "Lakshmi Puja", image: "/festivals/slider/image-3.webp" },
        { title: "Festive Fireworks", image: "/festivals/slider/image-1.webp" },
        { title: "Gift Exchange", image: "/festivals/slider/image-4.webp" },
      ],
    },
    exploreMoreSlugs: ["dhanteras", "govardhan-puja", "bhai-dooj"],
    listingCard: {
      shortDescription:
        "The radiant festival of lights, honoring the return of Lord Rama to Ayodhya and the blessings of Goddess Lakshmi.",
      season: "Autumn (Kartika Amavasya)",
      significance: "Triumph of Light over Darkness",
      region: "Pan-India & Global",
      category: "Spiritual Illumination",
    },
  },

  navratri: {
    slug: "navratri",
    name: "NAVRATRI",
    tagline: "Nine Sacred Nights of Divine Feminine Power",
    dateBadge: { day: "03", month: "Oct" },
    heroImage: "/festivals/navratri/navratri-1.webp",
    featuredOverviewImage: "/festivals/navratri/navratri-2.webp",
    aboutStory: {
      title: "About Navratri",
      paragraphs: [
        "Navratri, meaning 'nine sacred nights', is dedicated to the worship of Goddess Durga and her nine majestic manifestations (Navadurga).",
        "During this period, devotees observe fasting, recite sacred Devi Mahatmya chants, and participate in vibrant Garba and Dandiya Raas dances symbolizing the victory of cosmic righteousness.",
      ],
      image: "/festivals/navratri/navratri-2.webp",
      imageAlt: "Maa Durga idol and Garba celebration",
    },
    historyStory: {
      title: "History & Scriptural Significance",
      paragraphs: [
        "Rooted in the Devi Bhagavata Purana and Markandeya Purana, Navratri honors Goddess Durga's ferocious battle against the shape-shifting demon Mahishasura.",
        "Armed with celestial weapons bestowed by Brahma, Vishnu, and Shiva, Devi vanquished the demon on the tenth day, earning the title Mahishasuramardini.",
      ],
      image: "/temples-images/vaishnodevi/history/vaishnodevi-history-1.webp",
      imageAlt: "Maa Durga defeating negative energies",
    },
    legendStory: {
      title: "Nine Forms of Navadurga",
      paragraphs: [
        "The nine nights honor Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kalaratri, Mahagauri, and Siddhidatri.",
        "Each form personifies an essential stage of spiritual evolution, courage, compassion, and divine wisdom for self-realization.",
      ],
      image: "/temples-images/vaishnodevi/features/vaishnodevi-feature-1.webp",
      imageAlt: "Sacred shrine of Divine Mother",
    },
    rituals: {
      title: "Rituals of Navratri",
      items: [
        {
          title: "Ghatasthapana (Kalash Sthapana)",
          description:
            "Invoking the Goddess into a sanctified earthen pot with holy water and nine sacred grains (Navadhanya).",
        },
        {
          title: "Akhand Jyot & Vrat",
          description:
            "Lighting an unbroken flame for nine days and observing satvik dietary fasts.",
        },
        {
          title: "Garba & Dandiya Raas",
          description:
            "Rhythmic circular folk dancing around a lamp or deity image symbolizing the cyclical nature of time.",
        },
        {
          title: "Kanya Pujan (Kumari Puja)",
          description:
            "Worshipping young girls on Ashtami and Navami as living embodiments of the Divine Mother.",
        },
        {
          title: "Durga Visarjan",
          description:
            "Immersion of beautifully sculpted clay murtis with heartfelt chants and prayers.",
        },
      ],
      image: "/festivals/navratri/navratri-1.webp",
      imageAlt: "Devotees performing Garba dance",
    },
    traditionalFoods: {
      title: "Traditional Vrat Food",
      subtitle:
        "Nutritious satvik dishes prepared with rock salt (sendha namak) and ancient grains.",
      items: [
        { name: "Sabudana Khichdi", image: "/festivals/slider/image-1.webp" },
        { name: "Kuttu Puri", image: "/festivals/slider/image-2.webp" },
        { name: "Singhare Ka Halwa", image: "/festivals/slider/image-3.webp" },
        { name: "Makhana Kheer", image: "/festivals/slider/image-4.webp" },
        { name: "Samak Rice Pulao", image: "/festivals/navratri/navratri-1.webp" },
      ],
      showcaseImage: "/festivals/navratri/navratri-2.webp",
    },
    panoramicBanner: {
      image: "/festivals/slider/image-1.webp",
      alt: "Colossal Garba gathering under festive lights",
    },
    regionalCelebrations: {
      title: "Navratri Across India",
      subtitle:
        "A glorious spectrum of devotion, classical dance, and majestic pandals across regions.",
      items: [
        {
          region: "Gujarat",
          title: "Grand Garba Nights",
          description:
            "Millions dance all night in traditional chaniya cholis and kediyus to folk music and dhol beats.",
        },
        {
          region: "West Bengal",
          title: "Durga Puja & Pandals",
          description:
            "UNESCO heritage festival featuring spectacular themed artistic pandals, Dhunuchi dance, and Sindoor Khela.",
        },
        {
          region: "Karnataka (Mysuru)",
          title: "Mysuru Dasara",
          description:
            "Royal procession with caparisoned elephants carrying Chamundeshwari idol and illuminating the Mysore Palace.",
        },
        {
          region: "Himachal Pradesh (Kullu)",
          title: "Kullu Dussehra",
          description:
            "Week-long congregation of over 200 local valley deities gathered in the Dhalpur grounds.",
        },
      ],
      image: "/festivals/navratri/navratri-1.webp",
      imageAlt: "Durga Puja pandal illumination",
    },
    momentsGallery: {
      title: "Moments of Navratri",
      items: [
        { title: "Maa Durga Darshan", image: "/festivals/navratri/navratri-2.webp" },
        { title: "Garba Raas", image: "/festivals/navratri/navratri-1.webp" },
        { title: "Kanya Pujan", image: "/festivals/slider/image-3.webp" },
        { title: "Dhunuchi Aarti", image: "/festivals/slider/image-2.webp" },
        { title: "Sindoor Khela", image: "/festivals/slider/image-4.webp" },
      ],
    },
    exploreMoreSlugs: ["dusshera", "diwali", "radha-ashtami"],
    listingCard: {
      shortDescription:
        "Nine holy nights celebrating the victory of Goddess Durga over evil forces with fasting, prayers, and spirited Garba dance.",
      season: "Autumn (Ashwin Pratipada)",
      significance: "Empowerment of Shakti & Righteousness",
      region: "Gujarat, Bengal & Pan-India",
      category: "Divine Feminine",
    },
  },

  "ganesh-chaturthi": {
    slug: "ganesh-chaturthi",
    name: "GANESH CHATURTHI",
    tagline: "Welcoming the Remover of All Obstacles",
    dateBadge: { day: "07", month: "Sep" },
    heroImage: "/festivals/ganesh-chaturthi/ganesh-chaturthi-1.webp",
    featuredOverviewImage: "/festivals/ganesh-chaturthi/ganesh-chaturthi-2.webp",
    aboutStory: {
      title: "About Ganesh Chaturthi",
      paragraphs: [
        "Ganesh Chaturthi celebrates the auspicious arrival of Lord Ganesha, the son of Shiva and Parvati, who is revered as the Vighnaharta (remover of obstacles) and Buddhidata (bestower of wisdom).",
        "During this 10-day extravaganza, clay idols of Bappa are installed in homes and grand sarvajanik pandals amidst joyful beats of Nashik dhol and chants of 'Ganpati Bappa Morya!'.",
      ],
      image: "/festivals/ganesh-chaturthi/ganesh-chaturthi-2.webp",
      imageAlt: "Lord Ganesha idol decorated with flowers",
    },
    historyStory: {
      title: "Historical Revival",
      paragraphs: [
        "While celebrated since the Maratha Empire under Chhatrapati Shivaji Maharaj, the public festival was transformed into a national freedom movement by freedom fighter Lokmanya Bal Gangadhar Tilak in 1893.",
        "Tilak turned private worship into a grand community celebration to bridge social divides and foster collective pride and patriotic unity against colonial rule.",
      ],
      image: "/temples-images/siddhivinayak/history/siddhivinayak-history-1.webp",
      imageAlt: "Historic depiction of Ganesh Utsav",
    },
    rituals: {
      title: "Rituals & Pujas",
      items: [
        {
          title: "Prana Pratishtha",
          description:
            "Priests chant sacred Rigvedic mantras to infuse the divine presence into the clay idol.",
        },
        {
          title: "Shhodashopachara Puja",
          description:
            "Offering 16 divine services including 21 blades of Durva grass, red hibiscus flowers, and Modaks.",
        },
        {
          title: "Daily Maha Aarti & Kirtan",
          description:
            "Singing iconic aartis composed by saints Ramdas like 'Sukh Karta Dukh Harta'.",
        },
        {
          title: "Ganesh Visarjan",
          description:
            "Procession with dancing and singing to immerse the idol in water bodies, symbolizing the cycle of form and formlessness.",
        },
      ],
      image: "/festivals/ganesh-chaturthi/ganesh-chaturthi-1.webp",
      imageAlt: "Devotees welcoming Ganpati idol",
    },
    traditionalFoods: {
      title: "Traditional Food",
      subtitle:
        "Lord Ganesha's favorite sweet treats crafted with fresh grated coconut, jaggery, and cardamom.",
      items: [
        { name: "Ukadiche Modak", image: "/festivals/ganesh-chaturthi/ganesh-chaturthi-1.webp" },
        { name: "Fried Modak", image: "/festivals/slider/image-1.webp" },
        { name: "Puran Poli", image: "/festivals/slider/image-2.webp" },
        { name: "Sheera", image: "/festivals/slider/image-3.webp" },
        { name: "Karanji", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/slider/image-1.webp",
    },
    exploreMoreSlugs: ["janmashtami", "diwali", "holi"],
    listingCard: {
      shortDescription:
        "A 10-day grand festival honoring Lord Ganesha with home installations, pandals, modaks, and ecstatic visarjan processions.",
      season: "Monsoon (Bhadrapada Shukla Chaturthi)",
      significance: "Auspicious Beginnings & Wisdom",
      region: "Maharashtra & Pan-India",
      category: "Vighnaharta Utsav",
    },
  },

  janmashtami: {
    slug: "janmashtami",
    name: "JANMASHTAMI",
    tagline: "Celebrating the Divine Birth of Lord Krishna",
    dateBadge: { day: "26", month: "Aug" },
    heroImage: "/festivals/janmashtami/janmashtami-1.webp",
    featuredOverviewImage: "/festivals/janmashtami/janmashtami-2.webp",
    aboutStory: {
      title: "About Janmashtami",
      paragraphs: [
        "Krishna Janmashtami, also known as Gokulashtami, marks the miraculous birth of Lord Shri Krishna, the eighth avatar of Lord Vishnu, in Mathura at midnight during the monsoon month of Bhadrapada.",
        "Temples across the world resonate with continuous kirtan, recitations of the Bhagavad Gita, and dynamic Dahi Handi youth human pyramid competitions.",
      ],
      image: "/festivals/janmashtami/janmashtami-2.webp",
      imageAlt: "Shri Krishna decorated idol during Janmashtami",
    },
    historyStory: {
      title: "The Midnight Avatar",
      paragraphs: [
        "Born inside a secluded prison cell to Devaki and Vasudeva to destroy the tyrannical King Kamsa, the newborn Lord was miraculously carried across the flooded Yamuna river to Gokul by his father.",
        "Krishna's childhood pastimes (Lilas) with butter, cows, and the gopis represent the sweetest dimensions of unconditional devotion (Bhakti).",
      ],
      image: "/temples-images/banke-bihari/features/banke-bihari-feature-1.webp",
      imageAlt: "Lord Krishna childhood Lilas",
    },
    rituals: {
      title: "Sacred Rituals",
      items: [
        {
          title: "Nirjala Vrat & Fasting",
          description:
            "Devotees fast throughout the day until the auspicious midnight moment of Krishna's birth.",
        },
        {
          title: "Midnight Abhishekam & Aarti",
          description:
            "Bathing the infant Laddu Gopal deity in milk, honey, yogurt, and rose water amidst conch blows.",
        },
        {
          title: "Jhula Seva (Cradle Rocking)",
          description:
            "Devotees gently swing the infant Krishna in beautifully decorated floral cradles.",
        },
        {
          title: "Dahi Handi",
          description:
            "Forming multi-tier human pyramids to break earthen pots filled with curd and butter high in the air.",
        },
      ],
      image: "/festivals/janmashtami/janmashtami-1.webp",
      imageAlt: "Dahi Handi human pyramid",
    },
    traditionalFoods: {
      title: "Lord Krishna's 56 Bhog & Delicacies",
      subtitle:
        "Sacred offerings prepared with freshly churned white butter (Makhan), milk, and dry fruits.",
      items: [
        { name: "Makhan Mishri", image: "/festivals/janmashtami/janmashtami-1.webp" },
        { name: "Panjiri Prasad", image: "/festivals/slider/image-1.webp" },
        { name: "Panchamrit", image: "/festivals/slider/image-2.webp" },
        { name: "Gopalkala", image: "/festivals/slider/image-3.webp" },
        { name: "Rabri & Peda", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/janmashtami/janmashtami-2.webp",
    },
    exploreMoreSlugs: ["radha-ashtami", "holi", "govardhan-puja"],
    listingCard: {
      shortDescription:
        "The joyous midnight celebration of Lord Krishna’s birth with fasting, ecstatic kirtans, floral cradles, and thrilling Dahi Handi.",
      season: "Monsoon (Bhadrapada Krishna Ashtami)",
      significance: "Divine Love, Dharma & Protection",
      region: "Mathura, Vrindavan & Global",
      category: "Krishna Bhakti",
    },
  },

  dusshera: {
    slug: "dusshera",
    name: "DUSSEHRA (VIJAYADASHAMI)",
    tagline: "The Eternal Victory of Truth & Righteousness",
    dateBadge: { day: "12", month: "Oct" },
    heroImage: "/festivals/dusshera/dussehra-1.webp",
    featuredOverviewImage: "/festivals/dusshera/dussehra-2.webp",
    aboutStory: {
      title: "About Dussehra",
      paragraphs: [
        "Dussehra, also known as Vijayadashami, marks the culmination of the 10-day Navratri festival, celebrating the supreme victory of righteousness (Dharma) over injustice (Adharma).",
        "It commemorates Lord Rama's victory over the ten-headed demon king Ravana in Lanka and Goddess Durga's triumph over Mahishasura.",
      ],
      image: "/festivals/dusshera/dussehra-2.webp",
      imageAlt: "Ramlila effigies of Ravana burning",
    },
    historyStory: {
      title: "Epic Triumph of Lord Rama",
      paragraphs: [
        "After worshiping Goddess Durga to seek her celestial grace, Lord Rama waged an epic battle on Lanka, piercing Ravana's navel with the divine Brahmastra on the tenth day of Ashwin.",
        "Across North India, massive colorful effigies of Ravana, Kumbhakarna, and Meghanada packed with fireworks are set ablaze at sunset.",
      ],
      image: "/temples-images/ayodhya/history/ayodhya-history-1.webp",
      imageAlt: "Lord Rama epic victory",
    },
    rituals: {
      title: "Key Observances",
      items: [
        {
          title: "Ravana Dahan",
          description:
            "Burning of towering effigies symbolizing the destruction of pride, lust, anger, and arrogance.",
        },
        {
          title: "Shastra Puja (Weapon & Tools Sanctification)",
          description:
            "Worshiping instruments of duty, artisan tools, books, and defense weapons for success and honor.",
        },
        {
          title: "Vidyarambham",
          description:
            "Initiating young children into reading, writing, and music in Kerala and South India.",
        },
        {
          title: "Exchanging Apta Leaves (Gold)",
          description:
            "Sharing sacred Sonpatta (Apta) leaves as tokens of gold, health, and goodwill in Maharashtra.",
        },
      ],
      image: "/festivals/dusshera/dussehra-1.webp",
      imageAlt: "Ravana effigy burning during Dussehra",
    },
    traditionalFoods: {
      title: "Festive Treats",
      subtitle:
        "Crispy Jalebis and hot Fafda savored on Dussehra morning for prosperity.",
      items: [
        { name: "Jalebi Fafda", image: "/festivals/slider/image-1.webp" },
        { name: "Rasgulla", image: "/festivals/slider/image-2.webp" },
        { name: "Puran Poli", image: "/festivals/slider/image-3.webp" },
        { name: "Kheer", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/dusshera/dussehra-2.webp",
    },
    exploreMoreSlugs: ["navratri", "diwali", "ayodhya-ram-temple"],
    listingCard: {
      shortDescription:
        "Vijayadashami honors Lord Rama vanquishing Ravana and Goddess Durga conquering Mahishasura with effigy burnings and weapon worship.",
      season: "Autumn (Ashwin Shukla Dashami)",
      significance: "Destruction of Evil & Rise of Dharma",
      region: "Pan-India",
      category: "Victory Celebration",
    },
  },

  "raksha-bandhan": {
    slug: "raksha-bandhan",
    name: "RAKSHA BANDHAN",
    tagline: "Sacred Bond of Sibling Protection & Love",
    dateBadge: { day: "19", month: "Aug" },
    heroImage: "/festivals/raksha-bandhan/raksha-bandhan-1.webp",
    featuredOverviewImage: "/festivals/raksha-bandhan/raksha-bandhan-2.webp",
    aboutStory: {
      title: "About Raksha Bandhan",
      paragraphs: [
        "Raksha Bandhan, meaning 'the knot of protection', is a heartwarming Vedic festival that honors the pure, lifelong bond of love and trust between siblings.",
        "Sisters tie a sacred decorative thread (Rakhi) around their brothers' right wrists, applying an auspicious tilak, while brothers pledge lifelong support and exchange heartfelt gifts.",
      ],
      image: "/festivals/raksha-bandhan/raksha-bandhan-2.webp",
      imageAlt: "Sister tying rakhi to brother",
    },
    historyStory: {
      title: "Historical & Puranic Legends",
      paragraphs: [
        "When Lord Krishna's finger was injured during the slaying of Shishupala, Queen Draupadi immediately tore a strip from her silk sari and bound his wound. Krishna promised to protect her dignity in every circumstance, fulfilling it during the dice game in the Mahabharata.",
        "In Rajput history, Queen Karnavati sent a Rakhi to Mughal Emperor Humayun seeking his alliance to protect Chittorgarh against Sultan Bahadur Shah.",
      ],
      image: "/festivals/raksha-bandhan/raksha-bandhan-1.webp",
      imageAlt: "Traditional Rakhi threads and sweets",
    },
    rituals: {
      title: "Sacred Customs",
      items: [
        {
          title: "Aarti & Tilak",
          description:
            "Applying vermilion and rice grains on the brother's forehead to invoke long life and prosperity.",
        },
        {
          title: "Tying the Rakhi",
          description:
            "Chanting the sacred protection shloka 'Yena Baddho Bali Raja...' while tying the thread.",
        },
        {
          title: "Sweet Feeding",
          description:
            "Feeding Ghevar, pedas, and laddoos to sweeten the relationship.",
        },
        {
          title: "Exchanging Pledges & Gifts",
          description:
            "Brothers present gifts or financial blessings along with a solemn vow of lifelong support.",
        },
      ],
      image: "/festivals/raksha-bandhan/raksha-bandhan-1.webp",
      imageAlt: "Rakhi ceremony celebration",
    },
    traditionalFoods: {
      title: "Rakhi Delicacies",
      subtitle: "Aromatic Ghevar, Kaju Katli, and rich sweets.",
      items: [
        { name: "Ghevar", image: "/festivals/slider/image-1.webp" },
        { name: "Kaju Katli", image: "/festivals/slider/image-2.webp" },
        { name: "Peda", image: "/festivals/slider/image-3.webp" },
        { name: "Rasmalai", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/raksha-bandhan/raksha-bandhan-2.webp",
    },
    exploreMoreSlugs: ["bhai-dooj", "janmashtami", "diwali"],
    listingCard: {
      shortDescription:
        "The beloved celebration of sibling love where sisters tie protective rakhis and brothers pledge unconditional protection.",
      season: "Monsoon (Shravana Purnima)",
      significance: "Sibling Bond & Protection",
      region: "Pan-India & Global",
      category: "Family & Bond",
    },
  },

  "radha-ashtami": {
    slug: "radha-ashtami",
    name: "RADHA ASHTAMI",
    tagline: "Appearance of the Queen of Divine Devotion",
    dateBadge: { day: "11", month: "Sep" },
    heroImage: "/festivals/radha-ashtami/radha-ashtmi-1.webp",
    featuredOverviewImage: "/festivals/radha-ashtami/radha-ashtmi-2.webp",
    aboutStory: {
      title: "About Radha Ashtami",
      paragraphs: [
        "Radha Ashtami celebrates the auspicious appearance day of Shri Radharani, the supreme hladini shakti (divine pleasure potency) of Lord Krishna, fifteen days after Janmashtami.",
        "In the holy towns of Barsana, Vrindavan, and Rawal, lakhs of devotees gather for ecstatic Harinam Sankirtan and grand floral abhishekams.",
      ],
      image: "/festivals/radha-ashtami/radha-ashtmi-2.webp",
      imageAlt: "Radha Krishna divine altar",
    },
    historyStory: {
      title: "Appearance in Barsana",
      paragraphs: [
        "Scriptures describe that King Vrishabhanu discovered baby Radharani on a golden lotus floating in a pond in Rawal. She opened her eyes for the first time only when baby Krishna crawled before her.",
        "Vaisnava saints teach that one cannot attain Lord Krishna's lotus feet without first obtaining the mercy of Radharani.",
      ],
      image: "/temples-images/banke-bihari/history/banke-bihari-history-1.webp",
      imageAlt: "Barsana temple shrine",
    },
    rituals: {
      title: "Devotional Observances",
      items: [
        {
          title: "Radha Sahasranama Chanting",
          description:
            "Reciting the thousand holy names of Shri Radharani for divine spiritual awakening.",
        },
        {
          title: "Maha Abhishek at Noon",
          description:
            "Grand bathing ceremony of Radharani with juices of 108 auspicious herbs, milk, and saffron.",
        },
        {
          title: "Chhappan Bhog Offering",
          description:
            "Offering 56 gourmet dishes followed by distribution of sanctified Mahaprasad.",
        },
      ],
      image: "/festivals/radha-ashtami/radha-ashtmi-1.webp",
      imageAlt: "Devotees singing kirtan in Barsana",
    },
    traditionalFoods: {
      title: "Braj Prasad Delicacies",
      subtitle: "Authentic Vrindavan pedas, Rabri, and Mawa gujiyas.",
      items: [
        { name: "Mathura Peda", image: "/festivals/slider/image-1.webp" },
        { name: "Malpua", image: "/festivals/slider/image-2.webp" },
        { name: "Rabri", image: "/festivals/slider/image-3.webp" },
        { name: "Kheer", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/radha-ashtami/radha-ashtmi-2.webp",
    },
    exploreMoreSlugs: ["janmashtami", "holi", "govardhan-puja"],
    listingCard: {
      shortDescription:
        "Appearance day of Shri Radharani, the soul of Vrindavan and supreme embodiment of selfless spiritual devotion.",
      season: "Monsoon (Bhadrapada Shukla Ashtami)",
      significance: "Pure Devotional Love (Prema Bhakti)",
      region: "Braj, Barsana & Worldwide",
      category: "Bhakti Utsav",
    },
  },

  dhanteras: {
    slug: "dhanteras",
    name: "DHANTERAS",
    tagline: "Auspicious Invocations for Health & Prosperity",
    dateBadge: { day: "29", month: "Oct" },
    heroImage: "/festivals/dhanteras/dhanteras-1.webp",
    featuredOverviewImage: "/festivals/dhanteras/dhanteras-2.webp",
    aboutStory: {
      title: "About Dhanteras",
      paragraphs: [
        "Dhanteras (Dhanatrayodashi) marks the commencement of the five-day Diwali festivities. It is dedicated to Lord Dhanvantari, the physician of the gods who manifested with the nectar of immortality (Amrit).",
        "Devotees purchase gold, silver, brass utensils, and Lakshmi-Ganesha coins to invite wealth, physical vitality, and eternal auspiciousness.",
      ],
      image: "/festivals/dhanteras/dhanteras-2.webp",
      imageAlt: "Gold coins and brass diyas on Dhanteras",
    },
    historyStory: {
      title: "Manifestation of Lord Dhanvantari",
      paragraphs: [
        "During Samudra Manthan, Lord Dhanvantari emerged from the churning ocean holding the pot of Amrit and the sacred scriptures of Ayurveda on this thirteenth lunar day of Kartika.",
        "At dusk, families also light Yama Deepam outside their doorways to pray to Yamaraj, the god of death, for protection from untimely accidents.",
      ],
      image: "/festivals/dhanteras/dhanteras-1.webp",
      imageAlt: "Lighting Yama Deepam lamp",
    },
    rituals: {
      title: "Sacred Rituals",
      items: [
        {
          title: "Purchasing Precious Metals",
          description:
            "Buying gold, silver jewellery, brass vessels, or broom (Jhadu) symbolising the sweeping away of poverty.",
        },
        {
          title: "Dhanvantari & Kuber Puja",
          description:
            "Worshiping the Lord of Health and Lord Kuber, the divine treasurer of heaven.",
        },
        {
          title: "Yama Deepam",
          description:
            "Placing a four-wicked wheat dough lamp facing south outside the house at dusk.",
        },
      ],
      image: "/festivals/dhanteras/dhanteras-1.webp",
      imageAlt: "Dhanteras puja thali",
    },
    traditionalFoods: {
      title: "Festive Prasad",
      subtitle: "Lapsi, Boondi Ladoo, and dry fruit delicacies.",
      items: [
        { name: "Lapsi", image: "/festivals/slider/image-1.webp" },
        { name: "Boondi Ladoo", image: "/festivals/slider/image-2.webp" },
        { name: "Panchamrit", image: "/festivals/slider/image-3.webp" },
        { name: "Dry Fruit Halwa", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/dhanteras/dhanteras-2.webp",
    },
    exploreMoreSlugs: ["diwali", "naraka-chaturdashi", "bhai-dooj"],
    listingCard: {
      shortDescription:
        "The opening day of Diwali celebrating Lord Dhanvantari and Kuber with the purchase of precious metals and good fortune.",
      season: "Autumn (Kartika Krishna Trayodashi)",
      significance: "Health, Vitality & Material Wealth",
      region: "Pan-India",
      category: "Diwali Festivities",
    },
  },

  "naraka-chaturdashi": {
    slug: "naraka-chaturdashi",
    name: "NARAKA CHATURDASHI (CHOTI DIWALI)",
    tagline: "Dispelling Negativity & Awakening Inner Radiance",
    dateBadge: { day: "31", month: "Oct" },
    heroImage: "/festivals/naraka-chaturdashi/naraka-chaturdashi-1.webp",
    featuredOverviewImage:
      "/festivals/naraka-chaturdashi/naraka-chaturdashi-2.webp",
    aboutStory: {
      title: "About Naraka Chaturdashi",
      paragraphs: [
        "Naraka Chaturdashi, celebrated on the fourteenth day of the dark fortnight in Kartika, commemorates Lord Krishna and Satyabhama vanquishing the tyrant demon Narakasura.",
        "In Maharashtra, Karnataka, and Tamil Nadu, it is celebrated with pre-dawn Abhyanga Snan (herbal oil bath) to purify the physical and spiritual body before dawn.",
      ],
      image: "/festivals/naraka-chaturdashi/naraka-chaturdashi-2.webp",
      imageAlt: "Lighting lamps on Choti Diwali",
    },
    historyStory: {
      title: "Liberation of 16,100 Captives",
      paragraphs: [
        "Narakasura had terrorized the three worlds and imprisoned 16,100 noble princesses. Satyabhama and Lord Krishna destroyed his armies, freeing all captive souls.",
        "Before dying, Narakasura requested that his death be celebrated not with mourning, but with joyful lights and celebrations.",
      ],
      image: "/festivals/naraka-chaturdashi/naraka-chaturdashi-1.webp",
      imageAlt: "Abhyanga Snan oil bath celebration",
    },
    rituals: {
      title: "Key Observances",
      items: [
        {
          title: "Abhyanga Snan (Oil Bath)",
          description:
            "Massaging fragrant sesame oil and herbal Ubtan before sunrise followed by a holy bath.",
        },
        {
          title: "14 Diyas Illumination",
          description:
            "Lighting fourteen earthen lamps around the house to welcome the morning of Choti Diwali.",
        },
        {
          title: "Breaking Karit Fruit",
          description:
            "Crushing the bitter Karit fruit under the foot in Maharashtra to symbolize the eradication of evil.",
        },
      ],
      image: "/festivals/naraka-chaturdashi/naraka-chaturdashi-1.webp",
      imageAlt: "Choti Diwali morning puja",
    },
    traditionalFoods: {
      title: "Morning Faral Sweets",
      subtitle: "Crisp Poha, Shankarpali, and Chakli served fresh.",
      items: [
        { name: "Diwali Faral", image: "/festivals/slider/image-1.webp" },
        { name: "Chakli", image: "/festivals/slider/image-2.webp" },
        { name: "Shankarpali", image: "/festivals/slider/image-3.webp" },
        { name: "Anarsa", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/naraka-chaturdashi/naraka-chaturdashi-2.webp",
    },
    exploreMoreSlugs: ["diwali", "dhanteras", "govardhan-puja"],
    listingCard: {
      shortDescription:
        "Choti Diwali marks Lord Krishna vanquishing Narakasura with sacred early-morning herbal oil baths and luminous diyas.",
      season: "Autumn (Kartika Krishna Chaturdashi)",
      significance: "Eradication of Ego & Negativity",
      region: "Pan-India",
      category: "Diwali Festivities",
    },
  },

  "govardhan-puja": {
    slug: "govardhan-puja",
    name: "GOVARDHAN PUJA (ANNAKUT)",
    tagline: "Worship of Nature, Cattle & Giriraj Hill",
    dateBadge: { day: "02", month: "Nov" },
    heroImage: "/festivals/govardhan-puja/govardhan-puja-1.webp",
    featuredOverviewImage: "/festivals/govardhan-puja/govardhan-puja-2.webp",
    aboutStory: {
      title: "About Govardhan Puja",
      paragraphs: [
        "Govardhan Puja, occurring the day after Diwali, commemorates Lord Krishna lifting the Govardhan Hill on his little finger for seven days to shelter the people and animals of Braj from torrential rains sent by Indra.",
        "It celebrates environmental stewardship, reverence for mother nature, and gratitude to cows and cattle (Gaumata).",
      ],
      image: "/festivals/govardhan-puja/govardhan-puja-2.webp",
      imageAlt: "Annakut 56 bhog offering",
    },
    historyStory: {
      title: "The Lifting of Giriraj",
      paragraphs: [
        "Lord Krishna taught the residents of Vrindavan to worship the natural hills, lush pastures, and rivers that provide water, grass, and livelihood rather than appeasing celestial demigods.",
        "Recognizing his folly, Indra surrendered at Krishna's lotus feet, naming him Govinda—the protector of cows.",
      ],
      image: "/festivals/govardhan-puja/govardhan-puja-1.webp",
      imageAlt: "Devotees creating cowdung Govardhan mound",
    },
    rituals: {
      title: "Sacred Traditions",
      items: [
        {
          title: "Govardhan Shila Creation",
          description:
            "Crafting a miniature Govardhan hill with cow dung decorated with marigolds and cane sugar.",
        },
        {
          title: "Parikrama (Circumambulation)",
          description:
            "Performing parikrama around the Govardhan mound while chanting 'Giriraj Maharaj Ki Jai'.",
        },
        {
          title: "Annakut Offering",
          description:
            "Preparing a mountain of over 56 to 108 vegetarian dishes offered to the Lord.",
        },
        {
          title: "Gau Puja",
          description:
            "Bathing, garlanding, and feeding cows with jaggery and fresh grass.",
        },
      ],
      image: "/festivals/govardhan-puja/govardhan-puja-1.webp",
      imageAlt: "Cow worship on Govardhan Puja",
    },
    traditionalFoods: {
      title: "Annakut Feast",
      subtitle: "Vegetable Kadhi, Makki Ki Roti, and Mixed Greens.",
      items: [
        { name: "Annakut Sabzi", image: "/festivals/slider/image-1.webp" },
        { name: "Kadhi Pakora", image: "/festivals/slider/image-2.webp" },
        { name: "Peda Prasad", image: "/festivals/slider/image-3.webp" },
        { name: "Chappan Bhog", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/govardhan-puja/govardhan-puja-2.webp",
    },
    exploreMoreSlugs: ["diwali", "bhai-dooj", "janmashtami"],
    listingCard: {
      shortDescription:
        "The Annakut festival honoring Lord Krishna lifting Mount Govardhan, accompanied by grand cow worship and mountain of food offerings.",
      season: "Autumn (Kartika Shukla Pratipada)",
      significance: "Harmony with Nature & Humility",
      region: "Braj & Pan-India",
      category: "Nature & Bhakti",
    },
  },

  "bhai-dooj": {
    slug: "bhai-dooj",
    name: "BHAI DOOJ (YAMA DWITIYA)",
    tagline: "Sacred Sibling Blessing & Lifelong Well-Being",
    dateBadge: { day: "03", month: "Nov" },
    heroImage: "/festivals/bhai-dooj/bhai-dooj-1.webp",
    featuredOverviewImage: "/festivals/bhai-dooj/bhai-dooj-2.webp",
    aboutStory: {
      title: "About Bhai Dooj",
      paragraphs: [
        "Bhai Dooj (also known as Yama Dwitiya or Bhai Tika) concludes the five-day Diwali festival, celebrating the eternal affection between sisters and brothers.",
        "Sisters invite their brothers to their homes, applying a sacred sandalwood and vermilion tilak on their foreheads, praying for their prosperity, health, and longevity.",
      ],
      image: "/festivals/bhai-dooj/bhai-dooj-2.webp",
      imageAlt: "Sister applying tilak on Bhai Dooj",
    },
    historyStory: {
      title: "Legend of Yamuna & Yamaraj",
      paragraphs: [
        "According to legend, Yamuna (the goddess of holy river) repeatedly invited her brother Yamaraj (the God of Death) to her home. When Yamaraj finally visited on Dwitiya, Yamuna welcomed him with great reverence, a grand feast, and a protective tilak.",
        "Delighted, Yamaraj granted that any brother who receives a tilak and meal from his sister on this day shall be protected from fears of premature demise.",
      ],
      image: "/festivals/bhai-dooj/bhai-dooj-1.webp",
      imageAlt: "Bhai Dooj feast preparations",
    },
    rituals: {
      title: "Key Rituals",
      items: [
        {
          title: "Bhai Tika Ceremony",
          description:
            "Applying a seven-colored or vermilion-sandalwood tilak accompanied by holy rice grains.",
        },
        {
          title: "Aarti & Batasha Offering",
          description:
            "Performing aarti for the brother with a brass lamp and offering dried coconut (Gola).",
        },
        {
          title: "Feasting & Blessings",
          description:
            "Preparing the brother's favorite culinary dishes and exchanging blessings and gifts.",
        },
      ],
      image: "/festivals/bhai-dooj/bhai-dooj-1.webp",
      imageAlt: "Sister and brother celebrating Bhai Dooj",
    },
    traditionalFoods: {
      title: "Festive Dining",
      subtitle: "Basundi, Puri, Kheer, and traditional home-cooked feasts.",
      items: [
        { name: "Basundi Puri", image: "/festivals/slider/image-1.webp" },
        { name: "Kheer", image: "/festivals/slider/image-2.webp" },
        { name: "Ladoo", image: "/festivals/slider/image-3.webp" },
        { name: "Kaju Katli", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/bhai-dooj/bhai-dooj-2.webp",
    },
    exploreMoreSlugs: ["raksha-bandhan", "diwali", "govardhan-puja"],
    listingCard: {
      shortDescription:
        "The conclusion of Diwali where sisters apply auspicious tilak to brothers for longevity and protection from Yama.",
      season: "Autumn (Kartika Shukla Dwitiya)",
      significance: "Sibling Longevity & Divine Grace",
      region: "Pan-India & Nepal",
      category: "Family Bond",
    },
  },

  "chhath-puja": {
    slug: "chhath-puja",
    name: "CHHATH PUJA",
    tagline: "Sacred Sun Vow of Purity & Environmental Gratitude",
    dateBadge: { day: "07", month: "Nov" },
    heroImage: "/festivals/chhath-puja/chhath-puja-1.webp",
    featuredOverviewImage: "/festivals/chhath-puja/chhath-puja-2.webp",
    aboutStory: {
      title: "About Chhath Puja",
      paragraphs: [
        "Chhath Puja is an ancient, rigorous four-day Vedic festival dedicated to Surya Dev (the Sun God) and Chhathi Maiya (Goddess Usha).",
        "Renowned for its unparalleled purity, zero wastage, and harmony with nature, devotees stand knee-deep in rivers and water bodies offering prayers (Arghya) to both the setting and rising sun.",
      ],
      image: "/festivals/chhath-puja/chhath-puja-2.webp",
      imageAlt: "Devotees offering Arghya in river waters",
    },
    historyStory: {
      title: "Ancient Roots in Ramayana & Mahabharata",
      paragraphs: [
        "Epics record that Sita and Lord Rama observed Surya fasts upon returning to Ayodhya. Karna, the son of Surya in the Mahabharata, regularly stood in water offering arghya to gain invincibility.",
        "Draupadi and the Pandavas also performed Chhath rituals to regain their lost kingdom and prosperity.",
      ],
      image: "/festivals/chhath-puja/chhath-puja-1.webp",
      imageAlt: "Preparing bamboo soop baskets with fruits",
    },
    rituals: {
      title: "Four Days of Chhath",
      items: [
        {
          title: "Day 1: Nahay Khay",
          description:
            "Purification bath in sacred river followed by a meal of bottle gourd (kaddu-bhat) cooked on mango wood.",
        },
        {
          title: "Day 2: Kharna",
          description:
            "Full day nirjala fast concluded after sunset by offering Rasiya (jaggery kheer) and rotis to the Sun.",
        },
        {
          title: "Day 3: Sandhya Arghya",
          description:
            "Offering evening oblations with bamboo soops laden with Thekua, sugarcane, and seasonal fruits to the setting sun.",
        },
        {
          title: "Day 4: Usha Arghya & Paran",
          description:
            "Offering morning oblations to the rising sun, followed by breaking the 36-hour fast with ginger and prasad.",
        },
      ],
      image: "/festivals/chhath-puja/chhath-puja-1.webp",
      imageAlt: "Chhath ghat illumination",
    },
    traditionalFoods: {
      title: "Chhath Mahaprasad",
      subtitle:
        "Sacred Thekua, Kasar, and banana prasad cooked with pure desi ghee on earthen chulhas.",
      items: [
        { name: "Thekua", image: "/festivals/slider/image-1.webp" },
        { name: "Rasiya Kheer", image: "/festivals/slider/image-2.webp" },
        { name: "Kasar Ladoo", image: "/festivals/slider/image-3.webp" },
        { name: "Sugarcane Prasad", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/chhath-puja/chhath-puja-2.webp",
    },
    exploreMoreSlugs: ["diwali", "dhanteras", "holi"],
    listingCard: {
      shortDescription:
        "A rigorous 4-day solar festival with water fasting, river ghat rituals, and offerings to the setting and rising Sun God.",
      season: "Autumn (Kartika Shukla Shashthi)",
      significance: "Sun Worship, Health & Ecological Purity",
      region: "Bihar, UP, Jharkhand & Global",
      category: "Vedic Sun Vow",
    },
  },

  "rath-yatra": {
    slug: "rath-yatra",
    name: "RATH YATRA",
    tagline: "The Grand Chariot Festival of Lord Jagannath",
    dateBadge: { day: "07", month: "Jul" },
    heroImage: "/temples-images/jagannath/jagannath_hero.webp",
    featuredOverviewImage:
      "/temples-images/jagannath/description/jagannath-desc-1.webp",
    aboutStory: {
      title: "About Rath Yatra",
      paragraphs: [
        "Rath Yatra is the world-renowned Chariot Festival of Puri, Odisha, where Lord Jagannath, along with his brother Balabhadra and sister Subhadra, emerges from the sanctum to meet millions of devotees on the Grand Road (Bada Danda).",
        "The three deities travel on towering, intricately carved wooden chariots (Nandighosa, Taladhwaja, and Darpadalana) to their aunt's abode at the Gundicha Temple.",
      ],
      image: "/temples-images/jagannath/description/jagannath-desc-1.webp",
      imageAlt: "Devotees pulling sacred wooden chariots",
    },
    historyStory: {
      title: "Ancient Chariot Tradition",
      paragraphs: [
        "Mentioned in the Brahma Purana and Skanda Purana, this is the only occasion where the deities step out of the sanctum to offer darshan to all beings, breaking all social barriers.",
        "The reigning Gajapati King performs the humble Chhera Pahanra ritual, sweeping the chariot floors with a golden broom to signify that all humans are equal before God.",
      ],
      image: "/temples-images/jagannath/history/jagannath-history-1.webp",
      imageAlt: "King sweeping the chariot floor",
    },
    rituals: {
      title: "Chariot Rituals",
      items: [
        {
          title: "Snana Yatra",
          description:
            "The bathing festival of the deities with 108 pots of herbal water.",
        },
        {
          title: "Chhera Pahanra",
          description:
            "The Gajapati King sweeps the chariot platforms with a golden broom.",
        },
        {
          title: "Rath Tana (Pulling the Chariots)",
          description:
            "Millions of devotees pull the giant ropes, believing a single touch cleanses all karma.",
        },
        {
          title: "Bahuda Yatra",
          description:
            "The return journey of the deities back to the main Jagannath temple after nine days.",
        },
      ],
      image: "/temples-images/jagannath/features/jagannath-feature-1.webp",
      imageAlt: "Puri Rath Yatra gathering",
    },
    traditionalFoods: {
      title: "Mahaprasad & Khaja",
      subtitle:
        "Crisp layered Khaja and Chhappan Bhog from the world's largest temple kitchen.",
      items: [
        { name: "Puri Khaja", image: "/festivals/slider/image-1.webp" },
        { name: "Dalma", image: "/festivals/slider/image-2.webp" },
        { name: "Kanika Pulao", image: "/festivals/slider/image-3.webp" },
        { name: "Chhena Poda", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/temples-images/jagannath/location/jagannath-location-1.webp",
    },
    exploreMoreSlugs: ["janmashtami", "holi", "diwali"],
    listingCard: {
      shortDescription:
        "The monumental annual chariot procession in Puri where Lord Jagannath travels on giant wooden chariots to bless all mankind.",
      season: "Monsoon (Ashadha Shukla Dwitiya)",
      significance: "Universal Equality & Devotion",
      region: "Puri, Odisha & Worldwide",
      category: "Chariot Festival",
    },
  },

  pongal: {
    slug: "pongal",
    name: "PONGAL",
    tagline: "Tamil Harvest Thanksgiving to Sun & Cattle",
    dateBadge: { day: "15", month: "Jan" },
    heroImage: "/festivals/slider/image-4.webp",
    featuredOverviewImage:
      "/temples-images/brihadeeswara/features/brihadeeswara-feature-1.webp",
    aboutStory: {
      title: "About Pongal",
      paragraphs: [
        "Pongal is a four-day harvest festival celebrated with immense fervor in Tamil Nadu and South India to express heartfelt gratitude to Surya Dev (Sun God), nature, and farm cattle.",
        "The festival takes its name from the boiling over of freshly harvested rice and jaggery in decorated earthen pots, accompanied by the joyful chant 'Pongalo Pongal!'.",
      ],
      image: "/temples-images/brihadeeswara/features/brihadeeswara-feature-1.webp",
      imageAlt: "Boiling sweet Pongal in clay pots",
    },
    historyStory: {
      title: "Sangam Era Heritage",
      paragraphs: [
        "Historical Tamil Sangam literature mentions Pongal as 'Dravida Utsavam' dating back over two millennia to the Chola and Pandya empires.",
        "It heralds the Tamil month of Thai, believed to bring fresh opportunities, abundance, and prosperity to farming families.",
      ],
      image: "/temples-images/brihadeeswara/history/brihadeeswara-history-1.webp",
      imageAlt: "Historical temple celebration",
    },
    rituals: {
      title: "Four Days of Pongal",
      items: [
        {
          title: "Day 1: Bhogi Pongal",
          description:
            "Discarding old household items in bonfires to welcome fresh beginnings and cleanliness.",
        },
        {
          title: "Day 2: Surya Pongal",
          description:
            "Cooking the sweet Pongal dish outdoors facing the Sun in newly painted earthen pots tied with turmeric leaves.",
        },
        {
          title: "Day 3: Mattu Pongal",
          description:
            "Bathing, garlanding, and worshiping cattle with painted horns in honor of their agricultural labor.",
        },
        {
          title: "Day 4: Kaanum Pongal",
          description:
            "Family excursions, sister blessings for brothers, and community reunions.",
        },
      ],
      image: "/festivals/slider/image-4.webp",
      imageAlt: "Kolam art in front of Pongal pot",
    },
    traditionalFoods: {
      title: "Pongal Delicacies",
      subtitle:
        "Sweet Sakkarai Pongal made with newly harvested rice, cashews, and jaggery.",
      items: [
        { name: "Sakkarai Pongal", image: "/festivals/slider/image-1.webp" },
        { name: "Ven Pongal", image: "/festivals/slider/image-2.webp" },
        { name: "Meduvada", image: "/festivals/slider/image-3.webp" },
        { name: "Payasam", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/slider/image-4.webp",
    },
    exploreMoreSlugs: ["onam", "makar-sankranti", "diwali"],
    listingCard: {
      shortDescription:
        "The vibrant 4-day Tamil harvest festival celebrating the Sun God, bounty of crops, and reverence for cattle.",
      season: "Winter (Thai Month)",
      significance: "Harvest Abundance & Nature Gratitude",
      region: "Tamil Nadu & South India",
      category: "Harvest Festival",
    },
  },

  onam: {
    slug: "onam",
    name: "ONAM",
    tagline: "Kerala's Grand Harvest & Welcome to King Mahabali",
    dateBadge: { day: "15", month: "Sep" },
    heroImage: "/festivals/slider/image-3.webp",
    featuredOverviewImage:
      "/temples-images/tirupati-balaji/features/tirupati-balaji-feature-1.webp",
    aboutStory: {
      title: "About Onam",
      paragraphs: [
        "Onam is the supreme cultural harvest festival of God's Own Country, Kerala, celebrated across 10 glorious days during the Malayalam month of Chingam.",
        "It commemorates the annual return of the righteous King Mahabali from the netherworld to visit his beloved subjects in a realm celebrated for truth, equality, and prosperity.",
      ],
      image: "/temples-images/tirupati-balaji/features/tirupati-balaji-feature-1.webp",
      imageAlt: "Women designing Athapookkalam floral rangoli",
    },
    historyStory: {
      title: "Legend of Vamana & Mahabali",
      paragraphs: [
        "When King Mahabali's fame transcended all realms, Lord Vishnu incarnated as Vamana, a dwarf Brahmin, asking for three paces of land. When Vamana expanded to cover earth and heaven, Mahabali humbly offered his own head for the third step.",
        "Moved by his supreme devotion, Lord Vishnu granted Mahabali the boon to return to earth every year during Onam.",
      ],
      image: "/temples-images/tirupati-balaji/history/tirupati-balaji-history-1.webp",
      imageAlt: "Lord Vamana and Mahabali legend",
    },
    rituals: {
      title: "Iconic Onam Traditions",
      items: [
        {
          title: "Pookkalam (Floral Rangoli)",
          description:
            "Designing intricate floral carpets that expand in layers each day from Atham to Thiruvonam.",
        },
        {
          title: "Vallam Kali (Snake Boat Race)",
          description:
            "Thrilling races of long Chundan Vallam boats rowed by hundreds of synchronized oarsmen.",
        },
        {
          title: "Pulikkali (Tiger Dance)",
          description:
            "Performers painted in vibrant tiger stripes dancing to thumping chenda drums in Thrissur.",
        },
        {
          title: "Onasadya Grand Feast",
          description:
            "A royal 26-dish vegetarian feast served traditionally on fresh plantain leaves.",
        },
      ],
      image: "/festivals/slider/image-3.webp",
      imageAlt: "Onam sadya traditional feast",
    },
    traditionalFoods: {
      title: "The Royal Onasadya",
      subtitle:
        "An opulent banquet of 26 authentic delicacies served on fresh banana leaves.",
      items: [
        { name: "Avial", image: "/festivals/slider/image-1.webp" },
        { name: "Ada Pradhaman", image: "/festivals/slider/image-2.webp" },
        { name: "Banana Chips", image: "/festivals/slider/image-3.webp" },
        { name: "Sambar & Rasam", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/slider/image-3.webp",
    },
    exploreMoreSlugs: ["pongal", "holi", "diwali"],
    listingCard: {
      shortDescription:
        "Kerala’s 10-day harvest jubilee featuring magnificent floral carpets (Pookkalam), snake boat races, and the grand 26-dish Onasadya.",
      season: "Autumn (Chingam Month)",
      significance: "Harvest Harmony & Welcome to King Mahabali",
      region: "Kerala & Global Malayalis",
      category: "Harvest & Culture",
    },
  },

  "makar-sankranti": {
    slug: "makar-sankranti",
    name: "MAKAR SANKRANTI",
    tagline: "The Solar Harvest Festival of Uttarayan & Kite Flying",
    dateBadge: { day: "14", month: "Jan" },
    heroImage: "/festivals/slider/image-1.webp",
    featuredOverviewImage: "/festivals/slider/image-2.webp",
    aboutStory: {
      title: "About Makar Sankranti",
      paragraphs: [
        "Makar Sankranti is one of the most auspicious solar festivals in Sanatana Dharma, marking the celestial transition of the Sun (Surya Dev) into the zodiac sign of Capricorn (Makara Rashi).",
        "It heralds the onset of Uttarayan—the six-month auspicious journey of the Sun towards the Northern Hemisphere—bringing longer daylight, agricultural prosperity, and spiritual awakening across the subcontinent.",
      ],
      image: "/festivals/slider/image-1.webp",
      imageAlt: "Makar Sankranti holy river dip and colorful kites",
    },
    historyStory: {
      title: "Vedic Heritage & Uttarayan Lore",
      paragraphs: [
        "Mentioned in the Mahabharata and Puranas, Uttarayan is regarded as the daytime of the Devas. Grandfather Bhishma waited on his bed of arrows for the auspicious arrival of Uttarayan before giving up his mortal frame.",
        "Devotees take holy dips in sacred rivers—Ganga, Yamuna, Godavari, and Kaveri—to purify their karma, express gratitude to the Sun God, and distribute sesame (Til) and jaggery (Gud) to promote sweet speech and harmony.",
      ],
      image: "/temples-images/vishwanath/location/vishwanath-location-1.webp",
      imageAlt: "Holy dip at sacred ghats during Makar Sankranti",
    },
    rituals: {
      title: "Sacred Customs & Festivities",
      items: [
        {
          title: "Shahi Snan (Holy River Bath)",
          description:
            "Taking early morning dips in holy rivers like the Ganga at Prayagraj and Haridwar for spiritual cleansing.",
        },
        {
          title: "Surya Arghya & Gayatri Japa",
          description:
            "Offering pure water, kumkum, and flowers to Lord Surya at dawn to seek vitality and wisdom.",
        },
        {
          title: "International Kite Flying (Patangotsav)",
          description:
            "Millions of vibrant paper kites fill the sky in Gujarat, Rajasthan, and across India in joyous celebration.",
        },
        {
          title: "Til-Gud Dana (Charitable Giving)",
          description:
            "Donating warm clothes, grains, and sweets, embodying the spirit of selfless charity (Daan).",
        },
      ],
      image: "/festivals/slider/image-2.webp",
      imageAlt: "Sky filled with colorful kites during Sankranti",
    },
    traditionalFoods: {
      title: "Traditional Sankranti Delicacies",
      subtitle:
        "Sesame-jaggery laddoos, piping hot Khichdi, and crisp Chikki to provide winter warmth and energy.",
      items: [
        { name: "Til Gud Laddoo", image: "/festivals/slider/image-1.webp" },
        { name: "Sankranti Khichdi", image: "/festivals/slider/image-2.webp" },
        { name: "Peanut Chikki", image: "/festivals/slider/image-3.webp" },
        { name: "Ghevar & Rewri", image: "/festivals/slider/image-4.webp" },
      ],
      showcaseImage: "/festivals/slider/image-1.webp",
    },
    exploreMoreSlugs: ["pongal", "holi", "diwali"],
    listingCard: {
      shortDescription:
        "The glorious solar harvest festival celebrating the Sun's transit into Capricorn with holy river baths, colorful kite flying, and sesame-jaggery treats.",
      season: "Winter (14-15 January)",
      significance: "Solar Uttarayan, Harvest & Sweet Harmony",
      region: "Pan-India & Global Diaspora",
      category: "Solar Harvest Festival",
    },
  },
};

/**
 * Helper to retrieve normalized festival details with robust fallbacks
 */
export function getFestivalDetail(slug: string): FestivalDetailData | null {
  const normalizedSlug = slug.toLowerCase().trim();
  return FESTIVAL_DETAILS_CONFIG_REGISTRY[normalizedSlug] ?? null;
}

