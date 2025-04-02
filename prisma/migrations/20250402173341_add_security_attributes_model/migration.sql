-- CreateTable
CREATE TABLE "SecurityAttributes" (
    "id" SERIAL NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 1,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "SecurityAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecurityAttributes_itemId_key" ON "SecurityAttributes"("itemId");

-- AddForeignKey
ALTER TABLE "SecurityAttributes" ADD CONSTRAINT "SecurityAttributes_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
