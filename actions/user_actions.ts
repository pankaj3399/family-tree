"use server"
import User from "@/models/User"
import { db } from "@/lib/mongodb"

export async function createUser(user:any){
    try{
        await db.connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        console.error("Failed to create user:",error);
        return null;
    }
}