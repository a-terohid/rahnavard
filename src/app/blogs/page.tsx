import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogsPage from "@/template/blogs/BlogsPage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بلاگ‌ها | رهنورد",
  description:
    "جدیدترین مقالات و مطالب آموزشی درباره کوهنوردی، طبیعت‌گردی و کمپینگ در رهنورد. همراه ما باشید با نکات تخصصی، راهکارهای ایمنی و تجربه‌های سفر در دل طبیعت.",
  keywords: [
    "بلاگ کوهنوردی",
    "مقالات کمپینگ",
    "نکات سفر",
    "رهنورد",
    "راهنمای طبیعت‌گردی",
    "ایمنی در کوهستان",
    "تجهیزات کوهنوردی",
    "تورهای طبیعت‌گردی",
  ],
  robots: "index, follow",
  openGraph: {
    title: "بلاگ‌ها | رهنورد",
    description:
      "جدیدترین مقالات و نکات کاربردی در زمینه کوهنوردی و کمپینگ را در بلاگ رهنورد بخوانید و برای سفرهای بعدی آماده شوید.",
    url: "https://rahnavard.com/blogs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه بلاگ‌های رهنورد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rahnavard",
    title: "بلاگ‌ها | رهنورد",
    description:
      "با بلاگ‌های رهنورد همراه شوید؛ آموزش‌ها، تجربیات و نکات مهم درباره کوهنوردی، طبیعت‌گردی و کمپینگ.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: {page : string} }) => {

  await connectDB()

    const { page = "1" } = searchParams;

    // Set pagination settings
    const BlogsPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    // Get the total number of matching properties
    const totalBlogs = await Blog.countDocuments({published: true});

    // Calculate total pages and clamp current page within valid range
    const totalPages = Math.ceil(totalBlogs / BlogsPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    // Fetch the paginated and sorted list of properties
    const blogs = await Blog.find({published : true})
    .skip((clampedPage - 1) * BlogsPerPage)
    .limit(BlogsPerPage)
    .sort({ createdAt : -1 });

    const authors_id = await Blog.distinct("autor_id");

    const userAuthors = await User.find({ _id: { $in: authors_id } });

    const authors = [...userAuthors];

    return (<BlogsPage
                blogs={blogs} 
                authors={authors} 
                totalBlogs={totalBlogs}
                totalPages={totalPages}
                currentPage={currentPage}  />);
};

export default page;