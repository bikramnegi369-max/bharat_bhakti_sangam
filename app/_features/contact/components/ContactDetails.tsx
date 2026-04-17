import { cinzel } from "@/_lib/fonts";
import { Contact } from "lucide-react";

export function ContactDetails() {
  return (
    <div
      className="w-full
              max-w-4xl
              mx-auto
              text-center
              rounded-2xl
              bg-white/95
              backdrop-blur-sm
              shadow-2xl
              border-2 border-primary
              px-[clamp(1.625rem,calc(1.216rem+2.045vw),2.75rem)]
              py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)]
              space-y-4 lg:space-y-8"
    >
      <h2
        className={`${cinzel.className} text-[clamp(1rem,calc(0.477rem+2.614vw),2.438rem)] font-bold text-heading`}
      >
        Connect with Bharat Bhakti Sangam
      </h2>
      <p className="text-[clamp(0.75rem,calc(0.432rem+1.591vw),1.625rem)] text-para">
        Have feedback or something to share about Bharat Bhakti Sangam ? Connect
        with us here – we’d love to hear from you!
      </p>
      <div></div>
      <div className="flex flex-col gap-3 lg:gap-6">
        <div className="flex gap-2 lg:gap-4 items-center justify-center mr-4">
          <Contact className="text-para w-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)] h-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)]" />
          <h4 className="text-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)] font-semibold text-heading">
            CONTACT
          </h4>
        </div>
        <div className="text-[clamp(0.75rem,calc(0.432rem+1.591vw),1.625rem)] flex flex-col gap-2 lg:gap-4 text-para">
          <p>
            <span className="font-semibold">Phone : </span> +91 8796086743
          </p>
          <p>
            <span className="font-semibold">Email : </span>{" "}
            contact@bharatbhaktisangam.com
          </p>
        </div>
      </div>
    </div>
  );
}
