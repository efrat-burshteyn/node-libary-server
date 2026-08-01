
import { model,Schema } from "mongoose";
import bcrypt from "bcrypt";
import React from "react";
const arrLength =(arr)=>{
    return arr.length<=3;
}
    const userSchema=new Schema({
        username: String,
        email:{
            type:String,
            required: true,
            lowercase: true
        },
        phone:{
            type: String,
             match: /^[0-9]{2,3}-?[0-9]{7}$/
            },
        password:{
            type: String,
            required: true,
            minlength: 4
        },
        dateSign:{
            type: Date,
            default: Date.now
        },
        borrowedBooks: {
             type: [{
                code:{type: Schema.Types.ObjectId,ref:"Book"},
                nameBook: String,
                dateReturn: Date
            }],
            validate: [arrLength,'אי אפשר להשאיל יותר משלושה ספרים!']
        }
    });
    userSchema.pre("save",async function (next){
        if(!this.isModified("password"))
            return next();
        try{
            const salt =await bcrypt.genSalt(10);
            this.password=await bcrypt.hash(this.password,salt);
            next();
        }
        catch(error){
            next(error);
        }
    } );
    userSchema.statics.checkPassword=async function (email,candidatePassword){
        const user = await this.findOne({email});
        if(!user){
            return false;
        }
        const isMatch = await bcrypt.compare(candidatePassword,user.password);
        return isMatch ? user : false;
    };
    userSchema.set('toJSON',{
        Transform: function (doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            return ret;
        }
    })
    export const User = model("User",userSchema);
      