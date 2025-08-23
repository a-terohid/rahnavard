"use client"

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import INPUT from "@/elements/INPUT";
import { registerData_interface, registerDataError_interface } from "@/types/StatesTypes";
import Loader from "@/elements/Loader";
import { RegisterFormsValidation } from "@/utils/forms";
import Logo from "@/elements/Logo";


const RegisterPage = () => {
    // State for loading indicator
    const [loading, setLoading] = useState<boolean>(false);

    // State for user input data
    const [DATA, setData] = useState<registerData_interface>({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // State for validation errors
    const [DATA_Error, setDataError] = useState<registerDataError_interface>({
        name_error: "",
        last_name_error: "",
        email_error: "",
        password_error: "",
        confirmPassword_error: "",
    });

    // Destructuring user input data
    const { name, last_name, email, password, confirmPassword } = DATA;

    // Destructuring validation errors
    const { name_error, last_name_error, email_error, password_error, confirmPassword_error } = DATA_Error;

    const router = useRouter();
    const hasMounted = useRef(false); // To avoid running useEffect on first render

    // Function to handle input changes
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    
    // Validate data on input change after initial mount
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }
        setDataError(RegisterFormsValidation(DATA, DATA_Error));
    } , [DATA]);

    // Function to handle user registration
    const handleSignUp = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        // Register the user using NextAuth credentials
        const res = await signIn("credentials", {
            email,
            password,
            name,
            last_name,
            redirect: false
        });

        setLoading(false);

        console.log(res);
        

        // Handle login response
        if (res?.error) {
            toast.error(res.error);
        } else {
            router.push("/");
        }
    };

    return (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Form Section */}
            <div className="container text-Greyscale-900 py-8 lg:ml-6">
                <Logo className={"w-32"} />
                <div className="mb-8">
                    <h2 className="text-Bold-Normal-title-2 mt-6 mb-4">ایجاد حساب کاربری</h2>
                    <p className="text-Regular-Normal-text-1 text-gray-700">
                    برای شروع ماجراجویی‌ ات با رهنورد، همین حالا حساب کاربری بساز و به راحتی تجهیزات کمپینگ و کوهنوردی خرید کن.
                    </p>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-y-4">
                    <INPUT 
                    label="نام"
                    type="text"
                    name="name"
                    value={name}
                    placeholder="نام خود را وارد کنید"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={name_error || ""}
                    />
                    <INPUT 
                    label="نام خانوادگی"
                    type="text"
                    name="last_name"
                    value={last_name}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={last_name_error || ""}
                    />
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
                    <INPUT 
                    label="تکرار رمز عبور"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="رمز عبور را دوباره وارد کنید"
                    changeHandler={changeHandler}
                    textarea={false}
                    error={confirmPassword_error || ""}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-12 mb-8 flex flex-col items-center justify-center gap-y-4">
                    {loading ? (
                    <Loader />
                    ) : (
                    <button
                        onClick={handleSignUp}
                        className="text-primary-0 bg-primary-600 rounded-full py-3 text-Regular-Normal-text-1 w-full hover:bg-primary-300"
                    >
                        ثبت‌نام
                    </button>
                    )}
                    <p className="text-Greyscale-700 text-Body-MD-Small">
                    قبلاً ثبت‌نام کرده‌اید؟{" "}
                    <Link href="/login" className="text-Body-SM-Small text-primary-500">
                        وارد شوید
                    </Link>
                    </p>
                </div>

                {/* Alternative Login Option */}
                <div className="flex items-center relative justify-center">
                    <hr className="w-full" />
                    <span className="text-Body-MD-Small absolute bg-Neutral px-4">یا</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-y-2 my-6">
                    <button
                    onClick={() => signIn("google")}
                    className="text-Greyscale-900 flex items-center justify-center gap-x-3 hover:text-primary-0 border border-Greyscale-100 rounded-full py-3 text-Body-MD-Small w-full hover:bg-primary-500"
                    >
                    <FcGoogle className="text-xl" /> ثبت‌نام با گوگل
                    </button>
                </div>

                {/* Terms and Conditions */}
                <p className="text-Greyscale-700 text-Body-MD-Small text-center">
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
                    src="/img/registerPageBaner.png"
                    alt="ثبت‌نام در رهنورد"
                />
                <div className="absolute m-8 text-primary-50">
                    <p className="text-Heading-4 text-Neutral">
                    «رهنورد همراه همیشگی شما در مسیر ماجراجویی، کمپینگ و کوهنوردی است. تجربه‌ای متفاوت و مطمئن در خرید تجهیزات.»
                    </p>
                    <p className="text-Heading-5 mt-6 text-Neutral-300">
                    تیم رهنورد <span className="text-Neutral">•</span> با شما در مسیر
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;