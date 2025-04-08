import React, { useContext, useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../components/RoleForm";
import { RoleContext } from "../../../shared/contexts/RoleContext/RoleContext";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";

const EditRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { roles, updateRole } = useContext(RoleContext);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  // Buscar el rol a editar
  useEffect(() => {
    const foundRol = roles.find(r => r.id === parseInt(id));
    if (foundRol) {
      setRol(foundRol);
    } else {
      navigate("/configuracion/roles");
    }
    setLoading(false);
  }, [id, roles, navigate]);

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

  const handleFormSubmit = (rolActualizado) => {
    setPendingChanges(rolActualizado);
    setShowSaveConfirm(true);
  };

  const confirmSaveChanges = async () => {
    try {
      await updateRole(pendingChanges);
      setSuccessMessage("Rol actualizado exitosamente");
      setShowSuccessModal(true);
      setShowSaveConfirm(false);
    } catch (error) {
      setSuccessMessage("Error al actualizar el rol: " + error.message);
      setShowSuccessModal(true);
      setShowSaveConfirm(false);
    }
  };

  const handleCancel = () => {
    navigate("/configuracion/roles");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!rol) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Rol no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-1">
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
        <div className="min-h-screen">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-10xl mx-auto">
            <RoleForm 
              onSubmit={handleFormSubmit} 
              onCancel={handleCancel} 
              initialData={rol} 
            />
          </div>
        </div>
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

      {/* Modal de confirmación para guardar cambios */}
      <ConfirmationModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={confirmSaveChanges}
        title="Confirmar Cambios"
        message="¿Estás seguro que deseas guardar los cambios del rol?"
        confirmText="Guardar"
        confirmColor="bg-green-600 hover:bg-green-700"
      />

      {/* Modal de éxito/error */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={() => {
          setShowSuccessModal(false);
          navigate("/configuracion/roles");
        }}
        title={successMessage.includes("exitosamente") ? "Operación Exitosa" : "Error"}
        message={successMessage}
        confirmText="Aceptar"
        confirmColor={successMessage.includes("exitosamente") ? "bg-green-500 hover:bg-green-600" : "bg-[#f44144] hover:bg-red-600"}
        showButtonCancel={false}
      />
    </div>
  );
};

export default EditRolePage;