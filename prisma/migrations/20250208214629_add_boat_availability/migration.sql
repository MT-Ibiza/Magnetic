-- CreateTable
CREATE TABLE "BoatAvailability" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "boatId" INTEGER NOT NULL,

    CONSTRAINT "BoatAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoatAvailability" ADD CONSTRAINT "BoatAvailability_boatId_fkey" FOREIGN KEY ("boatId") REFERENCES "BoatAttributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
