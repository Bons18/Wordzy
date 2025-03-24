import React, { useState } from "react";
import Modal from "../../../shared/components/Modal"; // Importa el modal genérico

/**
 * Componente Modal para registrar un tema
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está abierto
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario
 * @returns {JSX.Element} Componente TopicModal
 */
const TopicModal = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre });
    onClose(); // Cierra el modal después de enviar el formulario
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} // Pasa la función de submit al modal
      title="AÑADIR TEMA"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-6">Nombre*</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

export default TopicModal;