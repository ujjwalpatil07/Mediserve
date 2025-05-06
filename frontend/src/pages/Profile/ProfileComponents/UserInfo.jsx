import React from "react";
import Button from "@mui/material/Button";

export default function UserInfo({
  edit,
  editData,
  dbData,
  field,
  handleInputChange,
  handleToggle,
  handleSave
}) {
  return (
    <div className="user ms-7 flex space-x-6">
      <div>
        <h2 className="font-serif text-4xl font-semibold">
          {JSON.parse(localStorage.getItem("User")).username.toUpperCase()}
        </h2>
        <h4 className="ms-3 text-lg">
          <span className="text-emerald-900">Username : </span>{" "}
          {JSON.parse(localStorage.getItem("User")).username}
        </h4>
      </div>
      <div>
        {!edit ? (
          <p className="bio relative h-30 w-100 border p-1">
            {dbData}
            <i
              className="fa-solid fa-pen-to-square absolute right-1 bottom-1 cursor-pointer text-2xl hover:opacity-80"
              onClick={() => {
                handleToggle(field);
              }}
            ></i>
          </p>
        ) : (
          <div className="flex flex-col">
            <textarea
              name="bio"
              id="bio"
              value={editData}
              onChange={handleInputChange}
              rows={5}
              cols={50}
              placeholder="Enter about yourself here..."
              className="p-2 border border-black resize-none mb-2"
            ></textarea>
            <Button
              variant="outlined"
              color={"success"}
              className={`me-4 cursor-pointer text-lg w-[20%] underline ${edit ? "text-blue-500" : "text-red-500"}`}
              onClick={
                () => handleSave(field)
              }
            >
              <span className="font-medium">Save</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
