
import Log from "@/models/log";
import User from "@/models/user";
import { LogsActions, UserRole } from "@/types/enums/generalEnums";
import { ERROR } from "@/types/enums/MessageUnum";
import { hashPassword, verifyPassword } from "@/utils/auth"; 
import connectDB from "@/utils/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


/**
 * Authentication options for NextAuth, including session strategy and provider configurations.
 */
export const authOptions: NextAuthOptions = {
    debug: true, // Enable debugging logs
    session: { strategy: "jwt" }, // Use JWT for session handling
    providers: [
        CredentialsProvider({
            credentials: { email: {}, password: {}, name: {}, last_name: {} },
            async authorize(credentials: any) {
                const { email, password, name, last_name } = credentials;

                // Connect to the database
                await connectDB();

                // Validate required credentials
                if (!email || !password) throw new Error(ERROR.INVALID_DATA);

                // Find the user in the database
                let user = await User.findOne({ email })
                if (!user) {
                    // Validate name and last name
                    if (!name || name.length < 3) throw new Error(ERROR.NAME_ATLEAST);
                    if (!last_name || last_name.length < 3) throw new Error(ERROR.LASTNAME_ATLEAST);

                    // Validate email format
                    if (!/\S+@\S+\.\S+/.test(email)) throw new Error(ERROR.INVALID_DATA);

                    // Validate password length
                    if (!password || password.length < 6) throw new Error(ERROR.PASSWORD_ATLEAST);

                    // Hash the password before storing
                    const hashedPassword = await hashPassword(password);
                    user = await User.create({
                        email,
                        password: hashedPassword,
                        name,
                        last_name,
                        role: UserRole.CLIENT, // Default role
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });

                    // Log user registration
                    await Log.create({
                        title: `New user with email ${email} has been registered`,
                        action: LogsActions.NEW_REGISTER,
                        user_id: "0",
                        createdAt: new Date(),
                    });
                } else {
                    // Verify password for existing users
                    const isValid = await verifyPassword(password, user.password);
                    if (!isValid) throw new Error(ERROR.WRONG_PASSWORD);
                }

                // Return user data for session
                return { id: user._id, email: user.email, name: user.name, role: user.role };
            }
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                // Connect to the database
                await connectDB();
                let existingUser = await User.findOne({ email: user.email });

                // If user does not exist, create a new entry in the database
                if (!existingUser) {
                    existingUser = await User.create({
                        email: user.email,
                        name: user.name,
                        password: "oauth_no_password", // No password required for Google authentication
                        role: UserRole.CLIENT, // Default role
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });

                    // Log Google user registration
                    await Log.create({
                        title: `New user with email ${user.email} has been registered via Google`,
                        action: LogsActions.NEW_REGISTER_GOOGLE,
                        user_id: "0",
                        createdAt: new Date(),
                    });
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = session.user || {}; // Ensure session.user exists
                (session.user as any).id = token.id; 
                (session.user as any).role = token.role; 
            }
            return session;
        }
    }
};

// Handles authentication requests (GET and POST)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };