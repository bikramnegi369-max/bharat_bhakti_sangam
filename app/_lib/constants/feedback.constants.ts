// HERO CONTENT
export const FEEDBACK_HERO = {
  title: "Midnight Krishna Kirtan",
  venue: "ISKCON Temple Hall | Hare Krishna Land, Juhu, Mumbai 400049",
  dateTime: "12 Nov, 2026 | 11:00 a.m - 6:00 p.m",
};

// FORM CONTENT
export const FEEDBACK_FORM_CONTENT = {
  heading: "Ratings",

  fields: {
    fullName: {
      label: "Full Name",
      placeholder: "Enter your full name",
    },
    email: {
      label: "Email",
      placeholder: "Enter your email",
    },
    feedback: {
      label: "Feedback",
      placeholder: "Enter your feedback here",
    },
  },

  submitButton: "Submit",
};

// RATINGS CONFIG
export const FEEDBACK_RATINGS = [
  {
    key: "food",
    label: "Food",
  },
  {
    key: "management",
    label: "Management",
  },
  {
    key: "crowd",
    label: "Crowd",
  },
] as const;

// FORM LIMITS
export const FEEDBACK_LIMITS = {
  feedbackMaxLength: 1000,
};

// BACKGROUND MEDIA
export const FEEDBACK_MEDIA = {
  desktopBackground: "/images/feedback/feedback-bg-desktop.png",
  mobileBackground: "/images/feedback/feedback-bg-mobile.png",
};

// MESSAGES
export const FEEDBACK_MESSAGES = {
  success:
    "Thank you for sharing your divine experience with Bharat Bhakti Sangam 🙏",
  error:
    "We could not submit your feedback at this moment. Please check your network connection and try again.",
};

export const ALL_FEEDBACKS = "all-feedbacks";

// STATUS SCREEN
export const FEEDBACK_STATUS_CONFIG = {
  success: {
    heading: "Thank You for Your Feedback! 🙏",
    message:
      "Your valuable thoughts and experience have been received with gratitude. Your feedback inspires us to elevate the devotional ambience and arrangements for our sacred gatherings.",
    action: "Submit Another Feedback",
  },
  error: {
    heading: "Submission Could Not Complete",
    message:
      "We encountered an issue while receiving your response. Please check your internet connection or try again in a few moments.",
    action: "Try Again",
  },
} as const;
