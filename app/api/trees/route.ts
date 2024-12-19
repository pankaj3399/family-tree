import { db } from "@/lib/mongodb";
import Tree from "@/models/Trees";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const {userId} =await auth();
    console.log(userId);
    await db.connect();
    const User1 = await User.findOne({clerkId:userId});
    console.log(User1);
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const trees = await Tree.find({ userId: User1._id });
    return Response.json(trees);
  } catch (error) {
    console.error("Failed to fetch trees:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {userId} =await auth();
    console.log("hifeuueh");
    console.log("CREATE TREE: "+userId);
    await db.connect();
    const User1 = await User.findOne({clerkId:userId});
    
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { name = "New Family Tree" } = await req.json();

    const tree = await Tree.create({
      userId:User1._id,
      name,
    });
    return Response.json(tree);
  } catch (error) {
    console.error("Failed to create tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
