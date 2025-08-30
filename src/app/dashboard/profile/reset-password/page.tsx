import User from "@/models/user";
import SetPasswordDahsboardPage from "@/template/Dashboard/SetPasswordDahsboardPage";
import { checkSession } from "@/utils/CheckSession";
import connectDB from "@/utils/connectDB";

// Metadata for SEO and social sharing
export const metadata = {
  title: "پروفایل | بازیابی رمز عبور | رهنورد",
  description: "برای امنیت بیشتر حساب کاربری رهنورد، رمز عبور جدیدی تنظیم و تأیید کنید.",
  keywords: [
    "تنظیم رمز عبور",
    "بازیابی رمز عبور",
    "امنیت حساب کاربری",
    "رهنورد"
  ],
  openGraph: {
    title: "پروفایل | بازیابی رمز عبور | رهنورد",
    description: "با تنظیم یک رمز عبور جدید، حساب کاربری خود در رهنورد را ایمن کنید.",
    url: "https://rahnaward.ir/dashboard/profile/reset-password",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه بازیابی رمز عبور رهنورد"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "بازیابی رمز عبور | رهنورد",
    description: "رمز عبور جدید خود را برای افزایش امنیت حساب در رهنورد وارد و تأیید کنید.",
    images: ["/img/thumbnail.png"]
  }
};
// Server component for rendering the set password page
const page = async ({ searchParams }: any) => {
    const { id } = searchParams;

    // Connect to MongoDB
    await connectDB();

    let user = null;

    // Initial values to pass to the page
    let resetData = {
        userEmail: '',
        token: '',
        expire: '',
    };

    try {
         // If an "id" is provided in the URL, find the user by ID
         if (id) {
            user = await User.findById(id) 
        } else {
            // If no "id", check the session to get the logged-in user
            user = (await checkSession()).user;
        }
        // If user or resetPassword is missing, return error message
        if (!user || !user.resetPassword) {
            return <div>Invalid or expired reset link</div>;
        }

        // All good — extract reset password data
        resetData = {
            userEmail: user.email,
            token: user.resetPassword.token,
            expire: user.resetPassword.expires,
        };

    } catch (error) {
        // Catch any unexpected errors
        return <div>Something went wrong. Please try again later.</div>;
    }

    // Render the SetPasswordDashboardPage with the required props
    return (
        <SetPasswordDahsboardPage
            userEmail={resetData.userEmail}
            token={resetData.token}
            expire={resetData.expire}
        />
    );
};

export default page;
