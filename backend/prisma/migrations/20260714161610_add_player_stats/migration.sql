-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "age" INTEGER,
    "dateOfBirth" TIMESTAMP(3),
    "debutYear" INTEGER,
    "experienceYears" INTEGER,
    "position" TEXT,
    "positionAbbr" TEXT,
    "jerseyNumber" TEXT,
    "birthCity" TEXT,
    "birthState" TEXT,
    "birthCountry" TEXT,
    "headshotUrl" TEXT,
    "active" BOOLEAN NOT NULL,
    "teamId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT,
    "abbreviation" TEXT,
    "location" TEXT,
    "logoUrl" TEXT,
    "color" TEXT,
    "alternateColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamStat" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "ppg" DOUBLE PRECISION,
    "fgPct" DOUBLE PRECISION,
    "threePointPct" DOUBLE PRECISION,
    "apg" DOUBLE PRECISION,
    "rpg" DOUBLE PRECISION,
    "spg" DOUBLE PRECISION,
    "bpg" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "ppg" DOUBLE PRECISION,
    "rpg" DOUBLE PRECISION,
    "apg" DOUBLE PRECISION,
    "fgPct" DOUBLE PRECISION,
    "threePointPct" DOUBLE PRECISION,
    "topg" DOUBLE PRECISION,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamStat_teamId_key" ON "TeamStat"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_playerId_key" ON "PlayerStats"("playerId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamStat" ADD CONSTRAINT "TeamStat_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
