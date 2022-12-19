/*
  Warnings:

  - You are about to drop the column `userRole` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('urgent', 'normal', 'low');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "userRole",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'low';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Role";
