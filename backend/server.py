import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from PIL import Image
import cv2

from hiding import encode_1, decode_1
from encdec import decrypt, securekey, update_lorentz, decompose_matrix, dna_encode, key_matrix_encode, xor_operation, gen_chaos_seq, sequence_indexing, scramble, dna_decode, recover_image
import json


app = Flask(__name__)
CORS(app, origins='http://localhost:5173') # This will enable CORS for all routes

#gloabl variables
global img_G, fx_G, fy_G, fz_G, Mk_e_G, blue_G, green_G, red_G


    


# Function to run hiding algorithmdef run_hiding_algo(path1, path2):
def run_hiding_algo(path1, path2):
    command = [
        'python', '-u',
        'hiding.py', 'encode1',
        path2, path1
    ]
    subprocess.run(command)
def run_decode_algo(path1):
    command = [
        'python', '-u',
        'hiding.py', 'decode1',
         path1
    ]
    subprocess.run(command)



# Route to handle image encoding
@app.route('/encode', methods=['POST'])
def encode():
    if 'public_image' not in request.files or 'private_image' not in request.files:
        return jsonify({'error': 'Missing files'}), 400
    
    public_image = request.files['public_image']
    private_image = request.files['private_image']

    # Save images to temporary directory
    public_image_path = 'temp/public_image.png'
    private_image_path = 'temp/private_image.png'
    public_image.save(public_image_path)
    private_image.save(private_image_path)

    # Run hiding algorithm
    result = run_hiding_algo(private_image_path, public_image_path)

    return jsonify({'message': "Image hidden successfully"}), 200

# Route to handle image decoding
@app.route('/decode', methods=['POST'])
def decode():
    if 'hidden_image' not in request.files:
        return jsonify({'error': 'Missing file'}), 400
    
    hidden_image = request.files['hidden_image']

    # Save hidden image to temporary directory
    hidden_image_path = 'temp/hidden_image.png'
    hidden_image.save(hidden_image_path)

    # Run decoding algorithm
    decoded_image_path = run_decode_algo(hidden_image_path)

    return jsonify({'decoded_image': decoded_image_path, 'message':'Image decoded successfully'}), 200


# Route to handle image encryption
@app.route('/encrypt', methods=['POST'])
def encrypt():
    
    try:
        if 'public_image' not in request.files or 'private_image' not in request.files:
            return jsonify({'error': 'Missing files'}), 400
        
        public_image = request.files['public_image']
        private_image = request.files['private_image']

        # Save public and private images to temporary directory
        public_image_path = "temp/public_image.png"
        private_image_path = "temp/private_image.png"
        public_image.save(public_image_path)
        private_image.save(private_image_path)
        
        global img_G, fx_G, fy_G, fz_G, Mk_e_G, blue_G, green_G, red_G

        # Perform encryption on private image
        key, m, n = securekey(private_image_path)
        update_lorentz(key)
        blue, green, red = decompose_matrix(private_image_path)
        blue_e, green_e, red_e = dna_encode(blue, green, red)
        Mk_e = key_matrix_encode(key, blue)
        blue_final, green_final, red_final = xor_operation(blue_e, green_e, red_e, Mk_e)
        x, y, z = gen_chaos_seq(m, n)
        fx, fy, fz = sequence_indexing(x, y, z)
        blue_scrambled, green_scrambled, red_scrambled = scramble(fx, fy, fz, blue_final, red_final, green_final)
        b, g, r = dna_decode(blue_scrambled, green_scrambled, red_scrambled)
        encrypted_image = recover_image(b, g, r, private_image_path)
        
        #assign to global
        img_G = encrypted_image
        fx_G = fx
        fy_G = fy   
        fz_G = fz
        Mk_e_G = Mk_e
        blue_G = blue
        green_G = green
        red_G = red
        

        # Prepare encryption parameters for response
        encryption_params = {
            'key': key,
            'm': m,
            'n': n,
            'fx': fx.tolist(),
            'fy': fy.tolist(),
            'fz': fz.tolist(),
            'Mk': Mk_e.tolist(),
            'blue': blue.tolist(),
            'green': green.tolist(),
            'red': red.tolist(),
            'img': encrypted_image.tolist()
            
        }
        np.save('params/fx.npy',fx)
        np.save('params/fy.npy',fy)
        np.save('params/fz.npy',fz)
        np.save('params/Mk_e.npy',Mk_e)
        np.save('params/blue.npy',blue)
        np.save('params/green.npy',green)
        np.save('params/red.npy',red)
        np.save('params/img.npy',encrypted_image)
        print(encryption_params)

        # Save encrypted image
        encrypted_image_filename = "encrypted_image.png"
        encrypted_image_path = "temp/encrypted_image.png"
        # cv2.imwrite(encrypted_image_path, encrypted_image)
        
        # Hide the encrypted image in the public image
        run_hiding_algo(encrypted_image_path, public_image_path)
        
        # save the encrypted hidden image
        encrypted_hidden_image_filename = "encrypted_hidden_image.png"
        encrypted_hidden_image_path = "temp/encrypted_hidden_image.png" 
        # cv2.imwrite(encrypted_hidden_image_path, encrypted_hidden_image)

        return jsonify({
            'message': 'Images encrypted successfully',
            'public_image_path': public_image_path,
            'encrypted_image_path': encrypted_image_path,
            'encrypted_hidden_image_path': encrypted_hidden_image_path,
            'encryption_params': encryption_params
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_decryption(file_path, params):
    global img_G, fx_G, fy_G, fz_G, Mk_e_G, blue_G, green_G, red_G
    
    # Extract encryption parameters from JSON object
    # key = params['key']
    # m = params['m']
    # n = params['n']
    # fx = params['fx']
    # fy = params['fy']
    # fz = params['fz']
    # Mk_e = np.array(params['Mk'])
    # blue = np.array(params['blue'])
    # green = np.array(params['green'])
    # red = np.array(params['red'])
    # img = np.array(params['img'])
    fx=np.load('params/fx.npy')
    fy=np.load('params/fy.npy')
    fz=np.load('params/fz.npy')
    Mk_e=np.load('params/Mk_e.npy')
    blue=np.load('params/blue.npy')
    green=np.load('params/green.npy')
    red=np.load('params/red.npy')
    img=np.load('params/img.npy')
    # Perform decryption
    decrypt(img, fx, fy, fz, file_path, Mk_e, blue, green, red)
    
    # Recover the hidden image from the public image using global variables
    # decrypt(img_G, fx_G, fy_G, fz_G, file_path, Mk_e_G, blue_G, green_G, red_G)
    
    return "Success"

@app.route('/decrypt', methods=['POST'])
def decryptNow():
    if 'encrypted_image_input' not in request.files or 'encryption_params' not in request.files:
        return jsonify({'error': 'Missing files'}), 400
    
    # Get the encrypted image and encryption parameters
    encrypted_image = request.files['encrypted_image_input']
    encryption_params_file = request.files['encryption_params']

    # # decode the hidden image
    hidden_image = request.files['encrypted_image_input']
    
    #save the hidden image
    hidden_image_path = "temp/hidden_image_input.png"
    hidden_image.save(hidden_image_path)
    
    # Run decoding algorithm
    run_decode_algo(hidden_image_path)
    
    # Save the encryption parameters JSON file
    encryption_params = json.load(encryption_params_file)

    # Perform decryption on the encrypted image using encryption parameters
    decrypted_image = perform_decryption('temp/encrypted_unhidden_image.png', encryption_params)

    return jsonify({'message': 'Image decrypted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True)
