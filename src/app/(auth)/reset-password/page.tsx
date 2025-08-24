import User from "@/models/user";
import ResetPasswordPage from "@/template/forgotPassword/ResetPasswordPage";
import { ERROR } from "@/types/enums/MessageUnum";
import { hashPassword } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "بازنشانی رمز عبور | رهنورد",
  description:
    "کد تأیید ارسال‌شده به ایمیل خود را وارد کنید تا بتوانید رمز عبور حساب کاربری‌تان در رهنورد را به‌صورت امن بازنشانی کنید.",
  keywords: [
    "بازنشانی رمز عبور رهنورد",
    "فراموشی رمز عبور",
    "بازیابی رمز",
    "کد تأیید ایمیل",
    "امنیت حساب کاربری",
    "رهنورد"
  ],
  openGraph: {
    title: "بازنشانی رمز عبور | رهنورد",
    description:
      "با وارد کردن کد تأیید ارسال‌شده به ایمیل، رمز عبور خود را در رهنورد به‌صورت امن بازنشانی کنید.",
    url: "https://rahnavard.vercel.app/reset-password",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه بازنشانی رمز عبور رهنورد"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "بازنشانی رمز عبور | رهنورد",
    description:
      "کد ارسال‌شده به ایمیل خود را وارد کنید تا فرآیند بازنشانی رمز عبور در رهنورد را ادامه دهید.",
    images: ["/img/thumbnail.png"]
  }
};

const page = async ({ searchParams }: any) => {
    // Extract email and token from the URL search parameters
    const { email, token } = searchParams;

    if (!email) redirect("/forgot-password");

    // Find the user in the database using their email
    const user = await User.findOne({ email });

    // Retrieve the stored reset password token and expiration time for the user
    const userToken = user.resetPassword.token;
    const userExpires = user.resetPassword.expires;

    // Get the current timestamp
    const currentTime = new Date().getTime();

    // Check if the reset password token has expired
    const isExpired = currentTime > new Date(userExpires).getTime();

    let error;

    if (token) {
        // If the token is still valid, redirect the user to the set-password page
        if (!isExpired) {
            const hashedEmail = await hashPassword(email);
            redirect(`/set-password?email=${email}&verify=${hashedEmail}`);
        } else {
            // If the token is expired, set the appropriate error message
            error = ERROR.RESET_LINK_EXPIRED;
        }
    }

    // Render the ResetPasswordPage component with the necessary props
    return <ResetPasswordPage email={email} token={userToken} expire ={userExpires} error={error || ""} />;
};

export default page;