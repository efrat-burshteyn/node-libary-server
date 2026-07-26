import  {model,Schema} from "mongoose";
const bookSchema=new Schema({
        name:{
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20,
            unique : true
        },
        price: Number,
        categories:{
            type: [String],
            required: true,
            enum:["English","Math","Children","History"]
        },
        borrowedBy:{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        rentalHistory: [{
            user: {type: Schema.Types.ObjectId,ref: "User"},
            borrowDate: {type: Date, default: Date.now},
            dateReturn: Date
        }],
        detailsAuthor:{
            name:String,
            phone: String,
            email: String
      }    
});
export const Book=model("Book",bookSchema);