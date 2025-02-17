import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    console.log("Récupération des données...");
    const personels = await prisma.personels.findMany();

    const formattedPersonels = personels.map((personel) => ({
      ...personel,
      createdAt: personel.createdAt?.toISOString(),
    }));

    console.log(" Données envoyées :", formattedPersonels);
    return NextResponse.json(formattedPersonels, { status: 200 });
  } catch (error) {
    console.error(" Erreur API /api/personels :", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération des données",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const nom = formData.get("nom");
    const postNom = formData.get("postNom");
    const email = formData.get("email");
    const telephone = formData.get("telephone");
    const sexe = formData.get("sexe");
    const poste = formData.get("poste");
    const file = formData.get("file"); // Récupérer le fichier

    let photoPath = "";

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);

      photoPath = `${file.name}`;
    }

    // Enregistrer les informations dans la base de données
    const newPersonel = await prisma.personels.create({
      data: { nom, postNom, email, telephone, sexe, poste, photo: photoPath },
    });

    return NextResponse.json(
      {
        message: "Données enregistrées avec succès",
        personel: newPersonel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde" },
      { status: 500 }
    );
  }
}
