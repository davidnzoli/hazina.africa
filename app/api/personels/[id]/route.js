import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export async function DELETE(req, { params }) {
//   const { id } = params;
//   console.log("ID reçu :", id); // Vérification

//   if (!id) {
//     return new Response(JSON.stringify({ error: "ID non fourni" }), {
//       status: 400,
//     });
//   }

//   try {
//     const existingPersonel = await prisma.Personels.findUnique({
//       where: { id },
//     });

//     if (!existingPersonel) {
//       return new Response(JSON.stringify({ error: "Personel non trouvé" }), {
//         status: 404,
//       });
//     }

//     await prisma.Personels.delete({ where: { id } });

//     return new Response(JSON.stringify({ message: "Supprimé avec succès" }), {
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Erreur serveur :", error);
//     return new Response(JSON.stringify({ error: "Erreur serveur" }), {
//       status: 500,
//     });
//   }
// }

export async function DELETE(req, { params }) {
  const id = params?.id; // Correction ici pour bien récupérer l'id
  console.log("ID reçu :", id);

  if (!id) {
    return new Response(JSON.stringify({ error: "ID non fourni" }), {
      status: 400,
    });
  }

  try {
    const existingPersonel = await prisma.personels.findUnique({
      where: { id },
    });

    if (!existingPersonel) {
      return new Response(JSON.stringify({ error: "Personnel non trouvé" }), {
        status: 404,
      });
    }

    await prisma.personels.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Supprimé avec succès" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  console.log("ID reçu dans API :", id);
  const data = await req.json();

  try {
    // Vérifier si l'élément existe
    const existingPersonel = await prisma.personels.findUnique({
      where: { id },
    });

    if (!existingPersonel) {
      return new Response(JSON.stringify({ error: "Personnel non trouvé" }), {
        status: 404,
      });
    }

    // Mettre à jour les données
    const updatedPersonel = await prisma.personels.update({
      where: { id },
      data,
    });

    return new Response(JSON.stringify(updatedPersonel), { status: 200 });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
}
