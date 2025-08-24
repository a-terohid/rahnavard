import LoginPage from "@/template/LoginPage";
import { checkSession } from "@/utils/CheckSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

/**
 * Metadata for the login page, including SEO and social media information.
 */
export const metadata: Metadata = {
  title: "ورود | رهنورد - دسترسی به حساب کاربری",
  description:
    "به حساب کاربری خود در رهنورد وارد شوید و خرید لوازم کمپینگ و کوهنوردی را مدیریت کنید. همین حالا وارد شوید و ماجراجویی خود را ادامه دهید.",
  keywords: [
    "ورود رهنورد",
    "لاگین رهنورد",
    "ورود کمپینگ",
    "ورود کوهنوردی",
    "ورود به حساب کاربری",
    "خرید لوازم کمپینگ",
    "فروش لوازم کوهنوردی",
    "اجاره تجهیزات کوهنوردی",
  ],
  openGraph: {
    title: "ورود | رهنورد - دسترسی به حساب کاربری",
    description:
      "به حساب کاربری خود در رهنورد وارد شوید و خرید لوازم کمپینگ و کوهنوردی را مدیریت کنید. همین حالا وارد شوید و ماجراجویی خود را ادامه دهید.",
    url: "https://rahnavard.vercel.app/login",
    type: "website",
    images: [
      {
        url: "/img/thumbnail.png",
        height: 630,
        alt: "ورود به رهنورد - خرید لوازم کمپینگ و کوهنوردی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ورود | رهنورد - دسترسی به حساب کاربری",
    description:
      "به حساب کاربری خود در رهنورد وارد شوید و خرید لوازم کمپینگ و کوهنوردی را مدیریت کنید. همین حالا وارد شوید و ماجراجویی خود را ادامه دهید.",
    images: ["/img/thumbnail.png"],
  },
};
/**
 * Login page component.
 * 
 * - If the user is already authenticated, redirects to the homepage.
 * - Otherwise, renders the login page.
 */
const page = async () => {
    // Check if a session already exists
    const { session } = await checkSession();
    console.log(session);
    
    // If a session exists, redirect to the homepage
    if (session) redirect("/");

    // Render the login page
    return <LoginPage />;
};

export default page;