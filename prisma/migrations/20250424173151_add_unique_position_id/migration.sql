/*
  Warnings:

  - A unique constraint covering the columns `[positionId]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Position_positionId_key" ON "Position"("positionId");
