import {Router} from 'express'
import { userRouter } from './auth_Router';


const router = Router()

    const myRouter = [
        {path:'/auth',route:userRouter},
    ]

    myRouter.forEach((route) => router.use(route.path, route.route));

export default router 