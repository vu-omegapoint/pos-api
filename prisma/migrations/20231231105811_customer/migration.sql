-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contactInfoId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    CONSTRAINT "Customer_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Customer_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "zip" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_contactInfoId_key" ON "Customer"("contactInfoId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_addressId_key" ON "Customer"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactInfo_email_phone_key" ON "ContactInfo"("email", "phone");
