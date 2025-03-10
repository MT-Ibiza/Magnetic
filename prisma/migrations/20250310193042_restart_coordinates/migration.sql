/*
  Warnings:

  - You are about to drop the column `locationMapUrl` on the `BoatAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoatAttributes" DROP COLUMN "locationMapUrl",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT;
