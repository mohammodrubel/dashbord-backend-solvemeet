import httpStatus from "http-status";
import { AuthService } from "../service/user_service";
import catchAsync from "../utils/catchAsync";
import sendResponce from "../utils/send_responce_";
import config from "../config";


const createUserController = catchAsync(async (req,res)=>{
    const result = await AuthService.createService(req.body)
    sendResponce(res,({
        success:true,
        statusCode:httpStatus.CREATED,
        message: "New User Create Successfully",
        data:result
    }))
})
const getAllUserController = catchAsync(async (req,res)=>{
    const result = await AuthService.getAllUsersService()
    sendResponce(res,({
        success:true,
        statusCode:httpStatus.OK,
        message: "All User Showen Successfully",
        data:result
    }))
})
const getSingleController = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AuthService.getSingleService(id)
    sendResponce(res,({
        success:true,
        statusCode:httpStatus.OK,
        message: "showen Single User Successfully",
        data:result
    }))
})
const deleteUserController = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AuthService.deleteSingleService(id)
    sendResponce(res,({
        success:true,
        statusCode:httpStatus.OK,
        message: "showen Single User Successfully",
        data:result
    }))
})

const loginController = catchAsync(async(req,res)=>{
    const result = await AuthService.loginService(req.body)
    const {accessToken,refreshToken} = result
    res.cookie('refreshToken',refreshToken,{
        secure:config.node_env === 'production',
        httpOnly:true 
    })
    console.log(result)
    sendResponce(res,({
        success:true,
        statusCode:httpStatus.OK,
        message: "Login Successfull",
        data: {accessToken:accessToken}
    }))
})
const refreshTokenControler = catchAsync(async(req,res)=>{
    const {refreshToken}=req.cookies
    console.log(req.cookies)
    const result = await AuthService.refreshTokenService(refreshToken)
    
    sendResponce(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'AccessToken retrived successfully',
        data:result
    })
})



export const AuthController = {
    createUserController,
    getAllUserController,
    getSingleController,
    deleteUserController,
    loginController,
    refreshTokenControler
}