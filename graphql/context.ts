import { PrismaClient } from "@prisma/client";
import { decodeAuthHeader, AuthTokenPayload } from "../utils/auth";   
import { Request } from "express";  

const prisma = new PrismaClient();
export interface ContextType {
  prisma: PrismaClient;
  userId?: number;
}

export const context = (req: Request) => { 
  const token =
      req && req.headers.authorization
          ? decodeAuthHeader(req.headers.authorization)
          : null;
  return {  
      prisma,
      userId: token?.userId, 
  };
};