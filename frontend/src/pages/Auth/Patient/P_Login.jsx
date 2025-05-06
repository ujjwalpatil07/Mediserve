import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function P_Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    console.log(" Login form submitted");

    e.preventDefault();
    await axios
      .post("http://localhost:4001/user/login", formData)
      .then((res) => {
        console.log("Responce Data : ", res.data);
        if (res.data) {
          localStorage.setItem("User", JSON.stringify(res.data.user));
          toast.success("Login Successfully");
          navigate("/p/home");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error("Invalid email or password");
      });

    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex min-h-screen w-full md:w-3/4 lg:w-1/2 items-center justify-center ">
      <div className="rounded-xl border  border-gray-300 shadow-xl px-10 py-12 w-full max-w-md">
        <form
          action="#"
          className="flex flex-col items-center justify-center w-full"
          onSubmit={(e) => {
            handleFormSumbit(e);
          }}
        >
          <h1 className="mb-10 text-4xl w-[98%]">Log in(Patient)</h1>
          <div className="input-section w-full flex flex-col items-center justify-center gap-4">
            <TextField
              id="email"
              label="Email"
              value={formData.email}
              // onChange={(e) => {
              //     setFormData({...formData, username : e.target.value})
              // }}
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
              // onChange={(e) => {
              //     handleInputChange(e)
              //     // setFormData({...formData, password : e.target.value})
              // }}
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
            Forget password
          </Link>

          <div className="mt-4 flex justify-center w-[98%]">
            <Button
              variant="outlined"
              color="primary"
              className="login-btn w-80"
              type="submit"
            >
              Login
            </Button>
          </div>

          <div className="mt-3 flex justify-around">
            <p className="mr-2 font-bold">Don't have a account ?</p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}




