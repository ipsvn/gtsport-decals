-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Decal" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "create_time" DATETIME NOT NULL,
    "title" TEXT,
    "comment" TEXT,
    "status" INTEGER NOT NULL,
    "open" INTEGER NOT NULL,
    "keyword" TEXT,
    "userId" BIGINT NOT NULL,
    CONSTRAINT "Decal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Decal" ("comment", "create_time", "id", "keyword", "open", "status", "title", "userId") SELECT "comment", "create_time", "id", "keyword", "open", "status", "title", "userId" FROM "Decal";
DROP TABLE "Decal";
ALTER TABLE "new_Decal" RENAME TO "Decal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
