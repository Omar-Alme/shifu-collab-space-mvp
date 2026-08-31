import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CollabOS",
  description: "Community intelligence and opportunity platform for CollabSpace."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="executive-shell">{children}</body>
    </html>
  );
}
