import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import MotionEffects from "@/components/MotionEffects";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "rosewood HOTEL | Islamabad & Karachi", template: "%s | rosewood HOTEL" },
  description: "rosewood HOTEL offers thoughtful city stays and warm hospitality in F-8/3 Islamabad and P.E.C.H.S Karachi. Call 0370 6466550.",
  keywords: ["rosewood Hotel", "hotel Islamabad", "hotel F-8 Islamabad", "hotel Karachi", "hotel Shahrah-e-Faisal"],
  openGraph: { title: "rosewood HOTEL", description: "Stay well. Feel at home in Islamabad and Karachi.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0b1b28", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><body><MotionEffects />{children}<WhatsAppButton /></body></html>;
}
