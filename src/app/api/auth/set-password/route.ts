import User from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        
        // Connect to the database
        await connectDB();

        // Extract email and new password from the request body
        const { email, password } = await req.json();

        // Validate email and password input
        if (!email || !password) {
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

        // Validate password length (should be at least 6 characters)
        if (password.length < 6) throw new Error(ERROR.PASSWORD_ATLEAST);

        // Hash the new password before storing
        const hashedPassword = await hashPassword(password);

        // Update the user's password with the new hashed password
        existUser.password = hashedPassword;
        existUser.updatedAt = new Date()

        // Save the updated user document
        await existUser.save();

        // Return a success response indicating password reset is complete
        return NextResponse.json(
            { message: MESSAGE.PASSWORD_RESET },
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