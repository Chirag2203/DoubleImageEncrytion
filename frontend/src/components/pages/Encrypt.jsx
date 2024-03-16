import React, { useState } from "react";
import axios from "axios";
import compimg from "../../assets/landing_page_vector.svg";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  IoDownload,
  IoDownloadSharp,
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import enc from "../../../../backend/temp/encrypted_hidden_image.png";

const Encrypt = () => {
  const [publicImage, setPublicImage] = useState(null);
  const [privateImage, setPrivateImage] = useState(null);
  const [message, setMessage] = useState("");
  const [encryptionParams, setEncryptionParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const handlePublicImageChange = (e) => {
    setPublicImage(e.target.files[0]);
  };

  const handlePrivateImageChange = (e) => {
    setPrivateImage(e.target.files[0]);
  };

  const handleEncrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("public_image", publicImage);
    formData.append("private_image", privateImage);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/encrypt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setMessage(response.data.message);
      setDownloadLink(response.data.encrypted_hidden_image_path);

      setEncryptionParams(response.data.encryption_params);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while encrypting images.");
      setLoading(false);
    }
  };

  const handleDownloadParams = () => {
    const jsonParams = JSON.stringify(encryptionParams);
    const blob = new Blob([jsonParams], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "encryption_params.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadImage = () => {
    // Create a new anchor element
    const a = document.createElement("a");
    // Set the href attribute to the path of the encrypted image
    a.href = enc;
    // Set the download attribute to specify the file name
    a.download = "encrypted_image.png";
    // Append the anchor element to the document body
    document.body.appendChild(a);
    // Simulate a click on the anchor element
    a.click();
    // Remove the anchor element from the document body
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-5/6 mx-auto shadow-md p-6 flex ">
        <div className="w-3/5 pr-8">
          <h1 className="text-3xl font-medium mb-2">Image Encryption</h1>
          <p className="mb-4">Input your files below</p>
          <form onSubmit={handleEncrypt} className="glass p-4 rounded-md">
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="public_image"
                className="font-medium flex items-center gap-2"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <IoInformationCircle className="cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Public is the image that will be visible to everyone. This
                    image will be used to hide the private image.
                  </HoverCardContent>
                </HoverCard>
                Public Image:
              </label>
              <input
                type="file"
                id="public_image"
                accept="image/*"
                onChange={handlePublicImageChange}
                required
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="private_image"
                className="font-medium flex items-center gap-2"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <IoInformationCircle className="cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    This is the image that you want to encrypt and hide from
                    others.
                  </HoverCardContent>
                </HoverCard>
                Private Image:
              </label>
              <input
                type="file"
                id="private_image"
                accept="image/*"
                onChange={handlePrivateImageChange}
                required
              />
            </div>
            <div className="mt-8">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 px-4 rounded"
              >
                {loading ? "Encrypting..." : "Encrypt Image"}
              </Button>
            </div>
          </form>
          {message && <p className="mt-8">{message}</p>}
          {encryptionParams && (
            <div className="flex flex-col gap-8 ">
              <div className="mt-4 flex gap-8">
                <Button
                  onClick={handleDownloadParams}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 px-4 rounded"
                >
                  <IoMdDownload /> Download Encryption Key
                </Button>
                <Button
                  variant={"outline"}
                  onClick={handleDownloadImage}
                  className="bg-col text-white hover:text-white focus:bg-transparent border-col4 hover:bg-transparent  hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-800"
                >
                  Download Image
                </Button>
              </div>
              <img src={enc} alt="" />
            </div>
          )}
        </div>
        <div className="w-1/2">
          <img src={compimg} className="ml-8" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Encrypt;
