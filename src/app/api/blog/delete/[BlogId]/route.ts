import { authOptions } from "@/lib/auth";
import { ERROR, MESSAGE } from "@/types/enums/MessageUnum";

import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";
import { LogsActions } from '@/types/enums/generalEnums';
import Log from "@/models/log";
import path from "path";
import { rm } from 'fs/promises';
import Blog from "@/models/Blog";

export async function PATCH(req: Request, { params }: { params: { BlogId: string } }) {
  try {
    await connectDB();
    const blog_id = params.BlogId;

    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });

    const BLOG = await Blog.findOne({ _id: blog_id });
    if (!BLOG)
      return NextResponse.json({ error: ERROR.CANT_FIND_BLog }, { status: 404 });

    const fullPath = path.resolve('public/store/blogs/', blog_id);

    // Delete files first
    try {
      await rm(fullPath, { recursive: true, force: true });
    } catch (error) {
      console.error("Error removing property files:", error);
      return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }

    // Then delete the blog from DB
    await Blog.deleteOne({ _id: blog_id });

    await Log.create({
      title: `بلاگ با شناسه ${BLOG._id} توسط کاربر ${session.user?.email} حذف شد`,
      action: LogsActions.BLOG_DELETED,
      user_id: session.user.id,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: MESSAGE.BLOG_DELETED }, { status: 200 });

  } catch (error) {
    console.log("Error in PATCH handler:", error);
    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
  }
}