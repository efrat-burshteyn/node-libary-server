
import {connect,model,Schema} from "mongoose";
export const connectDB=async()=>{
    try{
        await connect(process.env.MONGO_URL);
        console.log('succesfull to connect to mongo');
    }
    catch(error){
        console.log(error);
    }
}