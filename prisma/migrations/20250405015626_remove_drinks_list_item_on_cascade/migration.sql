-- DropForeignKey
ALTER TABLE "DrinksListItem" DROP CONSTRAINT "DrinksListItem_drinkItemListId_fkey";

-- AddForeignKey
ALTER TABLE "DrinksListItem" ADD CONSTRAINT "DrinksListItem_drinkItemListId_fkey" FOREIGN KEY ("drinkItemListId") REFERENCES "DrinksList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
