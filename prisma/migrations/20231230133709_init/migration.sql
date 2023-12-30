-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contactInfoId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    CONSTRAINT "Customer_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "Item_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentMethod" TEXT NOT NULL,
    "transactionId" INTEGER,
    CONSTRAINT "PaymentDetails_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_contactInfoId_key" ON "Customer"("contactInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_addressId_key" ON "Customer"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_email_phone_key" ON "ContactInfo"("email", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_customerId_key" ON "Transaction"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Item_transactionId_key" ON "Item"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentDetails_transactionId_key" ON "PaymentDetails"("transactionId");
