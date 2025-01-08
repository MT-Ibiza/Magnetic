-- CreateTable
CREATE TABLE "BoatAttributes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "boatType" TEXT NOT NULL,
    "berth" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "crew" INTEGER NOT NULL,
    "beamInCentimeters" INTEGER NOT NULL,
    "cabins" INTEGER NOT NULL,
    "fuelConsumption" INTEGER NOT NULL,
    "description" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "sizeInCentimeters" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "BoatAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoatAttributes_itemId_key" ON "BoatAttributes"("itemId");

-- AddForeignKey
ALTER TABLE "BoatAttributes" ADD CONSTRAINT "BoatAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
