 "use client"

import INPUT from "@/elements/INPUT";
import Logo from "@/elements/Logo"; // Logo component
import Loader from "@/elements/Loader";
import { setPassword_interface, setPasswordError_interface } from "@/types/StatesTypes";
import { SetPasswordFormsValidation } from "@/utils/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SetPasswordPage = ({email}: {email : string}) => {
        
        const router = useRouter(); // Initialize the Next.js router

        const [loading, setLoading] = useState<boolean>(false);
        const [data, setData] = useState<setPassword_interface>({
            password: "",
            confirmPassword: "",
        });
        const [data_error, setDataError] = useState<setPasswordError_interface>({
            password_error: "",
            confirmPassword_error: "",
        });

        const { password , confirmPassword } = data
        const { password_error , confirmPassword_error } = data_error


    // Handle input changes
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setData((prev) => ({ ...prev, [name]: value }));
            setDataError(SetPasswordFormsValidation(data, data_error));
        };

            const hasMounted = useRef(false); // To avoid running useEffect on first render

        // Validate data on password input change after initial mount
        useEffect(() => {
            if (!hasMounted.current) {
                hasMounted.current = true;
                return
            }

            setDataError(SetPasswordFormsValidation(data, data_error));
        }, [ data ])

        const handleSetPasswords = async (event: any) => {
            event.preventDefault(); // Prevent default form submission behavior
            setLoading(true); // Show loader
    
            // Send a request to the API to initiate the password reset process
            const res = await fetch("/api/auth/set-password", {
                method: "POST",
                body: JSON.stringify({ email , password }), // Send email to the backend
                headers: { "Content-Type": "application/json" }, // Set request headers
            });
    
            const resData = await res.json(); // Parse response data
            console.log(resData); // Log response for debugging
    
            setLoading(false); // Hide loader
    
            // Handle API response
            if (resData?.error) {
                toast.error(resData?.error); // Show error notification if there's an issue
            } else {
                router.push(`/login`); // Redirect user to reset password page
            }
        };

return (
  <div className="bg-ForgotPassword-texture bg-cover bg-top">
    {/* Main container that centers the form */}
    <div className="container h-screen flex items-center justify-center">
      <div className="bg-primary-0 w-screen md:w-3/4 lg:w-1/2 rounded-xl py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center">
        
        {/* Display the logo at the top */}
        <div className="flex justify-end">
          <Logo className={"w-36"} />
        </div>

        {/* Form heading and description */}
        <div className="flex flex-col items-center justify-center text-center lg:mx-8">
          <h3 className="text-Bold-Normal-title-3 md:text-Bold-Normal-title-2 lg:text-Bold-Normal-title-1 text-Greyscale-900 mt-6 mb-4">
            تنظیم رمز عبور جدید
          </h3>
          <p className="text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 text-Greyscale-700">
            برای امنیت بیشتر، لطفاً رمز عبور جدید خود را وارد و تأیید کنید.
          </p>
        </div>

        {/* Password and Confirm Password input fields */}
        <div className="w-full mt-6 flex flex-col gap-y-4">
          <INPUT
            label="رمز عبور"
            value={password}
            name="password"
            placeholder="رمز عبور جدید خود را وارد کنید"
            type="password"
            error={password_error || ""}
            textarea={false}
            changeHandler={changeHandler}
          />
          <INPUT
            label="تکرار رمز عبور"
            value={confirmPassword}
            name="confirmPassword"
            placeholder="رمز عبور جدید خود را دوباره وارد کنید"
            type="password"
            error={confirmPassword_error || ""}
            textarea={false}
            changeHandler={changeHandler}
          />
        </div>

        {/* Submit button and login link */}
        <div className="w-full mt-8 flex flex-col items-center justify-center gap-y-4">
          {loading ? (
            <Loader /> // Show loader while processing
          ) : (
            <button
              onClick={handleSetPasswords}
              className="text-primary-0 bg-primary-600 rounded-full py-3 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 w-full hover:bg-primary-300"
            >
              تأیید و ذخیره
            </button>
          )}
          <p className="text-Greyscale-700 text-Regular-Normal-text-2">
            رمز عبور خود را به خاطر آوردید؟{" "}
            <Link href="/login" className="text-Body-SM-Small text-primary-500">
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default SetPasswordPage;