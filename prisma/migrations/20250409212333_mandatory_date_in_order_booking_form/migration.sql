/*
  Warnings:

  - Made the column `date` on table `OrderBookingForm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OrderBookingForm" ALTER COLUMN "date" SET NOT NULL;
