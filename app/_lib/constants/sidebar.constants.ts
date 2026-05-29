import { SidebarItem } from "@/_types/Sidebar.types";

export const NAV_ITEMS: SidebarItem[] = [
  { id: "home", label: "Home", href: "/admin" },
  {
    id: "events-group",
    label: "Events",
    children: [
      { id: "all-events", label: "All Events", href: "/admin/event" },
      {
        id: "event-cats",
        label: "Categories",
        href: "/admin/event/management/categories",
      },
      {
        id: "event-venues",
        label: "Venues",
        href: "/admin/event/management/venues",
      },
    ],
  },
  { id: "artists", label: "Artists", href: "/admin/artists" },
  { id: "sponsors", label: "Sponsors", href: "/admin/sponsors" },
  { id: "volunteers", label: "Volunteers", href: "/admin/volunteers" },
  { id: "calender", label: "Calender", href: "/admin/calender" },
  { id: "query", label: "Query", href: "/admin/query" },
  { id: "feedback", label: "Feedback", href: "/admin/feedback" },
  { id: "send-email", label: "Send Email", href: "/admin/send-email" },
  {
    id: "booking-group",
    label: "Booking",
    children: [
      {
        id: "all-bookings",
        label: "All Bookings",
        href: "/admin/booking",
      },
      {
        id: "non-visited-users",
        label: "Non Visited Users",
        href: "/admin/booking/non-visited-users",
      },
      {
        id: "booking-types",
        label: "Booking Types",
        href: "/admin/booking/booking-types",
      },
    ],
  },
];
