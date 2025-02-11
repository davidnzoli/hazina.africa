import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction DELETE pour supprimer un utilisateur
export async function DELETE(req, { params }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    // Vérifier si l'utilisateur existe
    const existingPersonel = await prisma.personels.findUnique({
      where: { id },
    });

    if (!existingPersonel) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    await prisma.personels.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Utilisateur supprimé avec succès" }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
