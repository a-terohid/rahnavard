"use client"

import { ERROR } from "@/types/enums/MessageUnum";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";

const PublishBlog = ({id}: {id:any}) => {

    const [loading, setLoading] = useState(false);


    const PublishHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const publish = confirm("آیا میخواهید این بلاگ را پابلیش کنید؟") 
            
        try {
            // Sending the request to the server
            const res = await fetch(`/api/blog/publish/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ publish : publish }),
                headers: { "Content-Type": "application/json" },
            });

            // Extract response data
            const resData = await res.json();
            setLoading(false);

            // Handle error or success response
            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
            }
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        }
    };


    return (
        <div className=" flex justify-center">
        {

            loading ? <Loader w={9} /> : <button onClick={PublishHandler} className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 w-fit text-Regular-Caption-1 px-2 py-1 rounded-md cursor-pointer" >پابلیش</button>
        }    
        </div>
    );
};

export default PublishBlog;