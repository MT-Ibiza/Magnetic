/*
  Warnings:

  - You are about to drop the `DrinksList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrinksListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DrinksListItem" DROP CONSTRAINT "DrinksListItem_drinkItemListId_fkey";

-- DropForeignKey
ALTER TABLE "DrinksListItem" DROP CONSTRAINT "DrinksListItem_itemId_fkey";

-- DropTable
DROP TABLE "DrinksList";

-- DropTable
DROP TABLE "DrinksListItem";
