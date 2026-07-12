/*
  Warnings:

  - Added the required column `active` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "birthCity" TEXT,
ADD COLUMN     "birthCountry" TEXT,
ADD COLUMN     "birthState" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "debutYear" INTEGER,
ADD COLUMN     "experienceYears" INTEGER,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "headshotUrl" TEXT,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "jerseyNumber" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "positionAbbr" TEXT,
ADD COLUMN     "teamId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weight" INTEGER;

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
