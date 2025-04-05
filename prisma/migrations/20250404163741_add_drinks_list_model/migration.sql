-- CreateTable
CREATE TABLE "DrinksList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "DrinksList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinksListItem" (
    "id" SERIAL NOT NULL,
    "drinkItemListId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "DrinksListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinksListItem_drinkItemListId_itemId_key" ON "DrinksListItem"("drinkItemListId", "itemId");

-- AddForeignKey
ALTER TABLE "DrinksListItem" ADD CONSTRAINT "DrinksListItem_drinkItemListId_fkey" FOREIGN KEY ("drinkItemListId") REFERENCES "DrinksList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinksListItem" ADD CONSTRAINT "DrinksListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
