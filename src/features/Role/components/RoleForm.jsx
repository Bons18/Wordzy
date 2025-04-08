import React, { useState, useEffect, useContext } from "react";
import { formatDate } from "../../../shared/utils/dateFormatter";
import { RoleContext } from "../../../shared/contexts/RoleContext/RoleContext";

// Función para normalizar texto (ignora tildes y mayúsculas)
const normalizarTexto = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const RoleForm = ({ onSubmit, onCancel, initialData }) => {
  const { roles: existingRoles } = useContext(RoleContext);
  const [hasChanges, setHasChanges] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion);
      setEstado(initialData.estado || "Activo");
      setPermisos(initialData.permisos);
      setHasChanges(false);
    }
  }, [initialData]);

  const toggleEstado = () => {
    setEstado(estado === "Activo" ? "Inactivo" : "Activo");
    setHasChanges(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") setNombre(value);
    if (name === "descripcion") setDescripcion(value);
    setHasChanges(true);
  };

  const handlePermisoChange = (modulo, accion) => {
    setPermisos({
      ...permisos,
      [modulo]: {
        ...permisos[modulo],
        [accion]: !permisos[modulo][accion],
      },
    });
    setHasChanges(true);
  };

  const validarFormulario = () => {
    const errores = {};
  
    if (!nombre.trim()) {
      errores.nombre = "El nombre del rol es obligatorio.";
    } else {
      const nombreNormalizado = normalizarTexto(nombre);
      const nombresExistentes = existingRoles
        .filter(role => !initialData || role.id !== initialData.id)
        .map(role => normalizarTexto(role.nombre));
  
      if (nombresExistentes.includes(nombreNormalizado)) {
        errores.nombre = "El nombre del rol ya existe.";
      }
    }
  
    const tieneAlMenosUnPermiso = Object.values(permisos).some(modulo =>
      Object.values(modulo).some(valor => valor)
    );
  
    if (!tieneAlMenosUnPermiso) {
      errores.permisos = "Debe seleccionar al menos un permiso.";
    }
  
    setErrors(errores);
    return Object.keys(errores).length === 0;
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const rolActualizado = {
      ...initialData,
      nombre,
      descripcion,
      estado,
      permisos,
      fechaCreacion: formatDate(new Date()),
    };

    console.log("Datos del rol a agregar:", rolActualizado);
    onSubmit(rolActualizado);
  };

  return (
    <form onSubmit={handleSubmit} className="p-1">
      <h2 className="text-xl font-bold text-[#1f384c] mb-4">{initialData ? "EDITAR ROL" : "AÑADIR ROL"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {initialData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={estado === "Activo"}
                  onChange={toggleEstado}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        {errors.permisos && <p className="text-red-500 text-xs mb-2">{errors.permisos}</p>}
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
          className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-[10px] hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!hasChanges}
          className={`px-3 py-1.5 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 ${
            hasChanges 
              ? "bg-green-500 hover:bg-green-600 focus:ring-blue-500" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {initialData ? "Guardar Cambios" : "Añadir Rol"}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
