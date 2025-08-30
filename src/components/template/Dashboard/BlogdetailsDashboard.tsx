import DeleteBlog from '@/elements/buttons/DeleteBlog';
import PublishBlog from '@/elements/buttons/PublishBlog';
import { Blog_Interface, User_Interface } from '@/types/modelTypes';
import { replaceDescriptionImageSrc } from '@/utils/BlogDescriptionImageHandler';
import React from 'react';

const BlogdetailsDashboard = ({blog , author , userIsAdmin}:{blog:Blog_Interface , author : User_Interface | null , userIsAdmin: boolean}) => {

    const { title , createdAt , description, images , published , _id } = blog

    const finalDescription = replaceDescriptionImageSrc(description , images)

    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='lg:text-Bold-Normal-title-2 text-Bold-Normal-title-3'>{title}</h1>
            <div className=' bg-Neutral-600 h-[1px] rounded-full mt-3'></div>
            <ul className='flex gap-x-6 text-Regular-Normal-text-2 lg:text-Regular-Normal-text-1 mt-1 mb-4'>
                <li>{author?.name} {author?.last_name}</li>
                <li>{createdAt.toLocaleDateString()}</li>
                <li>{published ? "پابلیش شده" : "در حال برسی"}</li>
            </ul>
            <div className="w-full">
                <div
                     className="
                        prose 
                        prose-img:mx-auto 
                        prose-img:rounded-xl 
                        prose-img:w-2/3
                        prose-ul:list-disc 
                        prose-ol:list-decimal 
                        prose-ul:pl-5 
                        prose-ol:pl-5 
                        prose-li:marker:text-black 
                        max-w-none
                    "
                    dangerouslySetInnerHTML={{ __html: finalDescription }}
                />
            </div>
            <div className='mt-8 py-4 border-t border-Neutral-600 flex items-center gap-x-2 justify-center'>
                { !published && userIsAdmin && <PublishBlog id={_id} />}
                {userIsAdmin && <DeleteBlog id={_id} />}
            </div>
        </div>
    );
};

export default BlogdetailsDashboard;