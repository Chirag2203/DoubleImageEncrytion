# Image Encryption using Chaotic Systems and DNA Encoding

This Python script demonstrates a method for encrypting and decrypting images using chaotic systems, DNA encoding, and cryptographic techniques.

## Features

- **Image Encryption**: Encrypt images using a combination of chaotic systems, DNA encoding, and cryptographic techniques to ensure secure transmission and storage of sensitive visual data.

- **Secure Key Generation**: Generate a secure cryptographic key (digest) based on the pixel values of the input image using the SHA-256 hashing algorithm. This key serves as the foundation for the encryption process, ensuring robust security.

- **Chaotic System Initialization**: Initialize chaotic sequences based on the generated cryptographic key to provide additional randomness for encryption. Chaotic systems introduce unpredictability, making it extremely challenging for adversaries to decrypt the image without the correct key.

- **DNA Encoding**: Convert image data and cryptographic key into DNA-encoded sequences for added security. DNA encoding mimics the structure of genetic code, further enhancing the complexity and resilience of the encryption process.

- **Scrambling and XOR Operations**: Scramble image data using chaotic sequences and perform XOR operations with DNA-encoded sequences to encrypt the image securely. These operations ensure that the encrypted image is highly resistant to unauthorized access and tampering.

- **LSB Hiding**: Employ Least Significant Bit (LSB) hiding technique to embed additional information within the encrypted image without perceptibly altering its visual appearance. This technique enhances covert communication and confidentiality preservation.
- **Image Decryption**: Decrypt the encrypted image to recover the original image using the same cryptographic key and chaotic sequences. The decryption process reverses the encryption steps, enabling authorized users to access the original image with ease.

## Prerequisites

- Python 3.x
- PIL (Python Imaging Library)
- OpenCV (`cv2`)
- NumPy
- SciPy
- Matplotlib
- tkinter (for GUI file selection)
- hashlib

## Installation
### To run the backend:
``` 
    cd backend
    .\venv\Scripts\activate
    python server.py
```

### To run the frontend:
``` 
    cd frontend
    npm install
    npm run dev
```

## 🔗 Links
Github Repo:
https://github.com/Chirag2203/DoubleImageEncrytion
Deployed Site-https://double-image-encrytion.vercel.app/ 
