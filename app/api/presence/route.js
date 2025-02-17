import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Connexion à Prisma

export async function POST(req) {
  try {
    const { personelId } = await req.json();

    if (!personelId) {
      return NextResponse.json(
        { error: "ID personnel requis" },
        { status: 400 }
      );
    }

    // Récupérer la dernière présence de cet employé
    const lastPresence = await prisma.presence.findFirst({
      where: { personelId },
      orderBy: { date: "desc" },
    });

    let newType = "ENTREE"; // Par défaut, on enregistre une entrée

    // Si la dernière présence est une entrée, alors on enregistre une sortie
    if (lastPresence && lastPresence.type === "ENTREE") {
      newType = "SORTIE";
    }

    // Enregistrer la nouvelle présence
    const presence = await prisma.presence.create({
      data: {
        personelId,
        type: newType,
      },
    });

    return NextResponse.json({ success: true, presence }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la présence :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
