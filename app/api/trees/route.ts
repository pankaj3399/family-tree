import { db } from "@/lib/mongodb";
import Tree from "@/models/Trees";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.connect();
    const trees = await Tree.find({ userId });
    return Response.json(trees);
  } catch (error) {
    console.error("Failed to fetch trees:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id");
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const { name = "New Family Tree" } = await req.json();

    await db.connect();
    const tree = await Tree.create({
      userId,
      name,
    });
    return Response.json(tree);
  } catch (error) {
    console.error("Failed to create tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
