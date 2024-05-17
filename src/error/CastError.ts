import mongoose from 'mongoose'
import { T_Error_Sources } from '../utils/globalInterface'

const CastError = (err: mongoose.Error.CastError) => {
  const errorSource: T_Error_Sources = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  const statusCode = 400
  // Returning a custom error object
  return {
    statusCode,
    message: 'Invalid Id',
    errorSource,
  }
}
export default CastError
