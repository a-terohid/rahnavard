import { authOptions } from "@/lib/auth";
import User from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path, { join, basename } from "path";
import { mkdir, writeFile, stat } from "fs/promises";
import sharp from "sharp"

// PATCH request handler for updating user profile
export const PATCH = async (req: Request) => {
	try {
		// Connect to the database
		await connectDB();

		// Parse form data from the request
		const formData = await req.formData();
		const dataRaw = formData.get("data")?.toString();
		const profile_picture = formData.get("profile_picture") as File || null;

		let parsedData 

		// If data exists, parse it, else return error
		if(dataRaw) { 
			parsedData =  JSON.parse(dataRaw)
		} else { 
			return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 500 });
		}

		// Destructure the parsed data
		const {
			_id, name, last_name, phone_number , isCheckedCoverImage
		} = parsedData;

		let profile_picture_Name: string | undefined;
		
		
		// Get the user session
		const session = await getServerSession(authOptions);
		if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
		
		//Ensure the session user matches the submitted user ID
		if (session.user.id !== _id) {
			return NextResponse.json({ error: ERROR.UNAUTHORIZED }, { status: 403 });
		}

		// Find the user in the database based on role
		const user = await User.findOne({ _id });	
		
		if (!user) return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });

		// Define the directory for storing the profile picture
		const safeTitle = user.email.toLowerCase();
		const profile_picture_dir = `/store/users/${safeTitle}/profile_picture`;
		const profile_picture_upload_dir = join(process.cwd(), "public", profile_picture_dir);

		// Create the directory if it doesn't exist
		try {
			await stat(profile_picture_upload_dir);
		} catch (e: any) {
			if (e.code === "ENOENT") {
				await mkdir(profile_picture_upload_dir, { recursive: true });
			} else {
				console.error("Error creating directory:", e);
				return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
			}
		}

		// Handle profile picture upload if checked
		if (profile_picture && isCheckedCoverImage === "true") {
			// Delete old profile picture if it exists
			if (user.profile_picture) {

				const oldFileName = basename(user.profile_picture); // Extract file name from the path
				const coverImagePath = join(profile_picture_upload_dir, oldFileName);

				try {

					if (fs.existsSync(coverImagePath)) {
						fs.unlinkSync(coverImagePath);
						console.log("Old profile picture deleted:", coverImagePath);
					}

				} catch (err) {
					console.error("Error removing old profile picture:", err);
				}
			}

			// Save new profile picture after resizing and compressing
			const uint8Array = new Uint8Array(await profile_picture.arrayBuffer());
			const extension = "jpg"; 

			profile_picture_Name = `${_id}_${Date.now()}.${extension}`;

			const processedImage = await sharp(uint8Array)
				.resize(400, 400, { fit: "cover" })  // Resize the image to 400x400
				.jpeg({ quality: 80 })  // Compress the image to 80% quality
				.toBuffer();

			// Write the processed image to the file system
			await writeFile(
				join(profile_picture_upload_dir, profile_picture_Name),
				new Uint8Array(processedImage) 
			);
		}

		// Update user fields
		user.name = name;
		user.last_name = last_name;
		user.phone_number = phone_number;
		user.updatedAt = new Date();
		if (profile_picture_Name) user.profile_picture = `${profile_picture_dir}/${profile_picture_Name}`;


		// Save the updated user to the database
		await user.save();


		// Return success response with updated user info
		return NextResponse.json(
			{
				message: MESSAGE.PROFILE_EDIT,
				user: {
					name: user.name,
					last_name: user.last_name,
					phone_number: user.phone_number,
					profile_picture: user.profile_picture,
				},
			},
			{ status: 201 }
		);
	} catch (err) {
		console.log(err);

		// Return server error response in case of failure
		return NextResponse.json(
			{ error: ERROR.SERVER_ERROR },
			{ status: 500 }
		);
	}
};