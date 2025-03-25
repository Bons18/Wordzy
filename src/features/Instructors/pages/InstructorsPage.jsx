"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import InstructorDetailModal from "./InstructorDetailModal"
import { useAuth } from "../../auth/hooks/useAuth"

// Datos de ejemplo con campos adicionales
const instructorsData = [
  {
    id: 1,
    nombre: "Carlos",
    apellido: "Gómez",
    documento: "12345678",
    tipoDocumento: "CC",
    estado: "Activo",
    telefono: "3102568799",
    correo: "carlos.gomez@example.com",
    fichas: [
      { id: 1, numero: "2889927", programa: "Desarrollo de Software" },
      { id: 2, numero: "2829397", programa: "Diseño Gráfico" },
      { id: 3, numero: "2978765", programa: "Redes de Computadores" },
    ],
  },
  {
    id: 2,
    nombre: "Laura",
    apellido: "Martínez",
    documento: "87654321",
    tipoDocumento: "PPT",
    estado: "Inactivo",
    telefono: "3156789012",
    correo: "laura.martinez@example.com",
    fichas: [
      { id: 4, numero: "2889927", programa: "Contabilidad" },
      { id: 5, numero: "2978765", programa: "Administración de Empresas" },
    ],
  },
  {
    id: 3,
    nombre: "Juan",
    apellido: "Pérez",
    documento: "11223344",
    tipoDocumento: "PEP",
    estado: "Activo",
    telefono: "3209876543",
    correo: "juan.perez@example.com",
    fichas: [
      { id: 6, numero: "2829397", programa: "Mecánica Automotriz" },
      { id: 7, numero: "2978765", programa: "Electrónica" },
    ],
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "López",
    documento: "55667788",
    tipoDocumento: "CC",
    estado: "Activo",
    telefono: "3112345678",
    correo: "ana.lopez@example.com",
    fichas: [{ id: 8, numero: "2889927", programa: "Cocina Internacional" }],
  },
  {
    id: 5,
    nombre: "María",
    apellido: "Gonzales",
    documento: "2345447567",
    tipoDocumento: "CC",
    estado: "Activo",
    telefono: "3102568799",
    correo: "correo@correo.com",
    fichas: [
      { id: 9, numero: "2889927", programa: "Desarrollo Web" },
      { id: 10, numero: "2829397", programa: "Diseño UX/UI" },
      { id: 11, numero: "2978765", programa: "Inteligencia Artificial" },
      { id: 12, numero: "2829397", programa: "Ciencia de Datos" },
      { id: 13, numero: "2978765", programa: "Ciberseguridad" },
    ],
  },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "documento", label: "Documento" },
  { key: "tipoDocumento", label: "Tipo Documento" },
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

const Instructores = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  const handleShowInstructor = (instructor) => {
    setSelectedInstructor(instructor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleViewFicha = (ficha) => {
    console.log("Ver detalle de ficha:", ficha)
    // Aquí podrías implementar la lógica para mostrar el detalle de la ficha
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

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
                  onClick={handleLogout}
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
          data={instructorsData}
          columns={columns}
          onShow={handleShowInstructor}
          title="LISTA DE INSTRUCTORES"
          showActions={{ show: true, edit: false, delete: false }}
        />

        {selectedInstructor && (
          <InstructorDetailModal
            instructor={selectedInstructor}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onViewFicha={handleViewFicha}
          />
        )}
      </div>
    </div>
  )
}

export default Instructores

