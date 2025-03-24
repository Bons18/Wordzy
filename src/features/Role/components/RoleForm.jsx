import React, { useState } from "react";
import { formatDate} from "../../../shared/utils/dateFormatter";

const RoleForm = ({ onSubmit, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [permisos, setPermisos] = useState({
    Dashboard: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Programas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Fichas: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Instructores: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Aprendices: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
    Tresor: { Visualizar: false, Crear: false, Editar: false, Eliminar: false },
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
    <form onSubmit={handleSubmit}>
        <h2 className="text-[27px] font-bold mb-6">CREAR ROL</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre*</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <div className="flex justify-between min-w-182 mt-10 py-1" style={{ backgroundColor: '#1F384C', color: '#FFFFFFFF' }}>
            <h3 className="text-lg font-semibold mb-3 ml-30 mt-3">Permisos</h3>
            <h3 className="text-lg font-semibold mb-3 mr-56 mt-3">Privilegios</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border border-gray-200">Módulos</th>
                <th className="px-4 py-2 border border-gray-200">Visualizar</th>
                <th className="px-4 py-2 border border-gray-200">Crear</th>
                <th className="px-4 py-2 border border-gray-200">Editar</th>
                <th className="px-4 py-2 border border-gray-200">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(permisos).map((modulo) => (
                <tr key={modulo} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">{modulo}</td>
                  {Object.keys(permisos[modulo]).map((accion) => (
                    <td key={accion} className="px-4 py-2 border border-gray-200 text-center">
                      <input
                        type="checkbox"
                        checked={permisos[modulo][accion]}
                        onChange={() => handlePermisoChange(modulo, accion)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded-[10px] focus:ring-blue-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-[10px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Crear Rol
        </button>
      </div>
    </form>
  );
};

export default RoleForm;