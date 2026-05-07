import { Cinzel, Poppins } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});
