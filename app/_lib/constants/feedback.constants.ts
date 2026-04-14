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
  success: "Thank you for your feedback 🙏",
  error: "Something went wrong. Please try again.",
};

// STATUS SCREEN
export const FEEDBACK_STATUS_CONFIG = {
  success: {
    heading: "Thank You!",
    message:
      "Your feedback has been submitted successfully. We truly appreciate you taking the time to share your experience with us. 🙏",
    action: null,
  },
  error: {
    heading: "Something Went Wrong",
    message: "We couldn't submit your feedback. Please check your connection and try again.",
    action: "Try Again",
  },
} as const;
