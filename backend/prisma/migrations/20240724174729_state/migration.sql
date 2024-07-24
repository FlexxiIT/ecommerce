/*
  Warnings:

  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `OrderAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "state";
