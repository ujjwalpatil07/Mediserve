import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

import ProfilePhoto from "./ProfileComponents/ProfilePhoto";
import UserInfo from "./ProfileComponents/UserInfo";
import BasicInfo from "./ProfileComponents/ProfileInfo/BasicInfo";
import UserFieldInfo from "./ProfileComponents/ProfileInfo/UserFieldInfo";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Edit() {
  const fields = ["fullName", "bio", "gender", "address", "phone", "photo", "bloodGroup"];
  const profile_id = JSON.parse(localStorage.getItem("User"))._id;

  const [edit, setEdit] = useState({
    fullName: false,
    bio: false,
    gender: false,
    address: false,
    phone: false,
    photo: false,
    bloodGroup: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [editData, setEditData] = useState({
    _id: profile_id,
    fullName: "",
    bio: "",
    address: "",
    gender: "",
    phone: "",
    photo: "",
    bloodGroup: "",
  });

  const [dbData, setDbData] = useState({});
  const [open, setOpen] = useState(false);

  const handleUserProfileData = async () => {
    try {
      const response = await axios.post("http://localhost:4001/profile", { profile_id });
      if (response?.data?.success) {
        setDbData(response.data.UserData);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (profile_id) handleUserProfileData();
  }, [profile_id]);

  useEffect(() => {
    if (dbData) {
      setEditData({
        fullName: dbData.fullName,
        bio: dbData.bio,
        address: dbData.address,
        gender: dbData.gender,
        phone: dbData.phone,
        photo: dbData.photo,
        bloodGroup: dbData.bloodGroup,
      });
    }
  }, [dbData]);

  const handleToggle = (field) => {
    setEdit((prevEdit) => {
      const resetFields = Object.keys(prevEdit).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      return {
        ...resetFields,
        [field]: !prevEdit[field],
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!isFinite(value) || value.length > 10) {
        toast.error("Enter a valid 10-digit phone number");
        return;
      }
    }
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (field) => {
    try {
      if (field === "phone" && (!editData.phone || editData.phone.length < 5)) {
        toast.error("Phone number must be at least 5 digits!");
        return;
      }
      setIsLoading(true);
      const response = await axios.put("http://localhost:4001/profile/edit", {
        editData,
        userId: profile_id,
      });
      if (response?.data?.success) {
        setDbData(response.data.newUser);
        setEdit((prev) => ({ ...prev, [field]: false }));
        toast.success(`${field} updated successfully!`);
      } else {
        console.error("Update failed");
      }
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-cyan-100 to-blue-200 py-10 px-4">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <div className="mb-6 flex flex-col items-center md:mb-0 md:mr-10">
            <ProfilePhoto
              handleClickOpen={handleClickOpen}
              open={open}
              editData={editData.photo}
              dbData={dbData.photo}
              field={fields[5]}
              handleInputChange={handleInputChange}
              handleSave={handleSave}
              handleClose={handleClose}
            />

            <React.Fragment>
              <BootstrapDialog onClose={handleClose} open={open}>
                <div className="h-96 w-96 overflow-hidden rounded-full">
                  <img
                    src={dbData.photo}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </BootstrapDialog>
            </React.Fragment>
          </div>

          <UserInfo
            edit={edit.bio}
            editData={editData.bio}
            dbData={dbData.bio}
            field={fields[1]}
            handleInputChange={handleInputChange}
            handleToggle={handleToggle}
            handleSave={handleSave}
          />
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300"></div>

        {/* Basic Info Section */}
        <div className="flex flex-col items-center gap-5">
          <BasicInfo />

          <div className="w-full rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-inner">
            {/* Editable Fields */}
            {fields
              .filter((field) => field !== "bio" && field !== "photo")
              .map((fieldName, index) => (
                <UserFieldInfo
                  key={index}
                  edit={edit[fieldName]}
                  editData={editData[fieldName]}
                  dbData={dbData[fieldName]}
                  field={fieldName}
                  handleInputChange={handleInputChange}
                  handleToggle={handleToggle}
                  handleSave={handleSave}
                />
              ))}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 animate-pulse text-lg font-bold text-cyan-700">
          Saving changes...
        </div>
      )}
    </div>
  );
}
