import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost Manager",
  description: "Track your expenses easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  ); 
}