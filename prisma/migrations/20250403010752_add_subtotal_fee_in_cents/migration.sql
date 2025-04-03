/*
  Warnings:

  - You are about to drop the column `totalWithVatInCents` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalWithVatInCents",
ADD COLUMN     "feeInCents" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subtotal" INTEGER NOT NULL DEFAULT 0;
