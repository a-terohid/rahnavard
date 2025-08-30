import BlogCard from '@/elements/cards/BlogCard';
import BlogTestimonialsCard from '@/elements/cards/BlogTestimonialsCard';
import BlogTestimonialsForm from '@/elements/forms/BlogTestimonialsForm';
import ImageWithFallback from '@/elements/ImageWithFallback';
import { Blog_Interface, User_Interface } from '@/types/modelTypes';
import { replaceDescriptionImageSrc } from '@/utils/BlogDescriptionImageHandler';
import Image from 'next/image';
import React from 'react';

const BlogDetailspage = ({
  blog,
  author,
  otherBlogs,
  Testimonials,
  userIsAdmin,
}: {
  blog: Blog_Interface;
  author: User_Interface;
  otherBlogs: any;
  Testimonials: any;
  userIsAdmin: boolean;
}) => {
  const { title, createdAt, description, images, _id, thumbnails } = blog;
  const { name, last_name, email, profile_picture } = author;

  const finalDescription = replaceDescriptionImageSrc(description, images);

  return (
    <div className="pt-20">
      <div className="relative">
        {/* Hero background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={thumbnails}
            alt={description}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Hero content (title + date) */}
        <div className="pt-[400px] pb-20 container relative z-10">
          <div className="flex flex-col">
            <p className="text-Body-RL-Medium md:text-Body-RL-Large text-Neutral-200">
              {createdAt.toLocaleDateString("fa-IR")}
            </p>
            <h3 className="text-Regular-Normal-title-3 md:text-Regular-Normal-title-2 text-primary-0">
              {title}
            </h3>
          </div>
        </div>
      </div>

      {/* Blog content */}
      <div className="py-8 md:py-16 lg:py-28 container gap-y-5 grid grid-cols-1 lg:grid-cols-12">
        {/* Main blog column */}
        <div className="lg:col-span-9 lg:ml-11">
          <div
            className="
              prose 
              prose-img:mx-auto 
              prose-img:rounded-xl 
              prose-p:text-justify
              prose-ul:list-disc 
              prose-ol:list-decimal 
              prose-ul:pl-5 
              prose-ol:pl-5 
              prose-li:marker:text-black 
              max-w-none
            "
            dangerouslySetInnerHTML={{ __html: finalDescription }}
          />

          {/* Testimonials (desktop view) */}
          <div className="hidden lg:block mt-10">
            {Testimonials.length ? (
              <h4 className="text-Bold-Normal-title-3 mb-3 lg:text-Bold-Normal-title-2">
                نظرات کاربران
              </h4>
            ) : null}
            {Testimonials.length ? (
              <div className="flex flex-col gap-y-3">
                {Testimonials.map((ts: any) => (
                  <BlogTestimonialsCard
                    v="large"
                    ts={ts}
                    userIsAdmin={userIsAdmin}
                    key={ts.user._id}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3">
          {/* Author info */}
          <div>
            <h4 className="text-Bold-Normal-title-3 mb-3 lg:text-Bold-Normal-title-2">نویسنده</h4>
            <div className="flex gap-x-4 items-center p-2 border border-Greyscale-100 w-full rounded-3xl">
              <ImageWithFallback
                src={profile_picture || ""}
                alt={email}
                style={"rounded-b-2xl w-20"}
              />
              <div>
                <p className="text-Bold-Normal-text-2 md:text-Bold-Normal-text-1">
                  {name} {last_name}
                </p>
                <p className="text-Regular-Normal-text-2 md:text-Regular-Normal-text-1">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Other blogs */}
          <div className="mt-7">
            <h4 className="text-Bold-Normal-title-3 mb-3 lg:text-Bold-Normal-title-2">
              دیگر مقالات
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {otherBlogs.map((bl: any) => {
                return (
                  <BlogCard
                    key={bl.blog._id}
                    blog={bl.blog}
                    author={bl.author}
                  />
                );
              })}
            </div>
          </div>

          {/* Add comment form */}
          <div className="mt-7">
            <h4 className="text-Bold-Normal-title-3 mb-3 lg:text-Bold-Normal-title-2">ثبت نظر</h4>
            <BlogTestimonialsForm blogid={_id || ""} />
          </div>

          {/* Testimonials (mobile view) */}
          <div className="lg:hidden mt-7">
            {Testimonials.length ? (
              <h4 className="text-Bold-Normal-title-3 mb-3 lg:text-Bold-Normal-title-2">
                نظرات کاربران
              </h4>
            ) : null}
            {Testimonials.length ? (
              <div className="flex flex-col gap-y-3">
                {Testimonials.map((ts: any) => (
                  <BlogTestimonialsCard
                    ts={ts}
                    userIsAdmin={userIsAdmin}
                    key={ts.user._id}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailspage;