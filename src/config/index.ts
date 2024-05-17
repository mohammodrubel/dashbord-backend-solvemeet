import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  slat_round: process.env.SLAT_ROUND,
  access_token : process.env.ACCESS_TOKEN,
  refresh_token : process.env.REFRESH_TOKEN,
  access_token_time:process.env.ACCESS_TOKEN_TIME,
  refresh_token_time:process.env.REFRESH_TOKEN_TIME
}

