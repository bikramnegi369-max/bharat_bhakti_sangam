import { playfair, poppins } from "@/_lib/fonts";
import ScrollReveal from "@/_components/common/ScrollReveal";
import { MessageSquareOff } from "lucide-react";
import Link from "next/link";

type EventUnavailableProps = {
  title: string;
  message: string;
};

export function EventUnavailable({
  title,
  message,
}: EventUnavailableProps) {
  return (
    <section className="relative mx-auto flex min-h-[60vh] w-full max-w-4xl items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
      <ScrollReveal animation="scale-up" duration={700} className="w-full max-w-lg">
        <div className="w-full rounded-2xl sm:rounded-3xl border border-[#F0E6D8] bg-white p-8 sm:p-10 text-center shadow-[0_10px_35px_rgba(116,14,10,0.06)]">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#E86A17] mb-5 shadow-xs">
            <MessageSquareOff className="w-7 h-7 stroke-[1.8]" />
          </div>
          <h1 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-heading`}>
            {title}
          </h1>
          <p className={`${poppins.className} mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal`}>
            {message}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className={`${poppins.className} inline-flex items-center justify-center rounded-xl bg-[#740E0A] hover:bg-[#8B140F] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors shadow-xs`}
            >
              Return to Home
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
