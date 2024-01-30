import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.js';

export const auth = async(req,res,next)=>{
    jwt.verify(req.headers.token, process.env.JWT_KEY, (err,decoded)=>{
        if(err) return next(new AppError(err,401))
        req.user = decoded
        next()
    })
}