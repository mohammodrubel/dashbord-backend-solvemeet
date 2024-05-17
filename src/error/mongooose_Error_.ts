import mongoose, { mongo } from 'mongoose'
import { T_Error_Responce, T_Error_Sources } from '../utils/globalInterface'

const mongooseValidationError = (err: mongoose.Error.ValidationError):T_Error_Responce => {
  const errorSource: T_Error_Sources = Object.values(err.errors).map(
    (vel: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: vel?.path,
        message: vel?.message,
      }
    },
  )

  const statusCode = 400

  // Returning a custom error object
  return {
    statusCode,
    message: 'Validation Error',
    errorSource,
  }
}

export default mongooseValidationError


