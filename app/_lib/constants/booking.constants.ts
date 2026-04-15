export const BOOKING_CONFIG = {
  success: {
    heading: "Booking Confirmed!",
    message:
      "Your booking has been successfully placed. Check your email for the confirmation details. See you at the event! 🎶",
    action: null,
  },
  error: {
    heading: "Booking Failed",
    message:
      "We couldn't process your booking. Please check your connection and try again.",
    action: "Try Again",
  },
  form: {
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",

    fullNamePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email",
    phonePlaceholder: "Enter your phone number",
  },
} as const;
