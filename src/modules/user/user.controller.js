import { userModel } from "../../../DB/model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { confirmEmail } from "../../services/email/confirmEmail.js";
import { resetEmail } from "../../services/email/resetEmail.js";

export const signUp = catchError(async(req,res)=>{
    const { name, email, password, age} = req.body
    await userModel.insertMany({name, email, password, age})
    confirmEmail(email)
    res.json({message: "SignUp Successfully"})
})

export const verifyEmail = catchError( async (req,res,next)=>{
    jwt.verify(req.params.token, process.env.JWT_KEY, async(err,decoded)=>{
        if(err) return next(new AppError(err,401)) 
        await userModel.findOneAndUpdate({email: decoded.email},{verifyEmail: true})
        res.json({message:"Email Confirmed"})
    })  
})
//unsubscribe email if  email not confirm
export const unsubscribe = catchError(
    async(req,res,next)=>{
        const { email } = req.body;
        let user = await userModel.findOne({email})
        if(!user) return next(new AppError('User Not Found',404));
        if(user.verifyEmail) return res.json({message: "Email Confirmed"});
        await userModel.findOneAndDelete({email})
        res.json({message:"Unsubscribed successfully"})
    }  
)

export const signIn = catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email: req.body.email})
    if (user && bcrypt.compareSync(req.body.password, user.password)){
        if(!user.verifyEmail) return next(new AppError("Please check Confirm email",400))
        let token = jwt.sign({userId:user._id,email: user.email},process.env.JWT_KEY)
        user.isActive = true///////////////
        return res.json({message: "SignIn Successfully", token})
    }
    next(new AppError("incorrect email or password",401))
}) 

export const forgetPassword = catchError(
    async (req, res, next) => {
        const { email } = req.body;  
        const user = await userModel.findOne({ email });
        if (!user)  return next(new AppError("User not found: Please sign up",404));
        const resetToken = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' });
        await userModel.findOneAndUpdate({ email }, { resetPasswordToken: resetToken, resetPasswordExpires: Date.now() + 3600000 });
        resetEmail(email, resetToken);
        res.json({ message: 'Reset email sent successfully' });
    }   
)

export const resetPassword = catchError(
    async (req, res, next) => {
        const { token } = req.params;
        const { password } = req.body;
        jwt.verify(token, process.env.JWT_KEY, async(err,decoded)=>{
        if(err) return next(new AppError(err,401)) 
        const user = await userModel.findOne({ email: decoded.email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user)   return next(new AppError( 'Invalid or expired token',400));
        await userModel.findOneAndUpdate({ email: decoded.email }, 
            {password: bcrypt.hashSync(password,8), resetPasswordToken: null, resetPasswordExpires: null });
        res.json({ message: 'Reset Password successfully.' });
        })
    }
)

export const logOut = async (req, res,next) => {      
    jwt.verify(req.header.token, process.env.JWT_KEY, async(err,decoded)=>{
        if(err) return next(new AppError('invalid token',401))
        await userModel.findOneAndUpdate({ email: decoded.email }, {isActive: false})
        return res.json({ message: 'Logout successful' });
    })   
}