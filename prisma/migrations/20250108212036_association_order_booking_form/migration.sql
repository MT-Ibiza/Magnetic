/*
  Warnings:

  - You are about to drop the `CartBookingForm` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartBookingForm" DROP CONSTRAINT "CartBookingForm_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartBookingForm" DROP CONSTRAINT "CartBookingForm_serviceId_fkey";

-- DropTable
DROP TABLE "CartBookingForm";

-- CreateTable
CREATE TABLE "OrderBookingForm" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER,
    "formData" JSONB NOT NULL,
    "orderId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderBookingForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderBookingForm" ADD CONSTRAINT "OrderBookingForm_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderBookingForm" ADD CONSTRAINT "OrderBookingForm_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
