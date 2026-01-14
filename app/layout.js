import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import BackgroundFx from "./components/BackgroundFx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ahad.io",
  description: "Portfolio Website",
  other: {
    "google-font-pressstart2p":
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <BackgroundFx />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
