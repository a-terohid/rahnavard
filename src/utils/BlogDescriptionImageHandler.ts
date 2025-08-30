/**
	 * Replaces the `src` attribute of <img> tags in an HTML description
	 * with new image URLs from a provided list, unless the image source 
	 * already starts with `/store/` or `http` (external/hosted images).
	 *
	 * @param description - The HTML description containing <img> tags
	 * @param images - Array of new image URLs to replace the existing ones
	 * @returns Updated description with replaced image sources
 */

export function replaceDescriptionImageSrc(description: string, images: string[]) {
	let imageIndex = 0; // Tracks position in the `images` array

	const updatedDescription = description.replace(
		// Regex to match <img> tags and capture their `src` values
		/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g,
		(match, src) => {
			// Skip replacement if the src is already a hosted or stored image
			if (src.startsWith("/store/") || src.startsWith("http")) return match;

			// Get the next image URL from the array or fallback to the original src
			const newSrc = images[imageIndex] || src;
			imageIndex++;

			// Replace the old src with the new one in the matched <img> tag
			return match.replace(src, newSrc);
		}
	);

	return updatedDescription;
}