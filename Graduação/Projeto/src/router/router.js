import express from "express";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const inicioDoDia = dayjs().startOf("day").toDate();
  const fimDoDia = dayjs().endOf("day").toDate();
  const total = await prisma.registro.count({
    where: {
      createdAt: {
        gte: inicioDoDia,
        lte: fimDoDia,
      },
    },
  });

  const registrosBanco = await prisma.registro.findMany({
    where: {
      createdAt: {
        gte: inicioDoDia,
        lte: fimDoDia,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const registro = registrosBanco.map((r) => ({
    quantidade: r.quantidade,
    criado_em: dayjs(r.createdAt).format("DD/MM/YYYY HH:mm:ss"),
  }));

  res.render("index", {
    total,
    registro,
  });
});

router.post("/add", async (req, res) => {
  await prisma.registro.create({
    data: {
      quantidade: 1,
    },
  });

  res.redirect("/");
});

router.post("/remove", async (req, res) => {
  const ultimo = await prisma.registro.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (ultimo) {
    await prisma.registro.delete({
      where: {
        id: ultimo.id,
      },
    });
  }
  res.redirect("/");
});

export default router;