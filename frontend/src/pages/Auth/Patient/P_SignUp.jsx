import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"

export default function P_SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, //creates a shallow copy of the previous state object.
      [name]: value, // dynamically sets the property with the name stored in the name variable to the value stored in the value variable.
    }));
  };

  let handleFormSumbit = async (e) => {
    e.preventDefault();
    console.log(" Signup form submitted");
    // console.log("FormData : ",formData);

    await axios.post("http://localhost:4001/user/signup", formData)
      .then((res) => {
        console.log("Responce Data : ", res.data);
        if (res.data) {
          toast.success("Signup Successfully");
          navigate("/login")
        }
      }).catch((error) => {
        console.log(error.response.data.message);
        toast.error("User already exists");
      })

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex min-h-screen w-full md:w-[60%] lg:w-1/2 items-center justify-center border">
      <div className="rounded-xl border  border-gray-300 shadow-xl px-10 py-12 w-full max-w-md">        <form
        action="/user/signup"
        method="post"
        className="flex flex-col items-center justify-center w-full"
        onSubmit={(e) => {
          handleFormSumbit(e);
        }}
      >
        <h1 className="mb-10 text-4xl w-[98%]">Sign up(Patient)</h1>
        <div className="input-section w-full flex flex-col items-center justify-center gap-4">
          <TextField
            type="text"
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter your username"
            className="w-[98%]"
            required
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            name="email"
            value={formData.email}
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
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
            placeholder="Enter your password"
            className="w-[98%]"
            required
          />
        </div>

        <div className="mt-4 flex justify-center w-full">
          <Button
            variant="outlined"
            color="primary"
            className="login-btn w-[98%]"
            type="submit"
          >
            Sign up
          </Button>
        </div>

        <div className="mt-3 flex justify-around">
          <p className="mr-2 font-bold">Already have a account ?</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}
