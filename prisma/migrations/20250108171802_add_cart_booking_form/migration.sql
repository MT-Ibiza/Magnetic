-- CreateTable
CREATE TABLE "CartBookingForm" (
    "id" SERIAL NOT NULL,
    "cartItemId" INTEGER,
    "formData" JSONB NOT NULL,
    "cartId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartBookingForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartBookingForm" ADD CONSTRAINT "CartBookingForm_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartBookingForm" ADD CONSTRAINT "CartBookingForm_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
