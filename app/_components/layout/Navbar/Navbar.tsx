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
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
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
      // 1. Extract YYYY-MM-DD from the backend ISO string
      const datePart = event.date.split("T")[0];

      // 2. Extract start and end times from range "5:00 PM To 10:00 PM"
      const timeParts = event.time.match(/(\d{1,2}:\d{2}\s?[AP]M)/gi);
      if (timeParts && timeParts.length >= 2) {
        const startTime24 = convert12hTo24h(timeParts[0]);
        const endTime24 = convert12hTo24h(timeParts[1]);

        // 3. Create Date objects.
        // Note: Assumes event time is local to the event location.
        // Appending 'Z' would force UTC, omitting it uses environment local time.
        const startDateTime = new Date(`${datePart}T${startTime24}`);
        const endDateTime = new Date(`${datePart}T${endTime24}`);

        liveEventData = {
          _id: event._id,
          startDate: startDateTime.toISOString(),
          endDate: endDateTime.toISOString(),
          liveStreamUrl: EVENT_LIVE_CONFIG.defaultLiveStreamUrl, // Always use config as requested
        };
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

      <MarqueeBar />
    </>
  );
}
