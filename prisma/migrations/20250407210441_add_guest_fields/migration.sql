-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "guestEmail" TEXT,
ADD COLUMN     "guestName" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "guestEmail" TEXT,
ADD COLUMN     "guestName" TEXT;
