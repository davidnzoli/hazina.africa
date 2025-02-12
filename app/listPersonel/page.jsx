// "use client";

// import React, { useState, useEffect } from "react";
// import { Box, Button, IconButton, Paper } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import Link from "next/link";
// // import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
// import {
//   RemoveCircle,
//   RemoveDoneSharp,
//   RemoveModeratorSharp,
//   RemoveRoadSharp,
//   RemoveShoppingCartRounded,
// } from "@mui/icons-material";

// export default function DataTable() {
//   const [personels, setPersonels] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/personels");
//         const data = await response.json();
//         setPersonels(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données :", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fonction pour supprimer un personnel
//   const handleDelete = async (id) => {
//     if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
//       console.log(`Tentative de suppression de l'ID: ${id}`);

//       try {
//         const response = await fetch(`/api/personels/${id}`, {
//           method: "DELETE",
//         });

//         const text = await response.text(); // Récupère la réponse brute
//         console.log("Réponse brute de l'API :", text);

//         if (!response.ok) {
//           console.error("Erreur lors de la suppression :", text);
//           return;
//         }

//         setPersonels(personels.filter((personel) => personel.id !== id));
//       } catch (error) {
//         console.error("Erreur lors de la suppression :", error);
//       }
//     }
//   };

//   // Définition des colonnes avec boutons d'action
//   const columns = [
//     { field: "id", headerName: "ID", width: 100 },
//     { field: "nom", headerName: "Nom", width: 150 },
//     { field: "postNom", headerName: "Post-Nom", width: 150 },
//     { field: "email", headerName: "Email", width: 140 },
//     { field: "telephone", headerName: "Tel", width: 140 },
//     { field: "sexe", headerName: "Sexe", width: 120 },
//     { field: "poste", headerName: "Poste", width: 130 },
//     { field: "created_ad", headerName: "Date", width: 130 },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 130,
//       renderCell: (params) => (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "start",
//             gap: "2px",
//           }}
//         >
//           <Link href={`/edit/${params.row.id}`} passHref>
//             <IconButton color="primary">
//               <UpdateSharpIcon />
//             </IconButton>
//           </Link>

//           <IconButton
//             style={{ color: "red" }}
//             onClick={() => handleDelete(params.row.id)}
//             color="error"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "99%",
//           display: "flex",
//           alignItems: "flex-end",
//           justifyContent: "end",
//           margin: "0px 0px",
//         }}
//       >
//         <Link href="/add">
//           <Button variant="outlined">Ajouter Personnels</Button>
//         </Link>
//       </div>
//       <Paper sx={{ height: 500, width: "99%" }}>
//         <h1
//           style={{ fontSize: "20px", padding: "10px 5px", margin: "5px 10px" }}
//         >
//           Liste Personnels
//         </h1>
//         <DataGrid
//           rows={personels}
//           columns={columns}
//           getRowId={(row) => row.id}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//           sx={{ border: 0 }}
//         />
//       </Paper>
//     </Box>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Modal,
//   TextField,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import Link from "next/link";
// import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";

// export default function ListPersonel() {
//   const [personels, setPersonels] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedPersonel, setSelectedPersonel] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/personels");
//         const data = await response.json();
//         setPersonels(data);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données :", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
//       console.log("Tentative de suppression de l'ID :", id);
//       console.log(`URL appelée : /api/personels/${id}`);

//       try {
//         const response = await fetch(`/api/personels/${id}`, {
//           method: "DELETE",
//         });

//         const text = await response.text();
//         console.log("Réponse brute de l'API :", text);

//         if (!response.ok) {
//           console.error("Erreur lors de la suppression :", text);
//           return;
//         }

//         setPersonels(personels.filter((personel) => personel.id !== id));
//       } catch (error) {
//         console.error("Erreur lors de la suppression :", error);
//       }
//     }
//   };

//   const handleOpen = (personel) => {
//     setSelectedPersonel(personel);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedPersonel(null);
//   };

//   const handleUpdate = async () => {
//     if (!selectedPersonel) return;
//     try {
//       const response = await fetch(`/api/personels/${selectedPersonel.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(selectedPersonel),
//       });

//       if (!response.ok) {
//         throw new Error("Échec de la mise à jour");
//       }

