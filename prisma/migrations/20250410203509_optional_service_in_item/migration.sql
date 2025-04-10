-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_serviceId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
