"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import InstructorDetailModal from "./InstructorDetailModal"
import FichaDetailModal from "./FichaDetailModal"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

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
      {
        id: 1,
        numero: "2889927",
        nivel: 3,
        programa: "Desarrollo de Software",
        fechaInicio: "23/01/2024",
        fechaFin: "30/01/2025",
        estudiantes: [
          {
            nombre: "Manolo",
            apellido: "Bermudez",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Maria",
            apellido: "Perez",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Cody",
            apellido: "Fisher",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "Condicionado",
          },
          {
            nombre: "Esther",
            apellido: "Howard",
            documento: "704.555.0127",
            tipoDocumento: "PEP",
            estado: "En formación",
          },
          {
            nombre: "Ronald",
            apellido: "Richards",
            documento: "704.555.0127",
            tipoDocumento: "PPT",
            estado: "En formación",
          },
        ],
      },
      {
        id: 2,
        numero: "2829397",
        nivel: 2,
        programa: "Diseño Gráfico",
        fechaInicio: "15/02/2024",
        fechaFin: "15/02/2025",
        estudiantes: [
          {
            nombre: "Albert",
            apellido: "Flores",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "Condicionado",
          },
          {
            nombre: "Marvin",
            apellido: "McKinney",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "En formación",
          },
          {
            nombre: "Leslie",
            apellido: "Alexander",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
        ],
      },
      {
        id: 3,
        numero: "2978765",
        nivel: 1,
        programa: "Redes de Computadores",
        fechaInicio: "10/03/2024",
        fechaFin: "10/03/2025",
        estudiantes: [
          {
            nombre: "Darlene",
            apellido: "Robertson",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Jane",
            apellido: "Cooper",
            documento: "704.555.0127",
            tipoDocumento: "PEP",
            estado: "Condicionado",
          },
        ],
      },
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
      {
        id: 4,
        numero: "2889927",
        nivel: 4,
        programa: "Contabilidad",
        fechaInicio: "05/01/2024",
        fechaFin: "05/01/2025",
        estudiantes: [
          {
            nombre: "Cameron",
            apellido: "Williamson",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "Condicionado",
          },
          {
            nombre: "Brooklyn",
            apellido: "Simmons",
            documento: "704.555.0127",
            tipoDocumento: "PPT",
            estado: "En formación",
          },
        ],
      },
      {
        id: 5,
        numero: "2978765",
        nivel: 5,
        programa: "Administración de Empresas",
        fechaInicio: "20/02/2024",
        fechaFin: "20/02/2025",
        estudiantes: [
          {
            nombre: "Savannah",
            apellido: "Nguyen",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Ralph",
            apellido: "Edwards",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "Condicionado",
          },
          {
            nombre: "Kristin",
            apellido: "Watson",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
        ],
      },
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
      {
        id: 6,
        numero: "2829397",
        nivel: 6,
        programa: "Mecánica Automotriz",
        fechaInicio: "12/03/2024",
        fechaFin: "12/03/2025",
        estudiantes: [
          {
            nombre: "Wade",
            apellido: "Warren",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "Condicionado",
          },
          {
            nombre: "Robert",
            apellido: "Fox",
            documento: "704.555.0127",
            tipoDocumento: "PEP",
            estado: "En formación",
          },
        ],
      },
      {
        id: 7,
        numero: "2978765",
        nivel: 2,
        programa: "Electrónica",
        fechaInicio: "01/04/2024",
        fechaFin: "01/04/2025",
        estudiantes: [
          { nombre: "Devon", apellido: "Lane", documento: "704.555.0127", tipoDocumento: "CC", estado: "En formación" },
          {
            nombre: "Darrell",
            apellido: "Steward",
            documento: "704.555.0127",
            tipoDocumento: "PPT",
            estado: "Condicionado",
          },
          {
            nombre: "Courtney",
            apellido: "Henry",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "En formación",
          },
        ],
      },
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
    fichas: [
      {
        id: 8,
        numero: "2889927",
        nivel: 3,
        programa: "Cocina Internacional",
        fechaInicio: "15/01/2024",
        fechaFin: "15/01/2025",
        estudiantes: [
          {
            nombre: "Eleanor",
            apellido: "Pena",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Theresa",
            apellido: "Webb",
            documento: "704.555.0127",
            tipoDocumento: "PEP",
            estado: "Condicionado",
          },
          {
            nombre: "Kathryn",
            apellido: "Murphy",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Bessie",
            apellido: "Cooper",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "Condicionado",
          },
        ],
      },
    ],
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
      {
        id: 9,
        numero: "2889927",
        nivel: 1,
        programa: "Desarrollo Web",
        fechaInicio: "10/02/2024",
        fechaFin: "10/02/2025",
        estudiantes: [
          {
            nombre: "Jerome",
            apellido: "Bell",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "Condicionado",
          },
          {
            nombre: "Dianne",
            apellido: "Russell",
            documento: "704.555.0127",
            tipoDocumento: "PPT",
            estado: "En formación",
          },
        ],
      },
      {
        id: 10,
        numero: "2829397",
        nivel: 4,
        programa: "Diseño UX/UI",
        fechaInicio: "05/03/2024",
        fechaFin: "05/03/2025",
        estudiantes: [
          {
            nombre: "Annette",
            apellido: "Black",
            documento: "704.555.0127",
            tipoDocumento: "CC",
            estado: "En formación",
          },
          {
            nombre: "Arlene",
            apellido: "McCoy",
            documento: "704.555.0127",
            tipoDocumento: "PEP",
            estado: "Condicionado",
          },
          {
            nombre: "Jenny",
            apellido: "Wilson",
            documento: "704.555.0127",
            tipoDocumento: "DNI",
            estado: "En formación",
          },
        ],
      },
    ],
  },
]

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
        <GenericTable
          data={instructorsData}
          columns={columns}
          onShow={handleShowInstructor}
          title="LISTA DE INSTRUCTORES"
          showActions={{ show: true }}
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