import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
  "& .MuiPaper-root": {
    width: "90%",
    maxWidth: "500px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  },
}));

export default function MainProfile({
  editData,
  dbData,
  field,
  handleInputChange,
  handleSave,
  handleClickOpen,
}) {
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  return (
    <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-gray-300 bg-white shadow-lg transition-all hover:scale-105">
      <img
        src={dbData}
        alt="Profile"
        className="h-full w-full rounded-full object-cover object-center cursor-pointer"
        onClick={handleClickOpen}
      />
      <i
        className="fa-solid fa-pen-to-square absolute bottom-2 right-2 text-2xl text-white bg-blue-600 rounded-full p-2 shadow-md cursor-pointer hover:bg-blue-700 transition-all"
        onClick={handleEditOpen}
      ></i>

      <React.Fragment>
        <BootstrapDialog onClose={handleEditClose} open={editOpen}>
          <div className="flex flex-col items-center justify-center p-4">
            <input
              type="text"
              name="photo"
              id="photo"
              value={editData}
              onChange={handleInputChange}
              placeholder="Enter image link..."
              className="mb-4 w-full rounded-md border-2 border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={() => {
                handleSave(field);
                setEditOpen(false);
              }}
            >
              Upload
            </Button>
          </div>
        </BootstrapDialog>
      </React.Fragment>
    </div>
  );
}
