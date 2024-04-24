/*
  Warnings:

  - Added the required column `DNI` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `surname` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "DNI" TEXT NOT NULL,
ADD COLUMN     "emailValidated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "surname" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL;
