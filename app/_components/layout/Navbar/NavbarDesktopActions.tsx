"use client";

import { usePathname } from "next/navigation";
import { routes } from "@/_config/Routes.config";
import { CTAButton } from "@/_components/ui/CTAButton";
import { LiveButton } from "@/_components/ui/LiveButton";
import DesktopNavLinks from "./DesktopNavLinks";
import { useLiveStatus, type LiveEventData } from "@/_hooks/useLiveStatus";

export default function NavbarDesktopActions({
  event,
}: {
  event: LiveEventData | null;
}) {
  const pathname = usePathname();
  const { isLive, liveStreamUrl } = useLiveStatus(event);

  return (
    <div className="hidden xl:flex items-center gap-2.5 xl:gap-3.5 2xl:gap-6 shrink-0">
      <DesktopNavLinks />

      {isLive ? (
        <LiveButton href={liveStreamUrl} />
      ) : (
        pathname !== routes.booking && (
          <CTAButton
            href={routes.booking}
            label="Book Tickets"
            variant="orange"
            className="rounded-full px-3.5 py-1.5 xl:px-4.5 xl:py-2 text-[12.5px] xl:text-[13px] 2xl:text-[14px] font-semibold shadow-md hover:shadow-orange/20 whitespace-nowrap"
          />
        )
      )}
    </div>
  );
}
