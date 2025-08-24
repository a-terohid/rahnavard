import SetPasswordPage from "@/template/forgotPassword/SetPasswordPage";
import { verifyPassword } from "@/utils/auth";
import { redirect } from "next/navigation";

// Metadata for SEO and social sharing - Rahnavard
export const metadata = {
  title: "تنظیم رمز عبور | رهنورد",
  description:
    "برای امنیت بیشتر، رمز عبور جدید خود را تنظیم کنید. رمز عبور جدید را وارد کرده و آن را تأیید کنید.",
  keywords: [
    "تنظیم رمز عبور رهنورد",
    "تغییر رمز عبور",
    "بازنشانی رمز عبور",
    "امنیت حساب کاربری",
    "رهنورد"
  ],
  openGraph: {
    title: "تنظیم رمز عبور | رهنورد",
    description: "با تنظیم رمز عبور جدید، امنیت حساب کاربری خود را تضمین کنید.",
    url: "https://rahnavard.vercel.app/set-password",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "صفحه تنظیم رمز عبور رهنورد"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "تنظیم رمز عبور | رهنورد",
    description:
      "رمز عبور جدید خود را وارد کرده و آن را تأیید کنید تا حساب شما ایمن بماند.",
    images: ["/img/thumbnail.png"]
  }
};

// Page component to handle password reset verification
const page = async ({ searchParams }: any) => {

    const { email, verify } = searchParams;

    // Redirect to reset-password page if email or verification token is missing
    if (!email || !verify) redirect('/reset-password');

    // Verify the email and token
    const isValid = await verifyPassword(email, verify);

    // If verification fails, redirect back to reset-password page with email prefilled
    if (!isValid) redirect(`/reset-password?email=${email}`);

    // If verification succeeds, render the SetPasswordPage
    return (<SetPasswordPage email={email} />);
};

export default page;