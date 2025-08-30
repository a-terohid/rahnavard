import PaginationButtons from '@/elements/buttons/PaginationButtons';
import BlogsCardDashboard from '@/elements/cards/BlogsCardDashboard';
import BlogsDahsboardFilterSection from '@/elements/filter/BlogsDahsboardFilterSection';
import { Blog_Interface} from '@/types/modelTypes';
import { DashboardBlogsPage_interface } from '@/types/pagesProps';
import React from 'react';

const BlogsDashboardpage = ({ blogs , authors , currentPage, totalPages , totalBlogs , userIsAdmin = false }: DashboardBlogsPage_interface ) => {
    return (
        <div className='px-5 py-5 md:px-7'>
            {/* Page title */}
            <h1 className='text-Bold-Normal-title-2 mb-6'>بلاگ ها:</h1>
            <BlogsDahsboardFilterSection PATH='/dashboard/blogs' authors={authors} />
            <div>
                {
                    blogs.length ? <div className='flex flex-col gap-y-3'>{

                        blogs.map((bl:Blog_Interface) => {
                            const author = authors.find((user:any) => user._id.toString() === bl.autor_id.toString());
                            return <BlogsCardDashboard key={bl._id} blog={bl} author={author} userIsAdmin={userIsAdmin} />;
                        } )
                        
                    }</div> : <p>بلاگی یافت نشد</p>
                }
            </div>
             {/* Pagination control buttons */}
            { blogs.length ?  <PaginationButtons currentPage={currentPage} totalPages={totalPages} /> : null }
        </div>
    );
};

export default BlogsDashboardpage;