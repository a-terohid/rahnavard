import PaginationButtons from '@/elements/buttons/PaginationButtons';
import BlogCard from '@/elements/cards/BlogCard';
import { Blog_Interface } from '@/types/modelTypes';
import { DashboardBlogsPage_interface } from '@/types/pagesProps';
import React from 'react';

const BlogsPage = ({ blogs , authors , currentPage, totalPages , totalBlogs  }: DashboardBlogsPage_interface ) => {
    return (
        <div>
            {/* Background section with page title and description */}
            <div className="bg-Blogs-texture bg-cover bg-bottom lg:bg-center py-12">
                <div className="flex flex-col md:flex-row justify-between gap-y-4 mt-96 container">
                    {/* Page title */}
                    <h3 className="text-Regular-Normal-title-2 md:text-Regular-Subtitle text-primary-0">بلاگ‌ ها</h3>
                    
                    {/* Page description */}
                    <p className="text-Body-RL-Medium md:text-Body-RL-Large md:w-1/2 text-Neutral-200">
                        در بلاگ رهنورد با نکات، آموزش‌ها و تازه‌ترین مطالب درباره کوهنوردی، کمپینگ و طبیعت‌گردی همراه شوید. 
                        از راهکارهای ایمنی گرفته تا معرفی تجهیزات و تجربه‌های سفر، همه چیز برای یک ماجراجویی امن و لذت‌بخش در دل طبیعت.
                    </p>
                </div>
            </div>
            <div className='py-8 md:py-16 lg:py-28 container'>
                {
                    blogs.length ? (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
                            {blogs.map((bl: Blog_Interface) => {
                                const author = authors.find((user: any) => user._id.toString() === bl.autor_id.toString());
                                return <BlogCard key={bl._id} blog={bl} author={author} />;
                            })}
                        </div>
                    ) : (
                        <p>هیچ بلاگی یافت نشد</p>
                    )
                }
                {/* Pagination buttons */}
                { blogs.length ?  <PaginationButtons currentPage={currentPage} totalPages={totalPages} /> : null }
            </div>
        </div>
    );
};

export default BlogsPage;