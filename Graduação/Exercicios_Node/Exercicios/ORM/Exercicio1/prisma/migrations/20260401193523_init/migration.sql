-- CreateTable
CREATE TABLE "livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "quantidade" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "livro_titulo_key" ON "livro"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "livro_autor_key" ON "livro"("autor");
