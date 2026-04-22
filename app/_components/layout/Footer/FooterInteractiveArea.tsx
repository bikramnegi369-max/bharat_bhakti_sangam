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
    <div className="flex flex-col gap-10 justify-start lg:items-end lg:mt-5">
      {pathname !== "/booking" && <FooterCTA label={cta.label} href={cta.href} />}
      <SubscribeForm className="w-full max-w-sm lg:text-right" />
    </div>
  );
}
