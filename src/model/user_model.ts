import { Schema, model } from 'mongoose';
import {  T_user } from '../Interface/user_interface';
import bcrypt from 'bcrypt'
import AppError from '../error/AppError';
import httpStatus from 'http-status';

const userSchema = new Schema<T_user>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Modarator'],
        required: true,
        default:'User'
    }
}, { timestamps: true });

userSchema.pre('save',async function(next){
    try{
        const saltRounds = 12
        const hashingPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashingPassword;
        next()
    }
    catch(error:any){
        next(error)
    }
})
userSchema.pre('save', async function (next) {
    try {
        const existingEmail = await User.findOne({ email: this.email });

        if (existingEmail) {
            throw new AppError(httpStatus.BAD_REQUEST,'This email already exists');
        }
        next();
    } catch (error: any) {
        next(error);
    }
});



export const User = model<T_user>('user', userSchema);
