import mongoose from "mongoose";

export function dbConnection(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connect Successfully");
    }).catch((error)=>{
        console.log("DB Error",error);
    })
}