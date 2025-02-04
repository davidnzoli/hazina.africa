"use client";

import { useState, useRef, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import QRCode from "qrcode";

// interface FormData {
//   Nom: string;
//   Postnom: string;
//   Sexe: string;
//   Poste: string;
//   email: string;
//   File: File | null;
//   Telephone: string;
// }

const AddUser = () => {
  const [age, setAge] = useState("");
  const [formData, setFormData] =
    useState <
    FormData >
    {
      Nom: "",
      Postnom: "",
      Sexe: "",
      Poste: "",
      File: null,
      email: "",
      Telephone: "",
    };

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
    <Box
      component="form"
      className="box-content"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className="glob-content">
        <div
          className="in-glob-content"
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <div className="title-header">
            <h1>Ajouter un personnel</h1>
          </div>
          <div className="form-input-label">
            <div>
              <TextField
                label="Nom"
                id="outlined-size-small"
                name="Nom"
                value={formData.Nom}
                onChange={handleInputChange}
                size="small"
              />
              <TextField
                label="Postnom"
                id="outlined-size-small"
                name="Postnom"
                value={formData.Postnom}
                onChange={handleInputChange}
                size="small"
              />
            </div>

            <div>
              <TextField
                label="Email"
                id="outlined-size-small"
                name="email"
                type="email"
                onChange={handleInputChange}
                size="small"
              />

              <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
                <InputLabel id="demo-select-small-label">Sexe</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={formData.Sexe}
                  label="Sexe"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={"10"}>M</MenuItem>
                  <MenuItem value={"20"}>F</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                type="file"
                id="outlined-size-small"
                size="small"
                name="File"
                onChange={handleInputChange}
              />
              <TextField
                label="Telephone"
                id="outlined-size-small"
                name="Telephone"
                value={formData.Telephone}
                onChange={handleInputChange}
                size="small"
              />
            </div>
          </div>
          <TextField
            label="Fonction (Post)"
            id="outlined-size-small"
            className="post"
            name="Poste"
            value={formData.Poste}
            onChange={handleInputChange}
            size="small"
          />
          <div
            className="boutton-div"
            style={{
              width: "99%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              type="button"
              sx={{ margin: "10px 10px", padding: "10px 10px" }}
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
        </div>
        <div className="">
          <div>
            <canvas
              ref={canvasRef}
              className="qrcode"
              style={{ marginTop: "10px" }}
            ></canvas>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AddUser;

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

// interface FormData {
//   nom: string;
//   postnom: string;
//   age: string;
//   sexe: string;
//   poste: string;
//   email_adress: string;
//   File: File | null;
//   telephone: string;
// }

// const AddUser: React.FC = () => {
//   const [age, setAge] = useState("");
//   const [formData, setFormData] = useState<FormData>({
//     nom: "",
//     postnom: "",
//     age: "",
//     sexe: "",
//     poste: "",
//     File: null,
//     email_adress: "",
//     telephone: "",
//   });

//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const handleSelectChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value);
//     setFormData({ ...formData, age: event.target.value });
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value, files } = e.target as HTMLInputElement;

//     if (name === "File" && files) {
//       setFormData({ ...formData, File: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({ ...formData, File: e.target.files[0] });
//     }
//   };

//   const generateQR = async () => {
//     if (canvasRef.current) {
//       const jsonData = JSON.stringify(formData);
//       await QRCode.toCanvas(canvasRef.current, jsonData, {
//         width: 300,
//         margin: 2,
//       });
//     }
//   };

//   const uploadData = async () => {
//     const data = new FormData();
//     data.append("nom", formData.nom);
//     data.append("postnom", formData.postnom);
//     data.append("age", formData.age);
//     data.append("sexe", formData.sexe);
//     data.append("poste", formData.poste);
//     data.append("email_adress", formData.email_adress);
//     data.append("telephone", formData.telephone);

//     if (formData.File) {
//       data.append("File", formData.File); // Ajoute le fichier
//     }

//     const response = await fetch("api/personels", {
//       method: "POST",
//       body: data,
//     });

//     if (response.ok) {
//       console.log("Données enregistrées avec succès !");
//     } else {
//       console.error("Erreur lors de l'enregistrement des données.");
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
//                 value={formData.nom}
//                 onChange={handleInputChange}
//                 size="small"
//               />
//               <TextField
//                 label="Postnom"
//                 id="outlined-size-small"
//                 name="Postnom"
//                 value={formData.postnom}
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
//                   value={age}
//                   label="Sexe"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="M">M</MenuItem>
//                   <MenuItem value="F">F</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//             <div>
//               <TextField
//                 type="file"
//                 id="outlined-size-small"
//                 size="small"
//                 name="File"
//                 onChange={handleFileChange}
//               />
//               <TextField
//                 label="Telephone"
//                 id="outlined-size-small"
//                 name="Telephone"
//                 value={formData.telephone}
//                 onChange={handleInputChange}
//                 size="small"
//               />
//             </div>
//           </div>
//           <div></div>
//           <TextField
//             label="Fonction (Post)"
//             id="outlined-size-small"
//             className="post"
//             name="Poste"
//             value={formData.poste}
//             onChange={handleInputChange}
//             size="small"
//           />
//           <div
//             className="boutton-div"
//             style={{
//               width: "99%",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Button
//               variant="contained"
//               type="button"
//               id="button"
//               onClick={generateQR}
//               startIcon={<OpenInNewIcon />}
//               color="success"
//             >
//               Générer Qrcode
//             </Button>
//             <Button
//               variant="contained"
//               type="button"
//               id="button"
//               onClick={uploadData}
//               startIcon={<CloudUpload />}
//               color="primary"
//             >
//               Upload Qrcode
//             </Button>
//           </div>
//         </div>
//         <canvas
//           ref={canvasRef}
//           className="qrcode"
//           style={{ marginTop: "5px" }}
//         ></canvas>
//       </div>
//     </Box>
//   );
// };

// export default AddUser;
