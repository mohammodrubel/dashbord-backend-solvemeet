import { ZodError, ZodIssue } from "zod";
import { T_Error_Responce, T_Error_Sources } from "../utils/globalInterface";

const handelZodError = (err:ZodError):T_Error_Responce=>{
    const errorSource :T_Error_Sources = err.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length -1],
            message:issue.message
        }
    })



    const statusCode = 400
    return {
    statusCode,
    message:'Validation Error',
    errorSource,
    }
}

export default handelZodError