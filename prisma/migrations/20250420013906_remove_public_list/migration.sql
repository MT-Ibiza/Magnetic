/*
  Warnings:

  - You are about to drop the `PublicList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PublicListItem" DROP CONSTRAINT "PublicListItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "PublicListItem" DROP CONSTRAINT "PublicListItem_publicListId_fkey";

-- DropTable
DROP TABLE "PublicList";

-- DropTable
DROP TABLE "PublicListItem";
