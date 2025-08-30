import { Blog_Interface, User_Interface } from '@/types/modelTypes';
import React from 'react';
import ImageWithFallback from '../ImageWithFallback';
import Link from 'next/link';
import PublishBlog from '../buttons/PublishBlog';

const BlogsCardDashboard = ({ blog , author , userIsAdmin }: {blog: Blog_Interface , author: User_Interface , userIsAdmin: boolean}) => {

    const { published , thumbnails , description , title , _id , createdAt} = blog

    return (
        <div className={`p-3 ${published ? ' bg-primary-0' : " bg-Error-100"} rounded-xl`}>
    <div className='w-full flex flex-col lg:flex-row gap-x-6 gap-y-3 lg:items-end '>
        <div className='lg:w-1/4'>
            <ImageWithFallback 
                src={thumbnails || ""} 
                alt={description} 
                type={'thumbnail'} 
                style='w-full !rounded-2xl border  border-primary-50' 
            />
        </div>

        {/* Blog info section */}
        <ul className='flex flex-col gap-y-1 text-Body-RL-XSmall md:text-Body-RL-Small mb-3'>
            <li>
                <span className='text-Body-SM-XSmall md:text-Body-SM-Small ml-2'>عنوان:</span> 
                <span>{title}</span>
            </li>
            <li className='flex'>
                <span className='text-Body-SM-XSmall md:text-Body-SM-Small ml-2 '>نویسنده:</span> 
                <span>{author.name} {author.last_name}</span> 
            </li>
            <li>
                <span className='text-Body-SM-XSmall md:text-Body-SM-Small ml-2'>تاریخ ایجاد:</span> 
                <span>{createdAt.toLocaleDateString()}</span>
            </li>
        </ul>
    </div>

    {/* Action buttons */}
    <div className='flex justify-end mx-auto gap-x-2'>
        { !published && userIsAdmin && <PublishBlog id={_id} />}
        <Link 
            className="bg-primary-300 hover:bg-primary-600 text-primary-800 hover:text-primary-50 w-fit text-Regular-Caption-1 px-2 py-1 rounded-md cursor-pointer" 
            href={`/dashboard/blogs/${_id}`}
        >
            بررسی
        </Link>
    </div>
</div>
    );
};

export default BlogsCardDashboard;