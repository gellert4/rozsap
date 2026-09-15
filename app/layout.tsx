import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALTER AI — Your face. Any scene.",
  description: "Create consistent AI photos, outfit edits and creator-ready visuals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
