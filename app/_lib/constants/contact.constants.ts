export const CONTACT_CONTENT = {
  heading: "Contact Us",

  subHeading: "Have questions or need assistance? We’re here to help.",

  form: {
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    queryLabel: "Query",

    fullNamePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
    queryPlaceholder: "Write your query here...",

    submitButtonText: "Submit",
  },

  successMessage: "Thank you for reaching out. Our team will contact you soon.",

  errorMessage: "Something went wrong. Please try again later.",
};

// STATUS SCREEN
export const CONTACT_STATUS_CONFIG = {
  success: {
    heading: "Message Sent!",
    message: CONTACT_CONTENT.successMessage,
    action: null,
  },
  error: {
    heading: "Something Went Wrong",
    message: CONTACT_CONTENT.errorMessage,
    action: "Try Again",
  },
} as const;
