-- CreateTable
CREATE TABLE "User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Decal" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "create_time" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "open" INTEGER NOT NULL,
    "keyword" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    CONSTRAINT "Decal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "decalId" BIGINT NOT NULL,
    "tag" TEXT NOT NULL,

    PRIMARY KEY ("decalId", "tag"),
    CONSTRAINT "Tag_decalId_fkey" FOREIGN KEY ("decalId") REFERENCES "Decal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
