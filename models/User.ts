import mongoose, { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    clerkId : {
        type : String,
        required : true,
        
    },
    email :{
        type : String,
        required : true,
    },username:{
        type : String,
        required : true,
    },
    photo:{
        type : String,
        required : true,
    },
    firstname:{
        type : String,
    },
    lastname:{
        type : String,
    }
})

const User = models?.User || model("User",UserSchema);

export default User;