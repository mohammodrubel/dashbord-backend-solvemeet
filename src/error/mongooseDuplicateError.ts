import mongoose from "mongoose"

const mongooseDuplicateError = (err:any)=>{
    const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];


  const statusCode = 400
    return {
    statusCode,
    message:'Validation Error',
    errorSource,
    }
}

export default mongooseDuplicateError 