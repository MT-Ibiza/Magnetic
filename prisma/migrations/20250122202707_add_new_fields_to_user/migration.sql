-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accommodation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "arrivalDate" TIMESTAMP(3),
ADD COLUMN     "billingAddress" TEXT,
ADD COLUMN     "departureDate" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "passportAttachmentUrl" TEXT,
ADD COLUMN     "passportNumber" TEXT;
