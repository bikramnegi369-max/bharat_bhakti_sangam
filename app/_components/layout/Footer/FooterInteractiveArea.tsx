"use client";

import { usePathname } from "next/navigation";
import { FooterCTA } from "./FooterCTA";
import { SubscribeForm } from "../../../_features/subscription/components/SubscribeForm";

type Props = {
  cta: {
    label: string;
    href: string;
  };
};

export function FooterInteractiveArea({ cta }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col gap-4.5 w-full items-stretch justify-center">
      {pathname !== "/booking" && (
        <div className="shrink-0">
          <FooterCTA
            label={cta.label}
            href={cta.href}
            className="w-full text-center py-3 px-6 shadow-xl shadow-[#740E0A]/30 hover:shadow-[#740E0A]/50 font-bold uppercase tracking-widest text-sm rounded-full"
          />
        </div>
      )}
      <div className="grow bg-linear-to-br from-white/10 to-white/5 border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
        <SubscribeForm
          title="Join the Club"
          description="Get devotional event updates & exclusive invites."
          className="w-full"
        />
      </div>
    </div>
  );
}


