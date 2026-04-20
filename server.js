import app from "./src/app.js";
import dotenv from 'dotenv'
import dbConnected from "./src/db/db.js";
dotenv.config();
dbConnected();
app.listen(3000,()=>{
    console.log("server is running ");
})
