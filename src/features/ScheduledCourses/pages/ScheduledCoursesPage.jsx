"use client"

import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

const scheduledCourses = [
  { id: 1, nivel: "Nivel 1", cantidadFichas: "25", cantidadInstructores: "3", progreso: "25%" },
  { id: 2, nivel: "Nivel 2", cantidadFichas: "30", cantidadInstructores: "4", progreso: "100%" },
  { id: 3, nivel: "Nivel 3", cantidadFichas: "29", cantidadInstructores: "1", progreso: "50%" },
  { id: 4, nivel: "Nivel 4", cantidadFichas: "10", cantidadInstructores: "5", progreso: "10%" },
  { id: 5, nivel: "Nivel 5", cantidadFichas: "13", cantidadInstructores: "2", progreso: "75%" },
  { id: 6, nivel: "Nivel 6", cantidadFichas: "8", cantidadInstructores: "3", progreso: "80%" },
]

const columns = [
  { key: "nivel", label: "Nivel" },
  { key: "cantidadFichas", label: "Cantidad Fichas" },
  { key: "cantidadInstructores", label: "Cantidad Instructores" },
  {
    key: "progreso",
    label: "Progreso General",
    render: (item) => (
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 min-w-[100px]">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: item.progreso }}></div>
          </div>
        </div>
        <span className="text-sm text-gray-600 w-13 text-right">{item.progreso}</span>
      </div>
    ),
  },
]

const ScheduledCoursesPage = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
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

  const handleShowProgramming = (nivel) => {
    // Guardar el nivel seleccionado en sessionStorage para usarlo en las siguientes páginas
    sessionStorage.setItem("selectedNivelId", nivel.id)
    sessionStorage.setItem("selectedNivelNombre", nivel.nivel)
    navigate("/progreso/cursosProgramados/fichas")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
          <div className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-green-600">Lista de Niveles</span>
          </div>
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
          data={scheduledCourses}
          columns={columns}
          onShow={handleShowProgramming}
          tooltipText="Ver Fichas"
          showActions={{ show: true, edit: false, delete: false, add: false }}
        />

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    </div>
  )
}

export default ScheduledCoursesPage
