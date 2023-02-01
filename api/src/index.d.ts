import { Express } from "express-serve-static-core";

interface TokenData {
    phone: string
    id: string
}

declare module "express-serve-static-core" {
  interface Request {
    tokenData?: TokenData
  }
}