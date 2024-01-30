import { globalError } from "./middleware/globalErrorMiddleware.js"
import messageRouter from "./modules/message/message.routes.js"
import userRouter from "./modules/user/user.routes.js"
import { AppError } from "./utils/appError.js"
export function initApp(app,express){
    app.use(userRouter);
    app.use(messageRouter);
    app.use('*',(req,res,next)=>{
        next(new AppError(`Not valid: ${req.originalUrl}`,404));
    })
    app.use(globalError);
}