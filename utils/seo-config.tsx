
import { Metadata } from "next";
const url = "https://web.judging-cats.com/";

export const SEO_DEFAULT: Metadata = {
  metadataBase: new URL(url),
  openGraph: {
    url,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@azarashitokkari',
  }
};
