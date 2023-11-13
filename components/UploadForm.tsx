"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { DragEvent, useState } from "react";
import { Judgment } from "@/api/fileJudgment";
import Head from "next/head";
import { lodingMessage } from "@/const/lodingMessage";

const UploadForm = () => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [createImageURL, setCreateImageURL] = useState<string>("");
  const [uploadError, setUploadError] = useState<boolean | null>(null);
  const [judgmentError, setJudgmentError] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [jugement, setJugement] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const fileTypeJpeg = "image/jpeg";
  const fileTypePng = "image/png";
  const FileSize = 10 * 1024 * 1024;
  const fileUploaderClassName =
    "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10";
  const noticeTxt = "※明るくて被写体が大きく写った画像だと精度が上がります";

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setIsDragActive(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const onDropAlert = "ファイルは１個まで！";
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        const file = e.dataTransfer.files[0];
        if (
          (file.type === fileTypeJpeg || file.type === fileTypePng) &&
          file.size <= FileSize
        ) {
          setCreateImageURL(URL.createObjectURL(file));
          setImage(file);
        } else {
          setUploadError(true);
        }
      } else {
        alert(onDropAlert);
      }
    }
    e.dataTransfer.clearData();
  };

  const uploadToClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        (file.type === fileTypeJpeg || file.type === fileTypePng) &&
        file.size <= FileSize
      ) {
        setCreateImageURL(URL.createObjectURL(file));
        setImage(file);
      } else {
        setUploadError(true);
      }
    }
  };
  const fileJudgment = async () => {
    const jugeCat = "Cat";
    const jugeTail = "Tail";
    const jugementMessageTrue = "これは猫です";
    const jugementMessageInterime = "猫かは分かりませんが動物です";
    const jugementMessageFlase = "これは猫ではありません";
    if (image) {
      setJugement(lodingMessage);
      try {
        setJudgmentError(false);
        const res = await Judgment(image);
        console.log(res.tags);
        const resArrayCat = res.tags.includes(jugeCat);
        const resArrayTail = res.tags.includes(jugeTail);
        if (resArrayCat) {
          setJugement(jugementMessageTrue);
        } else if (resArrayTail) {
          setJugement(jugementMessageInterime);
          setNotice(noticeTxt);
        } else {
          setJugement(jugementMessageFlase);
          setNotice(noticeTxt);
        }
      } catch (error) {
        setJudgmentError(true);
        console.error("File upload error:", error);
      }
    } else {
      setUploadError(true);
    }
  };
  const handleReset = () => {
    setCreateImageURL("");
    setImage(null);
    setUploadError(false);
    setJudgmentError(false);
    setJugement(null);
    setNotice(null);
  };
  const ogTitle = jugement || "猫判定アプリ";
  const ogDescription = jugement
    ? `画像判定の結果:${jugement}`
    : "猫かどうかを画像から判定します";
  const ogImage = jugement ? createImageURL : "/icon-512x512.png";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            猫かどうかを判別します
          </h1>
          {image && (
            <div className={fileUploaderClassName}>
              <div className="text-center">
                <img src={createImageURL} />
              </div>
            </div>
          )}
          {!image && (
            <form>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                ></label>
                <div
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  className={
                    isDragActive
                      ? fileUploaderClassName + " opacity-50"
                      : fileUploaderClassName
                  }
                >
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>ファイルをアップロード</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={uploadToClient}
                        />
                      </label>
                      <p className="pl-1">もしくはドラッグ&ドロップ</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNGかJPGの10MBまでの画像
                    </p>
                    {uploadError === true && (
                      <p className="text-xs leading-5 text-red-600 ">
                        JPEGかPNGファイルの10MB以内のでお願いします
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {image && (
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={fileJudgment}
              >
                判定する
              </button>
            )}
            {image && (
              <button
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleReset}
              >
                リセット
              </button>
            )}
          </div>
          {judgmentError === true && (
            <p className="text-xs mt-4 text-center text-red-600">
              判定中にエラーが発生しました。
            </p>
          )}
          {jugement && (
            <p className="mt-10 text-2xl text-center underline">{jugement}</p>
          )}
          {notice ? (
            <p className="text-xs leading-5 text-red-600 text-center mt-2">
              {noticeTxt}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <Head>
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>
  );
};
export default UploadForm;
