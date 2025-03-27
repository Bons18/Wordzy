import React, { useState } from "react";
import { formatDate } from "../../../shared/utils/dateFormatter";

const RoleForm = ({ onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [permisos, setPermisos] = useState({
    Dashboard: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Programas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Fichas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Instructores: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Aprendices: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Temas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    MaterialDeApoyo: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Evaluaciones: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    ProgramacionDeCursos: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    EscalaDeValoracion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Imagenes: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    CursosProgramados: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Ranking: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Retroalimentacion: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Usuarios: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Roles: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
  });

  const handlePermisoChange = (modulo, accion) => {
    setPermisos({
      ...permisos,
      [modulo]: {
        ...permisos[modulo],
        [accion]: !permisos[modulo][accion],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRol = {
      nombre,
      descripcion,
      permisos,
      fechaCreacion: formatDate(new Date()),
      estado: "Activo",
    };
    onSubmit(nuevoRol);
  };

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <h2 className="text-xl font-bold mb-4">CREAR ROL</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="overflow-x-auto text-sm">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#1F384C] text-white">
                <th colSpan="1" className="px-2 py-2 font-medium text-center">Permisos</th>
                <th colSpan="4" className="px-2 py-2 font-medium text-center">Privilegios</th>
              </tr>
              <tr>
                <th className="px-2 py-1 border border-gray-200">Módulos</th>
                <th className="px-2 py-1 border border-gray-200">Ver</th>
                <th className="px-2 py-1 border border-gray-200">Crear</th>
                <th className="px-2 py-1 border border-gray-200">Editar</th>
                <th className="px-2 py-1 border border-gray-200">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permisos).map((modulo) => (
                <tr key={modulo} className="hover:bg-gray-50 even:bg-gray-50">
                  <td className="px-2 py-1 border border-gray-200 font-medium text-gray-700 whitespace-nowrap">
                    {modulo
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/([a-z])([0-9])/g, '$1 $2')
                      .trim()}
                  </td>
                  {Object.keys(permisos[modulo]).map((accion) => (
                    <td key={accion} className="px-2 py-1 border border-gray-200 text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permisos[modulo][accion]}
                          onChange={() => handlePermisoChange(modulo, accion)}
                          className="hidden"
                        />
                        <span className={`relative w-4 h-4 border-2 rounded-[5px] flex items-center justify-center transition-all ${permisos[modulo][accion]
                            ? 'border-[#1F384C] bg-[#1F384C]'
                            : 'border-gray-400 hover:border-gray-500'
                          }`}>
                          {permisos[modulo][accion] && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Crear Rol
        </button>
      </div>
    </form>
  );
};

export default RoleForm;