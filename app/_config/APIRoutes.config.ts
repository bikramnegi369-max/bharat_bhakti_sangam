import "server-only";

const EVENT_BASE = "/event";
const EVENT_CATEGORY_BASE = "/admin/category";
const ARTIST_BASE = "/artist";
const VOLUNTEER_BASE = "/admin/volunteer";
const VENUE_BASE = "/venue";
const QUERY_BASE = "/contact";
const SPONSOR_BASE = "/sponsor";
const FEEDBACK_BASE = "/feedback";
const BOOKING_BASE = "/booking";
const BOOKING_TYPE_BASE = "/admin/booking-type";
const CALENDER_BASE = "/calender";
const DASHBOARD_BASE = "/admin/dashboard";
const ADMIN_EMAIL_BASE = "/admin/email";

export const apiRoutes = {
  event: EVENT_BASE,
  eventById: (id: string) => `${EVENT_BASE}/${id}`,
  addManualAttendance: (id: string) => `${EVENT_BASE}/${id}/manual-attendance`,
  categoryById: (id: string) => `${EVENT_CATEGORY_BASE}/${id}`,
  latestEvent: `${EVENT_BASE}/latest`,
  latestCapacity: `${EVENT_BASE}/latest-capacity`,
  contact: "/contact",
  booking: `${BOOKING_BASE}/create-ticket`,
  feedback: "/feedback",
  subscribe: "/subscriber",
  preSignedUrl: "/admin/presign-url",
  getAllBookings: `${BOOKING_BASE}`,
  getNonVisitedUsers: `${BOOKING_BASE}/non-visited-users`,
  getAllBookingTypes: `${BOOKING_TYPE_BASE}`,
  addBookingType: `${BOOKING_TYPE_BASE}`,
  bookingTypeById: (id: string) => `${BOOKING_TYPE_BASE}/${id}`,
  getAllArtists: ARTIST_BASE,
  artistById: (id: string) => `${ARTIST_BASE}/${id}`,
  addArtist: ARTIST_BASE,
  getAllVolunteers: VOLUNTEER_BASE,
  volunteerById: (id: string) => `${VOLUNTEER_BASE}/${id}`,
  addVolunteer: VOLUNTEER_BASE,
  getAllEventQueries: `${QUERY_BASE}`,
  getAllSponsors: `${SPONSOR_BASE}/get-all`,
  getAllVenues: `${VENUE_BASE}/all-venue`,
  getAllCategories: EVENT_CATEGORY_BASE,
  getAllEvent: `${EVENT_BASE}/all-event`,
  getAllFeedbacks: FEEDBACK_BASE,
  getAllCalenderEntries: CALENDER_BASE,
  addCalenderEntry: CALENDER_BASE,
  calenderEntryById: (id: string) => `${CALENDER_BASE}/${id}`,
  addCategory: "/admin/add-category",
  venueById: (id: string) => `${VENUE_BASE}/${id}`,
  addVenue: VENUE_BASE,
  dashboardEventStats: `${DASHBOARD_BASE}/events`,
  dashboardAnalytics: `${DASHBOARD_BASE}/analytics`,
  dashboardBookingRegistrationTrend: `${DASHBOARD_BASE}/booking-registration-trend`,
  dashboardTotalBookingTrend: `${DASHBOARD_BASE}/booking-trend`,
  sendAdminEmail: `${ADMIN_EMAIL_BASE}`,
};
