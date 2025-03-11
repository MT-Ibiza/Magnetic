/*
  Warnings:

  - You are about to drop the column `refundedAmount` on the `OrderBookingForm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderBookingForm" DROP COLUMN "refundedAmount",
ADD COLUMN     "refundedAmountInCents" INTEGER;
