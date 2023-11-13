/*
  Warnings:

  - You are about to drop the `OrderProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProducts" DROP CONSTRAINT "OrderProducts_productId_fkey";

-- DropTable
DROP TABLE "OrderProducts";

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "basePrice" DECIMAL(8,2) NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
