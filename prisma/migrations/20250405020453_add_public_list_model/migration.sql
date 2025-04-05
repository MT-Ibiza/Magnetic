-- CreateTable
CREATE TABLE "PublicList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,

    CONSTRAINT "PublicList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicListItem" (
    "id" SERIAL NOT NULL,
    "publicListId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "PublicListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PublicList_slug_key" ON "PublicList"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PublicListItem_publicListId_itemId_key" ON "PublicListItem"("publicListId", "itemId");

-- AddForeignKey
ALTER TABLE "PublicListItem" ADD CONSTRAINT "PublicListItem_publicListId_fkey" FOREIGN KEY ("publicListId") REFERENCES "PublicList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicListItem" ADD CONSTRAINT "PublicListItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
