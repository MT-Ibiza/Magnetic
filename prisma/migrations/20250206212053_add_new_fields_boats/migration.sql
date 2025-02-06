/*
  Warnings:

  - You are about to drop the column `beamInCentimeters` on the `BoatAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `berth` on the `BoatAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `BoatAttributes` table. All the data in the column will be lost.
  - You are about to drop the column `sizeInCentimeters` on the `BoatAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BoatAttributes" DROP COLUMN "beamInCentimeters",
DROP COLUMN "berth",
DROP COLUMN "guests",
DROP COLUMN "sizeInCentimeters",
ADD COLUMN     "beamInMeters" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "iCal" TEXT,
ADD COLUMN     "port" TEXT,
ADD COLUMN     "sizeInMeters" INTEGER NOT NULL DEFAULT 1;
