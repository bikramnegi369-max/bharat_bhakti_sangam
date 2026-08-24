import { WhatsAppCTA } from "./WhatsAppCTA";
import { ScrollToTopButton } from "./ScrollToTopButton";

export default function FloatingStack() {
  return (
    <div
      className="
        fixed z-50
        right-4 sm:right-6
        bottom-[calc(env(safe-area-inset-bottom)+16px)]
        flex flex-col items-center gap-3
      "
    >
      <ScrollToTopButton />
      <WhatsAppCTA />
    </div>
  );
}

