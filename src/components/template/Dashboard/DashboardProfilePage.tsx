import { UserRole } from '@/types/enums/generalEnums';
import { User_Interface } from '@/types/modelTypes';
import Link from 'next/link';
import { MdLockReset } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import React from 'react';
import ImageWithFallback from '@/elements/ImageWithFallback';
import { mask } from '@/utils/mask';
import LogoutButton from '@/elements/buttons/LogoutButton';

// DashboardProfilePage displays user's profile information such as email, name, role, etc.
// Also provides actions like edit profile, reset password, and logout.
const DashboardProfilePage = ({ user }: { user: User_Interface }) => {

    const { _id, 
            email, 
            name, 
            last_name, 
            phone_number, 
            profile_picture, 
            role, 
            password, 
            createdAt, 
            updatedAt,
        } = user;


    let roletext = ''

    if( role == "Owner" ) roletext = "مدیر"
    else if ( role == "Admin" ) roletext = "ادمین"


    return (
        <div className='px-5 py-5 md:px-7' >
            
            {/* Show password warning if user registered with OAuth */}
            {
                !password || password === "oauth_no_password" ? (
                    <div>
                        <p className='px-4 py-3 bg-Error-50 text-Error-300 rounded-xl mb-5 text-Regular-Normal-text-1'>
                            شما هنوز رمز عبور تعیین نکرده‌اید. لطفاً  
                            <Link className='text-Bold-Normal-text-1 underline ml-1' href='/dashboard/profile/reset-password'>
                                اینجا کلیک کنید
                            </Link> 
                            تا یک رمز عبور تنظیم کنید.
                        </p>
                    </div>
                ) : null
            }

            {/* Page title */}
            <h1 className='text-Bold-Normal-title-2 mb-6'>پروفایل</h1>

            <div className='md:flex gap-x-6 lg:gap-x-8'>
                {/* Profile image with fallback */}
                <div className='w-2/3 md:w-1/3 relative'>
                    <ImageWithFallback src={profile_picture || ""} alt={email} style={role === UserRole.CLIENT ? "rounded-b-2xl" : ''} />
                    
                    {/* Show user role if not a CLIENT */}
                    {role !== UserRole.CLIENT ? (
                        <p className='pt-5 pb-1 px-2 rounded-b-xl text-center -mt-4 text-Regular-Normal-text-2 bg-Neutral-800 text-Neutral-200'>
                            {roletext}
                        </p>
                    ) : null}
                </div>

                {/* Profile info */}
                <div className='w-full'>
                    {/* Basic fields */}
                    <div className='mt-4 flex flex-col gap-y-2 pb-5 mb-5 border-b border-Greyscale-400'>
                        <p className='text-Bold-Normal-text-1'>
                            ایمیل: 
                            {email ? (
                                <span className='text-Regular-Normal-text-1 ml-1'> {email}</span>
                            ) : (
                                <span className='text-Regular-Normal-text-1 italic text-Greyscale-400 ml-1'> این فیلد خالی است </span>
                            )}
                        </p>
                        <p className='text-Bold-Normal-text-1'>
                            نام: 
                            {name ? (
                                <span className='text-Regular-Normal-text-1 ml-1'> {name}</span>
                            ) : (
                                <span className='text-Regular-Normal-text-1 italic text-Greyscale-400 ml-1'> این فیلد خالی است </span>
                            )}
                        </p>
                        <p className='text-Bold-Normal-text-1'>
                            نام خانوادگی: 
                            {last_name ? (
                                <span className='text-Regular-Normal-text-1 ml-1'> {last_name}</span>
                            ) : (
                                <span className='text-Regular-Normal-text-1 italic text-Greyscale-400 ml-1'> این فیلد خالی است </span>
                            )}
                        </p>
                        
                        <p className='text-Bold-Normal-text-1'>
                            شماره تماس: 
                            {phone_number ? (
                                <span dir='ltr' className='text-Regular-Normal-text-1 ml-1'> {mask(phone_number , "****-***-****")}</span>
                            ) : (
                                <span className='text-Regular-Normal-text-1 italic text-Greyscale-400 ml-1'> این فیلد خالی است </span>
                            )}
                        </p>
                    </div>
                    <div className=' pb-5 mb-5 border-b  flex flex-col gap-y-6 border-Greyscale-400'>
                    </div>
                    {/* Dates */}
                    <div className='flex justify-between md:justify-start md:gap-x-5 pb-5 mb-5 border-b  border-Greyscale-400'>
                        <p className='text-Bold-Normal-text-1'>
                            تاریخ ثبت‌نام: 
                            <span className='text-Regular-Normal-text-2 ml-1'> {createdAt?.toLocaleDateString()}</span>
                        </p>
                        <p className='text-Bold-Normal-text-1'>
                            آخرین بروزرسانی: 
                            <span className='text-Regular-Normal-text-2 ml-1'> {updatedAt?.toLocaleDateString()}</span>
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div>
                        <ul className='text-Regular-Caption-2 md:text-Regular-Normal-text-2 flex gap-x-4 justify-center'>
                            <li>
                                <Link 
                                    href={`/dashboard/profile/edit?id=${_id}`} 
                                    className='flex items-center gap-x-1 bg-Secondary-200 text-Secondary-0 hover:bg-Secondary-50 hover:text-Secondary-300 p-2 rounded-lg'
                                >
                                    <FiEdit className='text-lg' />
                                    ویرایش
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/dashboard/profile/reset-password?id=${_id}`} 
                                    className='flex items-center gap-x-1 bg-Secondary-200 text-Secondary-0 hover:bg-Secondary-50 hover:text-Secondary-300 p-2 rounded-lg'
                                >
                                    <MdLockReset className='text-lg' />
                                    تغییر رمز عبور
                                </Link>
                            </li>
                            <LogoutButton />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfilePage;