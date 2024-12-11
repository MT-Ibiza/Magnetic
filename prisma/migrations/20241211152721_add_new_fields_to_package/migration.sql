-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "description" TEXT,
ADD COLUMN     "features" TEXT,
ADD COLUMN     "priceInCents" INTEGER NOT NULL DEFAULT 1;
