import Link from "next/link";
import Image from "next/image";
import { routes } from "@/_config/Routes.config";
import MobileMenu from "./NavbarMobileMenu";
import MarqueeBar from "./NavbarMarquee";
import NavbarDesktopActions from "./NavbarDesktopActions";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { EVENT_LIVE_CONFIG } from "@/_config/Event.config";
import { type LiveEventData } from "@/_hooks/useLiveStatus";

/**
 * Helper to convert "5:00 PM" to "17:00:00" for reliable Date construction
 */
const convert12hTo24h = (timeStr: string) => {
  const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] || "00";
  const period = match[3].toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
};

export default async function Navbar() {
  let liveEventData: LiveEventData | null = null;

  try {
    const event = await getLatestEvent();
    if (event && event.date && event.time) {
      // 1. Extract YYYY-MM-DD safely regardless of if event.date is string or Date object
      const dateValue = event.date as unknown;
      const dateStr =
        dateValue instanceof Date
          ? dateValue.toISOString()
          : (event.date as string);
      const datePart = dateStr.split("T")[0];

      // 2. Extract start and end times from range (e.g., "5:00 PM To 10:00 PM" or "5 PM - 10 PM")
      const timeParts = event.time.match(/(\d{1,2}(?::\d{2})?\s?[AP]M)/gi);
      if (timeParts && timeParts.length >= 2) {
        const startTime24 = convert12hTo24h(timeParts[0]);
        const endTime24 = convert12hTo24h(timeParts[1]);

        if (startTime24 && endTime24) {
          // 3. Create Date objects with explicit IST (+05:30) offset for reliability.
          // Most cloud servers run in UTC, which can cause "Live" status to be off by 5.5 hours.
          const startDateTime = new Date(`${datePart}T${startTime24}+05:30`);
          const endDateTime = new Date(`${datePart}T${endTime24}+05:30`);

          // Handle events that cross over midnight (e.g., 10:00 PM To 02:00 AM)
          if (endDateTime < startDateTime) {
            endDateTime.setDate(endDateTime.getDate() + 1);
          }

          // 4. Add a 1-hour grace period (3600000ms) to the end time.
          // This ensures the Live feature doesn't disappear prematurely if the event runs late.
          const bufferedEndDate = new Date(endDateTime.getTime() + 3600000);

          liveEventData = {
            _id: event._id,
            startDate: startDateTime.toISOString(),
            endDate: bufferedEndDate.toISOString(),
            liveStreamUrl: EVENT_LIVE_CONFIG.defaultLiveStreamUrl,
          };
        }
      }
    }
  } catch (error) {
    console.error("Navbar: Failed to prepare live event data", error);
  }

  return (
    <>
      <header className="h-[clamp(3.75rem,calc(3.304rem+2.232vw),5.313rem)] flex items-center justify-between p-4 lg:px-[clamp(2rem,calc(-2.923rem+7.692vw),4rem)] border-b sticky top-0 z-50 bg-header-bg">
        <Link href={routes.home} aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="Bharat Bhakti Sangam Logo"
            width={168}
            height={168}
            loading="eager"
            className="cursor-pointer h-[clamp(4.375rem,calc(4.196rem+0.893vw),5rem)] w-[clamp(4.375rem,calc(4.196rem+0.893vw),5rem)] object-contain"
          />
        </Link>

        <NavbarDesktopActions event={liveEventData} />
        <MobileMenu event={liveEventData} />
      </header>

      <MarqueeBar event={liveEventData} />
    </>
  );
}
