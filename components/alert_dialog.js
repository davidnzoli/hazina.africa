// components/DeleteItemAlertDialog.js
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Modal, Box, TextField, Button } from "@mui/material";

export default function DeleteItemAlertDialog({
  onDelete,
  onClose,
  isOpen,
  ItemId,
  Item2,
}) {
  return (
    <Modal open={isOpen} onClose={onClose}>
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
        <h2 style={{ fontSize: "17px", fontWeight: "600" }}>
          Confirmation de suppression
        </h2>

        <h2 style={{ fontSize: "14px", fontWeight: "400" }}>
          Êtes-vous sûr de vouloir supprimer ce personnel <strong></strong> ?
        </h2>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(253, 35, 2)",
              color: "white",
              fontFamily: "Poppins",
            }}
            onClick={() => {
              // onDelete();
              // onClose();

              console.log("🔴 ID envoyé à handleDelete :", ItemId);

              if (!ItemId) {
                console.error("❌ Erreur : selectedPersonel est undefined !");
                return;
              }

              onDelete(ItemId);
              onClose();
            }}
          >
            Suprimer
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "rgb(11, 97, 245)",
              borderColor: "rgb(11, 97, 245)",
              fontFamily: "Poppins",
            }}
            onClick={onClose}
          >
            Annuler
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
