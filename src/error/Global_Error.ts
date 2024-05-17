import { ErrorRequestHandler } from 'express'
import { T_Error_Sources } from '../utils/globalInterface'
import { ZodError } from 'zod'
import handelZodError from './zod_error'
import config from '../config'
import mongooseValidationError from './mongooose_Error_'
import CastError from './CastError'
import mongooseDuplicateError from './mongooseDuplicateError'
import AppError from './AppError'
import { Error } from 'mongoose'

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'somthing went wrong'
  let errorSource: T_Error_Sources = [
    {
      path: '',
      message: 'somthing went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedData = handelZodError(err)
    statusCode = simplifiedData?.statusCode
    message = simplifiedData?.message
    errorSource = simplifiedData?.errorSource
  } else if (err?.name === 'ValidationError') {
    const simplifiedData = mongooseValidationError(err)
    statusCode = simplifiedData?.statusCode
    message = simplifiedData?.message
    errorSource = simplifiedData?.errorSource
  } else if (err?.name === 'CastError') {
    const simplifiedData = CastError(err)
    statusCode = simplifiedData?.statusCode
    message = simplifiedData?.message
    errorSource = simplifiedData?.errorSource
  } else if (err?.code === 11000) {
    const simplifiedData = mongooseDuplicateError(err)
    statusCode = simplifiedData?.statusCode
    message = simplifiedData?.message
    errorSource = simplifiedData?.errorSource
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSource = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    ;(message = err?.message),
      (errorSource = [
        {
          path: '',
          message: err?.message,
        },
      ])
  }

  // final return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'development' ? err?.stack : null,
    error: err,
  })
}

export default globalError
