import React from "react";
import Head from "next/head";
import { MetaTypes } from "@/types/metatypes";

export const SeoHead = ({
  title,
  titleTemplate,
  description,
  ogType,
  imgURL,
  siteURL,
}: MetaTypes) => {
  const siteTitle = `${title} | ${titleTemplate}`;
  return (
    <Head>
      <meta name="viewport" content={"width=device-width, initial-scale=1"} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/assets/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/favicon-16x16.png"
      />
      <link rel="manifest" href="/assets/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/assets/safari-pinned-tab.svg"
        color="#ff85d4"
      />
      <meta name="msapplication-TileColor" content="#e48ee4" />
      <meta name="theme-color" content="#ffffff" />
      <link href={siteURL} rel="canonical" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgURL} />
      <meta property="og:url" content={siteURL} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgURL} />
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
    </Head>
  );
};
