import React from "react";
import { Button } from "../ui/button";

const Encrypt = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12  ">
      <div className="md:w-4/5 md:mx-auto mx-4 flex flex-col ">
        <span className="text-center text-4xl font-bold ">
          Upload your images
        </span>
        <h1 className="text-left text-xl font-medium mt-12">
          Upload the image that you want to encrypt
        </h1>
        <div className="flex items-center justify-center w-full mt-4">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer  dark:hover:bg-slate-800 dark:bg-slate-700 hover:border-purple-400 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-pink-800 dark:text-pink-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-pink-700 dark:text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop images
              </p>
              <p className="text-xs text-pink-700 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              name="images"
              className="hidden"
              multiple
              // onChange={onFileHandler}
              required
            />
          </label>
        </div>
        <h1 className="text-left text-xl font-medium mt-12 ">
          Upload a image that you want to display
        </h1>
        <div className="flex items-center justify-center w-full mt-4">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer  dark:hover:bg-slate-800 dark:bg-slate-700 hover:border-purple-400 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-pink-800 dark:text-pink-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-pink-700 dark:text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop images
              </p>
              <p className="text-xs text-pink-700 dark:text-gray-400">
                SVG, PNG, JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              name="images"
              className="hidden"
              multiple
              // onChange={onFileHandler}
              required
            />
          </label>
        </div>
      <Button className=" mx-auto w-1/4 mt-12 bg-gradient-to-tr from-col4 to-col3  ">Encrypt</Button>
      </div>
        
    </div>
  );
};

export default Encrypt;
