/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `DrinksList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DrinksList_slug_key" ON "DrinksList"("slug");
