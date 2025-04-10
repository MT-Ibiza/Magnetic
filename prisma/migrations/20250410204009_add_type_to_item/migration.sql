/*
  Warnings:

  - The values [upgrade_plan] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('cart_rental', 'boat_rental', 'transfer', 'chefs', 'food', 'drinks', 'security', 'spa', 'wellness', 'childcare', 'reservations', 'none');
ALTER TABLE "Service" ALTER COLUMN "serviceType" DROP DEFAULT;
ALTER TABLE "Service" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TABLE "PublicList" ALTER COLUMN "type" TYPE "ServiceType_new" USING ("type"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
ALTER TABLE "Service" ALTER COLUMN "serviceType" SET DEFAULT 'none';
COMMIT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "type" TEXT;
