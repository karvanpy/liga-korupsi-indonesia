import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { organizationSchema, websiteSchema } from "./schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liga Korupsi Indonesia - Platform Visualisasi Data Kasus Korupsi",
  description: "Platform visualisasi data interaktif tentang kasus-kasus korupsi di Indonesia. Meningkatkan kesadaran publik dan transparansi dalam pemberantasan korupsi.",
  keywords: "korupsi indonesia, kasus korupsi, data korupsi, visualisasi data korupsi, transparansi, anti korupsi, koruptor indonesia, kasus korupsi terbesar, kerugian negara, pemberantasan korupsi",
  authors: [{ name: "Liga Korupsi Indonesia" }],
  openGraph: {
    title: "Liga Korupsi Indonesia - Platform Visualisasi Data Kasus Korupsi",
    description: "Platform visualisasi data interaktif tentang kasus-kasus korupsi di Indonesia. Meningkatkan kesadaran publik dan transparansi dalam pemberantasan korupsi.",
    url: "https://liga-korupsi-indo.vercel.app",
    siteName: "Liga Korupsi Indonesia",
    locale: "id_ID",
    type: "website",
    images: [{
      url: "https://liga-korupsi-indo.vercel.app/og-image.png",
      width: 1200,
      height: 630,
      alt: "Liga Korupsi Indonesia"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Liga Korupsi Indonesia - Platform Visualisasi Data Kasus Korupsi",
    description: "Platform visualisasi data interaktif tentang kasus-kasus korupsi di Indonesia",
    images: ["https://liga-korupsi-indo.vercel.app/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "f90c1f932d741bf1"
  },
  metadataBase: new URL("https://liga-korupsi-indo.vercel.app"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `${JSON.stringify(organizationSchema)}\n${JSON.stringify(websiteSchema)}`
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
