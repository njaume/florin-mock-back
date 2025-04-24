-- CreateEnum
CREATE TYPE "PositionState" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PositionFinality" AS ENUM ('FINAL', 'PENDING');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'TRANSFER');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'EXPIRED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "state" "PositionState" NOT NULL DEFAULT 'ACTIVE',
    "finality" "PositionFinality" NOT NULL DEFAULT 'FINAL',
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractRegistrationTxHash" TEXT,
    "contractRegistrationConfirmations" INTEGER,
    "originTxHash" TEXT,
    "destinationTxHash" TEXT,
    "receivedAmount" BIGINT,
    "receivedAt" TIMESTAMP(3),
    "bitcoinAddress" TEXT,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "ownerAddress" TEXT NOT NULL,
    "state" "ReservationStatus" NOT NULL DEFAULT 'ACTIVE',
    "finality" "PositionFinality" NOT NULL DEFAULT 'FINAL',
    "amount" BIGINT NOT NULL,
    "positionId" TEXT,
    "transactions" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractRegistrationTxHash" TEXT,
    "contractRegistrationConfirmations" INTEGER,
    "originTxHash" TEXT,
    "destinationTxHash" TEXT,
    "receivedAmount" BIGINT,
    "receivedAt" TIMESTAMP(3),
    "bitcoinAddress" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
