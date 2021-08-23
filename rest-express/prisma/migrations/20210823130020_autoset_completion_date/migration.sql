-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CompletionRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateCompleted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "habitId" INTEGER NOT NULL,
    FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CompletionRecord" ("dateCompleted", "habitId", "id") SELECT "dateCompleted", "habitId", "id" FROM "CompletionRecord";
DROP TABLE "CompletionRecord";
ALTER TABLE "new_CompletionRecord" RENAME TO "CompletionRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
