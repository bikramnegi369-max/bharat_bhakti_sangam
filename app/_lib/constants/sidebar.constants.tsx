import React from "react";
import { SidebarItem } from "@/_types/Sidebar.types";
import {
  LayoutDashboard,
  CalendarDays,
  Layers,
  Tags,
  MapPin,
  Mic2,
  Sparkles,
  Handshake,
  HeartHandshake,
  CalendarCheck2,
  HelpCircle,
  MessageSquareHeart,
  Mail,
  Ticket,
  ListOrdered,
  UserX,
  BookmarkCheck,
} from "lucide-react";

export const NAV_ITEMS: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/admin",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "events-group",
    label: "Events",
    icon: <CalendarDays size={18} />,
    children: [
      {
        id: "all-events",
        label: "All Events",
        href: "/admin/event",
        icon: <Layers size={16} />,
      },
      {
        id: "event-cats",
        label: "Categories",
        href: "/admin/event/management/categories",
        icon: <Tags size={16} />,
      },
      {
        id: "event-venues",
        label: "Venues",
        href: "/admin/event/management/venues",
        icon: <MapPin size={16} />,
      },
    ],
  },
  {
    id: "artists",
    label: "Artists",
    href: "/admin/artists",
    icon: <Mic2 size={18} />,
  },
  {
    id: "influencers",
    label: "Influencers",
    href: "/admin/influencers",
    icon: <Sparkles size={18} />,
  },
  {
    id: "booking-group",
    label: "Booking",
    icon: <Ticket size={18} />,
    children: [
      {
        id: "all-bookings",
        label: "All Bookings",
        href: "/admin/booking",
        icon: <ListOrdered size={16} />,
      },
      {
        id: "non-visited-users",
        label: "Non Visited Users",
        href: "/admin/booking/non-visited-users",
        icon: <UserX size={16} />,
      },
      {
        id: "booking-types",
        label: "Booking Types",
        href: "/admin/booking/booking-types",
        icon: <BookmarkCheck size={16} />,
      },
    ],
  },
  {
    id: "sponsors",
    label: "Sponsors",
    href: "/admin/sponsors",
    icon: <Handshake size={18} />,
  },
  {
    id: "volunteers",
    label: "Volunteers",
    href: "/admin/volunteers",
    icon: <HeartHandshake size={18} />,
  },
  {
    id: "calender",
    label: "Calendar",
    href: "/admin/calender",
    icon: <CalendarCheck2 size={18} />,
  },
  {
    id: "query",
    label: "Query",
    href: "/admin/query",
    icon: <HelpCircle size={18} />,
  },
  {
    id: "feedback",
    label: "Feedback",
    href: "/admin/feedback",
    icon: <MessageSquareHeart size={18} />,
  },
  {
    id: "send-email",
    label: "Send Email",
    href: "/admin/send-email",
    icon: <Mail size={18} />,
  },
];
