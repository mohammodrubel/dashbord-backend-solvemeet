import express from 'express'
import { AuthController } from '../controller/user_Controller'
import CheckValidation from '../Middleware/Check_Validation'
import UserSchemaValidation from '../validation/user_zod_validation_'
import loginValidation from '../validation/user_zod_login_validation'
import refreshTokenValidationSchema from '../validation/refreshTokenValidationSchema'
import auth from '../Middleware/Auth'
import { userRole } from '../utils/globalInterface'



const router = express.Router()

router.post(
  '/create-user',
  CheckValidation(UserSchemaValidation),
  AuthController.createUserController,
)
router.post(
  '/login',
  CheckValidation(loginValidation),
  AuthController.loginController,
)

router.get('/user',auth(userRole.admin), AuthController.getAllUserController);
router.get('/user/:id', AuthController.getSingleController);
router.delete('/user/:id', AuthController.deleteUserController);
router.post('/refresh-token',AuthController.refreshTokenControler)

export const userRouter = router
