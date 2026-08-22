import React from "react";
import clsx from "clsx";
import { contactInfoData } from "@/_config/contact.data";
import { ContactInfoCard } from "./ContactInfoCard";
import { ContactMessageForm } from "./ContactMessageForm";
import { playfair, poppins } from "@/_lib/fonts";

export function ContactConversationSection() {
  return (
    <section
      aria-labelledby="conversation-heading"
      className="relative w-full py-8 sm:py-12 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2
            id="conversation-heading"
            className={clsx(
              playfair.className,
              "text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-stone-900 leading-tight tracking-tight",
            )}
          >
            Let&rsquo;s Start a Conversation
          </h2>
          <p
            className={clsx(
              poppins.className,
              "mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-xl mx-auto",
            )}
          >
            We believe every conversation begins with a connection. Whether
            you&rsquo;re a devotee, volunteer, artist, or event partner,
            we&rsquo;re always happy to hear from you.
          </p>
        </div>

        {/* 2-Column Responsive Grid (Stacks on mobile, 2 cols on lg/1024px) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <h3
              className={clsx(
                playfair.className,
                "text-lg sm:text-xl font-bold text-[#8A110D] mb-1 px-1",
              )}
            >
              Contact Information
            </h3>
            {contactInfoData.map((item) => (
              <ContactInfoCard key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column: Send Us a Message Form Card */}
          <div className="lg:col-span-7">
            <ContactMessageForm />
          </div>
        </div>
      </div>
    </section>
  );
}
