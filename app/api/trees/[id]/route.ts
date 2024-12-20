import { db } from "@/lib/mongodb";
import Tree from "@/models/Trees";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.connect();
    const body = await req.json();

    const tree = await Tree.findOneAndUpdate(
      { _id: params.id, userId },
      { ...body, lastModified: new Date().toISOString().split("T")[0] },
      { new: true }
    );

    if (!tree) return new Response("Not Found", { status: 404 });
    return Response.json(tree);
  } catch (error) {
    console.log("Failed to update tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {userId} =await auth();
    console.log(userId);
    await db.connect();
    const User1 = await User.findOne({clerkId:userId});
    console.log(User1);
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.connect();
    const tree = await Tree.findOneAndDelete({ _id: params.id, userId: User1._id });

    if (!tree) return new Response("Not Found", { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    console.log("Failed to delete tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get("user-id");
    console.log("GET EDIT: "+userId);
    
    const User1 = await User.findOne({clerkId:userId});
    await db.connect();

    if (!userId) return new Response("Unauthorized", { status: 401 });

    const tree = await Tree.findOne({ _id: params.id, userId:User1._id });

    if (!tree) return new Response("Not Found", { status: 404 });
    return Response.json(tree);
  } catch (error) {
    console.log("Failed to fetch tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
