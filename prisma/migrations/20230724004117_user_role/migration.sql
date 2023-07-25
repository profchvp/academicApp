-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('ALUNO', 'PROFESSOR');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "role" "Papel" NOT NULL DEFAULT 'ALUNO';

-- CreateTable
CREATE TABLE "professor" (
    "id" TEXT NOT NULL,
    "titulacao" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aluno" (
    "id" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_userId_key" ON "professor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_userId_key" ON "aluno"("userId");

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
