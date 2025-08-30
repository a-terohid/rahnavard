import { authOptions } from "@/lib/auth";
import Blog from "@/models/Blog";
import BlogTestimonials from "@/models/Blogtestimonials";
import BlogTestimonialsReply from "@/models/BlogtestimonialsReply";
import Log from "@/models/log";
import User from "@/models/user";
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
    const { parent_id, author_id, blog_id, message } = await req.json();

    // Validate required fields
    if (!parent_id || !author_id || !blog_id || !message) {
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

    // Check if the user exists (either a User or Agent)
    const existUser = await User.findOne({ _id: session.user.id }) 
    if (!existUser) {
        return NextResponse.json(
          { error: ERROR.CANT_FIND_HANDLER },
          { status: 422 }
        );
    }
    
    // Check user role permissions (must be Admin or Owner)
    if (!existUser.role.includes("Admin") && !existUser.role.includes("Owner")) {
    return NextResponse.json(
      { error: ERROR.ACCESS_DENIED },
      { status: 422 }
    );}

    const BLOG = await Blog.findOne({ _id : blog_id})
    if (!BLOG) return NextResponse.json({ error: ERROR.CANT_FIND_BLog }, { status: 404 });

    const Testimonial = await BlogTestimonials.findOne({_id : parent_id})
    if (!Testimonial) return NextResponse.json({ error: ERROR.CANT_FIND_TESTIMONIALS }, { status: 404 });

    const REPLY = await BlogTestimonialsReply.create({
      parent_id,     
      author_id,  
      message,
      createdAt: new Date(),
      updatedAt: new Date(),  
    })

    Testimonial.replies = [...Testimonial.replies , REPLY._id]
    await Testimonial.save()


    const slug = slugify(`${BLOG._id}-${BLOG.title}-${session.user?.name}${session.user?.last_name}`,{ lower: true, strict: true })
              
    revalidatePath(`/Blogs/${slug}`);
    

    // Log the form submission action
    await Log.create({
      title: `پاسخ جدیدی به تستیمونیال بلاگ با شناسه ${blog_id} توسط کاربر ${session.user?.email} ارسال شد`,
      action: LogsActions.NEW_BLOG_TESTIMONIALS,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    // Respond with a success message
    return NextResponse.json(
      { message: MESSAGE.NEW_BLOG_TESTIMONIALS_REPLY },
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