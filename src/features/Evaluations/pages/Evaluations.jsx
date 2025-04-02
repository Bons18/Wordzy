"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import EvaluationForm from "../components/EvaluationForm"
import EvaluationDetailModal from "../components/EvaluationDetailModal"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos iniciales de ejemplo
const initialEvaluationsData = [
  {
    id: 2,
    nombre: "Evaluación 2",
    tema: "Historia",
    estado: "Inactivo",
    tipoEvaluacion: "Examen",
    descripcion: "Evaluación sobre historia antigua",
    preguntas: [],
  },
  {
    id: 3,
    nombre: "Evaluación 3",
    tema: "Ciencias",
    estado: "Activo",
    tipoEvaluacion: "Examen",
    descripcion: "Evaluación sobre biología celular",
    preguntas: [],
  },
  {
    id: 4,
    nombre: "Actividad 1",
    tema: "Matemáticas",
    estado: "Activo",
    tipoEvaluacion: "Actividad",
    descripcion: "Actividad práctica de geometría",
    preguntas: [],
  },
  {
    id: 5,
    nombre: "Actividad 2",
    tema: "Historia",
    estado: "Inactivo",
    tipoEvaluacion: "Actividad",
    descripcion: "Actividad sobre la revolución industrial",
    preguntas: [],
  },
  {
    id: 6,
    nombre: "Actividad 3",
    tema: "Ciencias",
    estado: "Activo",
    tipoEvaluacion: "Actividad",
    descripcion: "Actividad sobre el método científico",
    preguntas: [],
  },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "tema", label: "Tema" },
  {
    key: "tipoEvaluacion",
    label: "Tipo Evaluación",
    render: (item) => <span className="text-[14px] text-gray-700">{item.tipoEvaluacion}</span>,
  },
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

const Evaluations = () => {
  const [evaluationsData, setEvaluationsData] = useState(initialEvaluationsData)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [successTitle, setSuccessTitle] = useState("")
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [evaluationToDelete, setEvaluationToDelete] = useState(null)

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

  const handleAddEvaluation = () => {
    setCurrentEvaluation(null)
    setIsFormOpen(true)
  }

  const handleEditEvaluation = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setIsFormOpen(true)
  }

  const handleDeleteEvaluation = (id) => {
    const evaluation = evaluationsData.find((e) => e.id === id)
    setEvaluationToDelete(evaluation)
    setIsDeleteModalOpen(true)
  }

  const handleShowEvaluation = (evaluation) => {
    setCurrentEvaluation(evaluation)
    setIsDetailModalOpen(true)
  }

  const handleFormSubmit = (formData) => {
    if (currentEvaluation) {
      // Editar evaluación existente
      setEvaluationsData((prev) =>
        prev.map((item) =>
          item.id === currentEvaluation.id
            ? { ...formData, id: currentEvaluation.id, tema: currentEvaluation.tema }
            : item,
        ),
      )
      setSuccessTitle("Evaluación Editada")
      setSuccessMessage("La evaluación ha sido editada con éxito")
    } else {
      // Crear nueva evaluación
      const newId = Math.max(...evaluationsData.map((item) => item.id)) + 1
      setEvaluationsData((prev) => [
        ...prev,
        {
          ...formData,
          id: newId,
          tema: formData.tipoEvaluacion === "Examen" ? "Matemáticas" : "General",
        },
      ])
      setSuccessTitle("Evaluación Creada")
      setSuccessMessage("La evaluación ha sido creada con éxito")
    }

    setIsFormOpen(false)
    setIsSuccessModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (evaluationToDelete) {
      setEvaluationsData((prev) => prev.filter((item) => item.id !== evaluationToDelete.id))
      setIsDeleteModalOpen(false)
      setSuccessTitle("Evaluación Eliminada")
      setSuccessMessage("La evaluación ha sido eliminada con éxito")
      setIsSuccessModalOpen(true)
      setEvaluationToDelete(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Evaluaciones</h1>
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
        <h2 className="text-xl font-semibold mb-4">Lista de evaluaciones</h2>

        <GenericTable
          data={evaluationsData}
          columns={columns}
          onShow={handleShowEvaluation}
          onEdit={handleEditEvaluation}
          onDelete={handleDeleteEvaluation}
          onAdd={handleAddEvaluation}
          title="Listado de Evaluaciones"
          showActions={{ show: true, edit: true, delete: true, add: true }}
        />
      </div>

      {/* Modal de formulario para crear/editar */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <EvaluationForm
            evaluation={currentEvaluation}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {/* Modal de detalle para ver evaluación */}
      <EvaluationDetailModal
        evaluation={currentEvaluation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Modal de confirmación para eliminar */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Evaluación"
        message={
          evaluationToDelete
            ? `¿Estás seguro de que deseas eliminar la evaluación "${evaluationToDelete.nombre}"?`
            : "¿Estás seguro de que deseas eliminar esta evaluación?"
        }
        confirmText="Confirmar Eliminación"
        confirmColor="bg-[#46ae69] hover:bg-green-600"
      />

      {/* Modal de éxito */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onConfirm={() => setIsSuccessModalOpen(false)}
        title={successTitle}
        message={successMessage}
        confirmText="Cerrar"
        confirmColor="bg-[#f44144] hover:bg-red-600"
        showButtonCancel={false}
      />
    </div>
  )
}

export default Evaluations

