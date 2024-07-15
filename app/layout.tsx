import React from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "./globals.css";
import "@/styles/fonts.css";
import "@/styles/clamps.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "グリーンサクセサリー | マイプランター",
  description:
    "このページでは、サイト管理者が育てている多肉植物の一覧を確認することができます。",
  keywords: ["多肉植物", "プランター"],
  alternates: {
    canonical: "https://taniku.blog/planter/",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://taniku.blog/planter/",
    title: "グリーンサクセサリー | マイプランター",
    description:
      "このページでは、サイト管理者が育てている多肉植物の一覧を確認することができます。",
    images: ["/assets/og-image.png"],
    creator: "@johndoe",
  },
  openGraph: {
    type: "website",
    title: "グリーンサクセサリー | マイプランター",
    description:
      "このページでは、サイト管理者が育てている多肉植物の一覧を確認することができます。",
    siteName: "グリーンサクセサリー",
    url: "https://taniku.blog/planter/",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Og Image",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/assets/safari-pinned-tab.svg",
        color: "#ff85d4",
      },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/assets/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showButtons = process.env.SHOW_BUTTONS === "true";

  return (
    <html lang="ja">
      <head>
        {!showButtons && <GoogleTagManager gtmId="GTM-MZHSWFQ3" />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#e48ee4" />
      </head>
      <body className="relative">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
