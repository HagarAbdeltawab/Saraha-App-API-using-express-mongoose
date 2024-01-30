import joi from "joi"
export const signUpSchemaVal = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword: joi.valid(joi.ref('password')).required(),
    age: joi.number().integer().min(10).max(80).required()
})
export const signInSchemaVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/)
})

export const emailSchemaVal = joi.object({
    email: joi.string().email().required()
})

export const resetPassSchemaVal = joi.object({ 
    password: joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),
    rePassword: joi.valid(joi.ref('password')).required(),
    token: joi.string().required(), 
})