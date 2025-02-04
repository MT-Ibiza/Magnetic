-- CreateTable
CREATE TABLE "BookEvent" (
    "id" SERIAL NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "text" TEXT,
    "type" TEXT NOT NULL DEFAULT 'boat-rent',
    "taken" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookEvent_pkey" PRIMARY KEY ("id")
);
