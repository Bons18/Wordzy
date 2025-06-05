"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import InstructorDetailModal from "./InstructorDetailModal"
import FichaDetailModal from "./FichaDetailModal"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import useGetInstructors from "../hooks/useGetInstructors"

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "tipoDocumento", label: "Tipo Documento" },
  { key: "documento", label: "Documento" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

const InstructorsPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [selectedFicha, setSelectedFicha] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isFichaModalOpen, setIsFichaModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Hook para API
  const { instructors, loading, error, refetch } = useGetInstructors()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleShowInstructor = (instructor) => {
    setSelectedInstructor(instructor)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  const handleViewFicha = (ficha) => {
    setSelectedFicha(ficha)
    setIsFichaModalOpen(true)
  }

  const handleCloseFichaModal = () => {
    setIsFichaModalOpen(false)
  }

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleMassiveUpdate = () => {
    // Función placeholder para actualización masiva
    console.log("Actualización masiva de instructores - Funcionalidad pendiente")
  }

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
          <p className="text-[#1f384c] font-medium">Cargando instructores...</p>
        </div>
      </div>
    )
  }

  // Mostrar error si existe
  const displayError = error && !instructors.length ? error : null

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Instructores</h1>
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
        {/* Mostrar errores si los hay */}
        {displayError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">Error: {displayError}</div>
        )}

        {/* Botón de Actualización Masiva */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleMassiveUpdate}
            className="flex items-center gap-2 bg-[#1f384c] text-white px-4 py-2 rounded-lg hover:bg-[#2a4a5e] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualización Masiva
          </button>
        </div>

        <GenericTable
          data={instructors}
          columns={columns}
          onShow={handleShowInstructor}
          title="LISTA DE INSTRUCTORES"
          showActions={{ show: true }}
          tooltipText="Ver detalle del instructor"
        />

        {selectedInstructor && (
          <InstructorDetailModal
            instructor={selectedInstructor}
            isOpen={isDetailModalOpen}
            onClose={handleCloseDetailModal}
            onViewFicha={handleViewFicha}
          />
        )}

        {selectedFicha && (
          <FichaDetailModal ficha={selectedFicha} isOpen={isFichaModalOpen} onClose={handleCloseFichaModal} />
        )}
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
  )
}

export default InstructorsPage
