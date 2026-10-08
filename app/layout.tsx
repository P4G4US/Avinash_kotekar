import type { Metadata } from "next";
import { sitePath } from "@/lib/site-path";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avinash Kotekar — Photographer & Creative Director",
  description:
    "Photography and creative direction across hospitality, food, architecture, lifestyle and luxury campaigns.",
  icons: {
    icon: sitePath("/favicon.ico"),
    shortcut: sitePath("/favicon.ico"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
