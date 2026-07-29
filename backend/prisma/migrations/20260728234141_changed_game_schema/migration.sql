/*
  Warnings:

  - You are about to drop the column `awayWinProbability` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeWinProbability` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `predictedWinnerId` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "awayWinProbability",
DROP COLUMN "homeWinProbability",
DROP COLUMN "predictedWinnerId";
