"use client"

import ImageWithFallback from '@/elements/ImageWithFallback';
import INPUT from '@/elements/INPUT';
import { User_Interface } from '@/types/modelTypes';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Cropper, { Area } from "react-easy-crop"
import Loader from '@/elements/Loader';
import { editProfileFormsValidation } from '@/utils/forms';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { ERROR } from '@/types/enums/MessageUnum';
import { mask } from '@/utils/mask';
import ImageModule from '@/module/ImageModule';

// Component for editing user profile in the dashboard
const EditProfileDashboardPage = ({ user }: { user: User_Interface }) => {

    const router = useRouter(); // Next.js router
    const hasMounted = useRef(false); // Prevents validation on first render

   
    // Memoized initial form data based on the user prop
    const initialData = useMemo(() => ({
        name: user.name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
    }), [user]);

    const [dataError, setDataError] = useState({
        name_error: "",
        last_name_error: "",
        phone_number_error: "",
    });

    // Form data state
    const [data, setData] = useState(initialData);
    const { name, last_name, phone_number } = data;

    // State for managing profile picture file and its preview
    const [profile_picture, setProfile_picture] = useState<File | null>(null);
    const [profile_picture_Preview, setProfile_picture_Preview] = useState<string | null>(null);

    // Boolean for checkbox to reset existing profile picture
    const [isCheckedCoverImage, setIsCheckedCoverImage] = useState(false);

    // Modal visibility state for image cropping
    const [showCropModal, setShowCropModal] = useState(false);

    // Progress and loading states
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Run validation only after the component has mounted
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        setDataError(editProfileFormsValidation(data, dataError));
    }, [data , dataError]);

    // Handler for input changes (name, last name, phone number)
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData((prev : any) => ({ ...prev, [name]: value }));
        };

    // Handler for file input changes (profile picture)
    const fileChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        setProfile_picture(file);
        const previewUrl = URL.createObjectURL(file);
        setProfile_picture_Preview(previewUrl);
        setShowCropModal(true);
        }
    }, []);

  // Reset profile picture preview and file
    const ResetProfilePicture = useCallback(() => {
        setProfile_picture(null);
        setProfile_picture_Preview(null);
    }, []);

    // Handle checkbox for removing existing profile image
    const handleIsCheckedCoverImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedCoverImage(event.target.checked);
    }, []);

    // Submit handler to update user profile
    const handleEditProfile = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        
        const newdata = data;
        Object.assign(newdata, { 
            isCheckedCoverImage: String(isCheckedCoverImage) , 
            role : user.role,
            _id : user._id
        });
        
        formData.append("data", JSON.stringify(newdata) || "");
        if (profile_picture) formData.append("profile_picture", profile_picture);

        try {
            const response = await axios.patch('/api/auth/editUser', formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
                }
            });

            const resData = response.data;
            setLoading(false);
            setUploadProgress(null);

            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                router.push("/dashboard/profile");
            }
        } catch (err: any) {
            setLoading(false);
            setUploadProgress(null);
            toast.error(ERROR.PROBLEM);
        }
    }, [user._id, name, last_name, phone_number, isCheckedCoverImage, profile_picture, router , data]);

    return (
  <div className='px-5 py-5 md:px-7'>
    {/* Page title */}
    <h1 className='text-Bold-Normal-title-2 mb-6'>ویرایش پروفایل:</h1>
    <div>
      {/* Toggle to enable profile picture editing */}
      <div className="flex gap-x-2 items-center mt-3 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 w-full">
        <input
          type="checkbox"
          checked={isCheckedCoverImage}
          onChange={handleIsCheckedCoverImage}
        />
        <p>حذف و ویرایش تصویر پروفایل</p>
      </div>

      {/* If editing is enabled, show image selector and preview */}
      <div className="">
        {isCheckedCoverImage ? (
          <div className="mt-3 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1">
            <p className="mb-4">تصویر پروفایل:</p>
            <input
              type="file"
              id="coverImageInput"
              accept="image/*"
              onChange={fileChangeHandler}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="coverImageInput"
              className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 py-2 px-3 w-full rounded-lg text-Regular-Caption-1 lg:text-Regular-Normal-text-2"
            >
              {profile_picture ? profile_picture.name : "انتخاب تصویر"}
            </label>
            {profile_picture_Preview && (
              <div className="relative mt-4 w-fit">
                <img
                  src={profile_picture_Preview}
                  alt="Cover Image Preview"
                  className="w-56 mt-5 object-cover rounded-lg"
                />
                <button
                  onClick={ResetProfilePicture}
                  className="absolute mt-2 mr-2 top-0 right-0 bg-Error-600 hover:bg-Error-300 text-Error-200 hover:text-Error-600 rounded-full p-1"
                >
                  <RiDeleteBin2Line />
                </button>
              </div>
            )}
            {uploadProgress !== null && (
              <div className="w-1/4 bg-gray-200 h-2 rounded mt-2">
                <div
                  className="bg-blue-500 h-2 rounded transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">
                  {uploadProgress}% آپلود شده
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className='w-2/3 md:w-1/3 relative'>
            <ImageWithFallback
              src={user.profile_picture || ""}
              alt={user.email}
              style={"rounded-b-2xl my-5"}
            />
          </div>
        )}
      </div>

      {/* Input fields for name, last name, and phone */}
      <div className="lg:w-1/2 mt-8 flex flex-col gap-y-4">
        <INPUT
          label="نام"
          type="text"
          name="name"
          value={name}
          placeholder="نام خود را وارد کنید"
          changeHandler={changeHandler}
          textarea={false}
          error={dataError.name_error || ""}
        />
        <INPUT
          label="نام خانوادگی"
          type="text"
          name="last_name"
          value={last_name}
          placeholder="نام خانوادگی خود را وارد کنید"
          changeHandler={changeHandler}
          textarea={false}
          error={dataError.last_name_error || ""}
        />
        <INPUT
          label="شماره تلفن"
          type="text"
          name="phone_number"
          value={phone_number}
          placeholder="شماره تلفن خود را وارد کنید"
          changeHandler={changeHandler}
          textarea={false}
          error={dataError.phone_number_error || ""}
        />
      </div>

      {/* Submit button */}
      <div className='flex items-center justify-center mt-6'>
        {loading ? (
          <Loader />
        ) : (
          <button
            onClick={handleEditProfile}
            className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 rounded-xl py-3 text-Regular-Normal-text-2 w-full "
          >
            ذخیره تغییرات
          </button>
        )}
      </div>
    </div>

    {/* Crop image modal */}
    {showCropModal && profile_picture_Preview && (
      <ImageModule
        title="برش تصویر پروفایل"
        show={showCropModal}
        setShow={setShowCropModal}
        image={profile_picture}
        setImage={setProfile_picture}
        imagePriview={profile_picture_Preview}
        setImagePreview={setProfile_picture_Preview}
      />
    )}
  </div>
);
};

export default EditProfileDashboardPage;