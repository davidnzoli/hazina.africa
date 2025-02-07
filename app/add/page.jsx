// "use client";

// import { useState, useRef, ChangeEvent } from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { Button } from "@mui/material";
// import { CloudUpload } from "@mui/icons-material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import QRCode from "qrcode";

// const AddUser = () => {
//   const [age, setAge] = useState("");
//   const [formData, setFormData] = useState({
//     Nom: "",
//     Postnom: "",
//     Sexe: "",
//     Poste: "",
//     File: null,
//     email: "",
//     Telephone: "",
//   });

//   const canvasRef = useRef(null);

//   const handleSelectChange = (event) => {
//     setAge(event.target.value);
//     setFormData({ ...formData, Sexe: event.target.value });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const generateQR = async () => {
//     if (canvasRef.current) {
//       const jsonData = JSON.stringify(formData);
//       await QRCode.toCanvas(canvasRef.current, jsonData, {
//         width: 300,
//         margin: 2,
//       });
//     }

//     const data = {
//       nom: formData.Nom,
//       postnom: formData.Postnom,

//       sexe: formData.Sexe,
//       poste: formData.Poste,
//       email_adress: formData.email,
//       telephone: formData.Telephone,
//     };

//     const response = await fetch("/api/personels", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       console.log("Données enregistrées avec succès !");
//     } else {
//       console.error("Erreur lors de l'enregistrement des données.");
//     }
//   };

//   const downloadQR = () => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const image = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = image;
//       link.download = "qrcode.png";
//       link.click();
//     }
//   };

//   return (
//     <Box
//       component="form"
//       className="box-content"
//       sx={{
//         "& .MuiTextField-root": { m: 1, width: "25ch" },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div className="glob-content">
//         <div
//           className="in-glob-content"
//           style={{ display: "flex", flexDirection: "column", gap: "5px" }}
//         >
//           <div className="title-header">
//             <h1>Ajouter un personnel</h1>
//           </div>
//           <div className="form-input-label">
//             <div>
//               <TextField
//                 label="Nom"
//                 id="outlined-size-small"
//                 name="Nom"
//                 value={formData.Nom}
//                 onChange={handleInputChange}
//                 size="small"
//               />
//               <TextField
//                 label="Postnom"
//                 id="outlined-size-small"
//                 name="Postnom"
//                 value={formData.Postnom}
//                 onChange={handleInputChange}
//                 size="small"
//               />
//             </div>

//             <div>
//               <TextField
//                 label="Email"
//                 id="outlined-size-small"
//                 name="email"
//                 type="email"
//                 onChange={handleInputChange}
//                 size="small"
//               />

//               <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
//                 <InputLabel id="demo-select-small-label">Sexe</InputLabel>
//                 <Select
//                   labelId="demo-select-small-label"
//                   id="demo-select-small"
//                   value={formData.Sexe}
//                   label="Sexe"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value={"10"}>M</MenuItem>
//                   <MenuItem value={"20"}>F</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//             <div>
//               <TextField
//                 type="file"
//                 id="outlined-size-small"
//                 size="small"
//                 name="File"
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 label="Telephone"
//                 id="outlined-size-small"
//                 name="Telephone"
//                 value={formData.Telephone}
//                 onChange={handleInputChange}
//                 size="small"
//               />
//             </div>
//           </div>
//           <TextField
//             label="Fonction (Post)"
//             id="outlined-size-small"
//             className="post"
//             name="Poste"
//             value={formData.Poste}
//             onChange={handleInputChange}
//             size="small"
//           />
//           <div
//             className="boutton-div"
//             style={{
//               width: "99%",
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               type="button"
//               sx={{ margin: "10px 10px", padding: "10px 10px" }}
//               onClick={generateQR}
//               startIcon={<OpenInNewIcon />}
//               color="success"
//             >
//               Générer Qrcode
//             </Button>
//             <Button
//               component="label"
//               role={undefined}
//               variant="contained"
//               onClick={downloadQR}
//               sx={{ padding: "10px 20px" }}
//               tabIndex={-1}
//               startIcon={<CloudUpload />}
//             >
//               Upload Qrcode
//             </Button>
//           </div>
//         </div>
//         <div className="">
//           <div>
//             <canvas
//               ref={canvasRef}
//               className="qrcode"
//               style={{ marginTop: "10px" }}
//             ></canvas>
//           </div>
//         </div>
//       </div>
//     </Box>
//   );
// };

// export default AddUser;

"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
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

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Checkout() {
  const [age, setAge] = useState("");
  const [formData, setFormData] = useState({
    Nom: "",
    Postnom: "",
    Sexe: "",
    Poste: "",
    File: null,
    email: "",
    Telephone: "",
  });

  const canvasRef = useRef(null);

  const handleSelectChange = (event) => {
    setAge(event.target.value);
    setFormData({ ...formData, Sexe: event.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateQR = async () => {
    if (canvasRef.current) {
      const jsonData = JSON.stringify(formData);
      await QRCode.toCanvas(canvasRef.current, jsonData, {
        width: 300,
        margin: 2,
      });
    }

    const data = {
      nom: formData.Nom,
      postnom: formData.Postnom,

      sexe: formData.Sexe,
      poste: formData.Poste,
      email_adress: formData.email,
      telephone: formData.Telephone,
    };

    const response = await fetch("/api/personels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Données enregistrées avec succès !");
    } else {
      console.error("Erreur lors de l'enregistrement des données.");
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
        }}
      >
        <h1 style={{ color: "blue", fontSize: "16px" }}>AJOUTER PERSONNELS</h1>
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
                name="last-name"
                placeholder="John"
                required
                size="small"
                onChange={handleInputChange}
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="address1" required>
                Addresse Mail
              </FormLabel>
              <OutlinedInput
                id="address"
                name="address"
                placeholder="exemple@gmail.com"
                required
                size="small"
                onChange={handleInputChange}
              />
            </FormGrid>
            <FormGrid item xs={12}>
              <FormLabel htmlFor="sexe">Sexe</FormLabel>
              <Select
                id="sexe"
                name="sexe"
                displayEmpty
                fullWidth
                size="small"
                onChange={handleInputChange}
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
                name="photo"
                placeholder=""
                required
                type="file"
                size="small"
                onChange={handleInputChange}
              />
            </FormGrid>
            <FormGrid item xs={6}>
              <FormLabel htmlFor="state" required>
                Poste Travail
              </FormLabel>
              <OutlinedInput
                id="poste"
                name="state"
                placeholder="Poste"
                required
                size="small"
                onChange={handleInputChange}
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
