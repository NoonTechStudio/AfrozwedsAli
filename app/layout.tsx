import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import { SvgDefs } from "./components/art";
import { wedding } from "./wedding";
import "./globals.css";

const pinyon = Pinyon_Script({ variable: "--font-pinyon", subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500"] });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: "400" });

const title = `${wedding.partnerOne} & ${wedding.partnerTwo} · ${wedding.dateLabel}`;
const description = "We'd love to celebrate this beautiful beginning with you. Kindly RSVP.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#ede4d3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pinyon.variable} ${cormorant.variable} ${jost.variable} ${amiri.variable} antialiased`}
    >
      <body className="min-h-svh">
        <SvgDefs />
        {children}
      </body>
    </html>
  );
}
