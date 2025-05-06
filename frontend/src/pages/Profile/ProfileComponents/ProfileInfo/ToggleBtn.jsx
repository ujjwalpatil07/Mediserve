import React from "react";
import Button from "@mui/material/Button";

export default function ToggleBtn({edit, field, handleToggle, handleSave}) {
  return (
    <div>
      {/* Edit/Save Button */}
      <Button
        variant="outlined"
        color={edit ? "success" : "primary"}
        className={`me-4 cursor-pointer text-lg underline ${edit ? "text-blue-500" : "text-red-500"}`}
        onClick={
          !edit
            ? () => handleToggle(field)
            : () => handleSave(field)
        }
      >
        <span className="font-medium">{!edit ? "Edit" : "Save"}</span>
      </Button>
    </div>
  );
}
