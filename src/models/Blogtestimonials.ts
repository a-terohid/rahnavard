import { Blog_Testimonials_interface } from '@/types/modelTypes';
import mongoose, { Schema, model, models } from 'mongoose';

const BlogTestimonialsSchema = new Schema<Blog_Testimonials_interface>(
     {
    user_id: {
      type: String,
      required: true,
    },
    blog_id: {
      type: String, 
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    replies: {
      type: [String],
      default: [],
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


const BlogTestimonials = models?.BlogTestimonials || model("BlogTestimonials", BlogTestimonialsSchema);

export default BlogTestimonials;