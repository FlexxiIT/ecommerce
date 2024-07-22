/*
  Warnings:

  - You are about to drop the column `street` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `apartment` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetName` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "street",
DROP COLUMN "zipCode",
ADD COLUMN     "apartment" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "locality" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL,
ADD COLUMN     "streetName" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL;
