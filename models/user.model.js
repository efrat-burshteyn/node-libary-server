
import { model,Schema } from "mongoose";
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
    export const User = model("User",userSchema);
      