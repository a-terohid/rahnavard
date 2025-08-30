import { Blog_Interface, User_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import React from 'react';
import slugify from 'slugify';
import ImageWithFallback from '../ImageWithFallback';

const BlogCard = ({ blog , author  }: {blog: Blog_Interface , author: User_Interface }) => {

    const { _id , title , description , createdAt , thumbnails } = blog
    const { name , last_name } = author

    const slug = slugify(`${_id}-${title}-${name}${last_name}`,{ lower: true, strict: true })
    
    return (
        <div className='p-2 border border-Greyscale-100 w-fit rounded-3xl'>
            {/* Link to the agent's detailed page */}
            <Link href={`/blogs/${slug}`} className='hover:grayscale-[0.5]'>
                {/* Profile image with fallback handling */}
                <ImageWithFallback src={thumbnails || ""} alt={description} type={'thumbnail'} style={"rounded-b-2xl"} />
            </Link>
            <div className='pt-4 px-2 mb-2'>
                <p className='text-Body-RL-Small md:text-Body-RL-Medium mb-1'>{createdAt.toLocaleDateString()}</p>
                <h3 className='text-Heading-6'>{title}</h3>
            </div>
        </div>
    );
};

export default BlogCard;