import User from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import sendEmail from "@/utils/sendEmail";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        // Connect to the database
        await connectDB();

        // Extract email from the request body
        const { email } = await req.json();

        // Validate email input
        if (!email) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status: 422 }
            );
        }

        // Check if the user exists in the database
        const existUser = await User.findOne({ email }) 
        if (!existUser) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER }, 
                { status: 422 }
            );
        }

        // Generate a random reset token (not secure, should be improved)
        const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedToken = await hashPassword(resetToken); // Hash the token for security

        // Store the hashed token and expiration time in the user document
        existUser.resetPassword.token = hashedToken;
        existUser.resetPassword.expires = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save the updated user document
        await existUser.save();

        // Generate a reset URL with the hashed token
        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${hashedToken}&email=${email}`;

        // Email content with reset instructions
        const message = `Click here to reset your password: ${resetUrl} or you can use this code: ${resetToken}`;

        // Send the password reset email
        await sendEmail(email, "Reset Password | Rahnavard", message);

        // Return a success response
        return NextResponse.json(
            { message: MESSAGE.PASSWORD_RESET_EMAIL },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);

        // Return a server error response in case of failure
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
};