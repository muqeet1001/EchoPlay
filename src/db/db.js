import mongoose from 'mongoose';

async function dbConnected() {
    try{
       await mongoose.connect(process.env.MONGO_URI)
       console.log("db connected");
    }
    catch(err){
        console.log("db not connected");
        
    }
}

export default dbConnected;