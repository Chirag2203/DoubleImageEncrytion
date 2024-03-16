import sys
from PIL import Image


def encode_1(public_image, private_image):  # Encoding function for 1 color pixel - Takes two arguments
    """
    This function encodes the private_image inside the public_image.
    It uses 1 color pixel.
    """

    public_img = Image.open(public_image)  # Gets information for the public image
    private_img = Image.open(private_image)  # Gets information for the private image
    x_public_max = public_img.size[0]  # The max for the public image on the x-coordinate
    x_public = 0
    y_public = 0

    # Gets the size information for the private image:
    width = '{0:016b}'.format(private_img.size[0])
    height = '{0:016b}'.format(private_img.size[1])

    for i in range(1, 17):  # Saves the width for the private image
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        size_x = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:7] + '{0}'.format(int(width[i-1]))
        other_colors = public_img.getpixel((x_public, y_public))
        public_img.putpixel((x_public, y_public), (int(size_x, 2), other_colors[1], other_colors[2]))
        x_public += 1

    for i in range(1, 17):  # Save the height for the private image
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        size_y = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:7] + '{0}'.format(int(height[i-1]))
        other_colors = public_img.getpixel((x_public, y_public))
        public_img.putpixel((x_public, y_public), (int(size_y, 2), other_colors[1], other_colors[2]))
        x_public += 1

    for x in range(private_img.size[0]):
        for y in range(private_img.size[1]):

            red_private = '{0:08b}'.format(private_img.getpixel((x, y))[0])  # Converts red color to binary
            for i in range(1, 9):  # Red
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                red = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:7] + '{0}'.format(int(red_private[i-1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (int(red, 2), other_colors[1], other_colors[2]))
                x_public += 1

            green_private = '{0:08b}'.format(private_img.getpixel((x, y))[1])  # Converts green color to binary
            for i in range(1, 9):  # Green
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                green = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[1])[:7] + '{0}'.format(int(green_private[i-1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (other_colors[0], int(green, 2), other_colors[2]))
                x_public += 1

            blue_private = '{0:08b}'.format(private_img.getpixel((x, y))[2])  # Converts blue color to binary
            for i in range(1, 9):  # Blue
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                blue = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[2])[:7] + '{0}'.format(int(blue_private[i-1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (other_colors[0], other_colors[1], int(blue, 2)))
                x_public += 1

    return public_img  # Returns the public image with the private image inside.


def decode_1(encoded_image):  # Decoding function for 1 color pixel - Takes one argument
    """
    This function decodes the image inside another image.
    It only reads 1 color pixel.
    """

    public_img = Image.open(encoded_image)  # Gets information for public image
    x_public_max = public_img.size[0]
    x_public = 0
    y_public = 0

    x_private_size = ""
    y_private_size = ""

    for _ in range(1, 17):
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        x_private_size += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-1]
        x_public += 1

    for _ in range(1, 17):
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        y_private_size += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-1]
        x_public += 1

    private_img = Image.new("RGB", (int(x_private_size, 2), int(y_private_size, 2)))

    for x in range(int(x_private_size, 2)):  # Loops through the x-coordinate for public image.
        for y in range(int(y_private_size, 2)):  # Loops through the y-coordinate for public image.
            red = ""
            green = ""
            blue = ""

            for _ in range(1, 9):  # Red
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                red += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-1]
                x_public += 1

            for _ in range(1, 9):  # Green
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                green += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[1])[-1]
                x_public += 1

            for _ in range(1, 9):  # Blue
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                blue += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[2])[-1]
                x_public += 1

            private_img.putpixel((x, y), (int(red, 2), int(green, 2), int(blue, 2)))

    return private_img


# Encode function with 2 color pixels


