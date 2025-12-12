/*
  Warnings:

  - Changed the type of `port` on the `DeviceType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DeviceType" DROP COLUMN "port",
ADD COLUMN     "port" INTEGER NOT NULL;
