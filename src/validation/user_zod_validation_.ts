import { z } from 'zod'

const UserSchemaValidation = z.object({
  body: z.object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    isDeleted: z.boolean().default(false),
    
  }),
})

export default UserSchemaValidation
