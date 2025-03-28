import React, { useContext, useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import RoleForm from "../components/RoleForm";
import { RoleContext } from "../../../shared/contexts/RoleContext/RoleContext";


const EditarRolPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtenemos el ID del rol de la URL
  const { roles, updateRole } = useContext(RoleContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);
  const [rol, setRol] = useState(null);

  // Buscar el rol a editar
  useEffect(() => {
    const foundRol = roles.find(r => r.id === parseInt(id));
    if (foundRol) {
      setRol(foundRol);
    } else {
      // Si no se encuentra el rol, redirigir a la lista de roles
      navigate("/configuracion/roles");
    }
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
    updateRole(rolActualizado); // Actualiza el rol en el contexto
    navigate("/configuracion/roles"); // Redirige de vuelta a la lista de roles
  };

  const handleCancel = () => {
    navigate("/configuracion/roles"); // Redirige de vuelta a la lista de roles
  };

  if (!rol) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-1">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Editar Rol</h1>
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

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1f384c]">
                        Cerrar Sesión
                      </h3>
                      <p className="mt-2 text-[#627b87]">
                        ¿Está seguro de que desea cerrar la sesión actual?
                      </p>
                    </div>

                    <div className="flex justify-center gap-3">
                      <button
                        className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                        onClick={() => setShowLogoutConfirm(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
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
    </div>
  );
};

export default EditarRolPage;