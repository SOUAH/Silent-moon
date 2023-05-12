import * as dotenv from "dotenv";

dotenv.config();
//storing constants that will be used in app
interface IEnvironmentConfig {
  port: string | number;
  mongoDbURL: string;
  jwtSecret: string;
  email: string;
  password: string;
}

const config: IEnvironmentConfig = {//storing constants
  port: process.env.PORT || 3000,
  mongoDbURL:
    process.env.MONGODB_URL ||
    "mongodb+srv://Admin:Sama123.@meditation.lepokpr.mongodb.net/?retryWrites=true&w=majority",
  jwtSecret: "MyJwtSecret",
  email: 'silentmoon.dev@gmail.com',
  password: 'viqjxjammmqkfdot'//generated pswd
};

export default config;
