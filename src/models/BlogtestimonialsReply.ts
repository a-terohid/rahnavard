import { Blog_Testimonials_reply_interface } from '@/types/modelTypes';
import mongoose, { Schema, model, models } from 'mongoose';

const BlogTestimonialsReplySchema = new Schema<Blog_Testimonials_reply_interface>(
     {
    parent_id: {
      type: String,
      required: true,
    },
    author_id: {
      type: String, 
      required: true,
    },
    message: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        required: true, 
        default:  new Date()
    },
    updatedAt: {
        type: Date,
        required: true, 
        default: ""
    },
  },
  {
    timestamps: true, 
  }
)


const BlogTestimonialsReply = models?.BlogTestimonialsReply || model("BlogTestimonialsReply", BlogTestimonialsReplySchema);

export default BlogTestimonialsReply;