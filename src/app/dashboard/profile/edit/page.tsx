import User from "@/models/user";
import EditProfileDashboardPage from "@/template/Dashboard/EditProfileDashboardPage";
import { ERROR } from "@/types/enums/MessageUnum";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";

export const metadata = {
  title: "پروفایل | ویرایش پروفایل | رهنورد",
  description:
    "نام، شماره تماس و تصویر پروفایل خود را به‌روزرسانی کنید تا حساب کاربری‌تان همیشه به‌روز باشد.",
  keywords: [
    "ویرایش پروفایل",
    "تنظیمات پروفایل",
    "به‌روزرسانی حساب",
    "رهنورد"
  ],
  openGraph: {
    title: "پروفایل | ویرایش پروفایل | رهنورد",
    description: "به‌راحتی اطلاعات شخصی و تصویر پروفایل خود را ویرایش کنید.",
    url: "https://estatero.vercel.app/dashboard/profile/edit",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه ویرایش پروفایل"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ویرایش پروفایل | رهنورد",
    description:
      "اطلاعات پروفایل خود را مدیریت کنید تا حساب کاربری شما همیشه به‌روز باشد.",
    images: ["/img/thumbnail.png"]
  }
};

const page = async ({ searchParams }: any) => {

    const { id } = searchParams;
    
    // Connect to MongoDB database
    await connectDB();
    
    let user = null;
    
    try {
        // If an "id" is provided in the URL, find the user by ID
        if (id) {
            user = await User.findById(id)
        } else {
            // If no "id", check the session to get the logged-in user
            user = (await checkSession()).user;
        }

        // If user or resetPassword is missing, display an error message
        if (!user || !user.resetPassword) {
            return <div className="px-5 py-5 md:px-7">{ERROR.CANT_FIND_USER}</div>;
        }

    } catch (error) {
        // Catch unexpected errors during user fetch or session check
        console.error("Error fetching user data:", error);
        return <div className='px-5 py-5 md:px-7'>Something went wrong. Please try again later.</div>;
    }


    return (<EditProfileDashboardPage user={user} />);
};

export default page;