import { NextRequest } from "next/server";
import { db } from "@/lib/mongodb";
import Trees from "@/models/Trees";
import { auth } from "@clerk/nextjs/server";

export async function GET(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const UserId = auth();
        const name = req.json();
        
        if(!UserId || !name){
            return Response.json(
                {success : false, message : "All fields are not filled"},
                {status : 400}
            );
        }
        await db.connect();
        const tree = await Trees.findOne({name, UserId});
        if(!tree){
            return Response.json({success : false, message : "Tree not found"}, {status : 404});
        }

        return Response.json({success : true, tree}, {status : 200});
    }catch(err){
        return Response.json({success : false, message : err}, {status : 500});
    }
}