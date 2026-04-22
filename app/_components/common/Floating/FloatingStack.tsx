import { WhatsAppCTA } from "./WhatsAppCTA";

export default function FloatingStack() {
  return (
    <div
      className="
        fixed z-50
        right-5
        bottom-[calc(env(safe-area-inset-bottom)+16px)]
      "
    >
      <WhatsAppCTA />
    </div>
  );
}
