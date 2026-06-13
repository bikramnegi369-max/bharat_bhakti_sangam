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
    <div className="hidden lg:flex items-center gap-6">
      <DesktopNavLinks />

      {isLive ? (
        <LiveButton href={liveStreamUrl} />
      ) : (
        pathname !== routes.booking && (
          <CTAButton
            href={routes.booking}
            label="Book Now"
            variant="primary"
            className="w-45! h-9.5! py-0! text-[clamp(0.5rem,calc(0.25rem+1.25vw),1.375rem)]!"
          />
        )
      )}
    </div>
  );
}
