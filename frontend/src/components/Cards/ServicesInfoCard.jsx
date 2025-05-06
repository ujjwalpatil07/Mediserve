import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSetTheme } from "../../context/ThemeProvider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ServicesInfoCard({ service }) {
  const navigate = useNavigate();
  // console.log(service)
  const [currTheme] = useSetTheme();

  const visitService = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/services/${service._id}`);
      navigate(`/p/services/${service._id}`, { state: { serviceData: response.data } });
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`flex flex-col items-center rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300
    ${currTheme === "light" ? "bg-blue-50 border-amber-950" : "bg-slate-800 text-slate-200"}`}>
      <div className="s-name w-full p-4 text-center">
        <h1
          className={`cursor-pointer text-2xl  hover:underline
            ${currTheme === "light" ? "text-blue-600 font-bold" : "text-amber-400 font-semibold"}`}
          onClick={visitService}
        >
          {service.name}
        </h1>
      </div>
      <div className="s-image w-full h-[200px] flex justify-center items-center overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-[95%] h-full object-cover rounded-xl cursor-pointer"
          onClick={visitService}
        />
      </div>
      <div className="s-description p-4">
        <p>
          {service.desc}
          <a onClick={handleClickOpen} className="cursor-pointer text-blue-500">
            Read More...
          </a>
        </p>
      </div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "800px",
            maxWidth: "90%",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
            padding: "4px",
            rowGap: "7px",
          },
        }}
      >
        <div className="s-name flex justify-center p-4">
          <h1
            className="cursor-pointer text-2xl font-bold"
            onClick={visitService}
          >
            {service.name}
          </h1>
        </div>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <div className="s-image w-full flex justify-center p-4">
          <img
            src={service.image}
            alt={service.name}
            className="w-[60%] h-[60%] object-cover rounded-xl"
            onClick={visitService}
          />
        </div>
        <div className="s-description p-4">
          <p className="font-sans text-xl font-medium">{service.desc}</p>
        </div>
      </BootstrapDialog>
    </div>
  );
}
