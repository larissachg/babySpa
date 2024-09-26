import dotenv from "dotenv";
dotenv.config();

const env = process.env;
const config = {
  port: env.PORT as string,
};

export default config;
