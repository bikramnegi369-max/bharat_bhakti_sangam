import { Phone, Mail, MapPin } from "lucide-react";
import { FooterContactInfo } from "@/_types/Footer.types";
import { playfair } from "@/_lib/fonts";

type Props = {
  contact: FooterContactInfo;
};

export function FooterCompanyDetails({ contact }: Props) {
  return (
    <div className="space-y-4">
      <h4
        className={`${playfair.className} text-lg md:text-xl font-semibold tracking-wide text-white border-b border-white/10 pb-2 inline-block w-full`}
      >
        Contact Us
      </h4>

      <div className="space-y-3.5 text-sm md:text-[15px]">
        {/* Phone */}
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors">
            <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <a
            href={`tel:${contact.phoneRaw}`}
            className="text-white/80 hover:text-gold transition-colors font-medium"
          >
            {contact.phone}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors">
            <Mail className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="text-white/80 hover:text-gold transition-colors break-all"
          >
            {contact.email}
          </a>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 group pt-1">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-gold/50 transition-colors mt-0.5">
            <MapPin className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Vipin+Garden+Uttam+Nagar+Delhi+110059"
            target="_blank"
            rel="noopener noreferrer"
            className="space-y-1 text-white/80 text-xs md:text-sm leading-relaxed group-hover:text-gold transition-colors"
          >
            <p className="font-semibold text-white/90 group-hover:text-gold">
              Head Office:
            </p>
            <p className="text-white/80 group-hover:text-gold/90">
              {contact.addressLines[0]}
            </p>
            <p className="text-white/70 text-xs">
              {contact.addressLines[1]}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterCompanyDetails;

