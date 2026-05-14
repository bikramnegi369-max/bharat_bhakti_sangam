import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { cinzel } from "@/_lib/fonts";

type FAQItem = {
  title: string;
  content: string;
};

type FAQSectionProps = {
  faqs?: FAQItem[];
};

export default function FAQSection({
  faqs = [
    {
      title: "Description",
      content:
        "Experience an unforgettable evening of Bhakti with live devotional bands, soulful dual singers, energetic anchoring, and divine aarti celebrations. This free-ticket spiritual gathering by Bharat Bhakti Sangam blends devotion, music, and community into one uplifting experience filled with bhajans, kirtan, and positive energy.",
    },
    {
      title: "Location",
      content: "E Block Club Park, Vatika India Next Sec-82 Gurugram, Haryana",
    },
    {
      title: "Important Note",
      content:
        "Please carry your valid event ticket (digital or printed) along with a government-issued ID for smooth entry verification. Guests are requested to arrive at least 30 minutes early and maintain the devotional atmosphere throughout the event.",
    },
    {
      title: " Event Timeline",
      content:
        "The event will begin from 5:00 PM onwards with devotional music, followed by live bhajan performances, dual singer sessions, anchoring, and divine maha aarti. Devotees are requested to arrive at least 30 minutes before the event timing for smooth entry and seating arrangements. The spiritual celebration will continue throughout the evening with bhakti, kirtan, and community experiences.",
    },
    {
      title: "Photography & Video",
      content:
        "Photography and videography are allowed during the event. Guests are welcome to capture devotional moments and share their experiences respectfully while maintaining the spiritual atmosphere of the celebration.",
    },
  ],
}: FAQSectionProps) {
  return (
    <section className="py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light">
          <h2
            className={clsx(
              "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-5 lg:mb-10 text-center",
              cinzel.className,
            )}
          >
            <span className="text-primary">Event</span> Guide
          </h2>

          <div>
            {faqs.map((faq, index) => (
              <div
                key={`${faq.title}-${index}`}
                className="group  overflow-hidden"
              >
                <div className="flex gap-4 list-none items-center px-5 py-4 text-left cursor-pointer">
                  👉
                  <span className=" font-semibold text-heading text-[clamp(0.938rem,calc(0.848rem+0.446vw),1.25rem)]">
                    {faq.title}
                  </span>
                </div>

                <div className="ml-10 px-5 pb-4 text-[clamp(0.75rem,calc(0.661rem+0.446vw),1.063rem)] text-para">
                  {faq.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
