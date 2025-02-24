"use client";
import { useState, useRef, useEffect } from "react";

const ScanQRCode = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [personnelName, setPersonnelName] = useState("");
  const [personnelId, setPersonnelId] = useState("");
  const [personnelPhoto, setPersonnelPhoto] = useState("");
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  // Fonction pour valider les données scannées
  const validateScannedData = (data) => {
    if (!data.nom || !data.id || !data.photo) {
      return "Données du QR Code manquantes. Assurez-vous que le QR Code contient le nom, l'ID et la photo.";
    }

    if (isNaN(data.id) || data.id.trim() === "") {
      return "L'ID du personnel doit être un nombre valide.";
    }

    // Ajouter d'autres validations si nécessaire
    return null;
  };

  // Lorsque l'utilisateur scanne un QR code, cette fonction sera appelée
  const handleScan = (event) => {
    const scannedData = event.target.value;

    if (scannedData) {
      try {
        // On suppose que le QR Code contient un JSON avec le nom, ID et photo
        const parsedData = JSON.parse(scannedData);

        // Validation des données du QR Code
        const validationError = validateScannedData(parsedData);
        if (validationError) {
          setError(validationError);
          return;
        }

        // Remplir les états avec les données extraites du QR Code
        setPersonnelName(parsedData.nom);
        setPersonnelId(parsedData.id);
        setPersonnelPhoto(parsedData.photo);

        // Réinitialiser le message d'erreur en cas de données valides
        setError(null);

        // Mettre à jour les champs cachés (si nécessaire)
        document.getElementById("nom").value = parsedData.nom;
        document.getElementById("id").value = parsedData.id;
        document.getElementById("photo").value = parsedData.photo;
      } catch (error) {
        console.error(
          "Erreur lors du traitement des données du QR Code:",
          error
        );
        setError(
          "Le QR Code est invalide ou corrompu. Veuillez essayer à nouveau."
        );
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* Champ de saisie invisible mais permettant de capturer les données du scanner */}
      <input
        ref={inputRef}
        type="text"
        style={{ position: "absolute", top: "-9999px" }}
        onInput={handleScan} // Capture l'entrée du scanner
      />

      <div>
        {/* Affichage du message d'erreur si les données sont invalides */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>Nom : {personnelName}</p>
        <p>ID : {personnelId}</p>

        {personnelPhoto && (
          <div>
            <p>Photo :</p>
            <img
              src={personnelPhoto}
              alt="Photo du personnel"
              style={{ maxWidth: "200px" }}
            />
          </div>
        )}
      </div>

      {/* Formulaire caché contenant les champs du QR Code */}
      <form>
        <input type="hidden" id="nom" name="nom" value={personnelName} />
        <input type="hidden" id="id" name="id" value={personnelId} />
        <input type="hidden" id="photo" name="photo" value={personnelPhoto} />
      </form>
    </div>
  );
};

export default ScanQRCode;
