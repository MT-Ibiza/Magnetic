/*
  Warnings:

  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `typeAccount` on the `User` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider",
DROP COLUMN "providerAccountId",
DROP COLUMN "typeAccount",
ALTER COLUMN "password" SET NOT NULL;
