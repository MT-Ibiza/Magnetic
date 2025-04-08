/*
  Warnings:

  - You are about to drop the `ShareLinkService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShareLinkService" DROP CONSTRAINT "ShareLinkService_serviceId_fkey";

-- DropTable
DROP TABLE "ShareLinkService";
