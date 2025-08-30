import { DashboardItems } from "@/constants/DashboardItems";
import Blog from "@/models/Blog";
import User from "@/models/user";
import BlogsDashboardpage from "@/template/Dashboard/BlogsDashboardpage";
import { UserRole } from "@/types/enums/generalEnums";
import { BlogsSearchParams_interface } from "@/types/StatesTypes";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// Metadata for SEO and social sharing (Persian - Rahnavard)
export const metadata: Metadata = {
  title: "بلاگ‌ها | داشبورد",
  description:
    "مشاهده، ایجاد و مدیریت تمامی مقالات بلاگ از طریق داشبورد مرکزی. محتوای خود را همیشه به‌روز، منظم و جذاب برای خوانندگان نگه دارید.",
  keywords: [
    "مدیریت بلاگ",
    "داشبورد بلاگ‌ها",
    "مدیریت مقالات",
    "داشبورد محتوا",
    "ویرایش بلاگ",
    "نوشتن بلاگ",
    "لیست بلاگ‌ها",
  ],
  robots: "index, follow", // Allow indexing
  openGraph: {
    title: "بلاگ‌ها | داشبورد",
    description:
      "مشاهده، ایجاد و مدیریت تمامی مقالات بلاگ از طریق داشبورد مرکزی. محتوای خود را همیشه به‌روز، منظم و جذاب برای خوانندگان نگه دارید.",
    url: "https://rahnavard.vercel.app/dashboard/blogs",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png", // Social share thumbnail
        width: 1200,
        height: 630,
        alt: "صفحه بلاگ‌ها - داشبورد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rahnavard", // Replace with official handle if exists
    title: "بلاگ‌ها | داشبورد",
    description:
      "مشاهده، ایجاد و مدیریت تمامی مقالات بلاگ از طریق داشبورد مرکزی. محتوای خود را همیشه به‌روز، منظم و جذاب برای خوانندگان نگه دارید.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async ({ searchParams }: { searchParams: BlogsSearchParams_interface }) => {
  
    // Connect to the MongoDB database
    await connectDB();

    // Check if the user session is valid and get user info
    const { session, user } = await checkSession();

    // Check if the user has permission to access the Properties dashboard
    const validRoles = DashboardItems.find(item => item.name === "بلاگ ها")?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    const userIsAdmin = user.role.includes("Admin") || user.role.includes("Owner");

    // Destructure and provide default values to search parameters
    const { page = "1", sort = "desc", title , startDate , endDate , published , autor_id } = searchParams;
    const sortValue = sort === "asc" ? 1 : -1;

    // Build the date filter if both startDate and endDate are provided
    const dateFilter =
        startDate && endDate
        ? {
            $expr: {
                $and: [
                {
                    $gte: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    startDate.slice(0, 10),
                    ],
                },
                {
                    $lte: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
                    endDate.slice(0, 10),
                    ],
                },
                ],
            },
            }
        : {};

    // Create MongoDB filter object to fetch users
    const combinedFilter: any = {
      ...dateFilter
    };

    if (autor_id) {
        combinedFilter.autor_id = autor_id;
    }

     if (title) {
        combinedFilter.title = { $regex: title, $options: "i" };
    }

    if (published === "true") {
        combinedFilter.published = true;
    } else if (published === "false") {
        combinedFilter.published = false;
    }

    // Set pagination settings
    const BlogsPerPage = 15;
    const currentPage = Math.max(parseInt(page), 1);

    // Get the total number of matching properties
    const totalBlogs = await Blog.countDocuments(combinedFilter);

    // Calculate total pages and clamp current page within valid range
    const totalPages = Math.ceil(totalBlogs / BlogsPerPage) || 1;
    const clampedPage = Math.min(currentPage, totalPages);

    // Fetch the paginated and sorted list of properties
    const blogs = await Blog.find(combinedFilter)
    .skip((clampedPage - 1) * BlogsPerPage)
    .limit(BlogsPerPage)
    .sort({ createdAt : sortValue });
    
    const authors_id = await Blog.distinct("autor_id");

    const userAuthors = await User.find({ _id: { $in: authors_id } });

    const authors = [...userAuthors];

    return (<BlogsDashboardpage 
                blogs={blogs} 
                authors={authors} 
                userIsAdmin={userIsAdmin}
                totalBlogs={totalBlogs}
                totalPages={totalPages}
                currentPage={currentPage}  /> );
};

export default page;