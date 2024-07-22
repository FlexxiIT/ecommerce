/*
  Warnings:

  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `apartment` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "zipCode",
ADD COLUMN     "apartment" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL;
