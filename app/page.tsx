"use client";
import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import {chengeOgps} from "@/types/object";

export default function Home() {
  const [ogp, setOgp] = useState<chengeOgps>({img:"/default-og-image.jpg",title:"猫判定アプリ",description:"画像から猫を判定します"});
  return (
    <>
      <UploadForm ogp={setOgp}/>
      <p className="text-center">{`${ogp.img} ${ogp.title} / ${ogp.description}`}</p>
    </>
  )
}
