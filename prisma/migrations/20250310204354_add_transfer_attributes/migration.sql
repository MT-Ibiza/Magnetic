-- CreateTable
CREATE TABLE "TransferAttributes" (
    "id" SERIAL NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 4,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "TransferAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransferAttributes_itemId_key" ON "TransferAttributes"("itemId");

-- AddForeignKey
ALTER TABLE "TransferAttributes" ADD CONSTRAINT "TransferAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
