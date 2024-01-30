import { AppError } from "../utils/appError.js"

export const validation = (schema)=>{
    return (req,res,next)=>{
        const { error } = schema.validate({
            ...req.body,
            ...req.params,
            ...req.query,
            ...req.header}, 
            {abortEarly: false})
        if(!error){
            next() 
        }else{
            let errMes =[]
            error.details.forEach(val => {
                errMes.push(val.message)
            });
            next(new AppError(errMes,401))
        }
    }
}