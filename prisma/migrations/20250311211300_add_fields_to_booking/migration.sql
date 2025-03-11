-- AlterTable
ALTER TABLE "OrderBookingForm" ADD COLUMN     "cancellationRequest" TEXT,
ADD COLUMN     "cancellationResponse" TEXT,
ADD COLUMN     "modificationRequest" TEXT,
ADD COLUMN     "modificationResponse" TEXT,
ADD COLUMN     "refundedAmount" DOUBLE PRECISION;
