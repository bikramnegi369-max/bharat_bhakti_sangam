import { Building2, Mail, MapPin, Phone } from "lucide-react";

function FooterCompanyDetails() {
  return (
    <div className="flex flex-col lg:mt-5 space-y-4">
      <h3 className="text-2xl">Contact us</h3>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm  md:text-lg">
          <Building2 className="text-primary" />
          <span>Company Name</span>
        </div>
        <span className="text-sm md:text-base">
          Bharat Bhakti Collective Ventures Pvt Ltd
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm  md:text-lg">
          <MapPin className="text-primary" />
          <span>Head Office</span>
        </div>
        <span className="text-sm md:text-base">
          Plot No.190,KH No.114 1st Flr, Vipin Garden Extn,G.No.37, Uttam Nagar,
          New Delhi, West Delhi- 110059, Delhi
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm md:text-lg">
          <Phone className="text-primary" />
          <span>Call Us</span>
        </div>
        <span className="text-sm md:text-base">+91 87867687666</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 text-sm md:text-lg">
          <Mail className="text-primary" />
          <span>Email Us</span>
        </div>
        <span className="text-sm md:text-base text-wrap wrap-break-word">
          BharatBhaktiSangam@gmail.com
        </span>
      </div>
    </div>
  );
}

export default FooterCompanyDetails;
