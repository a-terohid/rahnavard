"use client";

import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { ImageModalProps_interface } from "@/types/pagesProps";
import { getCroppedImg } from "@/utils/cropImage";

// Component to display a modal with image cropping functionality
const ImageModule = ({ show, title, imagePriview, image, setImage, setImagePreview, setShow }: ImageModalProps_interface) => {
	
    
    const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    
	if (!show) return null;
    
	// Handle zoom changes
	const handleZoom = (amount: number): void => {
		const newZoom = zoom + amount;
		if (newZoom >= 1) setZoom(newZoom);
	};

	// Save cropped image and update preview
	const handleCropSave = async () => {
		if (!imagePriview || !croppedAreaPixels || !image || !setImage || !setImagePreview || !setShow) return;

		const croppedBlob = await getCroppedImg(imagePriview, croppedAreaPixels);
		const croppedFile = new File([croppedBlob], image.name || "cropped.jpg", { type: "image/jpeg" });

		setImage(croppedFile);
		setImagePreview(URL.createObjectURL(croppedFile));
		setShow(false);
	};

	// Reset selected image
	const resetImage = (): void => {
		if (setImage) setImage(null);
		if (setImagePreview) setImagePreview(null);
	};

	// Cancel cropping process
	const handleCropCancel = (): void => {
		if (setShow) setShow(false);
		resetImage();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<h3 className="text-lg font-semibold">{title}</h3>
					<button
						onClick={handleCropCancel}
						className="text-gray-500 hover:text-gray-700 text-xl"
					>
						×
					</button>
				</div>

				{/* Body */}
				<div className="p-4">
					<div className="relative w-full h-96 bg-gray-800 rounded-xl overflow-hidden">
						<Cropper
							image={imagePriview}
							crop={crop}
							zoom={zoom}
							aspect={1}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
						/>
					</div>

					{/* Actions */}
					<div className="flex justify-between mt-4 text-sm">
						{/* Zoom controls */}
						<div className="flex items-center gap-x-2">
							<button
								onClick={() => handleZoom(-0.25)}
								disabled={zoom <= 1}
								className="bg-Greyscale-600 text-Greyscale-50 disabled:opacity-15 rounded-full w-6 h-6 hover:bg-Greyscale-500 hover:text-Greyscale-800"
							>
								-
							</button>
							<span>{zoom.toFixed(2)}x</span>
							<button
								onClick={() => handleZoom(0.25)}
								className="bg-Greyscale-600 text-Greyscale-50 rounded-full w-6 h-6 hover:bg-Greyscale-500 hover:text-Greyscale-800"
							>
								+
							</button>
						</div>

						{/* Crop action buttons */}
						<div className="flex items-center gap-3">
							<button
								className="bg-red-500 text-white px-3 py-2 rounded"
								onClick={handleCropCancel}
							>
								Cancel
							</button>
							<button
								className="bg-green-600 text-white px-3 py-2 rounded"
								onClick={handleCropSave}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageModule;