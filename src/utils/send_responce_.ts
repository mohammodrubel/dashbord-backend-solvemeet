import { Response } from 'express'

type T_responce<T> = {
  success: boolean
  message: string
  statusCode: number
  data: T
}

const sendResponce = <T>(res: Response, data: T_responce<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    data: data,
  })
}

export default sendResponce
