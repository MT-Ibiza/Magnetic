/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `OrderBookingForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderBookingForm" DROP COLUMN "orderItemId";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "formId" INTEGER;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_formId_fkey" FOREIGN KEY ("formId") REFERENCES "OrderBookingForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
