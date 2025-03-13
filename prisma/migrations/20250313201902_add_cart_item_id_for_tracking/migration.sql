/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `OrderBookingForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderBookingForm" DROP COLUMN "orderItemId",
ADD COLUMN     "cartItemId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "cartItemId" INTEGER;
