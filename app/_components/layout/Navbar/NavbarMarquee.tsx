"use client";

import { Mail, Phone, Ticket } from "lucide-react";
import { Marquee } from "../../ui/Marquee/Marquee";

export default function NavbarMarqueeBar() {
  return (
    <Marquee
      speed={25}
      gap={48}
      className="py-1"
      items={[
        {
          id: "1",
          content: (
            <div className="flex items-center gap-6 whitespace-nowrap">
              <span>Contact Us :</span>

              <span className="flex gap-2 items-center">
                <Phone className="w-3 h-3 shrink-0" />
                +91 8796086743
              </span>

              <span className="flex gap-2 items-center">
                <Mail className="w-3 h-3 shrink-0" />
                contact@bharatbhaktisangam.com
              </span>
            </div>
          ),
        },
        {
          id: "2",
          content: (
            <div className="flex items-center whitespace-nowrap">
              <span className="flex gap-2 items-center">
                <Ticket className="w-4 h-4 shrink-0" />
                Book your tickets now
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}
