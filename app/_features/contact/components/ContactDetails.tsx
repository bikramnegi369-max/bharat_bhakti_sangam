import { cinzel } from "@/_lib/fonts";
import { Contact } from "lucide-react";

export function ContactDetails() {
  return (
    <div
      className="w-full
              max-w-2xl
              mx-auto
              text-center
              rounded-2xl
              bg-white/95
              backdrop-blur-sm
              border-2 border-primary
              px-[clamp(1.625rem,calc(1.216rem+2.045vw),2.75rem)]
              py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)]
              space-y-4 lg:space-y-8"
    >
      <h2
        className={`${cinzel.className} text-[clamp(1rem,calc(0.714rem+1.429vw),2rem)] font-bold text-heading`}
      >
        Connect with<span className="text-primary"> Bharat Bhakti Sangam</span>
      </h2>
      <p className="text-[clamp(0.844rem,calc(0.728rem+0.58vw),1.25rem)] text-para">
        Have feedback or something to share about Bharat Bhakti Sangam ? Connect
        with us here – we’d love to hear from you!
      </p>

      <div className="flex flex-col gap-3 lg:gap-6">
        <div className="flex gap-2 lg:gap-4 items-center justify-center mr-4">
          <Contact className="text-para w-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)] h-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)]" />
          <h4 className="text-[clamp(0.875rem,calc(0.602rem+1.364vw),1.625rem)] font-semibold text-heading">
            CONTACT
          </h4>
        </div>
        <div className="text-[clamp(0.875rem,calc(0.696rem+0.893vw),1.5rem)] flex flex-col gap-2 lg:gap-4 text-para">
          <p>
            <span className="font-semibold">Phone : </span>{" "}
            <a
              href="tel:+918796086743"
              className="hover:underline hover:text-primary transition-colors"
            >
              +91 8796086743
            </a>
          </p>
          <p>
            <span className="font-semibold">Email : </span>{" "}
            <a
              href="mailto:contact@bharatbhaktisangam.com"
              className="hover:underline hover:text-primary transition-colors"
            >
              bharatbhaktiventures@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
