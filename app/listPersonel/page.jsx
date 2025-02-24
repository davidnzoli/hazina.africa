"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Modal,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateSharpIcon from "@mui/icons-material/UpdateSharp";
import DeleteItemAlertDialog from "@/components/alert_dialog";

export default function ListPersonel() {
  const [personels, setPersonels] = useState([]);
  const [personel2, setPersonel2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openmodal, setopenmodal] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [selectedPersonel, setSelectedPersonel] = useState(null);
  const [selectedName, setselecteName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/personels");
        const data = await response.json();
        setPersonels(data);
        console.log("element data", data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("🟢 selectedPersonel mis à jour :", selectedPersonel);
  }, [selectedPersonel]);
  const handleDelete = async (id) => {
    console.log("ID reçu dans handleDelete:", id); // Vérification

    if (!id) {
      console.error("L'ID est undefined !");
      return;
    }

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

      setPersonels((prev) => prev.filter((personel) => personel.id !== id));
      setPersonel2((prev) => prev.filter((personel) => personel.nom !== nom));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleOpen = (id, nom) => {
    // setSelectedPersonel(personel);
    // setOpen(true);
    console.log("ID reçu dans handleOpen :", id);
    setSelectedPersonel(personels.find((p) => p.id === id) || {});
    setselecteName(personels.find((p) => p.nom === nom) || {});
    setOpen(true);
  };
  const handleOpen2 = (ItemId) => {
    console.log("🟢 ID envoyé à handleOpen2 :", ItemId);
    setSelectedPersonel(ItemId);

    setTimeout(() => {
      console.log(
        "🟢 Valeur de selectedPersonel après mise à jour :",
        selectedPersonel
      );
      setopenmodal(true); // 🔥 Ouvrir le modal APRÈS la mise à jour
    }, 100);
  };

  const handleClose = () => {
    setSelectedPersonel(null);
    setselecteName(null);
    setOpen(false);
  };
  const handleClose2 = () => {
    setSelectedPersonel(null);
    setselecteName(null);
    setopenmodal(false);
  };

  const handleUpdate = async () => {
    console.log("Valeur de selectedPersonel:", selectedPersonel); // 🔍 Debug
    if (!selectedPersonel || !selectedPersonel.id) {
      console.error("ID du personnel sélectionné est indéfini !");
      return;
    }
    if (!selectedPersonel || !selectedPersonel.id) {
      setSnackbarMessage("ID du personnel sélectionné est indéfini !");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    try {
      const url = `/api/personels/${selectedPersonel.id}`;
      console.log("URL API appelée :", url);

      const response = await fetch(url, {
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
      setSnackbarMessage("Mise à jour réussie !");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setSnackbarMessage("Erreur lors de la mise à jour !");
      setSnackbarType("error");
      setOpenSnackbar(true);
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
      renderCell: (params) => {
        console.log("ID dans renderCell:", params.row.id); // Vérification
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton
              style={{ color: "rgb(28, 181, 12)" }}
              onClick={() => handleOpen(params.row.id)}
            >
              <UpdateSharpIcon />
            </IconButton>
            <IconButton
              style={{ color: "red" }}
              onClick={() => handleOpen2(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <DeleteItemAlertDialog
        Item2={selectedName}
        ItemId={selectedPersonel}
        isOpen={openmodal}
        onDelete={handleDelete}
        onClose={handleClose2}
      />
    </Box>
  );
}
