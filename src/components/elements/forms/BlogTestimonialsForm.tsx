"use client";

import { useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaStarHalfStroke } from "react-icons/fa6";

import { checkSession } from "@/utils/CheckSession";
import toast from "react-hot-toast";
import { ERROR } from "@/types/enums/MessageUnum";
import { useSession } from "next-auth/react";
import INPUT from "../INPUT";
import Loader from "../Loader";

const BlogTestimonialsForm = ({ blogid }: { blogid: string }) => {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const { data } = useSession(); // Get user session data
  const [Data, setData] = useState({
    message: "", // User comment
    rate: 0,     // User rating
  });

  // Handle input changes
  const changeHandler = (e: any) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const sendHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending request to server
      const res = await fetch(`/api/blog/testimonials`, {
        method: "POST",
        body: JSON.stringify({
          user_id: data?.user?.id || '',
          blog_id: blogid,
          message: Data.message,
          rate: Data.rate,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // Extract response data
      const resData = await res.json();
      setLoading(false);

      // Handle error or success
      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message);
        setData({
          message: "",
          rate: 0,
        });
      }
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-4 border border-Greyscale-100 w-full rounded-3xl">
      {/* Rating Section */}
      <div className="flex items-center">
        <p className=" mb-2">امتیاز:</p>
        <div className="mr-2">
          <Rating
            initialRating={Data.rate}
            onChange={(rate: any) => setData({ ...Data, rate })}
            fractions={2}
            fullSymbol={<FaStar className="text-yellow-400 text-2xl" />}
            emptySymbol={<FaRegStar className="text-gray-300 text-2xl" />}
            placeholderSymbol={<FaStarHalfStroke className="text-yellow-300 text-2xl" />}
          />
        </div>
      </div>

      {/* Comment input */}
      <INPUT
        label="نظر شما:"
        type="text"
        name="message"
        value={Data.message}
        placeholder="نظر خود را اینجا وارد کنید"
        changeHandler={changeHandler}
        textarea={true}
        style=""
      />

      {/* Submit button */}
      <div className="w-full">
        {loading ? (
          <div className="w-full mt-5">
            <Loader w={8} /> {/* Show loader while submitting */}
          </div>
        ) : (
          <button
            onClick={(e) => sendHandler(e)}
            className="py-2 w-full mt-5 px-4 rounded-xl text-Regular-Normal-text-2 bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50"
          >
            ارسال نظر
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogTestimonialsForm;