/*
  Warnings:

  - You are about to drop the column `setuptEndTime` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `setupEndTime` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" DROP COLUMN "setuptEndTime",
ADD COLUMN     "setupEndTime" INTEGER NOT NULL;
