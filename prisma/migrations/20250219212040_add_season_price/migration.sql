-- CreateTable
CREATE TABLE "SeasonPrice" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "startMonth" INTEGER NOT NULL,
    "startDay" INTEGER NOT NULL,
    "endMonth" INTEGER NOT NULL,
    "endDay" INTEGER NOT NULL,
    "priceInCents" INTEGER NOT NULL,

    CONSTRAINT "SeasonPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SeasonPrice" ADD CONSTRAINT "SeasonPrice_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
