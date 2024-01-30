import bcrypt from "bcrypt";
import { userModel } from "../../DB/model/user.model.js";
import { AppError } from "../utils/appError.js";

export const checkEmail = async(req,res,next)=>{
    let user = await userModel.findOne({email: req.body.email});
    if(user) return next(new AppError("Email already exists.",409));

    req.body.password = bcrypt.hashSync(req.body.password,8)

    next()
}