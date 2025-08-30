export enum UserRole {
    CLIENT = "Client",                // Regular client or customer
    ADMIN = "Admin",                  // Administrator with full permissions
    OWNER = "Owner",                  // Property owner
    ALL = "all"                      // Represents all roles
}

/**
 * Enum representing types of actions logged in the system
 */
export enum LogsActions  {
    NEW_REGISTER = 'کاربر جدید ثبت‌نام کرد',                    // New user registration
    NEW_REGISTER_GOOGLE = 'کاربر جدید از طریق گوگل ثبت‌نام کرد', // New user registered via Google
    NEW_BLOG = 'بلاگ جدید اضافه شد',                            // New blog post created
    NEW_BLOG_TESTIMONIALS = 'نظر جدید برای بلاگ اضافه شد',       // New testimonial added to blog
    NEW_BLOG_TESTIMONIALS_REPLY = 'پاسخ به نظر بلاگ اضافه شد',   // Reply to a blog testimonial added
    BLOG_DELETED = 'بلاگ حذف شد',                                // Blog post deleted           
    BLOG_PUBLISHED = 'بلاگ منتشر شد',                            // Blog marked as published   
    BLOG_REJECTED = 'بلاگ رد شد',                                // Blog rejected or disapproved
}