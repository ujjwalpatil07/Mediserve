import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  Settings,
  Calendar,
  User,
  UserCheck,
  Sun,
  Moon,
  Pencil,
} from "lucide-react";
import { useSetTheme } from "../../context/ThemeProvider";

export default function RightSideDrawer({ handleLogOut }) {
  const user = JSON.parse(localStorage.getItem("User"));
  const doctor = JSON.parse(localStorage.getItem("Doctor"))
  const ProfileTag = user?.username?.charAt(0).toUpperCase() || doctor?.email.charAt(0).toUpperCase();

  // State to manage the drawer's open/close status
  const [open, setOpen] = React.useState(false);
  const [currTheme, setCurrTheme] = useSetTheme();

  // Function to toggle the drawer open/close
  const toggleDrawer = (open) => async (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);


  };

  const handleThemeChange = () => {
    if(currTheme === "light") {
      localStorage.setItem("Theme", "dark")
    }else if(currTheme === "dark") {
      localStorage.setItem("Theme", "light")
    }else{
      localStorage.setItem("Theme", "dark")
    }
    setCurrTheme(currTheme === "light" ? "dark" : "light")
  }


  // Drawer content list
  const patientDrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className={`draw-menu flex justify-between min-h-screen h-full w-full flex-col ${currTheme === "light" ? "bg-white text-gray-800" : "bg-gray-900  text-white"}   `}>
        {/* Header */}
        <div>
          <div className="flex items-center justify-between px-4 py-6">
            <div className="flex items-center gap-3">
              <img
                src={`${user?.photo}`}
                alt="User"
                className="size-14 rounded-full border-2 border-amber-700 shadow-md object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{user?.username}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back!</p>
              </div>
            </div>
            <Link
              to="/profile"
              onClick={toggleDrawer(false)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title="Edit Profile"
            >
              <Pencil size={18} />
            </Link>
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Menu Items */}
          <ul
            className="flex flex-col gap-4 px-6 py-4 text-base font-medium"
            onClick={() => { toggleDrawer(false) }}
            onKeyDown={() => { toggleDrawer(false) }}
          >
            <Link  to="/p/appointments" className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition">
              <User size={20} />
              Profile
            </Link>
            <Link  to="/p/appointments" className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition">
              <Calendar size={20} />
              My Appointments
            </Link>
            <Link  to="/p/appointments" className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition">
              <UserCheck size={20} />
              My Doctors
            </Link>
            <Link  to="/p/appointments" className="flex items-center gap-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition">
              <Settings size={20} />
              Settings
            </Link>
          </ul>
          <hr className="border-gray-300 dark:border-gray-700" />
        </div>

      
        {/* Footer */}
        <div className="  mb-2">
          <hr className="border-gray-300 dark:border-gray-700 w-full" />
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 transition"
            >
              <LogOut size={20} />
              Logout
            </button>

            {/* Theme Toggle */}
            <div>
              <i
                className={`fa-regular ${currTheme === "light" ? "fa-moon" : "fa-sun"} cursor-pointer px-2 text-2xl`}
                onClick={handleThemeChange}
              ></i>
            </div>
          </div>
          </div>
      </div>
    </Box>
  );

  const doctorDrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className={`draw-menu flex justify-between min-h-screen h-full w-full flex-col ${currTheme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-white"}   `}>
        <div className="mx-3 my-4 flex items-center justify-between">
          <div className="ms-2 flex h-12 w-12 items-center justify-center rounded-full border border-amber-950 bg-amber-600">
            <p className="font-serif text-4xl font-bold opacity-80">
              {ProfileTag}
            </p>
          </div>
          <h3 className="font-serif text-3xl font-semibold">hii</h3>
          <Link
            to="/d/profile"
            className="cursor-pointer"
            onClick={toggleDrawer(false)}
          >
            Edit
          </Link>
        </div>
        <hr></hr>
        <div className="my-5 w-full">
          <ul
            className="flex flex-col items-center space-y-2"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <li>First</li>
            <li>Second </li>
            <li>Third </li>
            <li>Fourth </li>
          </ul>
        </div>
        <hr></hr>
        <div className="mx-3 my-3 flex justify-between">
          <div>
            <button
              className="cursor-pointer rounded-lg border-red-500 p-1 font-semibold text-red-800 transition delay-50 duration-200 ease-out hover:border hover:bg-red-200"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>

          {/* Theme Toggle (Light/Dark Mode) */}
          <div>
            <i
              className={`fa-regular ${currTheme === "light" ? "fa-moon" : "fa-sun"} cursor-pointer px-2 text-2xl`}
              onClick={handleThemeChange}
            ></i>
          </div>
        </div>
        <hr></hr>
      </div>
    </Box>
  );


  return (
    <div>
      {/* Button to open the drawer */}
      <Button onClick={toggleDrawer(true)}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-amber-500">
          <b className="font-serif text-3xl font-extrabold text-gray-800">
            {ProfileTag}
          </b>
        </div>
      </Button>

      {/* Swipeable Drawer component */}
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {user ? patientDrawerList : doctorDrawerList}
      </SwipeableDrawer>
    </div>
  );
}
