import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const personels = await prisma.personels.findMany();

    // Formatage des dates
    const formattedPersonels = personels.map((personel) => ({
      ...personel,
      createdAt: format(new Date(personel.createdAt), "dd MMMM yyyy à HH:mm:ss", { locale: fr }),
    }));

    return NextResponse.json(formattedPersonels, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération des données" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const nom = formData.get("nom");
    const postNom = formData.get("postNom");
    const email = formData.get("email");
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

      photoPath = `/uploads/${file.name}`;
    }

    // Enregistrer les informations dans la base de données
    const newPersonel = await prisma.personels.create({
      data: { nom, postNom, email, sexe, poste, photo: photoPath },
    });

    return NextResponse.json({
      message: "Données enregistrées avec succès",
      personel: newPersonel,
    }, { status: 201 });

  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    return NextResponse.json({ error: "Erreur lors de la sauvegarde" }, { status: 500 });
  }
}
