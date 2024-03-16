import React, { useState } from "react";
import axios from "axios";

const Hiding = () => {
  const [publicImage, setPublicImage] = useState(null);
  const [privateImage, setPrivateImage] = useState(null);
  const [message, setMessage] = useState("");

  const handlePublicImageChange = (e) => {
    setPublicImage(e.target.files[0]);
  };

  const handlePrivateImageChange = (e) => {
    setPrivateImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("public_image", publicImage);
    formData.append("private_image", privateImage);

    try {
      const response = await axios.post("http://127.0.0.1:5000/encode", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while hiding images.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-4/5 mx-auto shadow-md">
        <p className="text-2xl font-medium">
          Hide your images using LSB Hiding
        </p>
        <p className="mt-4">Upload the following images:</p>
        <form onSubmit={handleFormSubmit}>
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
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Encode Images
            </button>
          </div>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Hiding;
