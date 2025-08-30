import { Blog_Interface } from '@/types/modelTypes';
import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema<Blog_Interface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, 
      required: true,
    },
    autor_id: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
    PublishedBY: {
      userId: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    testimonials: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, 
  }
);

const Blog = models.Blog || model('Blog', BlogSchema);
export default Blog;