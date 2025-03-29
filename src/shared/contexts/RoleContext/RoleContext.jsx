import React, { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    { id: 1, nombre: "Administrador", descripcion: "Administrador del sistema", fechaCreacion: "01-03-2025", estado: "Activo" },
    { id: 2, nombre: "Instructor", descripcion: "Usuario con acceso parcial", fechaCreacion: "01-03-2025", estado: "Inactivo" },
    { id: 3, nombre: "Aprendiz", descripcion: "Usuario con acceso limitado", fechaCreacion: "01-03-2025", estado: "Activo" },
  ]);

  const addRole = (nuevoRol) => {
    // Genera un nuevo ID basado en el máximo ID existente + 1
    const newId = roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1;
    setRoles([...roles, { ...nuevoRol, id: newId }]);
  };

  const updateRole = (updatedRole) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === updatedRole.id ? updatedRole : role
      )
    );
  };

  const deleteRole = (id) => {
    return new Promise((resolve, reject) => {
      try {
        // Validación básica - no permitir eliminar el rol de Administrador (id: 1)
        if (id === 1) {
          throw new Error("No se puede eliminar el rol de Administrador");
        }

        setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
        resolve();
      } catch (error) {
        console.error("Error al eliminar el rol:", error);
        reject(error);
      }
    });
  };

  return (
    <RoleContext.Provider value={{ roles, addRole, updateRole, deleteRole }}>
      {children}
    </RoleContext.Provider>
  );
};