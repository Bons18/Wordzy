import React, { useState } from "react";
import Modal from "../../../shared/components/Modal";

const TopicModal = ({ isOpen, onClose, onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return; // Validación adicional
    if (!descripcion.trim()) return;
    
    onSubmit({ nombre, descripcion }); // Envía los datos al padre
    setNombre(""); // Limpia el campo
    setDescripcion("");
    onClose(); // Cierra el modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AÑADIR TEMA">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-6">
            Nombre*
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 mb-8 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-between space-x-4 mt-6">
          <button
            type="button"
            onClick={() => {
              setNombre("");
              setDescripcion("");
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-[10px] hover:bg-green-600 transition-colors"
          >
            Añadir
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TopicModal;