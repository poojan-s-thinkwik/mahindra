/*
  Warnings:

  - A unique constraint covering the columns `[name,warehouseId]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shift_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Shift_name_warehouseId_key" ON "Shift"("name", "warehouseId");
