import { Cinzel, Lato, Playfair, Poppins } from "next/font/google";

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

export const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
});

export const playfair = Playfair({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});