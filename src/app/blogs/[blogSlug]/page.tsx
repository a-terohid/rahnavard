import Blog from "@/models/Blog";
import BlogTestimonials from "@/models/Blogtestimonials";
import BlogTestimonialsReply from "@/models/BlogtestimonialsReply";
import User from "@/models/user";
import BlogDetailspage from "@/template/blogs/BlogDetailspage";
import { Blog_Interface } from "@/types/modelTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import slugify from "slugify";

// Helper to fetch a blog by ID
async function fetchBlogById(blogid: string): Promise<Blog_Interface | null> {
  await connectDB();
  return await Blog.findById(blogid);
}


// Helper function to clean HTML tags and trim text
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: { params: { blogSlug: string } }): Promise<Metadata> {
  const mongoId = params.blogSlug.split("-")[0];
  const blog = await fetchBlogById(mongoId);

  if (!blog) {
    return {
      title: "بلاگ پیدا نشد | رهنورد",
      description: "مطلب مورد نظر شما در وبسایت رهنورد یافت نشد.",
    };
  }

  const cleanDescription = blog.description ? stripHtml(blog.description).slice(0, 160) : "بدون توضیحات";

  return {
    title: `${blog.title} | رهنورد`,
    description: cleanDescription,
    keywords: [
      blog.title,
      "بلاگ کوهنوردی",
      "نکات کمپینگ",
      "راهنمای سفر طبیعت",
      "رهنورد بلاگ",
    ],
    openGraph: {
      title: blog.title,
      description: cleanDescription,
      url: `https://rahnavard.com/blog/${params.blogSlug}`,
      type: "article",
      images: [
        {
          url: blog.thumbnails || blog.images?.[0] || "/img/blog-thumbnail.png",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: cleanDescription,
      images: [blog.thumbnails || blog.images?.[0] || "/img/blog-thumbnail.png"],
    },
  };
}

// Static params for blog pages
export async function generateStaticParams() {
  await connectDB();
  const blogs: Blog_Interface[] = await Blog.find();

  const params = await Promise.all(
    blogs.map(async (blog) => {
      const autor =
        (await User.findOne({ _id: blog.autor_id })) 

      const autorName = autor ? `${autor.name}${autor.last_name || ""}` : "unknown";

      const slug = slugify(`${blog._id}-${blog.title}-${autorName}`, {
        lower: true,
        strict: true,
      });

      return { blogSlug: slug };
    })
  );

  return params;
}

// Blog Page Component
const page = async ({ params }: { params: { blogSlug: string } }) => {
  const mongoId = params.blogSlug.split("-")[0];
  const BLOG = await fetchBlogById(mongoId);

  const blogs = await Blog.find()
  const otherBLog = blogs.filter(block => block.id !== mongoId);
  const shuffled = otherBLog.sort(() => 0.5 - Math.random());

  if (!BLOG) redirect("/blogs")

  const { session, user } = await checkSession();
  
  const userIsAdmin = user?.role.includes("Admin") || user?.role.includes("Owner") || false;

  const autor =
    (await User.findOne({ _id: BLOG.autor_id })) 

  const otherBlogsWithAuthors = await Promise.all(
    shuffled.slice(0, 3).map(async (blog) => {
      const author =
        (await User.findOne({ _id: blog.autor_id })) 

      return {
        blog,
        author,
      };
    })
  );

  const BLogTestimonials = await BlogTestimonials.find({blog_id : mongoId})
  const Testimonials = await Promise.all(
    (await BLogTestimonials).map(async (ts)=>{
      const user = (await User.findOne({ _id: ts.user_id })) 

      const replies = await BlogTestimonialsReply.find({ parent_id : ts._id })

      const replyWithAuthors = await Promise.all(
        replies.map(async (reply:any) => {
          const author =
            (await User.findOne({ _id: reply.author_id }))

          return {
            reply,
            author,
          };
        })
      );


      return {
        Testimonial : ts,
        user,
        replies: replyWithAuthors,
      };
    })
  )

  return ( <BlogDetailspage 
                blog={BLOG} 
                author={autor} 
                otherBlogs={otherBlogsWithAuthors} 
                userIsAdmin={userIsAdmin} 
                Testimonials={Testimonials}/>);
};

export default page;