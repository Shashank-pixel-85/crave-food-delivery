import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

// Demo-only authentication. Replace this with a trusted backend/provider for production.
export function AdminAuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    () => localStorage.getItem("crave-admin-session") === "active"
  );

  function login(email, password) {
    // These demo credentials are for local assignment testing only.
    if (email.trim().toLowerCase() === "shashank@crave.com" && password === "CraveAdmin123!") {
      localStorage.setItem("crave-admin-session", "active");
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("crave-admin-session");
    setIsAdminLoggedIn(false);
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
