-- CreateTable
CREATE TABLE "ShareLinkService" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "showCheckout" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ShareLinkService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShareLinkService_slug_key" ON "ShareLinkService"("slug");

-- AddForeignKey
ALTER TABLE "ShareLinkService" ADD CONSTRAINT "ShareLinkService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
