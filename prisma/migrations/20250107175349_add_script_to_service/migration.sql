/*
  Warnings:

  - You are about to drop the column `script` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "script";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "script" TEXT;
