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
          <IconButton
            style={{ color: "rgb(28, 181, 12)" }}
            onClick={() => handleOpen(params.row)}
          >
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
        fontFamily: "Poppins",
      }}
    >
      <div
        style={{
          width: "99%",
          display: "flex",
          justifyContent: "end",
          margin: "10px 0",
          fontFamily: "Poppins",
        }}
      >
        <Link href="/add">
          <Button
            variant="outlined"
            style={{
              color: "rgb(28, 181, 12)",
              borderColor: "rgb(28, 181, 12)",
              fontFamily: "poppins",
              fontSize: "17px",
            }}
          >
            A
            <span style={{ textTransform: "lowercase", fontFamily: "Poppins" }}>
              jouter personnels
            </span>
          </Button>
        </Link>
      </div>
      <Paper sx={{ height: 500, width: "99%", fontFamily: "Poppins" }}>
        <h1
          style={{
            fontSize: "20px",
            padding: "10px 5px",
            margin: "5px 10px",
            fontFamily: "Poppins",
          }}
        >
          Liste personnels
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
            style={{ fontFamily: "Poppins" }}
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
            fontFamily: "Poppins",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ width: "90%" }}>
              Modifier personnel <br />
              <span style={{ fontSize: "12px", fontWeight: "initial" }}>
                Utilisez ce formulaire pour modifier un personel
              </span>
            </h2>
            <img
              src={`/uploads/${selectedPersonel?.photo}`}
              style={{
                width: "63px",
                height: "63px",
                borderRadius: "40px",
                border: "1px solid gray",
              }}
              alt="photo"
            />
          </div>
          <TextField
            fullWidth
            label="Nom"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.nom || ""}
            onChange={(e) =>
              setSelectedPersonel({ ...selectedPersonel, nom: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Post-Nom"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.postNom || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                postNom: e.target.value,
              })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.email || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                email: e.target.value,
              })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Téléphone"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.telephone || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                telephone: e.target.value,
              })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Poste"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.poste || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                poste: e.target.value,
              })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="sexe"
            style={{ fontFamily: "Poppins" }}
            value={selectedPersonel?.sexe || ""}
            onChange={(e) =>
              setSelectedPersonel({
                ...selectedPersonel,
                sexe: e.target.value,
              })
            }
            margin="dense"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "rgb(28, 181, 12)",
                color: "white",
                fontFamily: "Poppins",
              }}
              onClick={handleUpdate}
            >
              Mettre à jour
            </Button>
            <Button
              variant="outlined"
              style={{
                color: "rgb(11, 97, 245)",
                borderColor: "rgb(11, 97, 245)",
                fontFamily: "Poppins",
              }}
              onClick={handleClose}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
