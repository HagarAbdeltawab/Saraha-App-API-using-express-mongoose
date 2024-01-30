import express from "express"; 
import { addMessage, allMessages, shareProfile } from "./message.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { addMessageSchemaVal, paramsSchemaVal } from "./message.validation.js";
const messageRouter = express.Router()
messageRouter.post('/addMessage',validation(addMessageSchemaVal),addMessage)
messageRouter.get('/allMessages/:id',validation(paramsSchemaVal), auth, allMessages)
messageRouter.get('/shareProfile', shareProfile)
export default messageRouter;