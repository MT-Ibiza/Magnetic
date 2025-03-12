/*
  Warnings:

  - You are about to drop the column `formId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_formId_fkey";

-- AlterTable
ALTER TABLE "OrderBookingForm" ADD COLUMN     "orderItemId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "formId";
