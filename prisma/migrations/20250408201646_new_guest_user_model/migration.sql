/*
  Warnings:

  - You are about to drop the column `guestEmail` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `guestName` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `guestEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `guestName` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "guestEmail",
DROP COLUMN "guestName";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "guestEmail",
DROP COLUMN "guestName",
ADD COLUMN     "guestUserId" INTEGER;

-- CreateTable
CREATE TABLE "GuestUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passportNumber" TEXT,
    "billingAddress" TEXT,
    "phone" TEXT,
    "companyName" TEXT,

    CONSTRAINT "GuestUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestUser_email_key" ON "GuestUser"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "GuestUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
