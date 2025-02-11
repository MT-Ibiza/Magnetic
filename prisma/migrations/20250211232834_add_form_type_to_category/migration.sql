/*
  Warnings:

  - You are about to drop the `BookEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "formType" TEXT;

-- DropTable
DROP TABLE "BookEvent";
