"use client"

import OTPInput from '@/elements/OtpInput';
import Loader from '@/elements/Loader';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SetPasswordFormsValidation } from '@/utils/forms';
import { setPassword_interface, setPasswordError_interface } from '@/types/StatesTypes';
import INPUT from '@/elements/INPUT';
import { resetDate_interface } from '@/types/pagesProps';
import { useRouter } from 'next/navigation';
import { ERROR } from '@/types/enums/MessageUnum';
import { verifyPassword } from '@/utils/auth';

// Main component for the set password page
const SetPasswordDahsboardPage = ({ userEmail, token, expire }: resetDate_interface) => {

    // Component state
    const [otp, setOtp] = useState<string>('');
    const [loadingCode, setLoadingCode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<setPassword_interface>({
        password: "",
        confirmPassword: "",
    });
    const [data_error, setDataError] = useState<setPasswordError_interface>({
        password_error: "",
        confirmPassword_error: "",
    });

    // Destructuring values
    const { password , confirmPassword } = data
    const { password_error , confirmPassword_error } = data_error

    const hasMounted = useRef(false); // To avoid running useEffect on first render
    const router = useRouter(); // Router instance

    // Handle password inputs
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setDataError(SetPasswordFormsValidation(data, data_error)); // Validate input on change
    };

    // Validate data on input change after initial mount
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }
        setDataError(SetPasswordFormsValidation(data, data_error));
    }, [data , data_error]);

    // Save OTP when input is completed
    const handleSubmit = (pin: string) => setOtp(pin);

    // Request a new verification code
    const handleGetCode = async (event: any) => {
        event.preventDefault();
        setLoadingCode(true);

        const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email : userEmail }),
            headers: { "Content-Type": "application/json" },
        });

        const resData = await res.json();
        console.log(resData); // Debugging

        setLoadingCode(false);

        if (resData?.error) {
            toast.error(resData?.error);
        } else {
            toast.success(resData?.message);
        }
    };

    // Final step to verify OTP and set new password
    const handleSetPasswords = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        // Validate OTP
        if (!otp || otp.length < 6) {
            toast.error(ERROR.OTP_REQUIRED);
            setLoading(false);
            return;
        }

        // Verify OTP token
        const isValid = await verifyPassword(otp, token);

        if (!isValid) {
            toast.error(ERROR.INVALID_TOKEN);
            setLoading(false);
            return;
        }

        // Check token expiration
        const currentTime = new Date().getTime();
        const isExpired = currentTime > new Date(expire).getTime();

        if (isExpired) {
            toast.error(ERROR.RESET_LINK_EXPIRED);
            setLoading(false);
            return;
        }

        

        // Submit new password to API
        const res = await fetch("/api/auth/set-password", {
            method: "POST",
            body: JSON.stringify({  email : userEmail  , password }),
            headers: { "Content-Type": "application/json" },
        });

        const resData = await res.json();
        console.log(resData); // Debugging

        setLoading(false);

        // Redirect or show error
        if (resData?.error) {
            toast.error(resData?.error);
        } else {
            router.push(`/dashboard/profile`);
        }
    };

  return (
  <div className='px-5 py-5 md:px-7'>
    <h1 className='text-Bold-Normal-title-2 mb-6'>تنظیم رمز عبور:</h1>
    <div className='flex flex-col gap-y-6'>
      <p className='text-Bold-Normal-text-1'>
        ایمیل کاربر: <span className='text-Regular-Normal-text-1 ml-1'> {userEmail}</span>
      </p>

      {/* OTP Section */}
      <div>
        <div className='flex items-center -mb-4'>
          <p className='text-Bold-Normal-text-1'> کد را وارد کنید:</p>
          {loadingCode ? (
            <p><Loader w={10} /></p>
          ) : (
            <p
              onClick={handleGetCode}
              className='text-Regular-Normal-text-1l italic text-Neutral-500 mr-2 hover:text-Neutral-700 hover:cursor-pointer ml-1'
            >
               کدی دریافت نکردید؟ اینجا کلیک کنید 
            </p>
          )}
        </div>
        <div className='md:ml-6 ml-4'>
          <OTPInput onComplete={handleSubmit} />
        </div>
      </div>

      {/* Password fields */}
      <div>
        <p className='text-Bold-Normal-text-1'>رمز عبور جدید:</p>
        <div className='lg:w-1/2 mt-6 flex flex-col gap-y-4 md:ml-6 ml-4'>
          <INPUT
            label='رمز عبور'
            value={password}
            name='password'
            placeholder='رمز عبور جدید خود را وارد کنید'
            type='password'
            error={password_error || ""}
            textarea={false}
            changeHandler={changeHandler}
          />
          <INPUT
            label='تأیید رمز عبور'
            value={confirmPassword}
            name='confirmPassword'
            placeholder='رمز عبور جدید خود را دوباره وارد کنید'
            type='password'
            error={confirmPassword_error || ""}
            textarea={false}
            changeHandler={changeHandler}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        {loading ? (
          <Loader /> // Show loader
        ) : (
          <button
            onClick={handleSetPasswords}
            className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 rounded-xl py-3 text-Regular-Normal-text-2 w-full mt-2"
          >
            اتمام
          </button>
        )}
      </div>
    </div>
  </div>
);
};

export default SetPasswordDahsboardPage;