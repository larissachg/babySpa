import dotenv from "dotenv";
dotenv.config();

const env = process.env;
const config = {
  port: env.PORT as string,
  environment: env.ENVIRONMENT as string,
  jwtSecret: env.JWT_SECRET as string,
  jwtExpiration: env.JWT_EXPIRES_IN as string,
};

export default config;
