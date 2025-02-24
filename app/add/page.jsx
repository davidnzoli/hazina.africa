"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import ChevronRightIcon from "@mui/icons-material/ChevronLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  styled,
  Checkbox,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useState, useRef, ChangeEvent } from "react";
// import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import QRCode from "qrcode";
import Link from "next/link";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Checkout() {
  // const [age, setAge] = useState("");
  const canvasRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formKey, setFormKey] = useState(Date.now());

  const [formData, setFormData] = useState({
    nom: "",
    postNom: "",
    sexe: "",
    poste: "",
    email: "",
    photo: "",
    Telephone: "",
  });

  const handleSelectChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      sexe: event.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      postNom: "",
      sexe: "",
      poste: "",
      email: "",
      photo: "",
      Telephone: "",
    });
    // setSelectedFile(null);

    // Changer la clé du formulaire pour forcer le re-render
    setFormKey(Date.now());
  };

  const generateQR = async () => {
    const formDataToSend = new FormData();

    // Ajouter les autres champs du formulaire
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Ajouter le fichier si présent
    if (selectedFile) {
      formDataToSend.append("file", selectedFile);
    }

    try {
      const response = await fetch("/api/personels", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        console.error("Erreur d'enregistrement :", await response.json());
        return;
      }

      const result = await response.json();
      console.log("Données enregistrées avec succès :", result);
      console.log(selectedFile.name);

      if (canvasRef.current) {
        const jsonData = JSON.stringify(formData);
        await QRCode.toCanvas(canvasRef.current, jsonData, {
          width: 300,
          margin: 2,
        });
      }
      setTimeout(() => {
        resetForm();
      }, 300);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const downloadQR = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <div
        style={{
          width: "100%",
          zIndex: "1000",
          height: "40px",
          borderBottom: "0,3px solid black",
          backgroundColor: "whitesmoke",
          position: "fixed",
          top: "0px",
          margin: "0px",
          display: "flex",
          justifyContent: "right",
          padding: "5px 50px",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          href="#"
          style={{
            textDecoration: "none",
            fontSize: "16px",
            color: "rgb(11, 97, 245) ",
          }}
        >
          Dashboard
        </Link>
        <h1
          style={{
            color: "blue",
            fontSize: "16px",
            color: "rgb(28, 181, 12)",
            fontWeight: "normal",
          }}
        >
          {" "}
          / ajouter personels
        </h1>
        <Link
          href="/listPersonel"
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "3px",
            textDecoration: "none",
          }}
        >
          <ChevronRightIcon style={{ color: "black" }} />
          <h1 style={{ color: "black", fontSize: "14px" }}>back</h1>
        </Link>
      </div>

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          lg={3.5}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "center",
            justifyContent: "center",
            pt: 6,
            px: 10,
            gap: 3,
          }}
        >
          <h1
            style={{
              border: "1px solid black",
              borderTopLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              padding: "10px",
              fontSize: "20px",
            }}
          >
            QR-CODE
          </h1>
          {!selectedFile ? (
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
            <>
              <img
                src={`/uploads/${selectedFile}`}
                alt="Profil ici"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/uploads/dessin2.jpg";
                  e.currentTarget.alt = "Image enregistree";
                }}
                style={{
                  maxWidth: "60%",
                  maxHeight: "60%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <h2 style={{ color: "rgb(28, 181, 12)", fontSize: "11px" }}>
                Profil enregistré avec succès✅
              </h2>
            </>
          )}

          <Box sx={{ flexGrow: 1, width: "100%", maxWidth: 200 }}>
            <canvas
              ref={canvasRef}
              className="qrcode"
              style={{ marginTop: "0px", maxWidth: "100%", maxHeight: "60%" }}
            ></canvas>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={8.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "center",
            pt: { xs: 0, sm: 5 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 1, md: 3 },
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              gap: "0px",
            }}
          >
            <h1 style={{ fontSize: "17px" }}>
              Formulaire de personels <br />
              <span style={{ fontSize: "14px", fontWeight: "initial" }}>
                Ajouter les nouveaux personels à partir de ce formulaire
              </span>
            </h1>
          </div>

          <Grid
            container
            spacing={2}
            style={{ fontFamily: "Poppins" }}
            key={formKey}
          >
            <FormGrid item xs={12} md={6}>
              {" "}
              <FormLabel
                htmlFor="first-name"
                required
                style={{
                  fontFamily: "Poppins",
                  color: "black",
                }}
              >
                Entrez le nom
              </FormLabel>
              <OutlinedInput
                id="first-name"
                name="nom"
                placeholder="Bisimwa"
                required
                style={{ fontFamily: "Poppins" }}
                onChange={handleInputChange}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel
                htmlFor="last-name"
                required
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Entrez le postnom
              </FormLabel>
              <OutlinedInput
                id="last-name"
                name="postNom"
                placeholder="John"
                required
                style={{ fontFamily: "Poppins" }}
                onChange={(e) =>
                  setFormData({ ...formData, postNom: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel
                htmlFor="address1"
                required
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Addresse mail
              </FormLabel>
              <OutlinedInput
                id="address"
                name="email"
                placeholder="exemple@gmail.com"
                required
                style={{ fontFamily: "Poppins" }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel
                htmlFor="city"
                required
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Téléphone
              </FormLabel>
              <OutlinedInput
                id=" telephone"
                name=" telephone"
                placeholder="numéro"
                required
                style={{ fontFamily: "Poppins" }}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel
                htmlFor="sexe"
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Sexe
              </FormLabel>
              <Select
                id="sexe"
                name="sexe"
                displayEmpty
                fullWidth
                style={{ fontFamily: "Poppins" }}
                value={formData.sexe}
                onChange={handleSelectChange}
              >
                <MenuItem
                  value="Choisissez votre sexe"
                  disabled
                  style={{ fontFamily: "Poppins" }}
                >
                  Choisissez votre sexe
                </MenuItem>
                <MenuItem value="homme" style={{ fontFamily: "Poppins" }}>
                  Homme
                </MenuItem>
                <MenuItem value="femme" style={{ fontFamily: "Poppins" }}>
                  Femme
                </MenuItem>
              </Select>
            </FormGrid>

            <FormGrid item xs={6}>
              <FormLabel
                htmlFor="city"
                required
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Photo
              </FormLabel>
              <OutlinedInput
                id="photo"
                name="file"
                placeholder=""
                required
                type="file"
                style={{ fontFamily: "Poppins" }}
                onChange={(e) => handleFileChange(e)}
              />
            </FormGrid>

            <FormGrid item xs={6}>
              <FormLabel
                htmlFor="state"
                required
                style={{ fontFamily: "Poppins", color: "black" }}
              >
                Poste Travail
              </FormLabel>
              <OutlinedInput
                id="poste"
                name="poste"
                placeholder="Poste"
                required
                style={{ fontFamily: "Poppins" }}
                onChange={(e) =>
                  setFormData({ ...formData, poste: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <div
                className="boutton-div"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontFamily: "Poppins",
                }}
              >
                <Button
                  variant="contained"
                  type="button"
                  onClick={generateQR}
                  startIcon={<OpenInNewIcon />}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "rgb(28, 181, 12)",
                    color: "white",
                    textTransform: "lowercase",
                    fontSize: "15px",
                    fontFamily: "Poppins",
                  }}
                  tabIndex={-1}
                >
                  Générer Qrcode
                </Button>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  onClick={downloadQR}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "rgb(11, 97, 245)",
                    color: "white",
                    textTransform: "lowercase",
                    fontSize: "15px",
                    fontFamily: "Poppins",
                  }}
                  tabIndex={-1}
                  startIcon={<CloudUpload />}
                >
                  Upload Qrcode
                </Button>
              </div>
            </FormGrid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
