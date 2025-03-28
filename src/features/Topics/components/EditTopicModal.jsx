import React, { useState, useEffect } from "react";
import Modal from "../../../shared/components/Modal";

/**
 * Componente Modal para editar un tema
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario
 * @param {Object} props.topic - Tema a editar
 * @returns {JSX.Element} Componente EditTopicModal
 */
const EditTopicModal = ({ isOpen, onClose, onSubmit, topic }) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");

  useEffect(() => {
    if (topic) {
      setNombre(topic.nombre);
      setEstado(topic.estado);
    }
  }, [topic]);

  const toggleEstado = () => {
    setEstado(estado === "Activo" ? "Inactivo" : "Activo");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, estado });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="EDITAR TEMA"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-6">Nombre*</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
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
            onClick={onSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-[10px] hover:bg-green-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTopicModal;