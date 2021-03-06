-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "numDaysToComplete" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ScheduleDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" INTEGER NOT NULL,
    "habitId" INTEGER NOT NULL,
    FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompletionRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateCompleted" DATETIME NOT NULL,
    "habitId" INTEGER NOT NULL,
    FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
