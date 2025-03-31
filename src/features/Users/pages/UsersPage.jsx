import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/hooks/useAuth"
import GenericTable from "../../../shared/components/Table"

// Datos de ejemplo
const users = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", estado: "Activo", rol: "Admin" },
  { id: 2, nombre: "María Gómez", correo: "maria@example.com", estado: "Inactivo", rol: "Usuario" },
  { id: 3, nombre: "Carlos López", correo: "carlos@example.com", estado: "Activo", rol: "Moderador" },
  { id: 4, nombre: "Ana Ramírez", correo: "ana@example.com", estado: "Activo", rol: "Usuario" },
  { id: 5, nombre: "Pedro Martínez", correo: "pedro@example.com", estado: "Inactivo", rol: "Admin" },
  { id: 6, nombre: "Albert Einstein", correo: "albert@example.com", estado: "Activo", rol: "Instructor" },
  { id: 7, nombre: "Isaac Newton", correo: "isaac@example.com", estado: "Activo", rol: "Instructor" },
  { id: 8, nombre: "Nikola Tesla", correo: "nikola@example.com", estado: "Inactivo", rol: "Investigador" },
  { id: 9, nombre: "Ada Lovelace", correo: "ada@example.com", estado: "Activo", rol: "Desarrollador" },
  { id: 10, nombre: "Marie Curie", correo: "marie@example.com", estado: "Activo", rol: "Científico" },
  { id: 11, nombre: "Galileo Galilei", correo: "galileo@example.com", estado: "Inactivo", rol: "Astrónomo" },
  { id: 12, nombre: "Leonardo da Vinci", correo: "leonardo@example.com", estado: "Activo", rol: "Artista" },
  { id: 13, nombre: "Katherine Johnson", correo: "katherine@example.com", estado: "Activo", rol: "Matemático" },
  { id: 14, nombre: "Alan Turing", correo: "alan@example.com", estado: "Inactivo", rol: "Criptógrafo" },
  { id: 15, nombre: "Sophie Germain", correo: "sophie@example.com", estado: "Activo", rol: "Matemático" },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${item.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
      >
        {item.estado}
      </span>
    ),
  },
  { key: "rol", label: "Rol" },
]

const Usuarios = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Usuarios</h1>
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
        <GenericTable
          data={users}
          columns={columns}
          showActions={{ show: false, edit: false, delete: false, add: false }}
        />
      </div>
    </div>

  )
}

export default Usuarios

