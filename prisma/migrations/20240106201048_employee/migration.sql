-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Permission" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WorkShift" (
    "weekday" TEXT NOT NULL PRIMARY KEY,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EmployeeToPermission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EmployeeToPermission_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeeToPermission_B_fkey" FOREIGN KEY ("B") REFERENCES "Permission" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EmployeeToWorkShift" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EmployeeToWorkShift_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeeToWorkShift_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkShift" ("weekday") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToPermission_AB_unique" ON "_EmployeeToPermission"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToPermission_B_index" ON "_EmployeeToPermission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToWorkShift_AB_unique" ON "_EmployeeToWorkShift"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToWorkShift_B_index" ON "_EmployeeToWorkShift"("B");
