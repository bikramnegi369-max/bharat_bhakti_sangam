import { Award, Sparkles, Music2, Video, Flame, FileText, FileCode2, ScanFace, MailCheck } from "lucide-react";
import { CreatorHighlight } from "@/_components/sections/Marketing/Creator/CreatorHero";
import { CreatorBenefitItem } from "@/_components/sections/Marketing/Creator/CreatorBenefitsGrid";
import { CreatorProcessStep } from "@/_components/sections/Marketing/Creator/CreatorTimelineProcess";
import { CreatorFAQItem, CreatorContactInfo } from "@/_components/sections/Marketing/Creator/CreatorFAQSection";

export const artistHeroData = {
  eyebrow: "ARTIST JOIN",
  titleLine1: "Become a",
  titleLine2: "Performing Artist",
  description:
    "Showcase your talent on the Bharat Bhakti Sangam stage and inspire thousands through devotional performances.",
  imageSrc: "/about_hero.webp",
  imageAlt: "Traditional Indian performing artist celebrating devotion at Bharat Bhakti Sangam",
  highlights: [
    {
      id: "inspire-millions",
      icon: Award,
      title: "Inspire Millions",
      subtitle: "through your art",
    },
    {
      id: "get-recognized",
      icon: Sparkles,
      title: "Get Recognized",
      subtitle: "on our official platforms",
    },
    {
      id: "elevate-devotion",
      icon: Music2,
      title: "Elevate Devotion",
      subtitle: "on grand live stages",
    },
  ] as CreatorHighlight[],
};

export const artistBenefitsData: CreatorBenefitItem[] = [
  {
    id: "official-collaboration",
    icon: Sparkles,
    title: "Official Collaboration",
    description:
      "Partner with a recognized cultural organization and perform at premier venues.",
  },
  {
    id: "event-invitations",
    icon: Award,
    title: "Event Invitations",
    description:
      "Get invitations to perform at mega devotional concerts and cultural fests.",
  },
  {
    id: "creator-recognition",
    icon: Video,
    title: "Creator Recognition",
    description:
      "Featured across our official channels, streaming media, and festival promos.",
  },
  {
    id: "grow-together",
    icon: Flame,
    title: "Grow Together",
    description:
      "Connect with veteran artists, expand your network, and elevate your artistry.",
  },
];

export const artistProcessSteps: CreatorProcessStep[] = [
  {
    stepNumber: 1,
    icon: FileText,
    title: "Submit Request",
    description: "Fill out the form and send your request.",
  },
  {
    stepNumber: 2,
    icon: FileCode2,
    title: "Application Review",
    description: "Our curation committee reviews your profile & clips.",
  },
  {
    stepNumber: 3,
    icon: ScanFace,
    title: "Verification",
    description: "Our onboarding team verifies your details & portfolio.",
  },
  {
    stepNumber: 4,
    icon: MailCheck,
    title: "Approval Email",
    description: "You will receive an official decision and welcome pack.",
  },
  {
    stepNumber: 5,
    icon: Music2,
    title: "Stage Performance",
    description: "Get scheduled to perform live on our sacred stages!",
  },
];

export const artistFaqs: CreatorFAQItem[] = [
  {
    id: 1,
    question: "Who can apply for artist collaboration?",
    answer:
      "We welcome all kinds of devotional artists including singers, musicians, dancers, speakers and spiritual performers. Both individual and group applications are accepted.",
  },
  {
    id: 2,
    question: "Can groups or teams apply?",
    answer:
      "Yes, musical groups, choir teams, dance troupes, and devotional ensembles are fully eligible to apply. Please provide collective links and sample recordings in your submission.",
  },
  {
    id: 3,
    question: "Is there any registration or application fee?",
    answer:
      "No, there is absolutely zero registration or application fee. Applying and collaborating with Bharat Bhakti Sangam is completely free for all artists.",
  },
  {
    id: 4,
    question: "How long does the approval process take?",
    answer:
      "Our curation committee reviews applications thoroughly. You will typically receive an update via email or WhatsApp within 3 to 5 business days.",
  },
  {
    id: 5,
    question: "How will I know if my application is selected?",
    answer:
      "Once your profile is reviewed and shortlisted, our onboarding team will reach out via official email and phone to discuss upcoming event dates and arrangements.",
  },
  {
    id: 6,
    question: "Can I update my application after submitting?",
    answer:
      "Yes, if you need to update portfolio links, contact details, or performance videos, simply reach out to contact@bharatbhaktisangam.com with your application details.",
  },
];

export const artistContactInfo: CreatorContactInfo = {
  phone: "+91 8796086743",
  email: "contact@bharatbhaktisangam.com",
  whatsapp: "+91 8796086743",
  ctaText: "Contact Our Team",
  ctaHref: "/contact",
};
