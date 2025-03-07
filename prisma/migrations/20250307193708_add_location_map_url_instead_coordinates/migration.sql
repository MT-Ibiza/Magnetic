/*
  Warnings:

  - You are about to drop the column `latitude` on the `BoatAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `BoatAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoatAttributes" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "locationMapUrl" TEXT;
