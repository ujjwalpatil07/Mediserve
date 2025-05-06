import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import { toast } from "react-toastify"
import { useSetTheme } from "../context/ThemeProvider";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [currTheme] = useSetTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    toast.success("Your reponse is submited Successfully. Thank you for reaching to us!")
    setFormData({
      name : "", 
      email : "", 
      message : ""
    })
  };

  return (
    <div className=" flex justify-center ">
      <div className={`flex my-4 min-h-screen flex-col items-center  ${currTheme === "light" ? "bg-blue-200 border-blue-400" : "bg-slate-800 border-slate-400"} border  rounded-xl p-6`}>
        <h1 className={`mb-4 text-3xl font-bold ${currTheme === " light" ? "text-blue-800" : "text-amber-500"} `}>Contact Us</h1>
        
        <p className={`mb-6 max-w-md text-center ${currTheme === " light" ? "text-gray-700" : "text-slate-300"} `}>
          Have questions or need assistance? Feel free to reach out to us.
        </p>

        <div className="flex w-full max-w-4xl flex-wrap justify-center gap-8">
          {/* Contact Info */}
          <div className={`w-full rounded-lg bg-white ${currTheme === "light" ? "bg-white" : "bg-gradient-to-b from-slate-500 to-slate-600 text-slate-50"} p-6 text-center shadow-lg md:w-1/3`}>
            <Phone className={`mb-2 text-4xl ${currTheme === "light" ? "text-blue-800" : "text-amber-400"} `} />
            <h3 className="text-xl font-semibold">Call Us</h3>
            <p className={`text-gray-700 ${currTheme === "light" ? "text-gray-700" : "text-slate-300"}` }>+1 234 567 890</p>
          </div>
          <div className={`w-full rounded-lg bg-white ${currTheme === "light" ? "bg-white" : "bg-gradient-to-b from-slate-500 to-slate-600 text-slate-50"} p-6 text-center shadow-lg md:w-1/3`}>
            <Email className={`mb-2 text-4xl ${currTheme === "light" ? "text-blue-800" : "text-amber-400"} `} />
            <h3 className="text-xl font-semibold">Email Us</h3>
            <p className={`text-gray-700 ${currTheme === "light" ? "text-gray-700" : "text-slate-300"}` }>contact@mediserve.com</p>
          </div>
          <div className={`w-full rounded-lg bg-white ${currTheme === "light" ? "bg-white" : "bg-gradient-to-b from-slate-500 to-slate-600 text-slate-50"} p-6 text-center shadow-lg md:w-1/3`}>
            <LocationOn className={`mb-2 text-4xl ${currTheme === "light" ? "text-blue-800" : "text-amber-400"} `} />
            <h3 className="text-xl font-semibold">Visit Us</h3>
            <p className={`text-gray-700 ${currTheme === "light" ? "text-gray-700" : "text-slate-300"}` }>007 Ashok Nagar, Nashik, Maharashtra, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className={`mt-8 w-full max-w-lg rounded-lg bg-white ${currTheme === "light" ? "bg-white" : "!bg-slate-600"} p-6 shadow-lg`}>
          <h2 className={`mb-4 text-2xl font-semibold ${currTheme === "light" ? "text-blue-500" : "text-slate-200"}`}>
            Send a Message
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Your Name"
              variant="outlined"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Your Email"
              type="email"
              variant="outlined"
              name="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Your Message"
              variant="outlined"
              name="message"
              multiline
              rows={4}
              fullWidth
              required
              value={formData.message}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
