/*
  Warnings:

  - You are about to drop the column `completed` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('not_started', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "completed",
DROP COLUMN "courseId",
ADD COLUMN     "challengeId" TEXT,
ADD COLUMN     "status" "ProgressStatus" NOT NULL DEFAULT 'not_started',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "lessonId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT,
    "title" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "starterCode" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,

    CONSTRAINT "TestCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCase" ADD CONSTRAINT "TestCase_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD CONSTRAINT "Solution_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
