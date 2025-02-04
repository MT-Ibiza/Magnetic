-- CreateTable
CREATE TABLE "DrinkAttributes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 0,
    "size" INTEGER,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "DrinkAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinkAttributes_itemId_key" ON "DrinkAttributes"("itemId");

-- AddForeignKey
ALTER TABLE "DrinkAttributes" ADD CONSTRAINT "DrinkAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
