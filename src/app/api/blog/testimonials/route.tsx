import { authOptions } from "@/lib/auth";
import Blog from "@/models/Blog";
import BlogTestimonials from "@/models/Blogtestimonials";
import Log from "@/models/log";
import { LogsActions } from "@/types/enums/generalEnums";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { Blog_Testimonials_interface } from "@/types/modelTypes";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Extract data from the request body
    const { user_id, blog_id, rate, message } = await req.json();

    // Validate required fields
    if (!user_id || !blog_id || !rate || !message) {
      return NextResponse.json(
        { error: ERROR.INVALID_DATA },
        { status: 400 } // Bad Request
      );
    }

    // Check for an active user session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: ERROR.LOGIN },
        { status: 401 } // Unauthorized
      );
    }

    if (typeof rate !== "number" || rate < 1 || rate > 5) {
        return NextResponse.json({ error: "مقدار امتیاز نامعتبر است" }, { status: 400 });
    }

    const BLOG = await Blog.findOne({ _id : blog_id})

    // Create a new Testimonial entry object
    const newTestimonials: Blog_Testimonials_interface = {
        user_id,
        blog_id,
        rate, 
        message,
        replies : [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    // Save the new form entry to the database
    const Testimonials = await BlogTestimonials.create(newTestimonials);


    const slug = slugify(`${BLOG._id}-${BLOG.title}-${session.user?.name}${session.user?.last_name}`,{ lower: true, strict: true })
              
    revalidatePath(`/Blogs/${slug}`);
    

    // Log the form submission action
    await Log.create({
      title: `تستیمونیال جدید برای بلاگ با شناسه ${blog_id} توسط کاربر ${session.user?.email} ارسال شد`,
      action: LogsActions.NEW_BLOG_TESTIMONIALS,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    // Respond with a success message
    return NextResponse.json(
      { message: MESSAGE.NEW_BLOG_TESTIMONIALS },
      { status: 200 } // OK
    );
  } catch (error) {
    console.log("Error in sending message:", error);

    // Respond with a server error if something goes wrong
    return NextResponse.json(
      { error: ERROR.SERVER_ERROR },
      { status: 500 } // Internal Server Error
    );
  }
}