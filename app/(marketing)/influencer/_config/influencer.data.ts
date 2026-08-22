import { Users, CalendarDays, Camera, TrendingUp, Award, Sparkles, Ticket, FileText, FileCode2, ScanFace, MailCheck, Users2 } from "lucide-react";
import { CreatorHighlight } from "@/_components/sections/Marketing/Creator/CreatorHero";
import { CreatorBenefitItem } from "@/_components/sections/Marketing/Creator/CreatorBenefitsGrid";
import { CreatorProcessStep } from "@/_components/sections/Marketing/Creator/CreatorTimelineProcess";
import { CreatorFAQItem, CreatorContactInfo } from "@/_components/sections/Marketing/Creator/CreatorFAQSection";

export const influencerHeroData = {
  eyebrow: "INFLUENCER COLLABORATION",
  titleLine1: "Become an Official",
  titleLine2: "Influencer",
  description:
    "Join Bharat Bhakti Sangam and be a part of a spiritual movement. Share devotion, culture and tradition with millions of hearts.",
  imageSrc: "/about_hero.webp",
  imageAlt: "Bharat Bhakti Sangam Influencer capturing devotional concert moments on camera",
  highlights: [
    {
      id: "inspire-millions",
      icon: Award,
      title: "Inspire Millions",
      subtitle: "through your content",
    },
    {
      id: "get-recognized",
      icon: Sparkles,
      title: "Get Recognized",
      subtitle: "on our official platforms",
    },
    {
      id: "exclusive-access",
      icon: Ticket,
      title: "Exclusive Access",
      subtitle: "to events & experiences",
    },
  ] as CreatorHighlight[],
};

export const influencerBenefitsData: CreatorBenefitItem[] = [
  {
    id: "official-collaboration",
    icon: Users,
    title: "Official Collaboration",
    description:
      "Partner with a trusted spiritual organization with a global reach.",
  },
  {
    id: "event-invitations",
    icon: CalendarDays,
    title: "Event Invitations",
    description:
      "Get exclusive invitations to our festivals, events and programs.",
  },
  {
    id: "creator-recognition",
    icon: Camera,
    title: "Creator Recognition",
    description: "Featured on our website and social media channels.",
  },
  {
    id: "grow-together",
    icon: TrendingUp,
    title: "Grow Together",
    description: "Be part of a growing community of passionate creators.",
  },
];

export const influencerProcessSteps: CreatorProcessStep[] = [
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
    description: "Our team will review your application.",
  },
  {
    stepNumber: 3,
    icon: ScanFace,
    title: "Verification",
    description: "You will receive an email regarding the decision.",
  },
  {
    stepNumber: 4,
    icon: MailCheck,
    title: "Approval Email",
    description: "You will receive an email regarding the decision.",
  },
  {
    stepNumber: 5,
    icon: Users2,
    title: "Collaboration Begins",
    description: "Let's create something meaningful together!",
  },
];

export const influencerFaqs: CreatorFAQItem[] = [
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

export const influencerContactInfo: CreatorContactInfo = {
  phone: "+91 8796086743",
  email: "contact@bharatbhaktisangam.com",
  whatsapp: "+91 8796086743",
  ctaText: "Contact Our Team",
  ctaHref: "/contact",
};
