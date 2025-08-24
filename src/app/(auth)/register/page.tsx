import RegisterPage from "@/template/RegisterPage";
import { checkSession } from "@/utils/CheckSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ثبت‌نام | رهنورد - ایجاد حساب کاربری",
  description:
    "در رهنورد ثبت‌نام کنید و خرید لوازم کمپینگ و کوهنوردی را به راحتی انجام دهید. همین حالا حساب کاربری خود را بسازید و ماجراجویی خود را آغاز کنید.",
  keywords: [
    "ثبت‌نام رهنورد",
    "ساخت حساب کاربری رهنورد",
    "ثبت‌نام کمپینگ",
    "ثبت‌نام کوهنوردی",
    "خرید لوازم کمپینگ",
    "فروش لوازم کوهنوردی",
    "اجاره تجهیزات کوهنوردی",
  ],
  openGraph: {
    title: "ثبت‌نام | رهنورد - ایجاد حساب کاربری",
    description:
      "در رهنورد ثبت‌نام کنید و خرید لوازم کمپینگ و کوهنوردی را به راحتی انجام دهید. همین حالا حساب کاربری خود را بسازید و ماجراجویی خود را آغاز کنید.",
    url: "https://rahnavard.vercel.app/register",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        height: 630,
        alt: "ثبت‌نام در رهنورد - خرید لوازم کمپینگ و کوهنوردی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ثبت‌نام | رهنورد - ایجاد حساب کاربری",
    description:
      "در رهنورد ثبت‌نام کنید و خرید لوازم کمپینگ و کوهنوردی را به راحتی انجام دهید. همین حالا حساب کاربری خود را بسازید و ماجراجویی خود را آغاز کنید.",
    images: ["/img/thumbnail.png"],
  },
};

// Page component to handle registration
const page = async () => {

  // Check if the user already has an active session
  const { session } = await checkSession();
  console.log(session);
  
  // If a session exists, redirect to the homepage
  if (session) redirect("/");

  // Otherwise, render the Register page
  return (<RegisterPage />);
};

export default page;