def encode_2(public_image, private_image):  # Function for encoding image
    """
    This function encodes the private_image inside the public_image.
    It uses 2 color pixel.
    """

    public_img = Image.open(public_image)  # Gets information for public image
    private_img = Image.open(private_image)  # Gets information for private image
    x_public_max = public_img.size[0]
    x_public = 0
    y_public = 0
    x_size = '{0:016b}'.format(private_img.size[0])
    y_size = '{0:016b}'.format(private_img.size[1])

    for l in range(1, 16, 2):
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        size_x = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:6] + '{0}'.format(str(x_size[l-1:l+1]))
        other_colors = public_img.getpixel((x_public, y_public))
        public_img.putpixel((x_public, y_public), (int(size_x, 2), other_colors[1], other_colors[2]))
        x_public += 1

    for l in range(1, 16, 2):  # Image size y
        if x_public == x_public_max:
            y_public += 1
            x_public = 0

        size_y = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:6] + '{0}'.format(str(y_size[l-1:l+1]))
        other_colors = public_img.getpixel((x_public, y_public))
        public_img.putpixel((x_public, y_public), (int(size_y, 2), other_colors[1], other_colors[2]))
        x_public += 1

    for x in range(private_img.size[0]):
        for y in range(private_img.size[1]):

            red_private = '{0:08b}'.format(private_img.getpixel((x, y))[0])  # Converts red color to binary

            for l in range(1, 8, 2):  # Red
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                red = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[:6] + '{0}'.format(str(red_private[l-1:l+1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (int(red, 2), other_colors[1], other_colors[2]))
                x_public += 1

            green_private = '{0:08b}'.format(private_img.getpixel((x, y))[1])  # Converts green color to binary
            for l in range(1, 8, 2):  # Green
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                green = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[1])[:6] + '{0}'.format(str(green_private[l-1:l+1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (other_colors[0], int(green, 2), other_colors[2]))
                x_public += 1

            blue_private = '{0:08b}'.format(private_img.getpixel((x, y))[2])  # Converts blue color to binary
            for l in range(1, 8, 2):  # Blue
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0
                blue = '{0:08b}'.format(public_img.getpixel((x_public, y_public))[2])[:6] + '{0}'.format(str(blue_private[l-1:l+1]))
                other_colors = public_img.getpixel((x_public, y_public))
                public_img.putpixel((x_public, y_public), (other_colors[0], other_colors[1], int(blue, 2)))
                x_public += 1

    return public_img  # Returns the public image with the private image inside.


def decode_2(public_image):  # Function for decoding image
    """
    This function decodes the image inside another image.
    It only reads 2 color pixel.
    """

    public_img = Image.open(public_image)  # Gets information for public image
    x_public_max = public_img.size[0]
    x_public = 0
    y_public = 0

    x_private_size = ""
    y_private_size = ""

    for _ in range(1, 16, 2):
        if x_public == x_public_max:
            y_public += 1
            x_public = 0
        x_private_size += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-2:8]
        x_public += 1

    for _ in range(1, 16, 2):
        if x_public == x_public_max:
            y_public += 1
            x_public = 0
        y_private_size += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-2:8]
        x_public += 1

    print(int(x_private_size, 2), int(y_private_size, 2))

    private_img = Image.new("RGB", (int(x_private_size, 2), int(y_private_size, 2)))
    for x in range(int(x_private_size, 2)):  # Loops through the x-coordinate for public image.
        for y in range(int(y_private_size, 2)):  # Loops through the y-coordinate for public image.
            red = ""
            green = ""
            blue = ""
            for _ in range(1, 5):  # Red
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                red += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[0])[-2:8]
                x_public += 1

            for _ in range(1, 5):  # Green
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                green += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[1])[-2:8]
                x_public += 1

            for _ in range(1, 5):  # Blue
                if x_public == x_public_max:
                    y_public += 1
                    x_public = 0

                blue += '{0:08b}'.format(public_img.getpixel((x_public, y_public))[2])[-2:8]
                x_public += 1

            private_img.putpixel((x, y), (int(red, 2), int(green, 2), int(blue, 2)))

    return private_img


if len(sys.argv) >= 4:
    if sys.argv[1] == "encode1":
        temp_public_img = Image.open(sys.argv[2])
        temp_private_img = Image.open(sys.argv[3])
        temp_public_size = temp_public_img.size[0] * temp_public_img.size[1]
        temp_private_img = temp_private_img.size[0] * temp_private_img.size[1]
        if temp_public_size > temp_private_img * 24:
            print("Private image can fit inside the public.")
            print("Begins to encode the private image in the public...\n")

            encode_1(sys.argv[2], sys.argv[3]).save("temp/encrypted_hidden_image.png")
            print("Image has successfully been saved as encrypted_hidden_image.png")
        else:
            print("ERROR: Private image is too bit to fit")

    elif sys.argv[1] == "encode2":
        temp_public_img = Image.open(sys.argv[2])
        temp_private_img = Image.open(sys.argv[3])
        temp_public_size = temp_public_img.size[0] * temp_public_img.size[1]
        temp_private_img = temp_private_img.size[0] * temp_private_img.size[1]
        if temp_public_size > temp_private_img * 12:
            print("Private image can fit inside the public.")
            print("Begins to encode the private image in the public...\n")

            encode_2(sys.argv[2], sys.argv[3]).save("secret.png")
            print("Image has successfully been saved as secret.png")
        else:
            print("ERROR: Private image is too bit to fi,")

elif len(sys.argv) >= 3:
    if sys.argv[1] == "decode1":
        print("Make sure you used the right color pixel argument")
        print("Application will now decode the image...\n")

        decode_1(sys.argv[2]).save("temp/encrypted_unhidden_image.png")
        print("Image has been saved as encrypted_unhidden_image.png")

    elif sys.argv[1] == "decode2":
        print("Make sure you used the right color pixel argument")
        print("Application will now decode the image...\n")

        decode_2(sys.argv[2]).save("output.png")
        print("Image has been saved as output.png")

else:
    print("The right uses:")
    print("1 color pixel:")
    print(" - Python file.py encode1 img1 img2")
    print(" - Python file.py decode1 img")
    print("\n2 color pixels:")
    print(" - Python file.py encode2 img1 img2")
    print(" - Python file.py decode2 img")