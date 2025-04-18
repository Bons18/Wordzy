"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import ApprenticeDetailModal from "./ApprenticeDetailModal"
import ApprenticeProgressModal from "./ApprenticeProgressModal"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos de ejemplo con campos adicionales
// Datos de ejemplo con campos adicionales
const aprendices = [
  {
    id: 1,
    nombre: "Carlita",
    apellido: "Pérez",
    documento: "1023456789",
    tipoDocumento: "CC",
    ficha: [2889927],
    nivel: 1,
    estado: "En formación",
    telefono: "3102568799",
    programa: "ADSO",
    correo: "carlos.perez@example.com",
    progresoActual: 15,
    progresoNiveles: [
      { nivel: 1, porcentaje: 25 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],
  },
  {
    id: 2,
    nombre: "Ana",
    apellido: "Gómez",
    documento: "1029876543",
    tipoDocumento: "PPT",
    ficha: [2996778],
    nivel: 2,
    estado: "Condicionado",
    telefono: "3156789012",
    programa: "Contabilidad",
    correo: "ana.gomez@example.com",
    progresoActual: 45,
    progresoNiveles: [
      { nivel: 1, porcentaje: 100 },
      { nivel: 2, porcentaje: 50 },
      { nivel: 3, porcentaje: 0 },
    ],
  },
  {
    id: 3,
    nombre: "Luis",
    apellido: "Martínez",
    documento: "1034567890",
    tipoDocumento: "PEP",
    ficha: [2889927, 2996778],
    nivel: 3,
    estado: "En formación",
    telefono: "3209876543",
    programa: "Diseño Gráfico",
    correo: "luis.martinez@example.com",
    progresoActual: 75,
    progresoNiveles: [
      { nivel: 1, porcentaje: 100 },
      { nivel: 2, porcentaje: 100 },
      { nivel: 3, porcentaje: 75 },
    ],
  },
  {
    id: 4,
    nombre: "María",
    apellido: "gonzales",
    documento: "2345447567",
    tipoDocumento: "CC",
    ficha: [2889927],
    nivel: 3,
    estado: "En formación",
    telefono: "3102568799",
    programa: "ADSO",
    correo: "correo@correo.com",
    progresoActual: 20,
    progresoNiveles: [
      { nivel: 1, porcentaje: 25 },
      { nivel: 2, porcentaje: 50 },
      { nivel: 3, porcentaje: 100 },
    ],
  },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "tipoDocumento", label: "Tipo Documento" },
  { key: "documento", label: "Documento" },
  { key: "ficha", label: "Ficha", render: (item) => item.ficha.join(", ") },
  { key: "nivel", label: "Nivel Actual" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

const Apprentices = () => {
  const [selectedApprentice, setSelectedApprentice] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false)
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

  const handleShowApprentice = (apprentice) => {
    setSelectedApprentice(apprentice)
    setIsDetailModalOpen(true)
    setIsProgressModalOpen(false)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  const handleShowProgress = () => {
    setIsDetailModalOpen(false)
    setIsProgressModalOpen(true)
  }

  const handleCloseProgressModal = () => {
    setIsProgressModalOpen(false)
    setIsDetailModalOpen(true) // Volver a abrir el modal de detalle del aprendiz
  }

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
          <h1 className="text-2xl font-bold text-[#1f384c]">Aprendices</h1>
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
          data={aprendices}
          columns={columns}
          onShow={handleShowApprentice}
          title="LISTA DE APRENDICES"
          showActions={{ show: true }}
        />

        {selectedApprentice && (
          <>
            <ApprenticeDetailModal
              apprentice={selectedApprentice}
              isOpen={isDetailModalOpen}
              onClose={handleCloseDetailModal}
              onShowProgress={handleShowProgress}
            />

            <ApprenticeProgressModal
              isOpen={isProgressModalOpen}
              onClose={handleCloseProgressModal}
              progressData={selectedApprentice.progresoNiveles}
            />
          </>
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

export default Apprentices
