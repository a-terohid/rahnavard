import NextAuth from "next-auth"
import { UserRole } from "./enums/generalEnums";

declare module "next-auth" {

  interface Session {
    user: {
      id: string;
      role: UserRole
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    name?: string | null;
    last_name?: string | null;
    password?: string | null;
    email : string | null;
    image?: string | null;
    role: string | null;
  }

} 
