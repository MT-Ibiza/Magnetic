/*
  Warnings:

  - Added the required column `providerId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "providerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "email" TEXT,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
