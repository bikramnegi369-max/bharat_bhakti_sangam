import { SidebarItem } from "@/_types/Sidebar.types";

export const NAV_ITEMS: SidebarItem[] = [
  { id: "home", label: "Home", href: "/admin" },
  {
    id: "events-group",
    label: "Events",
    children: [
      { id: "all-events", label: "All Events", href: "/admin/event" },
      {
        id: "event-mgmt",
        label: "Management",
        children: [
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
    ],
  },
  { id: "artists", label: "Artists", href: "/admin/artists" },
  { id: "sponsors", label: "Sponsors", href: "/admin/sponsors" },
  { id: "volunteers", label: "Volunteers", href: "/admin/volunteers" },
  {
    id: "booking-types",
    label: "Bookings Types",
    href: "/admin/bookings-types",
  },
];
