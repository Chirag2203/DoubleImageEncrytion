import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';

const Decrypt = () => {
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [encryptionParams, setEncryptionParams] = useState(null);

  const handleImageChange = (e) => {
    setEncryptedImage(e.target.files[0]);
  };

  const handleParamsChange = (e) => {
    setEncryptionParams(e.target.files[0]);
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('encrypted_image_input', encryptedImage);
    formData.append('encryption_params', encryptionParams);

    try {
      const response = await axios.post('http://127.0.0.1:5000/decrypt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while decrypting the image.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-col1 to-col3 pt-24 text-white pb-12">
      <div className="w-4/5 mx-auto shadow-md p-6">
        <h1 className="text-2xl font-medium mb-4">Image Decryption</h1>
        <form onSubmit={handleDecrypt}>
          <div className="mt-4">
            <label htmlFor="encrypted_image_input">Encrypted Image:</label>
            <input
              type="file"
              id="encrypted_image_input"
              name="encrypted_image_input"
              accept="image/png"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="encryption_params">Encryption Parameters (JSON):</label>
            <input
              type="file"
              id="encryption_params"
              name="encryption_params"
              accept="application/json"
              onChange={handleParamsChange}
              required
            />
          </div>
          <div className="mt-8">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Decrypt Image
            </Button>
          </div>
        </form>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Decrypt;
