import React, { useState } from 'react';
import axios from 'axios';

const Unhiding = () => {
  const [hiddenImage, setHiddenImage] = useState(null);
  const [decodedImage, setDecodedImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleHiddenImageChange = (e) => {
    setHiddenImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hidden_image', hiddenImage);

    try {
      const response = await axios.post('http://127.0.0.1:5000/decode', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setDecodedImage(response.data.decoded_image);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while decoding image.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-4/5 mx-auto shadow-md">
        <p className="text-2xl font-medium">Unhide your images</p>
        <p className="mt-4">Upload the hidden image:</p>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <label htmlFor="hidden_image">Hidden Image:</label>
            <input
              type="file"
              id="hidden_image"
              accept="image/*"
              onChange={handleHiddenImageChange}
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Decode Image
            </button>
          </div>
        </form>
        {message && <p className="mt-4">{message}</p>}
        {decodedImage && (
          <div className="mt-4">
            <p>Decoded Image:</p>
            <img src={decodedImage} alt="Decoded" className="mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Unhiding;
