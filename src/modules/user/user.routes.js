import express from "express";
import { verifyEmail, forgetPassword, resetPassword, signIn, signUp, unsubscribe, logOut } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validation } from "../../middleware/validation.js";
import { emailSchemaVal, resetPassSchemaVal, signInSchemaVal, signUpSchemaVal } from "./user.validation.js";
const userRouter = express.Router()
userRouter.post('/signUp', validation(signUpSchemaVal),checkEmail, signUp)
userRouter.get('/verifyEmail/:token', verifyEmail)
userRouter.post('/unsubscribe',validation(emailSchemaVal), unsubscribe )
userRouter.post('/signIn', validation(signInSchemaVal),signIn)
userRouter.post('/forgotPassword',validation(emailSchemaVal),forgetPassword)
userRouter.post('/resetPassword/:token',validation(resetPassSchemaVal),resetPassword)
userRouter.post('/logOut',logOut)
export default userRouter;