/*
  Warnings:

  - Added the required column `Created` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_SKU_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Created" TEXT NOT NULL;
