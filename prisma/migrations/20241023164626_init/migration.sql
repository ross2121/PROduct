/*
  Warnings:

  - You are about to drop the `Inventory_Manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Inventory_Manager";

-- CreateTable
CREATE TABLE "InventoryManager" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'manager',

    CONSTRAINT "InventoryManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdminProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ManagerProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryManager_email_key" ON "InventoryManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_SKU_key" ON "Product"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "_AdminProducts_AB_unique" ON "_AdminProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_AdminProducts_B_index" ON "_AdminProducts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ManagerProducts_AB_unique" ON "_ManagerProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_ManagerProducts_B_index" ON "_ManagerProducts"("B");

-- AddForeignKey
ALTER TABLE "_AdminProducts" ADD CONSTRAINT "_AdminProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminProducts" ADD CONSTRAINT "_AdminProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerProducts" ADD CONSTRAINT "_ManagerProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "InventoryManager"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManagerProducts" ADD CONSTRAINT "_ManagerProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
