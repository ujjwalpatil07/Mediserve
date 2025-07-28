import React from "react";
import Routers from "../routes/Routers.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useDoctorAuth, useUserAuth } from "../context/AuthProvider.jsx";
import { useSetTheme } from "../context/ThemeProvider.jsx";

export default function Layout() {
  const [authUser] = useUserAuth();
  const [authDoctor] = useDoctorAuth();
  const [currTheme] = useSetTheme();
  // console.log(currTheme)

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Header */}
      <header className="sticky top-0 left-0 z-50 w-screen border shadow-md">
        <Header />
      </header>

      {/* Main Content */}
      <main className={`flex flex-1 flex-col  ${currTheme === "light" ? "bg-gray-100" : "bg-gray-800"} `}>
        {/* 👆 Added pt-20 (padding-top: 5rem) to push content below header */}
        <Routers />
      </main>

      {/* Footer */}
      <footer className="bg-gray-500">
        <Footer />
      </footer>
    </div>
  );
}
