// import { createContext, useState } from 'react';

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("AuthProvider: Inicializando...")

    // Verificar si hay un usuario guardado en localStorage
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        console.log("AuthProvider: Usuario encontrado en localStorage:", userData)
        setUser(userData)
      } catch (error) {
        console.error("AuthProvider: Error parsing user data:", error)
        localStorage.removeItem("user")
      }
    } else {
      console.log("AuthProvider: No hay usuario en localStorage")
    }

    setIsLoading(false)
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
  }

  console.log("AuthProvider: Estado actual:", { user: !!user, isLoading })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
