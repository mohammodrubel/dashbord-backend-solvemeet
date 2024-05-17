import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import { Request, NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { T_user_role } from '../utils/globalInterface';



const auth = (...requiredRoles:T_user_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized');
    }

    try {
      const decoded = jwt.verify(token, config.access_token as string) as JwtPayload;
      const { email, status, role, isDeleted } = decoded;
        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are unauthorized !',);
        }
      req.user = {
        email,
        status,
        role,
        isDeleted,
      };

      next();
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
  });
};

export default auth;
