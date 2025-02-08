-- AlterTable
ALTER TABLE "BoatAvailability" ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'app',
ADD COLUMN     "text" TEXT NOT NULL DEFAULT 'Reservation';

-- CreateIndex
CREATE INDEX "BoatAvailability_boatId_startDate_endDate_idx" ON "BoatAvailability"("boatId", "startDate", "endDate");
