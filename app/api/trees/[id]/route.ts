import { db } from "@/lib/mongodb";
import Tree from "@/models/Trees";
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
    const userId = req.headers.get("user-id");
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.connect();
    const tree = await Tree.findOneAndDelete({ _id: params.id, userId });

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
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await db.connect();
    const tree = await Tree.findOne({ _id: params.id, userId });

    if (!tree) return new Response("Not Found", { status: 404 });
    return Response.json(tree);
  } catch (error) {
    console.log("Failed to fetch tree:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
