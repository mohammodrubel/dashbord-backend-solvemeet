import httpStatus from "http-status";
import { T_login } from "../Interface/login_interface";
import { T_user } from "../Interface/user_interface";
import AppError from "../error/AppError";
import { User } from "../model/user_model";
import bcrypt from 'bcrypt';
import config from "../config";
import { createToken } from "../utils/authUtils";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken'


const createService = async(payload:T_user)=>{
    const result = await User.create(payload)
    return result
}
const getAllUsersService = async()=>{
    const result = await User.find()
    return result
}
const getSingleService = async(id:string)=>{
    const result = await User.findById(id)
    return result
}
const deleteSingleService = async(id:string)=>{
    const result = await User.findByIdAndUpdate(id, { isDeleted: true });
    return result
}
const loginService = async(payload:T_login)=>{
    const user = await User.findOne({email:payload.email})
        //is user exist
        if(!user){
            throw new AppError(httpStatus.NOT_FOUND,'user not found!')
        }
        //checking is user is deleted
        if(user.isDeleted === true){
            throw new AppError(httpStatus.BAD_REQUEST,'this user is deleted!')
        }
        //checking if the password is correct
    const checkPassword = await bcrypt.compare(payload.password,user.password)
        if(!checkPassword){
            throw new AppError(httpStatus.FORBIDDEN,'Incorrect email and password')
        }
    const jwtPayload = {
        _id:user._id as unknown as string,
        email:user?.email,
        role:user?.role,
        isDeleted:user?.isDeleted
    }
    const accessToken = createToken(jwtPayload, config.access_token as string,config.access_token_time as string);
    const refreshToken = createToken(jwtPayload, config.refresh_token as string,config.refresh_token_time as string);

    return{
        user,
        accessToken,
        refreshToken
    }

}
const refreshTokenService = async (token: string) => {
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not Authorized')
    }
    // check token is verify
    const decoded = jwt.verify(
      token,
      config.refresh_token as string,
    ) as JwtPayload
    const { email } = decoded
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'user not found')
    }
     // checking user deleted
     const isDeleted = user?.isDeleted
     if (isDeleted) {
       throw new AppError(httpStatus.FORBIDDEN, 'this user is Deleted!')
     }
     
   //create token and send to user
   const jwtPayload = {
      email: user?.email,
      role: user?.role,
      isDeleted: user?.isDeleted,
    }
    const accessToken = jwt.sign(jwtPayload, config.access_token as string, {
      expiresIn: config.access_token_time as string,
    })
  
    return {
      accessToken
    }
  }
  


export const AuthService = {
    createService,
    getAllUsersService,
    getSingleService,
    deleteSingleService,
    loginService,
    refreshTokenService
}