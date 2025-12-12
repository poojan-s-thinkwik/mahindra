/*
  Warnings:

  - The `latitude` column on the `Warehouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `Warehouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(65,30),
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(65,30);
