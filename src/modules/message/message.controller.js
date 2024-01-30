import { messageModel } from "../../../DB/model/message.model.js"
import { catchError } from "../../middleware/catchError.js"
import qrcode from "qrcode"

export const addMessage = catchError(async(req,res,next)=>{
    const { message, receivedId} = req.body
    await messageModel.insertMany({message,receivedId})
    res.json({message:"success"})
})

export const allMessages = catchError(async(req,res,next)=>{
    let messages = await messageModel.find({receivedId: req.params.id})
    res.json({message:"success", messages})
})

export const shareProfile = catchError(async(req,res,next)=>{ 
    qrcode.toDataURL("http://localhost:3000/addMessage", (err,qr)=>{
        res.send(`<img src="${qr}"/>`)
    })
})