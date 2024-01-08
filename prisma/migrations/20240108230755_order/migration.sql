-- CreateTable
CREATE TABLE "BookedItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    "itemId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "BookedItem_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "BookedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookedItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookedService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startTime" DATETIME NOT NULL,
    "employeeId" TEXT NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
    "serviceId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    CONSTRAINT "BookedService_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE,
    CONSTRAINT "BookedService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BookedService_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BookedItem_itemId_orderId_employeeId_key" ON "BookedItem"("itemId", "orderId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "BookedService_serviceId_orderId_employeeId_key" ON "BookedService"("serviceId", "orderId", "employeeId");
