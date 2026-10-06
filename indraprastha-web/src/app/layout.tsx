import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indraprastha NEET Academy – Crack NEET 2026/2027 with NCERT Line-by-Line",
  description:
    "India's most trusted NEET coaching academy. NCERT Line-by-Line teaching, 70,000+ students trained, 9+ years of excellence. Enroll now for NEET 2026/2027 batch.",
  keywords: "NEET coaching, NEET 2026, NEET 2027, NCERT coaching, medical entrance, Indraprastha Academy",
  openGraph: {
    title: "Indraprastha NEET Academy – Crack NEET 2026/2027",
    description: "India's most trusted NEET coaching. NCERT Line-by-Line teaching methodology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_app.jpeg" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
