-- CreateTable
CREATE TABLE "Presence" (
    "id" TEXT NOT NULL,
    "personelId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presence" ADD CONSTRAINT "Presence_personelId_fkey" FOREIGN KEY ("personelId") REFERENCES "Personels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
