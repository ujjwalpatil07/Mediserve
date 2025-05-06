import React, { createContext, useContext, useState } from "react";

export const SetThemeContext = createContext();

export default function ThemeProvider({ children }) {

  const theme = localStorage.getItem("Theme")

  const [currTheme, setCurrTheme] = useState(theme ? theme : undefined)

  return (
    <SetThemeContext.Provider value={[currTheme, setCurrTheme]}>
      {children}
    </SetThemeContext.Provider>
  )
}

export const useSetTheme = () => useContext(SetThemeContext);
