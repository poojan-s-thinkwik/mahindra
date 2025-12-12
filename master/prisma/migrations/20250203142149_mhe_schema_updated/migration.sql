/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `MHE` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `MHE` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `MHE` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MHE_name_key";

-- AlterTable
ALTER TABLE "MHE" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "warehouseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MHE_code_key" ON "MHE"("code");

-- AddForeignKey
ALTER TABLE "MHE" ADD CONSTRAINT "MHE_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
