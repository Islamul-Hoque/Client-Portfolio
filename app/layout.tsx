import type { Metadata } from "next";
import { Playfair_Display, Outfit, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ThreeBackground from "@/components/ThreeBackground";

// const playfair = Playfair_Display({
//   variable: "--font-playfair",
//   subsets: ["latin"],
//   display: "swap",
// });

const outfit = Outfit({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imamul Hoque Ishmam | Visual Storyteller & Film Director",
  description: "Film Director, Editor & Photographer. Transforming creative concepts into high-quality cinematic reality. Explore the storyteller behind the lens.",
  keywords: ["Imamul Hoque Ishmam", "Ishmam", "Film Director", "Video Editor", "Photographer", "Visual Storytelling", "Cinematography", "Portfolio"],
  openGraph: {
    title: "Imamul Hoque Ishmam | Visual Storyteller & Film Director",
    description: "Film Director, Editor & Photographer. Transforming creative concepts into high-quality cinematic reality.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // ${playfair.variable}
  return (
    <html
      lang="en"
      className={` ${geistSans.variable} ${outfit.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#08080a] text-[#f4f4f6]">
        <ThreeBackground />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

