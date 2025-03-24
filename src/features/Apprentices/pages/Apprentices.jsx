import { useState } from "react"
import GenericTable from "../../../shared/components/Table"
import ApprenticeDetailModal from "./ApprenticeDetailModal"
import ApprenticeProgressModal from "./ApprenticeProgressModal"


// Datos de ejemplo con campos adicionales
const aprendices = [
  {
    id: 1,
    nombre: "Carlos",
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
  { key: "documento", label: "Documento" },
  { key: "tipoDocumento", label: "Tipo Documento" },
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
  }

  return (
    <div>
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
  )
}

export default Apprentices

