"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {Judgment}  from "@/api/fileJudgment";

const UploadForm = () => {
  const [createImageURL, setCreateImageURL] = useState<string>("");
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean | null>(null);
  const [judgmentError, setJudgmentError] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);


  const uploadToClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 10 * 1024 * 1024
      ) {
        setCreateImageURL(URL.createObjectURL(file));
        setUploadSuccess(true);
        setImage(file);
      } else {
        setUploadError(true);
      }
    }
  };
  const fileJudgment = async () => {
    if (image) {
      try {
        const res = await Judgment(image);
        console.log(res.tags);
        setJudgmentError(false);
      } catch (error) {
        setJudgmentError(true);
        console.error("File upload error:", error);
      }
    } else {
      setUploadError(true);
    }
  };
  const handleReset = () =>{
    setCreateImageURL("")
    setUploadSuccess(false);
    setUploadError(false);
    setJudgmentError(false);
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className='class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900"'>
          猫かどうかを判別します
        </h1>
        {uploadSuccess === true && (
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <img src={createImageURL} />
            </div>
          </div>
        )}
        {uploadSuccess === false && (
          <form>
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
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
                    <p className="pl-1">もしくはドロップ&ドロップ</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNGかJPGの10MBまでの画像
                  </p>
                  {uploadError === true && (
                    <p className="text-xs leading-5 text-red-600">
                      JPEGかPNGファイルの10MB以内でお願いします
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={fileJudgment}
          >
            判定する
          </button>
          {uploadSuccess === true && (
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
      </div>
    </div>
  );
};
export default UploadForm;
