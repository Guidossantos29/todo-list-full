-- CreateTable
CREATE TABLE "Tarefa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,
    "dataLimite" TIMESTAMP(3) NOT NULL,
    "ordemApresentacao" INTEGER NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_nome_key" ON "Tarefa"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Tarefa_ordemApresentacao_key" ON "Tarefa"("ordemApresentacao");
