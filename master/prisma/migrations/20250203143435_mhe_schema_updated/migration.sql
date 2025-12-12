/*
  Warnings:

  - A unique constraint covering the columns `[deviceId]` on the table `MHE` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MHE_deviceId_key" ON "MHE"("deviceId");
