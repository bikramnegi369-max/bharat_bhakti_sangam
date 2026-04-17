"use client";

import { CONTACT_CONTENT } from "@/_lib/constants/contact.constants";

export function ContactFormHeader() {
  return (
    <header className="text-center space-y-4 lg:mb-16">
      {/* <h1
        className={clsx(
          cinzel.className,
          "text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold text-heading",
        )}
      >
        {CONTACT_CONTENT.heading}
      </h1> */}

      <p className="mx-auto max-w-lg text-[clamp(0.75rem,calc(0.432rem+1.591vw),1.625rem)] text-para leading-relaxed">
        {CONTACT_CONTENT.subHeading}
      </p>
    </header>
  );
}
