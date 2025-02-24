// app/api/presence/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { personelId, photo, nom } = await req.json();
    if (!personelId || !photo) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    // Vérifier la dernière présence enregistrée
    const lastPresence = await prisma.presence.findFirst({
      where: { personelId },
      orderBy: { createdAt: "desc" },
    });

    let etat = "arrivée";
    if (
      lastPresence &&
      lastPresence.date === today &&
      lastPresence.etat === "arrivée"
    ) {
      etat = "départ";
    }

    // Enregistrement de la présence
    const presence = await prisma.presence.create({
      data: {
        idPersonnel,
        photo,
        nom,
        date: today,
        heure: now.toISOString().split("T")[1].split(".")[0],
        etat,
      },
    });

    return NextResponse.json(presence, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
