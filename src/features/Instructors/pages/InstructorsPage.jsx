import { useState } from "react"
import GenericTable from "../../../shared/components/Table"
import InstructorDetailModal from "./InstructorDetailModal"

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

const InstructorsPage
= () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
    // Por ejemplo, abrir otro modal o navegar a otra página
  }

  return (
    <div>
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
  )
}

export default InstructorsPage

