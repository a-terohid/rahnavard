import { Area } from "react-easy-crop";

// Function to create an image from a URL and return a Promise
// It handles the loading of the image and resolves when the image is successfully loaded.
const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Prevent CORS issues 
      image.src = url;
      image.onload = () => resolve(image); // Resolves the Promise with the image object once loaded
      image.onerror = (error) => reject(error); // Rejects the Promise if there's an error loading the image
    });
};


// Function to get a cropped version of the image based on the provided cropping area
// The image is loaded first, then drawn onto a canvas, and a Blob of the cropped image is returned.
export const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    const image = await createImage(imageSrc); // Wait for the image to be loaded
    const canvas = document.createElement("canvas"); // Create a new canvas element
    const ctx = canvas.getContext("2d"); // Get the 2d context of the canvas
  
    // Set canvas dimensions to match the cropping area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Draw the cropped section of the image on the canvas
    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // Convert the canvas content to a Blob and return it as a JPEG image
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob); // Resolves the Promise with the image Blob
      }, "image/jpeg");
    });
};