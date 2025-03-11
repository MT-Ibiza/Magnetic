-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'accepted', 'modification_requested', 'modified', 'cancellation_requested', 'cancelled', 'refunded', 'completed');

-- AlterTable
ALTER TABLE "OrderBookingForm" ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'pending';
