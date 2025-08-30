"use client"

import INPUT from "@/elements/INPUT";
import Loader from "@/elements/Loader";
import TiptapEditor from "@/module/TiptapEditor";
import { ERROR } from "@/types/enums/MessageUnum";
import { BlogFormValidation, BlogFormValidationResponse } from "@/utils/blogFormValidation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin2Line } from "react-icons/ri";

const AddBlogDashboardPage = () => {

    const router = useRouter(); // used for redirect after submission
    const hasMounted = useRef(false); // to avoid triggering effects on first render

    // UI states
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // Media states (thumbnail, gallery)
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnail_Preview, setThumbnail_Preview] = useState<string | null>(null);
    const [images, setimages] = useState<File[]>([]);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [DATA_Error , setDataError] = useState({
        title: "" , description: ""
    })

    useEffect(() => {
        console.log(hasMounted);
        
        if (!hasMounted.current) {
            hasMounted.current = true;
            return
        }

        setDataError(BlogFormValidation({title , description}, DATA_Error));
        
    }, [title , description]);
    
    // Reset thumbnail
    const ResetThumbnail = useCallback(() => {
        setThumbnail(null);
        setThumbnail_Preview(null);
    }, []);

    // Handle thumbnail upload + preview
    const ThumbnailChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnail(file);
            setThumbnail_Preview(URL.createObjectURL(file));
        }
    }, []);

    const handleAddBlog = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);
        setUploadProgress(0);

        const { isValid , response } = BlogFormValidationResponse({title , description})

        if( !isValid ){
            toast.error(response);
            setLoading(false);
            return
        }

        const formData = new FormData();
        formData.append("data", JSON.stringify({title , description}));

        if (thumbnail) formData.append("thumbnail", thumbnail);
        images.forEach(image => formData.append("images", image));

        try {
            const response = await axios.post('/api/blog', formData, {
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
                router.replace("/dashboard/blogs");
            }
        } catch (err: any) {
            setLoading(false);
            setUploadProgress(null);
            toast.error(ERROR.PROBLEM);
        }

    }

 return (
  <div className='px-5 py-5 md:px-7'>
    {/* Page title */}
    <h1 className='text-Bold-Normal-title-2 mb-6'>افزودن بلاگ:</h1>  
    <div className="mt-5 flex flex-col gap-y-4">
      <INPUT
        label="عنوان:"
        type="text"
        name="title"
        value={title}
        placeholder="عنوان را اینجا وارد کنید"
        changeHandler={(e:any) => setTitle(e.target.value)}
        textarea={false}
        error={DATA_Error?.title || ''}
        style={'lg:w-1/2'}
      />
      <div>
        <p className="mb-2 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1">توضیحات:</p>
        <TiptapEditor content={description} onChange={(con) => setDescription(con)} setImages={setimages} />
      </div>
      <div className=" text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1">
        <p className="mb-4">تصویر:</p>
        <input
          type="file"
          id="thumbnailInput"
          accept="image/*"
          onChange={ThumbnailChangeHandler}
          style={{ display: 'none' }}
        />
        <label 
          htmlFor="thumbnailInput" 
        className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 py-2 px-3 w-full rounded-lg text-Regular-Caption-1 lg:text-Regular-Normal-text-2"
        >
          {thumbnail ? thumbnail.name : "انتخاب تصویر"}
        </label>
        {thumbnail_Preview && (
          <div className="relative mt-4 w-fit">
            <img
              src={thumbnail_Preview}
              alt="thumbnail Preview"
              className="w-56 mt-5 object-cover rounded-lg"
            />
            <button 
              onClick={ResetThumbnail} 
            className="absolute mt-2 mr-2 top-0 right-0 bg-Error-600 hover:bg-Error-300 text-Error-200 hover:text-Error-600 rounded-full p-1"
            >
              <RiDeleteBin2Line />
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Submit button and loader */}
    <div className="mt-5 flex flex-col gap-y-4 mb-4">
      {loading ? (
        <Loader />
      ) : (
        <button
          onClick={handleAddBlog}
        className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 rounded-xl py-3 text-Regular-Normal-text-2 w-full "
        >
          افزودن
        </button>
      )}

      {/* Upload progress bar */}
      {uploadProgress !== null && (
        <div className="w-1/4 bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-blue-500 h-2 rounded transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">{uploadProgress}% آپلود شده</p>
        </div>
      )}
    </div>
  </div>
);
};

export default AddBlogDashboardPage;