-- CreateEnum
CREATE TYPE "Paradigm" AS ENUM ('declarative', 'functional', 'imperative', 'logic', 'object_oriented', 'procedural');

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "paradigms" "Paradigm"[];
