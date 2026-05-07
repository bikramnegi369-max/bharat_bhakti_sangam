import "server-only";

export const apiRoutes = {
  event: "/event",
  latestEvent: "/event/latest",
  latestCapacity: "/event/latest-capacity",
  sanatanCalender: "/sanatan-calender",
  contact: "/contact",
  booking: "/booking/create-ticket",
  feedback: "/feedback",
  subscribe: "/subscriber",
  preSignedUrl: "/admin/presign-url",
  getAllBookingTypes: "/admin/getall-bookingtype",
  getAllArtists: "/artist/all",
  getAllSponsors: "/sponsor/get-all",
  getAllVenues: "/venue/all-venue",
  getAllEventCategories: "/admin/getAll-category",
};
