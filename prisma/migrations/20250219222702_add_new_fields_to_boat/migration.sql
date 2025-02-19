/*
  Warnings:

  - You are about to drop the column `sizeInMeters` on the `BoatAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoatAttributes" DROP COLUMN "sizeInMeters",
ADD COLUMN     "lengthInMeters" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "sizeInFeet" INTEGER NOT NULL DEFAULT 1;
