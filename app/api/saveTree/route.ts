import { db } from "@/lib/mongodb";
import Trees from "@/models/Trees";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function POST(req:Request){
  try{
    const {userId} =await auth();
    console.log("hifeuueh");
    console.log(userId);
    
    const User1 = await User.findOne({clerkId:userId});
    


    if(!User1){
      return Response.json({success : false, message : "Unauthorized"}, {status : 401});
    }
    await db.connect();
    const {name , members,template} = await req.json();
    if(!name || !members){
      return Response.json({success : false, message : "All fields are not filled"}, {status : 400});
    }
    let tree = await Trees.findOne({name, userId:User1._id});
    if(tree){
      tree.members = members;
      tree.template = template || tree.template;
      tree.lastModified = new Date().toISOString().split("T")[0];
      tree.memberCount = members.length;
      await tree.save();
    }else{
      tree = await Trees.create({
        userId:User1._id,
        name,
        members,
        template: template || 'hugo',
        memberCount: members.length,
      });
    }

    return Response.json({success : true, tree}, {status : 200});
  }catch(err){
    console.log(err);
    return Response.json({success : false, message : err}, {status : 500});
  }
}