import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function D_Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/doctor/login", formData);
      console.log("Response Data:", response.data);
      if (response.data) {
        localStorage.setItem("Doctor", JSON.stringify(response.data.doctor));
        toast.success("Login Successful");
        navigate("/d/appointments");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error:", error.response?.data.message);
      toast.error("Invalid email or password");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full md:w-[60%] lg:w-1/2 items-center justify-center border">
      <div className="rounded-xl border  border-gray-300 shadow-xl px-10 py-12 w-full max-w-md">
        <form
          action="#"
          className="flex flex-col items-center justify-center w-full"
          onSubmit={handleFormSubmit}
        >
          <h1 className="mb-10 text-4xl w-[98%]">Log in (Doctor)</h1>
          <div className="input-section w-full flex flex-col items-center justify-center gap-4">
            <TextField
              id="email"
              label="Email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your email"
              className="w-[98%]"
              required
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              value={formData.password}
              name="password"
              onChange={handleInputChange}
              variant="outlined"
              placeholder="Enter your password"
              className="w-[98%]"
              required
            />
          </div>

          <Link
            to="/forget"
            className="mt-1 md:pr-50 text-blue-500 hover:underline w-[98%]"
          >
            Forgot password?
          </Link>

          <div className="mt-4 flex justify-center w-[98%]">
            <Button
              variant="contained"
              color="primary"
              className="w-72 sm:w-80"
              type="submit"
            >
              Login
            </Button>
          </div>

          <div className="mt-3 flex justify-around">
            <p className="mr-2 font-semibold text-sm">Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline text-sm">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
