import { User_Interface } from "@/types/modelTypes";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/user";

/**
	 * Checks the current user's session and retrieves the corresponding user record from the database.
	 *
	 * @returns An object containing:
	 *   - `session`: The current authenticated session (if any).
	 *   - `user`: The user or agent document from the database, or `null` if not found or not logged in.
 */

export const checkSession = async (): Promise<{ session: any; user: User_Interface  | null; }> => {
	// Ensure the database connection is established
	await connectDB();

	// Retrieve the current session using NextAuth
	const session = await getServerSession(authOptions);
	let user: User_Interface | null = null;

	// If no session exists, return immediately
	if (!session) return { session, user };

	// Extract the user's role from the session
	const role = session?.user.role;

	user = await User.findOne({ email: session?.user.email });

	// Return both the session and the retrieved user
	return { session, user };
};