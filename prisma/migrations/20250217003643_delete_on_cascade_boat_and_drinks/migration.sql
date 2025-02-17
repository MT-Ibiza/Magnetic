-- DropForeignKey
ALTER TABLE "BoatAttributes" DROP CONSTRAINT "BoatAttributes_itemId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkAttributes" DROP CONSTRAINT "DrinkAttributes_itemId_fkey";

-- AddForeignKey
ALTER TABLE "BoatAttributes" ADD CONSTRAINT "BoatAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkAttributes" ADD CONSTRAINT "DrinkAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
