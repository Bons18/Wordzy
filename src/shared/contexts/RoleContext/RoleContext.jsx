import React, { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    { id: 1, nombre: "Administrador", descripcion: "Administrador del sistema", fechaCreacion: "01-03-2025", estado: "Activo" },
    { id: 2, nombre: "Instructor", descripcion: "Usuario con acceso parcial", fechaCreacion: "01-03-2025", estado: "Inactivo" },
    { id: 3, nombre: "Aprendiz", descripcion: "Usuario con acceso limitado", fechaCreacion: "01-03-2025", estado: "Activo" },
  ]);

  const addRole = (nuevoRol) => {
    setRoles([...roles, { ...nuevoRol, id: roles.length + 1 }]);
  };

  return (
    <RoleContext.Provider value={{ roles, addRole }}>
      {children}
    </RoleContext.Provider>
  );
};