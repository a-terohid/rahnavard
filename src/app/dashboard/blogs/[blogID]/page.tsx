import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogdetailsDashboard from "@/template/Dashboard/BlogdetailsDashboard";
import { Blog_Interface, User_Interface } from "@/types/modelTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// Helper: remove HTML tags
function stripHTML(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export async function generateMetadata({ params: { blogID } }: { params: { blogID: string } }): Promise<Metadata> {
  await connectDB();

  const blog = await Blog.findById(blogID);

  if (!blog) {
    return {
      title: "بلاگ پیدا نشد | داشبورد",
      description: "بلاگ مورد نظر در داشبورد رهنورد یافت نشد.",
    };
  }

  const title = blog.title || "بلاگ بدون عنوان";
  const description = blog.description ? stripHTML(blog.description) : "توضیحی برای این بلاگ ثبت نشده است.";
  const image = blog.thumbnails || "/img/default-blog-thumbnail.png";

  return {
    title: `${title} | جزئیات بلاگ`,
    description: description,
    keywords: [
      title,
      "بلاگ رهنورد",
      "داشبورد بلاگ",
      "مدیریت محتوا",
      "مقالات",
    ],
    robots: "index, follow", // 👈 چون عمومی‌ست، noindex لازم نیست
    openGraph: {
      title: `${title} | جزئیات بلاگ`,
      description: description,
      url: `https://rahnavard.vercel.app/dashboard/blogs/${blog._id}`,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `تصویر بندانگشتی برای ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Rahnavard",
      title: `${title} | جزئیات بلاگ`,
      description: description,
      images: [image],
    },
  };
}

const page = async ({ params: { blogID } }: { params: { blogID: string } }) => {

    // Connect to MongoDB
    await connectDB();

    const { session, user } = await checkSession();

    const userIsAdmin = user?.role.includes("Admin") || user?.role.includes("Owner") || false;


    // Find the property by ID from the database
    const blog = await Blog.findById(blogID);

    if (!user) return

    const author : User_Interface | null = await User.findOne({ _id: blog?.autor_id }) 
    

    if(!blog) return(<div className="p-4">
        <h1>بلاگ پیدا نشد</h1>
    </div>)


    return ( <BlogdetailsDashboard blog={blog} author={author} userIsAdmin={userIsAdmin}  /> );
};

export default page;