//       setPersonels(
//         personels.map((p) =>
//           p.id === selectedPersonel.id ? selectedPersonel : p
//         )
//       );
//       handleClose();
//     } catch (error) {
//       console.error("Erreur lors de la mise à jour :", error);
//     }
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 150 },
//     { field: "nom", headerName: "Nom", width: 150 },
//     { field: "postNom", headerName: "Post-Nom", width: 150 },
//     { field: "email", headerName: "Email", width: 150 },
//     { field: "telephone", headerName: "Tel", width: 150 },
//     { field: "sexe", headerName: "Sexe", width: 150 },
//     { field: "poste", headerName: "Poste", width: 150 },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 130,
//       renderCell: (params) => (
//         <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <IconButton color="primary" onClick={() => handleOpen(params.row)}>
//             <UpdateSharpIcon />
//           </IconButton>
//           <IconButton
//             style={{ color: "red" }}
//             onClick={() => handleDelete(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           width: "99%",
//           display: "flex",
//           justifyContent: "end",
//           margin: "10px 0",
//         }}
//       >
//         <Link href="/add">
//           <Button variant="outlined">Ajouter Personnels</Button>
//         </Link>
//       </div>
//       <Paper sx={{ height: 500, width: "99%" }}>
//         <h1
//           style={{ fontSize: "20px", padding: "10px 5px", margin: "5px 10px" }}
//         >
//           Liste Personnels
//         </h1>
//         <DataGrid
//           rows={personels}
//           columns={columns}
//           getRowId={(row) => row.id}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//           sx={{ border: 0 }}
//         />
//       </Paper>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "white",
//             p: 3,
//             boxShadow: 24,
//             borderRadius: 2,
//           }}
//         >
//           <h2>Modifier Personnel</h2>
//           <TextField
//             fullWidth
//             label="Nom"
//             value={selectedPersonel?.nom || ""}
//             onChange={(e) =>
//               setSelectedPersonel({ ...selectedPersonel, nom: e.target.value })
//             }
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Post-Nom"
//             value={selectedPersonel?.postNom || ""}
//             onChange={(e) =>
//               setSelectedPersonel({
//                 ...selectedPersonel,
//                 postNom: e.target.value,
//               })
//             }
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Email"
//             value={selectedPersonel?.email || ""}
//             onChange={(e) =>
//               setSelectedPersonel({
//                 ...selectedPersonel,
//                 email: e.target.value,
//               })
//             }
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Téléphone"
//             value={selectedPersonel?.telephone || ""}
//             onChange={(e) =>
//               setSelectedPersonel({
//                 ...selectedPersonel,
//                 telephone: e.target.value,
//               })
//             }
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Poste"
//             value={selectedPersonel?.poste || ""}
//             onChange={(e) =>
//               setSelectedPersonel({
//                 ...selectedPersonel,
//                 poste: e.target.value,
//               })
//             }
//             margin="normal"
//           />
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//             <Button variant="contained" color="primary" onClick={handleUpdate}>
//               Mettre à jour
//             </Button>
//             <Button variant="outlined" onClick={handleClose}>
//               Annuler
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Modal,
  TextField,
  CircularProgress, // Importation de l'icône de chargement
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";

export default function ListPersonel() {
  const [personels, setPersonels] = useState([]);
  const [loading, setLoading] = useState(true); // Nouvel état pour suivre le chargement
  const [open, setOpen] = useState(false);
  const [selectedPersonel, setSelectedPersonel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/personels");
        const data = await response.json();
        setPersonels(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false); // Mise à jour du statut de chargement une fois les données récupérées
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      console.log("Tentative de suppression de l'ID :", id);
      console.log(`URL appelée : /api/personels/${id}`);

      try {
        const response = await fetch(`/api/personels/${id}`, {
          method: "DELETE",
        });

        const text = await response.text();
        console.log("Réponse brute de l'API :", text);

        if (!response.ok) {
          console.error("Erreur lors de la suppression :", text);
          return;
        }

        setPersonels(personels.filter((personel) => personel.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  const handleOpen = (personel) => {
    setSelectedPersonel(personel);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPersonel(null);
  };

  const handleUpdate = async () => {
    if (!selectedPersonel) return;
    try {
      const response = await fetch(`/api/personels/${selectedPersonel.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedPersonel),
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour");
      }

      setPersonels(
        personels.map((p) =>
          p.id === selectedPersonel.id ? selectedPersonel : p
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "postNom", headerName: "Post-Nom", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "telephone", headerName: "Tel", width: 150 },
    { field: "sexe", headerName: "Sexe", width: 150 },
    { field: "poste", headerName: "Poste", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton color="primary" onClick={() => handleOpen(params.row)}>
            <UpdateSharpIcon />
          </IconButton>
          <IconButton
            style={{ color: "red" }}
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "99%",
          display: "flex",
          justifyContent: "end",
          margin: "10px 0",
        }}
      >
        <Link href="/add">
          <Button variant="outlined">Ajouter Personnels</Button>
        </Link>
      </div>
      <Paper sx={{ height: 500, width: "99%" }}>
        <h1
          style={{ fontSize: "20px", padding: "10px 5px", margin: "5px 10px" }}
        >
          Liste Personnels
        </h1>
        {loading ? (
          <Box
            sx={{
              height: "70%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <CircularProgress style={{ color: "black" }} />
          </Box>
        ) : (
          <DataGrid
            rows={personels}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        )}
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <h2>Modifier Personnel</h2>
          <TextField
            fullWidth
            label="Nom"
            value={selectedPersonel?.nom || ""}
            onChange={(e) =>
              setSelectedPersonel({ ...selectedPersonel, nom: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Post-Nom"
            value={selectedPersonel?.postNom || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                postNom: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            value={selectedPersonel?.email || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                email: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Téléphone"
            value={selectedPersonel?.telephone || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                telephone: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Poste"
            value={selectedPersonel?.poste || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                poste: e.target.value,
              })
            }
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Mettre à jour
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
