
import { Metadata } from "next";
import {url} from "@/const/ogp"

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
