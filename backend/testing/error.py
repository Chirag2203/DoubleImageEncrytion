from PIL import Image
import seaborn as sns
def image_similarity(image1_path, image2_path, tolerance=0):
    image1 = Image.open(image1_path)
    image2 = Image.open(image2_path)

    if image1.size != image2.size:
        raise ValueError("Images must have the same dimensions")

    width, height = image1.size
    total_pixels = width * height
    matching_pixels = 0

    for x in range(width):
        for y in range(height):
            pixel1 = image1.getpixel((x, y))
            pixel2 = image2.getpixel((x, y))
            if all(abs(p1 - p2) <= tolerance for p1, p2 in zip(pixel1, pixel2)):
                matching_pixels += 1

    similarity_percentage = (matching_pixels / total_pixels) * 100
    return similarity_percentage

import numpy as np
import matplotlib.pyplot as plt
for i in range(1, 16):
    sim=[]
    image1_path = f"dec_images/decrypted_image{i}.png"
    image2_path = f"original{i}.jpg"
    tolerance = 0  # Adjust tolerance value as needed
    similarity = image_similarity(image1_path, image2_path, tolerance)
    sim.append(similarity)
    print("Similarity between the images with tolerance:", similarity, "%")
ax = sns.barplot(x=np.arange(len(sim)), y=sim)
ax.bar_label(ax.containers[0])
plt.axis('off')
plt.show()