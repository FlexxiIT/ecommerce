/*
  Warnings:

  - You are about to drop the `Producto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_categoryId_fkey";

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Producto";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "lowStockLimit" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
