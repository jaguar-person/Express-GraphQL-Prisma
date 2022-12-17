import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { decodeAuthHeader } from "../utils/auth";

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
