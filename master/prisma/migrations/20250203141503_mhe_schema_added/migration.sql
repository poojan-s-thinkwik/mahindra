-- CreateTable
CREATE TABLE "MHE" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MHE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MHE_name_key" ON "MHE"("name");

-- AddForeignKey
ALTER TABLE "MHE" ADD CONSTRAINT "MHE_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
