import { LogsActions, UserRole } from "./enums/generalEnums";

/**
 * Interface representing a system log entry
 */
export interface LOG_Interface {
    _id?: string;           // Optional unique identifier for the log
    title: string;          // Title or summary of the log entry
    action: LogsActions;    // Enum value indicating the action performed
    user_id: string;        // ID of the user who performed the action
    createdAt: Date;        // Timestamp when the log entry was created
}


/**
 * Interface representing a basic user in the system.
 */
export interface User_Interface {
    _id?: string;                // Optional unique identifier (MongoDB ID)
    email: string;               // User's email address
    password: string;            // User's hashed password
    name?: string;               // First name (optional)
    last_name?: string;          // Last name (optional)
    phone_number?: string;       // Phone number (optional)
    profile_picture?: string;    // Profile picture URL (optional)
    liked_products?: string[];   // Array of product IDs the user has liked
    role: UserRole;              // User's role (e.g., Admin, Agent, Customer)
    verified: boolean;           // Indicates if the user is verified
    orders?: string[];           // Array of order IDs associated with the user
    addresses: User_address_interface[]; // List of saved addresses
    createdAt: Date;             // Account creation date
    updatedAt?: Date;            // Last update date
    resetPassword?: {            // Password reset information (optional)
        token: string;           // Password reset token
        expires: Date;           // Token expiration date
    };
}

/**
 * Interface representing a user's saved address.
 */
export interface User_address_interface {
    estate: string;              // Estate, region, or neighborhood
    city: string;                // City name
    text_address: string;        // Full detailed address
    postalCode: number;          // Postal/ZIP code
    createdAt: Date;             // Address creation date
    updatedAt?: Date;            // Last update date
}


/**
 * Interface representing a blog post
 */
export interface Blog_Interface { 
    _id?: string;                                       // Optional unique blog ID
    title: string;                                     // Title of the blog
    description: string;                               // Blog content in HTML or rich text
    autor_id: string;                                  // ID of the author (user or agent)
    thumbnails: string;                                // Thumbnail image URL
    images: string[];                                  // Array of image URLs
    published: boolean;                                // Whether blog is published
    createdAt: Date;                                   // Date of creation
    updatedAt?: Date;                                  // Optional update timestamp
    PublishedBY: {                                     // Publisher details
        userId: string;                                // Publisher user ID
        email: string;                                 // Publisher email
    };
    testimonials: string[];                            // Array of testimonial IDs
}

/**
 * Interface representing a testimonial left on a blog
 */
export interface Blog_Testimonials_interface {
    _id?: string;              // Optional testimonial ID
    user_id: string;           // ID of the user leaving the testimonial
    blog_id: string;           // ID of the blog the testimonial is for
    rate: number;              // Rating (e.g., 1-5)
    replies: string[];         // Array of reply IDs
    message: string;           // Testimonial content
    createdAt: Date;           // Creation date
    updatedAt?: Date;          // Optional last update
}
 

export interface Blog_Testimonials_reply_interface {
    _id?: string;                  // Optional testimonial ID
    parent_id: string;            // ID of the testimonial or reply being replied to
    author_id: string;            // ID of the author of the reply
    message: string;              // Text content of the reply
    createdAt: Date;
    updatedAt?: Date;
}