/*
  Warnings:

  - Added the required column `location` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Location" AS ENUM ('Principal', 'Lateral', 'Workshop');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "location" "Location" NOT NULL;
