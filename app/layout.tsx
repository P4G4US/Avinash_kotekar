import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avinash Kotekar — Photographer & Creative Director",
  description:
    "Photography and creative direction across hospitality, food, architecture, lifestyle and luxury campaigns.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
