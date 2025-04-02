import React, { createContext, useState } from "react";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      nombre: "Administrador",
      descripcion: "Administrador del sistema",
      fechaCreacion: "01-03-2025",
      estado: "Activo",
      permisos: {
        Aprendices: { Visualizar: true, Crear: true, Editar: true, Eliminar: true },
        CursosProgramados: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Dashboard: { Visualizar: true, Crear: false, Editar: false, Eliminar: false },
        EscalaDeValoracion: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Evaluaciones: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Fichas: { Visualizar: false, Crear: false, Editar: true, Eliminar: true },
        Imagenes: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Instructores: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        MaterialDeApoyo: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        ProgramacionDeCursos: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Programas: { Visualizar: false, Crear: true, Editar: false, Eliminar: false },
        Ranking: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Retroalimentacion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Roles: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Temas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Usuarios: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
      },
    },
    {
      id: 2,
      nombre: "Instructor",
      descripcion: "Usuario con acceso parcial",
      fechaCreacion: "01-03-2025",
      estado: "Inactivo",
      permisos: {
        Aprendices: { Visualizar: true, Crear: true, Editar: true, Eliminar: false },
        CursosProgramados: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Dashboard: { Visualizar: true, Crear: false, Editar: false, Eliminar: false },
        EscalaDeValoracion: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Evaluaciones: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Fichas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Imagenes: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Instructores: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        MaterialDeApoyo: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        ProgramacionDeCursos: { Visualizar: true, Crear: false, Editar: true, Eliminar: false },
        Programas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Ranking: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Retroalimentacion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Roles: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Temas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Usuarios: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
      },
    },
    {
      id: 3,
      nombre: "Aprendiz",
      descripcion: "Usuario con acceso limitado",
      fechaCreacion: "01-03-2025",
      estado: "Activo",
      permisos: {
        Aprendices: { Visualizar: true, Crear: false, Editar: false, Eliminar: false },
        CursosProgramados: { Visualizar: true, Crear: false, Editar: false, Eliminar: false },
        Dashboard: { Visualizar: true, Crear: false, Editar: false, Eliminar: false },
        EscalaDeValoracion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Evaluaciones: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Fichas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Imagenes: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Instructores: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        MaterialDeApoyo: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        ProgramacionDeCursos: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Programas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Ranking: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Retroalimentacion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Roles: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Temas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
        Usuarios: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
      },
    },
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