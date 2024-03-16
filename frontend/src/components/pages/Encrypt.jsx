import React, { useState } from "react";
import axios from "axios";

const Encrypt = () => {
  const [publicImage, setPublicImage] = useState(null);
  const [privateImage, setPrivateImage] = useState(null);
  const [message, setMessage] = useState("");
  const [encryptionParams, setEncryptionParams] = useState(null);

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
      const response = await axios.post("http://127.0.0.1:5000/encrypt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setMessage(response.data.message);
      setEncryptionParams(response.data.encryption_params);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while encrypting images.");
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-4/5 mx-auto shadow-md p-6">
        <h1 className="text-2xl font-medium mb-4">Image Encryption</h1>
        <form onSubmit={handleEncrypt}>
          <div className="mt-4">
            <label htmlFor="public_image">Public Image:</label>
            <input
              type="file"
              id="public_image"
              accept="image/*"
              onChange={handlePublicImageChange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="private_image">Private Image:</label>
            <input
              type="file"
              id="private_image"
              accept="image/*"
              onChange={handlePrivateImageChange}
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Encrypt Images
            </button>
          </div>
        </form>
        {message && <p className="mt-4">{message}</p>}
        {encryptionParams && (
          <div className="mt-4">
            <button
              onClick={handleDownloadParams}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Download Encryption Params
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Encrypt;
