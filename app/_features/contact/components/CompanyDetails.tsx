import { cinzel } from "@/_lib/fonts";

export default function CompanyDetails() {
  return (
    <div
      className="w-full
                  max-w-2xl
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
        className={`${cinzel.className} text-[clamp(1rem,calc(0.714rem+1.429vw),2rem)] font-bold text-heading`}
      >
        Company Details
      </h2>

      <div className="text-[clamp(0.875rem,calc(0.696rem+0.893vw),1.5rem)] flex flex-col gap-2 lg:gap-4 text-para">
        <p>
          <span className="font-semibold">Name : </span> Bharat Bhakti
          Collective Ventures Pvt Ltd
        </p>
        <p>
          <span className="font-semibold">Address : </span> Plot No.190,KH
          No.114 1st Flr, Vipin Garden Extn,G.No.37, Uttam Nagar, New Delhi,
          West Delhi- 110059, Delhi
        </p>
      </div>
    </div>
  );
}
