import DashboardProfilePage from "@/template/Dashboard/DashboardProfilePage";
import { checkSession } from "@/utils/CheckSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پروفایل | رهنورد",
  description:
    "مدیریت پروفایل خود در رهنورد. ایمیل، نام، شماره تماس و تنظیمات حساب کاربری را ویرایش و بروزرسانی کنید تا تجربه‌ای روان‌تر در استفاده از رهنورد داشته باشید.",
  keywords: [
    "پروفایل رهنورد",
    "داشبورد کاربر",
    "حساب کاربری املاک",
    "مدیریت پروفایل",
    "ویرایش اطلاعات کاربر",
    "تنظیمات حساب",
  ],
  robots: "index, follow",
  openGraph: {
    title: "پروفایل | رهنورد",
    description:
      "پروفایل و اطلاعات حساب خود را در رهنورد مدیریت کنید. ایمیل، نام و شماره تماس را بروزرسانی کنید و تجربه بهتری داشته باشید.",
    url: "https://rahnavard.vercel.app/dashboard/profile",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه پروفایل رهنورد",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Rahnavard",
    title: "پروفایل | رهنورد",
    description:
      "مدیریت پروفایل و اطلاعات حساب کاربری در رهنورد. مشخصات خود را ویرایش و بروزرسانی کنید.",
    images: ["/img/thumbnail.png"],
  },
};

const page = async () => {

    // Check session to retrieve the user information
    const { user } = await checkSession();

    // If no user session is found, show a message
    if (!user) {
      return (
        <div className='px-5 py-5'>
          <p className='text-Bold-Normal-title-3 pb-3  border-primary-100'>کاربر یافت نشد!</p>
        </div>
      );
    }
    
    // Render the Dashboard Profile Page with the user data
    return (<DashboardProfilePage  user={user} />);
};

export default page;