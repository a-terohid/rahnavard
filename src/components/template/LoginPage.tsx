"use client"

import INPUT from "@/elements/INPUT";
import Loader from "@/elements/Loader";
import Logo from "@/elements/Logo";
import { loginData_interface, loginDataError_interface } from "@/types/StatesTypes";
import { LoginFormsValidation } from "@/utils/forms";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  // State for loading status
  const [loading, setLoading] = useState<boolean>(false);

  // State to remember the email
  const [rememberMe, setRememberMe] = useState(false);

  // State for login form data
  const [DATA, setData] = useState<loginData_interface>({
    email: "",
    password: "",
  });

  // State for form validation errors
  const [DATA_Error, setDataError] = useState<loginDataError_interface>({
    email_error: "",
    password_error: "",
  });

  const { email, password } = DATA;
  const { email_error, password_error } = DATA_Error;

  const router = useRouter();
  const hasMounted = useRef(false); // To avoid running useEffect on first render

  // Retrieve saved email from localStorage if "Remember Me" was selected
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  // Validate data on input change after initial mount
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    setDataError(LoginFormsValidation(DATA, DATA_Error));
  }, [DATA]);

  // Handle input changes
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle "Remember Me" checkbox
  const handleRememberMe = (event: any) => {
    setRememberMe(event.target.checked);
  };

  // Handle login submission
  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2 h-screen">
      {/* Form Section */}
      <div className="container py-8 lg:ml-6 flex flex-col justify-center">
        <div className="flex justify-end">
          <Logo className={"w-32"} />
        </div>
        <div className="mb-8">
          <h2 className="text-Bold-Normal-title-2 mt-6 mb-4">ورود به حساب کاربری</h2>
          <p className="text-Regular-Normal-text-1 text-gray-700">
            سریع‌تر به ماجراجویی برسید! وارد حساب کاربری خود شوید، محصولات موردعلاقه‌تان را ذخیره کنید و خرید لوازم کمپینگ و کوهنوردی را مدیریت کنید.
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-y-4">
          <INPUT
            label="ایمیل"
            type="email"
            name="email"
            value={email}
            placeholder="ایمیل خود را وارد کنید"
            changeHandler={changeHandler}
            textarea={false}
            error={email_error || ""}
          />
          <INPUT
            label="رمز عبور"
            type="password"
            name="password"
            value={password}
            placeholder="رمز عبور خود را وارد کنید"
            changeHandler={changeHandler}
            textarea={false}
            error={password_error || ""}
          />
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="lg:text-Regular-Normal-text-1 text-Regular-Normal-text-2 flex items-center justify-between mt-3">
          <div className="flex items-center gap-x-2">
            <input
              className="w-4 h-4 appearance-none border rounded-md border-Neutral-400 checked:bg-primary-500 checked:border-primary-500 relative checked:after:content-['✔'] p-2 checked:after:absolute checked:after:text-white checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <p>مرا به خاطر بسپار</p>
          </div>
          <Link href="/forgot-password">رمز عبور را فراموش کرده‌اید؟</Link>
        </div>

        {/* Submit Button */}
        <div className="mt-12 mb-8 flex flex-col items-center justify-center gap-y-4">
          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={handleLogin}
              className="text-primary-0 bg-primary-600 rounded-full py-3 text-Regular-Normal-text-1 w-full hover:bg-primary-300"
            >
              ورود
            </button>
          )}
          <p className="text-Greyscale-700 text-Regular-Normal-text-1">
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-Regular-Normal-text-1 text-primary-500">
              همین حالا ثبت‌نام کنید
            </Link>
          </p>
        </div>

        {/* Alternative Login */}
        <div className="flex items-center relative justify-center">
          <hr className="w-full" />
          <span className="text-Regular-Normal-text-1 absolute bg-Neutral px-4">یا</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2 my-6">
          <button
            onClick={() => signIn("google")}
            className="text-Greyscale-900 flex items-center justify-center gap-x-3 hover:text-primary-0 border border-Greyscale-100 rounded-full py-3 text-Regular-Normal-text-1 w-full hover:bg-primary-500"
          >
            <FcGoogle className="text-xl" /> ورود با گوگل
          </button>
        </div>

        {/* Terms */}
        <p className="text-Greyscale-700 text-Regular-Normal-text-1 text-center">
          با ادامه، شما با{" "}
          <Link href="/terms" className="text-primary-500">
            شرایط استفاده
          </Link>{" "}
          و{" "}
          <Link href="/privacy" className="text-primary-500">
            سیاست حفظ حریم خصوصی
          </Link>{" "}
          موافقت می‌کنید.
        </p>
      </div>

      {/* Right-Side Banner */}
      <div className="items-end relative hidden md:flex">
        <img
          className="hidden md:block w-full h-full object-cover"
          src="/img/loginPageBaner.png"
          alt="بنر ورود"
        />
        <div className="absolute m-8 text-primary-50">
          <p className="text-Regular-Normal-title-3 text-Neutral">
            «رهنورد با خدمات استثنایی و توجه ویژه به نیازهای ماجراجویان، تجربه‌ای متفاوت از خرید تجهیزات کمپینگ و کوهنوردی فراهم کرده است.»
          </p>
          <p className="text-Regular-Normal-text-1 mt-6 text-Neutral-300">
            رضا مرادی <span className="">•</span> کوهنورد تازه‌کار
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;