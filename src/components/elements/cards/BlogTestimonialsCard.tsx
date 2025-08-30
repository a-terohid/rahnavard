"use client";

import ShowRating from '../ShowRating';
import ImageWithFallback from '../ImageWithFallback';
import { useState } from 'react';
import INPUT from '../INPUT';
import Loader from '../Loader';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { ERROR } from '@/types/enums/MessageUnum';

const BlogTestimonialsCard = ({ v, ts, userIsAdmin }: { v?: string, ts: any, userIsAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Toggle reply form
  const [loading, setLoading] = useState(false);        // Loading state for reply
  const [Reply, setReply] = useState<string>("");       // Reply message state

  const { data } = useSession(); // Get user session

  const openHandler = () => setIsOpen(!isOpen); // Toggle open/close reply form
  const changeHandler = (e: any) => setReply(e.target.value); // Handle reply input change

  const sendHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/blog/testimonials/reply`, {
        method: "POST",
        body: JSON.stringify({
          author_id: data?.user?.id || '',
          parent_id: ts.Testimonial._id,
          blog_id: ts.Testimonial.blog_id,
          message: Reply,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();
      setLoading(false);

      if (resData.error) {
        toast.error(resData.error);
      } else {
        toast.success(resData.message);
        setReply('');
        setIsOpen(false);
      }
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response?.data?.error || ERROR.PROBLEM;
      toast.error(errorMessage);
    }
  }

  const renderCardContent = () => (
    <div className='flex gap-x-4 p-3 border border-Neutral-400 rounded-3xl w-full'>
      <ImageWithFallback src={ts.user.profile_picture || ""} alt={ts.user.email} style="rounded-b-2xl w-14 h-14" />
      <div className='w-full'>
        <p>{ts.user.name} {ts.user.last_name}</p>
        <ShowRating rating={ts.Testimonial.rate} />
        <p className='mt-3 border border-Neutral-400 py-2 px-4 w-full rounded-xl'>{ts.Testimonial.message}</p>

        {userIsAdmin &&
          <div className='w-full flex justify-end mt-2'>
            {!isOpen ? 
              <p onClick={openHandler} className='hover:text-primary-500 cursor-pointer'>پاسخ دهید</p> 
              : 
              <p onClick={openHandler} className='p-2 rounded-full w-8 h-8 flex items-center justify-center bg-primary-300 hover:bg-primary-700 text-white'>x</p>
            }
          </div>
        }

        {userIsAdmin && isOpen &&
          <div className='mt-3'>
            <INPUT
              label="پاسخ شما:"
              type="text"
              name="message"
              value={Reply}
              placeholder="پاسخ خود را اینجا وارد کنید"
              changeHandler={changeHandler}
              textarea={true}
              style=''
            />
            {loading ? (
              <div className="w-full mt-5"><Loader w={8} /></div>
            ) : (
              <button 
                onClick={(e) => sendHandler(e)} 
                className='py-2 w-full mt-5 px-4 rounded-xl bg-primary-300 hover:bg-primary-600 text-white'
              >
                ارسال پاسخ
              </button>
            )}
          </div>
        }
      </div>
    </div>
  );

  const renderReplies = () => (
    ts.replies.length > 0 && (
      <div className='flex flex-col gap-y-3 mt-3 pr-8'>
        {ts.replies.map((rep: any) => (
          <div key={rep.author._id} className='flex gap-x-4 p-3 border border-Neutral-400 bg-primary-50 rounded-3xl w-full'>
            <ImageWithFallback src={rep.author.profile_picture || ""} alt={rep.author.email} style="rounded-b-2xl w-14 h-14" />
            <div className='w-full'>
              <p>{rep.author.name} {rep.author.last_name}</p>
              <p className='mt-3 border border-Neutral-400 py-2 px-4 bg-primary-0 w-full rounded-xl'>
                {/* Show original testimonial */}
                <div className='border border-Neutral-400 py-2 px-4 w-full rounded-xl bg-Secondary-100 mb-2'>{ts.Testimonial.message}</div>
                {/* Show admin reply */}
                <div className='py-2 px-4 rounded-xl'>{rep.reply.message}</div>
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div>
      {renderCardContent()}
      {renderReplies()}
    </div>
  );
};

export default BlogTestimonialsCard;