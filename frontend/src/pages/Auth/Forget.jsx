import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Forget() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center border px-20 py-20">
        <h1 className="mb-8 text-5xl">Forget Password</h1>
        <form
          action="#"
          className="flex flex-col items-center justify-center gap-4"
        >
          <TextField
            id="ver-email"
            label="Verification email"
            // value={formData.username}
            // onChange={(e) => {
            //     setFormData({...formData, username : e.target.value})
            // }}
            name="ver-email"
            // onChange={handleInputChange}
            variant="outlined"
            placeholder="Email for verification"
            className="w-80"
            required
          />

          <Button
            variant="outlined"
            color="primary"
            className="login-btn w-80"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
