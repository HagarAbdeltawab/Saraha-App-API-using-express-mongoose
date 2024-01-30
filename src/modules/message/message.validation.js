import joi from "joi";

export const addMessageSchemaVal = joi.object({
    message: joi.string().min(2).max(200).required(),
    receivedId: joi.string().hex().length(24).required()
})


export const paramsSchemaVal = joi.object({
    id: joi.string().hex().length(24).required()
})
