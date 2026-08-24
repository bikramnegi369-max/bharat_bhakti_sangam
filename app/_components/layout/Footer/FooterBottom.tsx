import { playfair } from "@/_lib/fonts";

type Props = {
  copyright: string;
  tagline?: string;
};

export function FooterBottom({ copyright, tagline = "Sacred Design for Eternal Devotion" }: Props) {
  return (
    <div className="border-t border-white/10 pt-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/60">
      <p className="text-center md:text-left">{copyright}</p>
      {tagline && (
        <p className={`${playfair.className} italic text-white/50 text-center md:text-right font-medium tracking-wider text-xs md:text-[13px]`}>
          {tagline}
        </p>
      )}
    </div>
  );
}

