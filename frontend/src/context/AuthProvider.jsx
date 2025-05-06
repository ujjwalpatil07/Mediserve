import React, { createContext, useContext, useState } from "react";

// Creating contexts for users and doctors
export const UserAuthContext = createContext();
export const DoctorAuthContext = createContext();

export default function AuthProvider({ children }) {
  // Getting the current user from local storage
  const currUser = localStorage.getItem("User");
  const [authUser, setAuthUser] = useState(
    currUser ? JSON.parse(currUser) : undefined
  );

  // Getting the current doctor from local storage
  const currDoctor = localStorage.getItem("Doctor");
  const [authDoctor, setAuthDoctor] = useState(
    currDoctor ? JSON.parse(currDoctor) : undefined
  );

  return (
    // Nesting the providers to make both contexts available to the children
    <UserAuthContext.Provider value={[authUser, setAuthUser]}>
      <DoctorAuthContext.Provider value={[authDoctor, setAuthDoctor]}>
        {children}
      </DoctorAuthContext.Provider>
    </UserAuthContext.Provider>
  );
}

// Creating custom hooks to access user and doctor contexts easily
export const useUserAuth = () => useContext(UserAuthContext);
export const useDoctorAuth = () => useContext(DoctorAuthContext);
