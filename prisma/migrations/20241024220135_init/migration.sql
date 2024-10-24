/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedBY` on the `Product` table. All the data in the column will be lost.
  - Added the required column `createdby` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "CreatedAt",
DROP COLUMN "CreatedBY",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdby" TEXT NOT NULL;
