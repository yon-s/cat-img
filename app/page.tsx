"use client";
import { useState,Suspense } from "react";
import UploadForm from "@/components/UploadForm";
import {chengeOgps} from "@/types/object";
import {siteName, description, img} from "@/const/ogp";
import { SEO_DEFAULT } from '@/utils/seo-config';
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/Google/GoogleAnalytics'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [ogp, setOgp] = useState<chengeOgps>({img, title: siteName, description: description});
  SEO_DEFAULT.title = 'TEST'
  return (
    <> 
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <title>{ogp.title}</title>
        <meta name="description"content={ogp.description} />
        <meta property="og:title" content={ogp.title} />
        <meta property="og:description"content={ogp.description} />
        <meta property="og:site name" content={ogp.title} />
        <meta property="og: image" content={ogp.img}/>
        <meta name="twitter:title" content={ogp.title}/>
        <meta name="twitter:description" content={ogp.description} />
        <meta name="twitter:image" content={ogp.img} />
      </head>
      <body className={inter.className}>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
        <UploadForm ogp={setOgp}/>
    </body>
    </>
  )
}
