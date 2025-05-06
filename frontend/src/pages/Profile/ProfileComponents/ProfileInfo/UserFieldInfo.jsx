import React from "react";
import Button from "@mui/material/Button";
import ToggleBtn from "./ToggleBtn";

export default function UserInfo({
  edit,
  editData,
  dbData,
  field,
  handleInputChange,
  handleToggle,
  handleSave,
}) {
  return (
    <div className="m-3 flex items-center justify-between border border-pink-700 p-3">
      <div>
        <h4 className="flex font-semibold">
          {field
            .replace(/([A-Z])/g, " $1")
            .trim()
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")}{" "}
          :
          {edit ? (
            field === "gender" ? (
              <div className="ms-2">
                <label className="me-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={editData === "Male"}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={editData === "Female"}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={editData === "Other"}
                    onChange={handleInputChange}
                  />
                  Other
                </label>
              </div>
            ) : field === "bloodGroup" ? (
              <select
                name="bloodGroup"
                value={editData}
                onChange={handleInputChange}
                className="ms-2 border border-red-500 p-0.5"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={editData}
                className="ms-2 border border-red-500 p-0.5"
                placeholder={`Enter your ${field}`}
                onChange={handleInputChange}
              />
            )
          ) : (
            <p className="ms-2">{dbData}</p>
          )}
        </h4>
      </div>

      <ToggleBtn
        handleSave={handleSave}
        handleToggle={handleToggle}
        edit={edit}
        field={field}
      />
    </div>
  );
}
