import React, { useState, useEffect } from "react";
import Modal from "../../../shared/components/Modal";

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const EditTopicModal = ({ isOpen, onClose, onSubmit, topic, existingTopics }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (topic) {
      setName(topic.name);
      setDescription(topic.description || "");
      setStatus(topic.status); // Asegúrate que topic.status es boolean
      setHasChanges(false);
      setError("");
    }
  }, [topic, isOpen]);

  const toggleStatus = () => {
    setStatus(prevStatus => !prevStatus); // Cambia directamente el boolean
    setHasChanges(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setError("");
    }
    if (name === "description") setDescription(value);
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
  
    if (!trimmedName) return;
  
    const normalizedName = normalizeText(trimmedName);
  
    const exists = existingTopics.some(
      (t) =>
        normalizeText(t.name) === normalizedName &&
        t._id !== topic._id
    );
  
    if (exists) {
      setError("El tema ya existe");
      return;
    }
  
    onSubmit({ 
      name: trimmedName, 
      description: trimmedDescription, 
      status 
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
       <h1 className="text-xl font-bold text-[#1f384c]">EDITAR TEMA</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-4">Nombre <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={description}
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
              checked={status}
              onChange={toggleStatus}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {status ? "Activo" : "Inactivo"}
            </span>
          </label>
        </div>
      </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
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