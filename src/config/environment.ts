import 'dotenv/config'

export const env = {
  APP_HOST: process.env.APP_HOST as string,
  APP_PORT: Number(process.env.APP_PORT),
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY as string,
  REFRESH_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY as string
}
