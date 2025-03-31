import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table";
import { RoleContext } from "../../../shared/contexts/RoleContext/RoleContext";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";

const columns = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "fechaCreacion", label: "Fecha de creación" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "Activo" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
];

const RolesPage = () => {
  const navigate = useNavigate();
  const { roles, deleteRole } = useContext(RoleContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

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

  const handleAddRole = () => {
    navigate("/configuracion/roles/registrarRol");
  };

  const handleEditRole = (role) => {
    navigate(`/configuracion/roles/editar/${role.id}`);
  };

  const handleDeleteRole = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteRole = async () => {
    try {
      await deleteRole(itemToDelete);
      setSuccessMessage("Rol eliminado exitosamente");
      setShowSuccessModal(true);
    } catch (error) {
      setSuccessMessage(error.message || "Ocurrió un error al eliminar el rol");
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
          <h1 className="text-2xl font-bold text-[#1f384c]">Roles</h1>
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
        <GenericTable
          data={roles}
          columns={columns}
          onAdd={handleAddRole}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          showActions={{ show: false, edit: true, delete: true, add: true }}
        />
      </div>

      {/* Modal de confirmación para cerrar sesión */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmText="Cerrar Sesión"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      {/* Modal de confirmación para eliminar rol */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteRole}
        title="Eliminar Rol"
        message="¿Está seguro que desea eliminar este rol? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      {/* Modal de éxito/error */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={() => setShowSuccessModal(false)}
        title={successMessage.includes("éxito") ? "Operación Exitosa" : "Error"}
        message={successMessage}
        confirmText="Aceptar"
        confirmColor={successMessage.includes("éxito") ? "bg-green-500 hover:bg-green-600" : "bg-[#f44144] hover:bg-red-600"}
        showButtonCancel={false}
      />
    </div>
  );
};

export default RolesPage;