import React, { useState, useEffect } from "react";
import Modal from "../../../shared/components/Modal";

const EditTopicModal = ({ isOpen, onClose, onSubmit, topic }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (topic) {
      setNombre(topic.nombre);
      setDescripcion(topic.descripcion || "");
      setEstado(topic.estado);
      setHasChanges(false);
    }
  }, [topic]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hasChanges) {
      onSubmit({ nombre, descripcion, estado });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="EDITAR TEMA">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-6">Nombre*</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
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
        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`px-4 py-2 text-white rounded-[10px] transition-colors ${
              hasChanges ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTopicModal;