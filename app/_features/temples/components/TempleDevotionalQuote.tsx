import { playfair, poppins } from "@/_lib/fonts";
import { Sparkles } from "lucide-react";
import ScrollReveal from "@/_components/common/ScrollReveal";

export default function TempleDevotionalQuote() {
  return (
    <section className="w-full py-12 md:py-16 bg-[#FAF8F5] border-t border-b border-amber-200/60 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal
          animation="glow-reveal"
          duration={850}
          threshold={0.15}
        >
          <div className="relative rounded-3xl p-8 sm:p-12 bg-[radial-gradient(ellipse_at_center,#FFF8EF_0%,#FDF2E2_55%,#F8E8D5_100%)] border border-amber-300/60 shadow-lg shadow-amber-900/5 space-y-4">
            {/* Top Icon */}
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-700 flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            {/* Sacred Sanskrit Shloka */}
            <p
              className={`${playfair.className} text-xl sm:text-2xl md:text-3xl font-semibold text-[#740E0A] tracking-wide leading-relaxed`}
            >
              &ldquo;ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥&rdquo;
            </p>

            {/* Meaning */}
            <p
              className={`${poppins.className} text-stone-600 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed italic`}
            >
              &ldquo;Lead us from the unreal to the real, from darkness to divine light, from mortality to eternal truth.&rdquo;
            </p>

            {/* Attribution */}
            <div className="pt-2">
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-amber-800 uppercase">
                — Brihadaranyaka Upanishad (1.3.28)
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
