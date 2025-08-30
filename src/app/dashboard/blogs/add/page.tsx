import { DashboardItems } from '@/constants/DashboardItems';
import AddBlogDashboardPage from '@/template/Dashboard/AddBlogDashboardPage';
import { UserRole } from '@/types/enums/generalEnums';
import { checkSession } from '@/utils/CheckSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Metadata for SEO and social sharing (Persian - Rahnavard)
export const metadata: Metadata = {
  title: "افزودن بلاگ جدید | داشبورد",
  description:
    "به‌سادگی بلاگ‌های جدید ایجاد و منتشر کنید. محتوا بنویسید، تصاویر بارگذاری کنید و مقالات خود را از طریق داشبورد مدیریت نمایید.",
  keywords: [
    "افزودن بلاگ",
    "داشبورد بلاگ",
    "مدیریت محتوا",
    "نوشتن مقاله",
    "بارگذاری تصاویر بلاگ",
    "بلاگ جدید",
    "ویرایشگر پست",
    "ابزار انتشار بلاگ",
  ],
  robots: "index, follow", // اجازه ایندکس شدن
  openGraph: {
    title: "افزودن بلاگ جدید | داشبورد",
    description:
      "به‌سادگی بلاگ‌های جدید ایجاد و منتشر کنید. محتوا بنویسید، تصاویر بارگذاری کنید و مقالات خود را از طریق داشبورد مدیریت نمایید.",
    url: "https://rahnavard.vercel.app/dashboard/blogs/add",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "افزودن بلاگ - داشبورد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rahnavard",
    title: "افزودن بلاگ جدید | داشبورد",
    description:
      "به‌سادگی بلاگ‌های جدید ایجاد و منتشر کنید. محتوا بنویسید، تصاویر بارگذاری کنید و مقالات خود را از طریق داشبورد مدیریت نمایید.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async () => {

    const { session , user } = await checkSession();
          
    const validRoles = DashboardItems.find(item => item.name === "بلاگ ها")?.children[0]?.accessibility;
    if (!user || !validRoles?.includes(user.role as UserRole)) redirect("/dashboard/profile");

    return (<AddBlogDashboardPage />);
};

export default page;