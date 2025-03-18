/*
  Warnings:

  - The `type` column on the `CartItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `OrderBookingForm` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'service';

-- AlterTable
ALTER TABLE "OrderBookingForm" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'service';

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'service';
