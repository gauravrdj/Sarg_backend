-- CreateTable
CREATE TABLE "Restore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Restore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restore_userId_key" ON "Restore"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Restore_phone_key" ON "Restore"("phone");
