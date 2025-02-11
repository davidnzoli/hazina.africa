// import formidable from "formidable";
// import fs from "fs";
// import path from "path";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const config = {
//   api: {
//     bodyParser: false, // Désactive le body parser de Next.js pour pouvoir utiliser formidable
//   },
// };

// export async function POST(req) {
//   const form = formidable({
//     multiples: false, // Permet d'envoyer un seul fichier
//     uploadDir: path.join(process.cwd(), "public/uploads"), // Dossier où le fichier sera stocké
//     keepExtensions: true, // Garder l'extension du fichier
//   });

//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return reject(new Response(JSON.stringify({ error: "Erreur lors de l'upload" }), { status: 500 }));
//       }
//       console.log("Fichiers reçus :", files);
//       // Vérification si le fichier est bien présent
//       if (!files.file) {
//         return reject(new Response(JSON.stringify({ error: "Aucun fichier reçu" }), { status: 400 }));
//       }

//       const filePath = `/uploads/${path.basename(files.file[0].filepath)}`;

//       try {
//         const newPersonel = await prisma.personels.create({
//           data: {
//             photo: filePath,
//             nom: fields.nom[0],
//             postNom: fields.postNom[0],
//             email: fields.email[0],
//             sexe: fields.sexe[0],
//             poste: fields.poste[0],
//           },
//         });

//         resolve(
//           new Response(
//             JSON.stringify({
//               message: "Fichier téléchargé et données enregistrées avec succès.",
//               photoPath: filePath,
//               personels: newPersonel,
//             }),
//             { status: 201 }
//           )
//         );
//       } catch (error) {
//         reject(new Response(JSON.stringify({ error: "Erreur lors de l'enregistrement dans la base de données" }), { status: 500 }));
//       }
//     });
//   });
// }
