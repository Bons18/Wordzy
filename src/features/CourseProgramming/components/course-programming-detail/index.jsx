import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../../auth/hooks/useAuth"
import ConfirmationModal from "../../../../shared/components/ConfirmationModal"
import ProgrammingDetails from "./programming-details"

export default function CourseProgrammingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [programming, setProgramming] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Cerrar dropdown al hacer clic fuera
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    // Cargar datos de programación
    const loadProgramming = async () => {
      try {
        // Obtener programaciones existentes
        const existingSchedules = JSON.parse(localStorage.getItem("courseSchedules") || "[]")
        const defaultSchedules = [
          { id: 1, nombre: "Programa 1", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
          { id: 2, nombre: "Programa 2", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
          { id: 3, nombre: "Programa 3", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
          { id: 4, nombre: "Programa 4", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
          { id: 5, nombre: "Programa 5", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        ]

        // Combinar programaciones predeterminadas y guardadas
        const allSchedules = [...defaultSchedules, ...existingSchedules]

        // Buscar la programación por ID
        const foundProgramming = allSchedules.find((p) => p.id.toString() === id.toString())

        if (foundProgramming) {
          setProgramming(foundProgramming)
        } else {
          console.error("Programación no encontrada")
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error al cargar la programación:", error)
        setIsLoading(false)
      }
    }

    loadProgramming()
  }, [id])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleBackClick = () => {
    navigate("/programacion/programacionCursos")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!programming) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Programación no encontrada</h2>
        <button onClick={handleBackClick} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Volver al listado
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Detalle de Programación</h1>
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
        <ProgrammingDetails programming={programming} />

        <div className="max-w-3xl mx-auto mt-6 flex justify-between">
          <button
            onClick={handleBackClick}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
          >
            Volver
          </button>
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
      </div>
    </div>
  )
}
