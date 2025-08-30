import { authOptions } from "@/lib/auth";
import Blog from "@/models/Blog";
import Log from "@/models/log";
import { LogsActions } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import connectDB from "@/utils/connectDB";
import { ensureDirExists, processAndSaveImageForProperties } from "@/utils/files";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { join } from "path";


export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse multipart/form-data from request
    const formData = await req.formData();

    // Extract blog content data and files
    const dataRaw = formData.get("data")?.toString(); // JSON content from client
    const thumbnail = formData.get("thumbnail") as File || null; // Main image (cover)
    const images = formData.getAll("images") as File[] || []; // Additional images

    // Get the currently logged-in user session
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    const user = session.user;
    let parsedData;

    // Check that content data is present
    if (!dataRaw) return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });
    parsedData = JSON.parse(dataRaw);

    const { title, description, testimonials } = parsedData;

    // Validate required fields
    if (!title || !description) return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 400 });

    // Create a new Blog document (initially without image paths)
    const newBlog = await Blog.create({
      title,
      description, // Stored as rich text HTML string
      autor_id: user.id,
      thumbnails: "",
      images: [],
      published: false,
      PublishedBY: {
        userId: user.id,
        email: user.email,
      },
      testimonials: testimonials || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const blogId = newBlog._id.toString(); // Unique blog ID used for file structure

    // Define directories to store images
    const thumbnailDir = `/store/blogs/${blogId}/thumbnail`;
    const imagesDir = `/store/blogs/${blogId}/images`;

    const thumbnailUploadPath = join(process.cwd(), "public", thumbnailDir);
    const imagesUploadPath = join(process.cwd(), "public", imagesDir);

    // Ensure both directories exist
    await ensureDirExists(thumbnailUploadPath);
    await ensureDirExists(imagesUploadPath);

    let thumbnailName: string | undefined = "";
    let imagesNames: string[] = [];

    // Process and save the thumbnail image if it exists
    if (thumbnail && thumbnail.type.startsWith("image/")) {
      thumbnailName = await processAndSaveImageForProperties(thumbnail, thumbnailUploadPath, blogId, 600, 400);
    }

    // Process and save all additional images
    for (const image of images) {
      if (image.type.startsWith("image/")) {
        const imageName = await processAndSaveImageForProperties(image, imagesUploadPath, blogId);
        imagesNames.push(`${imagesDir}/${imageName}`);
      }
    }

    // Save image paths to the Blog document
    newBlog.thumbnails = `${thumbnailDir}/${thumbnailName}`;
    newBlog.images = imagesNames;

    await newBlog.save(); // Save updated blog with image paths

    await Log.create({
            title: `بلاگ جدید با شناسه ${newBlog._id} توسط کاربر ${session.user?.email} اضافه شد`,
            action: LogsActions.NEW_BLOG,
            user_id: session.user.id,
            createdAt: new Date(),
    });

    // Return success response
    return NextResponse.json({ message: MESSAGE.NEW_BLOG, blog: newBlog }, { status: 200 });

  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
  }
}