import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { Tooltip } from "@mui/material";
import { FaUserMd, FaUser } from "react-icons/fa";
import D_Login from "./Doctor/D_Login";
import P_Login from "./Patient/P_Login";

export default function Switcher() {
  const [isDoctor, setIsDoctor] = useState(true);

  const handleChange = () => {
    setIsDoctor((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="flex items-center justify-center min-h-screen max-md:hidden  border lg:w-1/2 md:w-[40%]  gap-4 mb-6">
        <Tooltip title="Patient">
          <FaUser className={`text-2xl ${!isDoctor ? "text-blue-600" : "text-gray-400"}`} />
        </Tooltip>

        <Switch
          checked={isDoctor}
          onChange={handleChange}
          color="primary"
        />

        <Tooltip title="Doctor">
          <FaUserMd className={`text-2xl ${isDoctor ? "text-blue-600" : "text-gray-400"}`} />
        </Tooltip>
      </div>

      {isDoctor ? <D_Login /> : <P_Login />}
    </div>
  );
}
