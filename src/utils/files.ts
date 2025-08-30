import { mkdir, writeFile, stat } from "fs/promises"; // Node.js fs module for async file system operations
import path, { join, basename } from "path"; // Node.js path module to work with file and directory paths
import sharp from "sharp"; // Image processing library

// Ensures the specified directory exists. If it doesn't, creates it recursively.
export async function ensureDirExists(dirPath: string) {
	try {
		await stat(dirPath); // Check if the directory exists
	} catch (e: any) {
		if (e.code === "ENOENT") {
			await mkdir(dirPath, { recursive: true }); // Create directory if it doesn't exist
		} else {
			console.error("Error creating directory:", e); // Log any other errors
		throw e;
		}
	}
}

// Processes an image file and saves it to the given directory with a specific name pattern.
// It resizes the image, converts it to JPEG, and returns the final filename.
export async function processAndSaveImageForProperties(
  file: File, // The uploaded file object
  targetPath: string, // The directory where the image will be saved
  namePrefix: string, // A prefix for the output filename (usually an ID)
  width = 1280, // Desired width of the output image (default: 1280)
  height = 960 // Desired height of the output image (default: 960)
): Promise<string> {

	// Convert file to a Uint8Array buffer
	const uint8Array = new Uint8Array(await file.arrayBuffer());

	// Extract the original name (without extension) from the uploaded file
	const originalName = path.parse(file.name).name;

	// Construct the output filename using the prefix and original name
	const filename = `${namePrefix}_${originalName}.jpg`;

	// Resize and convert the image using Sharp
	const processedImage = await sharp(uint8Array)
	.resize(width, height, { fit: "cover" }) // Resize with crop (cover)
	.jpeg({ quality: 85 }) // Convert to JPEG with quality 85
	.toBuffer(); // Output as buffer

	// Write the processed image to disk
	await writeFile(join(targetPath, filename), new Uint8Array(processedImage));

	// Return the saved filename
	return filename;
}