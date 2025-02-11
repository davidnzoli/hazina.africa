"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
// import PersonRemoveSharpIcon from "@mui/icons-material/PersonRemoveSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import {
  RemoveCircle,
  RemoveDoneSharp,
  RemoveModeratorSharp,
  RemoveRoadSharp,
  RemoveShoppingCartRounded,
} from "@mui/icons-material";

export default function DataTable() {
  const [personels, setPersonels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/personels");
        const data = await response.json();
        setPersonels(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  // Fonction pour supprimer un personnel
  const handleDelete = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      console.log(`Tentative de suppression de l'ID: ${id}`);

      try {
        const response = await fetch(`/api/personels/${id}`, {
          method: "DELETE",
        });

        const text = await response.text(); // Récupère la réponse brute
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

  // Définition des colonnes avec boutons d'action
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "postNom", headerName: "Post-Nom", width: 150 },
    { field: "email", headerName: "Email", width: 140 },
    { field: "sexe", headerName: "Sexe", width: 120 },
    { field: "poste", headerName: "Poste", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "2px",
          }}
        >
          <Link href={`/edit/${params.row.id}`} passHref>
            <IconButton color="primary">
              <UpdateSharpIcon />
            </IconButton>
          </Link>

          <IconButton
            style={{ color: "red" }}
            onClick={() => handleDelete(params.row.id)}
            color="error"
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
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          margin: "10px 0px",
        }}
      >
        <Link href="/add">
          <Button variant="outlined">Ajouter Personnels</Button>
        </Link>
      </div>
      <Paper sx={{ height: 400, width: "80%" }}>
        <h1
          style={{ fontSize: "20px", padding: "10px 5px", margin: "5px 10px" }}
        >
          Liste Personnels
        </h1>
        <DataGrid
          rows={personels}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}
