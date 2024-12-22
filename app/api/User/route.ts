import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(){
   const { userId } = await auth();
   const user = await currentUser();

   return NextResponse.json({
    message : "Authenticated",
    data : {userId : userId,username : user?.username},
   },{status:200})
}