import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    const data = await prisma.personels.findMany();
    console.log("✅ Données récupérées :", data);
  } catch (error) {
    console.error("❌ Erreur Prisma :", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
