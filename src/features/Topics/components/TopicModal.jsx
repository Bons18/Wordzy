import React, { useState, useEffect } from "react";
import Modal from "../../../shared/components/Modal";

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const TopicModal = ({ isOpen, onClose, onSubmit, existingTopics = [] }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
    if (error) setError(""); // Limpiar error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNombre = nombre.trim();

    if (!trimmedNombre) return;

    const normalizedNombre = normalizeText(trimmedNombre);

    const exists = existingTopics.some(
      (t) => normalizeText(t.nombre) === normalizedNombre
    );

    if (exists) {
      setError("El tema ya existe");
      return;
    }

    onSubmit({ nombre: trimmedNombre, descripcion: descripcion.trim() });
    setNombre("");
    setDescripcion("");
    setHasChanges(false);
    onClose();
  };

  const handleCancel = () => {
    setNombre("");
    setDescripcion("");
    setHasChanges(false);
    setError(""); // Limpiar error al cerrar
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      // Resetear estado al cerrar
      setNombre("");
      setDescripcion("");
      setHasChanges(false);
      setError("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="AÑADIR TEMA">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-6">
            Nombre*
          </label>
          <input
            type="text"
            value={nombre}
            onChange={handleInputChange(setNombre)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={handleInputChange(setDescripcion)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-between space-x-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
              hasChanges
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Añadir Tema
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TopicModal;
