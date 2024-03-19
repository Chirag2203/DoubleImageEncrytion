import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import compimg from "../../assets/landing_page_vector.svg";
import dec from "../../../../backend/temp/decrypted_image.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  IoInformationCircle,
} from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { Input } from "../ui/input";

const Decrypt = () => {
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [encryptionParams, setEncryptionParams] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState(""); // New state for encryption key
  const [message, setMessage] = useState("");
  const [decryptionDone, setDecryptionDone] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setEncryptedImage(e.target.files[0]);
  };

  const handleParamsChange = (e) => {
    setEncryptionParams(e.target.files[0]);
  };

  // New function to handle encryption key input
  const handleKeyChange = (e) => {
    setEncryptionKey(e.target.value);
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("encrypted_image_input", encryptedImage);
    formData.append("encryption_params", encryptionParams);
    formData.append("encryption_key", encryptionKey); // Include encryption key in the request

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/decrypt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setLoading(false);
      setDecryptionDone(true)
    } catch (error) {
      setMessage( error.response.data.message);
      setLoading(false);
      setDecryptionDone(false)
      console.error("Error:", error.response.data.message);
    }
  };

  const handleDownloadImage = () => {
    const a = document.createElement("a");
    a.href = dec;
    a.download = "decrypted_image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-5/6 mx-auto shadow-md p-6 flex ">
        <div className="w-3/5 pr-8">
          <h1 className="text-3xl font-medium mb-4">Image Decryption</h1>
          <form onSubmit={handleDecrypt} className="glass p-4 rounded-md">
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="encrypted_image_input"
                className="font-medium flex items-center gap-2"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <IoInformationCircle className="cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    The image that was encrypted using the SecureT.
                  </HoverCardContent>
                </HoverCard>
                Encrypted Image:
              </label>
              <input
                type="file"
                id="encrypted_image_input"
                name="encrypted_image_input"
                accept="image/png"
                onChange={handleImageChange}
                required
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <label
                htmlFor="encryption_params"
                className="font-medium flex items-center gap-2"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <IoInformationCircle className="cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Encryption parameters that you downloaded while encrypting the image.
                  </HoverCardContent>
                </HoverCard>
                Encryption Parameters (JSON):
              </label>
              <input
                type="file"
                id="encryption_params"
                name="encryption_params"
                accept="application/json"
                onChange={handleParamsChange}
                required
              />
            </div>
            <div className="mt-4 flex flex-col gap-2 w-1/2">
              <label
                htmlFor="encryption_key"
                className="font-medium flex items-center gap-2"
              >
                <HoverCard>
                  <HoverCardTrigger>
                    <IoInformationCircle className="cursor-pointer" />
                  </HoverCardTrigger>
                  <HoverCardContent>
                   Your Encryption Key
                  </HoverCardContent>
                </HoverCard>
                Encryption Key
              </label>
              <Input
                type="text"
                id="encryption_key"
                name="encryption_key"
                className="text-black outline-none"
                value={encryptionKey} // Bind the value to the state
                onChange={handleKeyChange} // Update the state on change
                required
              />
            </div>
            <div className="mt-8">
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 px-4 rounded"
              >
                {loading ? "Decrypting..." : "Decrypt Image"}
              </Button>
            </div>
          </form>
          <p className="mt-8">{message}</p>
          {decryptionDone && message && (
            <>
              <div className="mt-8">
                <Button
                  onClick={handleDownloadImage}
                  className="bg-gradient-to-r flex items-center gap-2 from-purple-500 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium py-2 px-4 rounded"
                >
                 <IoMdDownload/> Download Decrypted Image
                </Button>
              </div>
              <p className="mt-8">This is your decrypted image</p>
              <img src={dec} alt="Decrypted Image" className="mt-4" />
            </>
          )}
        </div>
        <div className="w-1/2">
          <img src={compimg} className="ml-8" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Decrypt;
