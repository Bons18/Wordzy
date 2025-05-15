import React, { useState, useEffect, useRef } from "react";
import GenericTable from "../../../shared/components/Table";
import TopicModal from "../components/TopicModal";
import EditTopicModal from "../components/EditTopicModal";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useGetTopics } from "../hooks/useGetTopics";
import { usePostTopic } from "../hooks/usePostTopic";
import { usePutTopic } from "../hooks/usePutTopic";
import { useDeleteTopic } from "../hooks/useDeleteTopic";

const columns = [
  { key: "name", label: "Nombre" },
  {
    key: "description",
    label: "Descripción",
    render: (item) => (
      <span className="text-gray-600">
        {item.description || "Sin descripción"}
      </span>
    )
  },
  {
    key: "status",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === true 
          ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
        {item.status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
];

const TopicsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  //HOOKS
  const { topics, loading, error, refetch } = useGetTopics();
  const [topicsList, setTopicsList] = useState([]);
  const { postTopic } = usePostTopic();
  const { putTopic } = usePutTopic()
  const { deleteTopic } = useDeleteTopic()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);

  useEffect(() => {
    if (topics.length > 0) {
      setTopicsList(topics);
    }
  }, [topics]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddTopic = () => {
    setIsModalOpen(true);
  };

  const handleSubmitTopic = async (newTopic) => {
  try {
    await postTopic(newTopic);
    setIsModalOpen(false);

    await refetch(); // Refresca la lista de temas

    setSuccessMessage("Tema agregado exitosamente");
    setShowSuccessModal(true);
  } catch (error) {
    console.error("Error al agregar el tema:", error);
    setSuccessMessage(error.message || "Ocurrió un error al agregar el tema");
    setShowSuccessModal(true);
  }
};

  const handleEditTopic = (topic) => {
    setCurrentTopic(topic);
    setIsEditModalOpen(true);
  };

  // Modifica handleUpdateTopic
  const handleUpdateTopic = (updatedTopic) => {
    setPendingChanges(updatedTopic);
    setShowSaveConfirm(true);
  };

  // Agrega esta función para confirmar los cambios
  const confirmSaveChanges = () => {
    try {
      if (!currentTopic) {
        throw new Error("No hay tema seleccionado para editar");
      }

      setTopicsList(topicsList.map(topic =>
        topic.id === currentTopic.id ? { ...topic, ...pendingChanges } : topic
      ));
      setIsEditModalOpen(false);

      setSuccessMessage("Tema actualizado exitosamente");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al actualizar el tema:", error);
      setSuccessMessage(error.message || "Ocurrió un error al actualizar el tema");
      setShowSuccessModal(true);
    } finally {
      setShowSaveConfirm(false);
      setPendingChanges(null);
    }
  };

  const handleDeleteTopic = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteTopic = () => {
    try {
      // Eliminar de la lista local
      const updatedTopics = topicsList.filter(t => t.id !== itemToDelete);
      setTopicsList(updatedTopics);

      // Mostrar mensaje de éxito
      setSuccessMessage("Tema eliminado exitosamente");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al eliminar el tema:", error);
      setSuccessMessage("Ocurrió un error al eliminar el tema");
      setShowSuccessModal(true);
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Temas</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Administrador</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6">
        <div>
          <GenericTable
            data={topicsList}
            columns={columns}
            onAdd={handleAddTopic}
            onEdit={handleEditTopic}
            onDelete={handleDeleteTopic}
          />

          <TopicModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitTopic}
            topic={currentTopic}
            existingTopics={topicsList}
          />

          <EditTopicModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateTopic}
            topic={currentTopic}
            existingTopics={topicsList}
          />

          <ConfirmationModal
            isOpen={showLogoutConfirm}
            onClose={() => setShowLogoutConfirm(false)}
            onConfirm={handleLogout}
            title="Cerrar Sesión"
            message="¿Está seguro de que desea cerrar la sesión actual?"
            confirmText="Cerrar Sesión"
          />

          {/* Modal de confirmación para eliminar tema */}
          <ConfirmationModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDeleteTopic}
            title="Eliminar Tema"
            message="¿Está seguro que desea eliminar este tema? Esta acción no se puede deshacer."
            confirmText="Eliminar"
            confirmColor="bg-[#f44144] hover:bg-red-600"
          />

          <ConfirmationModal
            isOpen={showSaveConfirm}
            onClose={() => {
              setShowSaveConfirm(false);
              setIsEditModalOpen(false);
            }}
            onConfirm={confirmSaveChanges}
            title="Confirmar Cambios"
            message="¿Estás seguro que deseas guardar los cambios del tema?"
            confirmText="Guardar"
            confirmColor="bg-green-500 hover:bg-green-600"
          />

          {/* Modal de éxito */}
          <ConfirmationModal
            isOpen={showSuccessModal}
            onConfirm={() => setShowSuccessModal(false)}
            title="Operación Exitosa"
            message={successMessage}
            confirmText="Aceptar"
            confirmColor="bg-green-500 hover:bg-green-600"
            showButtonCancel={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;