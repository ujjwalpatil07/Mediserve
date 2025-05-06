import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useUserAuth, useDoctorAuth } from "../../context/AuthProvider";
import ProfileDrawer from "../Drawer/ProfileDrawer";
import { useSetTheme } from "../../context/ThemeProvider";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currTheme, setCurrTheme] = useSetTheme();
  const [authUser, setAuthUser] = useUserAuth();
  const [authDoctor, setAuthDoctor] = useDoctorAuth();

  const handleLogOut = () => {
    setAuthUser({});
    setAuthDoctor({});
    localStorage.removeItem("User");
    localStorage.removeItem("Doctor");
    navigate("/login");
    window.location.reload();
  };

  const handleThemeChange = () => {
    if (currTheme === "light") {
      localStorage.setItem("Theme", "dark")
    } else if (currTheme === "dark") {
      localStorage.setItem("Theme", "light")
    } else {
      localStorage.setItem("Theme", "dark")
    }
    setCurrTheme(currTheme === "light" ? "dark" : "light")
  }

  const navItemsPatient = [
    { label: "Home", path: "/p/home", icon: "fa-house" },
    { label: "Doctors", path: "/p/doctors", icon: "fa-user-doctor" },
    { label: "Services", path: "/p/services", icon: "fa-stethoscope" },
    { label: "About us", path: "/about", icon: "fa-circle-info" },
    { label: "Contact us", path: "/contact", icon: "fa-envelope" },
  ];

  const navItemsDoctor = [
    { label: "Appointments", path: "/d/appointments", icon: "fa-calendar-check" },
    { label: "My Patients", path: "/d/patients", icon: "fa-users" },
    { label: "Reports", path: "/d/reports", icon: "fa-file-medical" },
    { label: "Notifications", path: "/d/notifications", icon: "fa-bell" },
    { label: "About me", path: "/d/about", icon: "fa-user" },
    { label: "Contact me", path: "/d/contact", icon: "fa-envelope" },
  ];

  const navItemsCommon = [
    { label: "Explore Us", path: "/explore", icon: "fa-compass" },
    { label: "About Us", path: "/about", icon: "fa-circle-info" },
    { label: "Contact Us", path: "/contact", icon: "fa-envelope" },
  ];


  return (
    <header className={`fixed left-0 top-0 z-50 flex w-screen items-center justify-between px-4 py-3 shadow-md md:px-8
    ${currTheme === "light"
        ? "bg-white text-gray-800 shadow-md border-b"
        : "bg-[#1e293b] text-white shadow-lg border-b border-slate-600"} 
    `
    }>
      {/* Left side: Drawer Menu & App Name */}
      <div className="flex items-center gap-4">
        {/* Big Menu Icon */}
        <Button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="!text-4xl !min-w-0 !p-0 text-gray-700 md:!hidden"
        >
          ☰
        </Button>


        {/* App Name - Always visible */}
        <Link
          to="/explore"
          className={`flex items-center text-xl font-bold  md:text-2xl ${currTheme === "light" ? "text-lime-900" : "text-amber-400"}`}
        >
          <i className={`fa-solid fa-stethoscope  `}></i>
          <span className="ml-2">Mediserve</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden space-x-6 md:flex">
        {authUser ? (navItemsPatient.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="rounded-md px-3 py-1 text-base font-medium hover:bg-blue-200 hover:text-blue-800 transition"
          >
            {label}
          </Link>
        ))) : authDoctor ? (navItemsDoctor.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="rounded-md px-3 py-1 text-base font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-800 transition"
          >
            {label}
          </Link>
        ))) : navItemsCommon.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className="rounded-md px-3 py-1 text-base font-medium text-gray-700 hover:bg-blue-200 hover:text-blue-800 transition"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Right Side: Login/Profile (always visible) */}
      <div className="flex items-center space-x-4">
        {/* Desktop Search */}
        {!authDoctor && !authUser ?
          null :
          <div className="hidden items-center md:flex">
            <input
              type="text"
              placeholder="Search"
              className={`h-9 w-[150px] rounded-full border  px-3 text-sm outline-none focus:ring-2 
                ${currTheme === "light" ? "border-amber-950 focus:ring-amber-400" : "border-amber-300"}`}
            />
            <button className="ml-2 rounded-full bg-amber-500 px-3 py-1 text-white hover:bg-amber-600">
              Search
            </button>
          </div>}

        {/* Auth Buttons */}
        {authUser || authDoctor ? (
          <ProfileDrawer handleLogOut={handleLogOut} />
        ) : (
          <Link
            to="/login"
            className="rounded-full border border-green-700 bg-green-100 px-4 py-1.5 text-green-700 hover:bg-green-200 transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className={`flex min-h-screen w-64 flex-col justify-between ${currTheme === "dark" ? "bg-slate-900" : "bg-blue-100"} p-6`}>

          {/* Top Navigation Items */}
          <nav className="flex flex-col gap-6 w-full">
            <h2 className={`mb-3 text-2xl font-bold ${currTheme === "dark" ? "text-amber-400" : "text-blue-700"}`}>Menu</h2>
            <hr className="border-gray-300 dark:border-gray-700" />

            {(authUser ? navItemsPatient : authDoctor ? navItemsDoctor : navItemsCommon).map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-all duration-200 ease-in-out
          ${currTheme === "light" ? "text-gray-700 hover:bg-blue-200 hover:text-blue-800" : "text-slate-100 hover:bg-slate-700 hover:text-slate-50"}`}
              >
                <i className={`fa-solid ${icon} text-lg`}></i>
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Bottom Theme Switcher */}
          <div className="border-t pt-4">
            <h2 className={`mb-2 text-lg font-semibold ${currTheme === "light" ? "text-blue-700" : "text-amber-300"}`}>Theme</h2>
            <button
              className="flex items-center gap-3 rounded-md bg-white px-4 py-2 shadow hover:bg-gray-100 transition"
              onClick={handleThemeChange}
            >
              {currTheme === "light" ? (
                <>
                  <i className="fa-regular fa-moon text-xl text-gray-700"></i>
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <i className="fa-regular fa-sun text-xl text-yellow-500"></i>
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Drawer>

    </header>
  );
}
