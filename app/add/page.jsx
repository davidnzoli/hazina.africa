"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import ChevronRightIcon from "@mui/icons-material/ChevronLeft";
import {
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  styled,
  Checkbox,
  Select,
  MenuItem,
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

      if (canvasRef.current) {
        const jsonData = JSON.stringify(formData);
        await QRCode.toCanvas(canvasRef.current, jsonData, {
          width: 300,
          margin: 2,
        });
      }
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
        <h1 style={{ color: "blue", fontSize: "16px" }}>AJOUTER PERSONNELS</h1>
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
          <h1 style={{ color: "black", fontSize: "14px" }}> Back</h1>
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
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "center",
            justifyContent: "center",
            pt: 16,
            px: 10,
            gap: 4,
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
          <Box sx={{ flexGrow: 1, width: "100%", maxWidth: 200 }}>
            <canvas
              ref={canvasRef}
              className="qrcode"
              style={{ marginTop: "10px", maxWidth: "100%", maxHeight: "60%" }}
            ></canvas>
          </Box>
          {/* {formData.photo && (
            <img src={formData.photo} alt="Photo" width={70} />
          )} */}
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "center",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
              {" "}
              <FormLabel htmlFor="first-name" required>
                Entrez le Nom
              </FormLabel>
              <OutlinedInput
                id="first-name"
                name="nom"
                placeholder="Bisimwa"
                required
                size="small"
                onChange={handleInputChange}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="last-name" required>
                Entrez le Postnom
              </FormLabel>
              <OutlinedInput
                id="last-name"
                name="postNom"
                placeholder="John"
                required
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, postNom: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="address1" required>
                Addresse Mail
              </FormLabel>
              <OutlinedInput
                id="address"
                name="email"
                placeholder="exemple@gmail.com"
                required
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="city" required>
                telephone
              </FormLabel>
              <OutlinedInput
                id=" telephone"
                name=" telephone"
                placeholder=""
                required
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="sexe">Sexe</FormLabel>
              <Select
                id="sexe"
                name="sexe"
                displayEmpty
                fullWidth
                size="small"
                value={formData.sexe}
                onChange={handleSelectChange}
              >
                <MenuItem value="Choisissez votre sexe" disabled>
                  Choisissez votre sexe
                </MenuItem>
                <MenuItem value="homme">Homme</MenuItem>
                <MenuItem value="femme">Femme</MenuItem>
              </Select>
            </FormGrid>

            <FormGrid item xs={6}>
              <FormLabel htmlFor="city" required>
                Photo
              </FormLabel>
              <OutlinedInput
                id="photo"
                name="file"
                placeholder=""
                required
                type="file"
                size="small"
                onChange={(e) => handleFileChange(e)}
              />
            </FormGrid>

            <FormGrid item xs={6}>
              <FormLabel htmlFor="state" required>
                Poste Travail
              </FormLabel>
              <OutlinedInput
                id="poste"
                name="poste"
                placeholder="Poste"
                required
                size="small"
                onChange={(e) =>
                  setFormData({ ...formData, poste: e.target.value })
                }
              />
            </FormGrid>
            <div
              className="boutton-div"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                alignItems: "center",
                margin: "0px",
              }}
            >
              <Button
                variant="contained"
                type="button"
                sx={{ padding: "10px 10px" }}
                onClick={generateQR}
                startIcon={<OpenInNewIcon />}
                color="success"
              >
                Générer Qrcode
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                onClick={downloadQR}
                sx={{ padding: "10px 20px" }}
                tabIndex={-1}
                startIcon={<CloudUpload />}
              >
                Upload Qrcode
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
