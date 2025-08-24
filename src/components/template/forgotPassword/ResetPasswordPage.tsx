"use client"

import Logo from "@/elements/Logo"; // Logo component
import Loader from '@/elements/Loader';
import { ERROR, MESSAGE } from '@/types/enums/MessageUnum';
import { resetpassword_props } from '@/types/pagesProps';
import { hashPassword, verifyPassword } from '@/utils/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import OTPInput from '@/elements/OtpInput';

const ResetPasswordPage = ({ email, token, expire, error }: resetpassword_props) => {
    
    // State for managing loading state
    const [loading, setLoading] = useState<boolean>(false);

    // State for storing the OTP input
    const [otp, setOtp] = useState<string>('');

    // Router for navigation
    const router = useRouter();

    // Function to handle OTP input completion
    const handleSubmit = (pin: string) => setOtp(pin);

    // Display error toast message if there's an error
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Function to handle password reset process
    const handleForgotPasswords = async (event: any) => {
        event.preventDefault();

        // Set loading state to true while processing
        setLoading(true);

        // Check if the reset link has expired
        const currentTime = new Date().getTime();
        const isExpired = currentTime > new Date(expire).getTime();

        if (isExpired) {
            toast.error(ERROR.RESET_LINK_EXPIRED);
            setLoading(false);
            return;
        }

        // Verify the entered OTP against the stored token
        const isValid = await verifyPassword(otp, token);

        if (!isValid) {
            toast.error(ERROR.INVALID_TOKEN);
            setLoading(false);
            return;
        } else {
            // If OTP is valid, display success message and navigate to set password page
            toast.success(MESSAGE.VALID_TOKEN);
            const hashedEmail = await hashPassword(email);
            setLoading(false);
            router.push(`/set-password?email=${email}&verify=${hashedEmail}`);
        }
    };

    return (
  <div className="bg-ForgotPassword-texture bg-cover bg-top">
    {/* Main container */}
    <div className="container h-screen flex items-center justify-center">
      <div className="bg-primary-0 w-screen md:w-3/4 lg:w-1/2 rounded-xl py-8 md:py-12 px-4 md:px-12 flex flex-col items-center justify-center">
        
        {/* Logo */}
        <div className="flex justify-end">
          <Logo className={"w-36"} />
        </div>

        {/* Page Title and Description */}
        <div className="flex flex-col items-center justify-center text-center lg:mx-8">
          <h3 className="text-Bold-Normal-title-3 md:text-Bold-Normal-title-2 lg:text-Bold-Normal-title-1 text-Greyscale-900 mt-6 mb-4">
            بازنشانی رمز عبور
          </h3>
          <p className="text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 text-Greyscale-700">
            کد تأیید برای ایمیل{' '}
            <span className="text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 text-Greyscale-900">{email}</span> ارسال شد.
          </p>
        </div>

        {/* OTP Input Field */}
        <OTPInput onComplete={handleSubmit} />

        {/* Submit Button & Loader */}
        <div className="w-full mt-8 flex flex-col items-center justify-center gap-y-4">
          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={handleForgotPasswords}
              className="text-primary-0 bg-primary-600 rounded-full py-3 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 w-full hover:bg-primary-300"
            >
              ادامه
            </button>
          )}

          {/* Link to Resend OTP */}
          <p className="text-Greyscale-700 text-Regular-Normal-text-2">
            کد تأیید را دریافت نکردید؟{" "}
            <Link href="/forgot-password" className="text-Body-SM-Small text-primary-500">
              ارسال مجدد کد
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default ResetPasswordPage;