'use client'

import { ERROR } from "@/types/enums/MessageUnum";
import Loader from "../Loader";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";


const DeleteBlog = ({id}: {id:any}) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter(); // used for redirect after submission
    


     const DeleteHandler = async () => {
        const confirmDelete = confirm("آیا می خواهید این بلاگ را حذف کنید؟ ");
        if (!confirmDelete) return

        setLoading(true);

        try {
            const res = await fetch(`/api/blog/delete/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
            });

            const resData = await res.json();

            if (resData.error) {
                toast.error(resData.error);
            } else {
                toast.success(resData.message);
                router.replace("/dashboard/blogs");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className=" flex justify-center">
        {

            loading ? <Loader w={9} /> : <button onClick={DeleteHandler} className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 w-fit text-Regular-Normal-text-2 px-2 py-1 rounded-md cursor-pointer"  >حذف</button>
        }    
        </div>
    );

};


export default DeleteBlog;