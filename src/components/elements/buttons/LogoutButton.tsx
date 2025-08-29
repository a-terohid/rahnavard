"use client"

import { signOut } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

// LogoutButton component triggers the NextAuth signOut function
// and renders a styled logout button with an icon.
const LogoutButton = () => {
    return (
        <button 
            onClick={() => signOut({ callbackUrl: "/" })} 
            className='flex items-center gap-x-1 bg-Error-200 text-Error-0 hover:bg-Error-50 hover:text-Error-200 hover:cursor-pointer p-2 rounded-lg'
        >
            <IoIosLogOut className='text-lg' />
            خروج
        </button>
    );
};

export default LogoutButton;