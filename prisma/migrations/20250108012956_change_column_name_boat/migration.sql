/*
  Warnings:

  - You are about to drop the column `sizeInCentimeters` on the `BoatAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoatAttributes" DROP COLUMN "sizeInCentimeters",
ADD COLUMN     "sizeInCentimeters" INTEGER NOT NULL DEFAULT 100;
