-- AlterTable
ALTER TABLE "ItemVariant" ADD COLUMN     "hours" INTEGER;

-- CreateTable
CREATE TABLE "ChildcareAttributes" (
    "id" SERIAL NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 1,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ChildcareAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChildcareAttributes_itemId_key" ON "ChildcareAttributes"("itemId");

-- AddForeignKey
ALTER TABLE "ChildcareAttributes" ADD CONSTRAINT "ChildcareAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
