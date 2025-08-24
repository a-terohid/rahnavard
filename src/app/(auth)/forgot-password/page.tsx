import ForgotPasswordPage from "@/template/forgotPassword/ForgotPasswordPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فراموشی رمز عبور | رهنورد - بازیابی دسترسی",
  description:
    "اگر رمز عبور حساب رهنورد خود را فراموش کرده‌اید، از این بخش می‌توانید به سادگی آن را بازیابی کنید و دوباره به ماجراجویی خود ادامه دهید.",
  keywords: [
    "فراموشی رمز رهنورد",
    "بازیابی رمز رهنورد",
    "بازیابی رمز کمپینگ",
    "بازیابی رمز کوهنوردی",
    "فراموشی رمز عبور",
    "بازیابی حساب رهنورد",
    "خرید لوازم کمپینگ",
    "خرید لوازم کوهنوردی",
  ],
  openGraph: {
    title: "فراموشی رمز عبور | رهنورد - بازیابی دسترسی",
    description:
      "اگر رمز عبور حساب رهنورد خود را فراموش کرده‌اید، از این بخش می‌توانید به سادگی آن را بازیابی کنید و دوباره به ماجراجویی خود ادامه دهید.",
    url: "https://rahnavard.vercel.app/forgot-password",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        height: 630,
        alt: "فراموشی رمز عبور رهنورد - بازیابی حساب کاربری",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فراموشی رمز عبور | رهنورد - بازیابی دسترسی",
    description:
      "اگر رمز عبور حساب رهنورد خود را فراموش کرده‌اید، از این بخش می‌توانید به سادگی آن را بازیابی کنید و دوباره به ماجراجویی خود ادامه دهید.",
    images: ["/img/thumbnail.png"],
  },
};

const page = () => {
    return (<ForgotPasswordPage/>);
};

export default page;