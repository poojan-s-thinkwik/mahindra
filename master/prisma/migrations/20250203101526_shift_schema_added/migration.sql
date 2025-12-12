-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "teaBreakStartTime" INTEGER NOT NULL,
    "teaBreakEndTime" INTEGER NOT NULL,
    "lunchBreakStartTime" INTEGER NOT NULL,
    "lunchBreakEndTime" INTEGER NOT NULL,
    "setupStartTime" INTEGER NOT NULL,
    "setuptEndTime" INTEGER NOT NULL,
    "bioBreakStartTime" INTEGER NOT NULL,
    "bioBreakEndTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shift_name_key" ON "Shift"("name");

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
