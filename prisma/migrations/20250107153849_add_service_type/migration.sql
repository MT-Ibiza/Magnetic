-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('cart_rental', 'boat_rental', 'transfer', 'chefs', 'food', 'drinks', 'security', 'spa', 'wellness', 'childcare', 'reservations', 'none');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "serviceType" "ServiceType" NOT NULL DEFAULT 'none';
