/*
  Warnings:

  - A unique constraint covering the columns `[airtableId]` on the table `BoatAttributes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BoatAttributes_airtableId_key" ON "BoatAttributes"("airtableId");
