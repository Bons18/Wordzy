"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import EvaluationForm from "../components/EvaluationForm"
import EvaluationDetailModal from "../components/EvaluationDetailModal"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Importar los hooks
import useGetEvaluations from "../hooks/useGetEvaluations"
import usePostEvaluation from "../hooks/usePostEvaluation"
import usePutEvaluation from "../hooks/usePutEvaluation"
import useDeleteEvaluation from "../hooks/useDeleteEvaluation"
import { normalizeEvaluations } from "../services/evaluationService"

const columns = [
  { key: "nombre", label: "Nombre" },
  {
    key: "tematica",
    label: "Temática",
    render: (item) => <span className="text-[14px] capitalize">{item.tematica || "No especificada"}</span>,
  },
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
  // Usar los hooks personalizados
  const { evaluations: rawEvaluations, loading: fetchLoading, error: fetchError, refetch } = useGetEvaluations()
  const { createEvaluation, loading: createLoading, error: createError } = usePostEvaluation()
  const { updateEvaluation, loading: updateLoading, error: updateError } = usePutEvaluation()
  const { deleteEvaluation, loading: deleteLoading, error: deleteError } = useDeleteEvaluation()

  // Normalizar las evaluaciones para la UI (asegurar que tengan id)
  const evaluationsData = normalizeEvaluations(rawEvaluations)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [successTitle, setSuccessTitle] = useState("")
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [evaluationToDelete, setEvaluationToDelete] = useState(null)

  // Estado para controlar carga y errores en la UI
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Actualizar el estado de carga y error cuando cambien los hooks
  useEffect(() => {
    setIsLoading(fetchLoading || createLoading || updateLoading || deleteLoading)
  }, [fetchLoading, createLoading, updateLoading, deleteLoading])

  // Consolidar errores de los diferentes hooks
  useEffect(() => {
    const error = fetchError || createError || updateError || deleteError
    setErrorMessage(error ? `Error: ${error}` : "")
  }, [fetchError, createError, updateError, deleteError])

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

  const handleFormSubmit = async (formData) => {
    try {
      setIsLoading(true)
      setErrorMessage("")

      // Verificar si formData es una instancia de FormData
      if (formData instanceof FormData) {
        console.log("Recibido FormData válido")

        // Si es una edición, añadir el ID
        if (currentEvaluation) {
          formData.append("id", currentEvaluation.id)
          await updateEvaluation(currentEvaluation.id, formData)
          setSuccessTitle("Evaluación Editada")
          setSuccessMessage("La evaluación ha sido editada con éxito")
        } else {
          // Crear nueva evaluación
          await createEvaluation(formData)
          setSuccessTitle("Evaluación Creada")
          setSuccessMessage("La evaluación ha sido creada con éxito")
        }
      } else {
        // Si no es FormData, usar el enfoque anterior
        console.log("Recibido objeto regular, convirtiendo a FormData")

        // Crear un nuevo FormData
        const data = new FormData()

        // Añadir campos básicos
        data.append("nombre", formData.nombre)
        data.append("tematica", formData.tematica)
        data.append("tipoEvaluacion", formData.tipoEvaluacion)
        data.append("estado", formData.estado)
        data.append("descripcion", formData.descripcion || "")

        // Añadir material si existe
        if (formData.material && formData.material instanceof File) {
          data.append("material", formData.material)
        }

        // Procesar preguntas
        const preguntasModificadas = [...formData.preguntas]

        // Procesar archivos de preguntas
        formData.preguntas.forEach((pregunta, index) => {
          if (pregunta.tipo === "imagen" && pregunta.imagen instanceof File) {
            const fileKey = `imagen_pregunta_${index}`
            data.append(fileKey, pregunta.imagen)
            preguntasModificadas[index].imagen = fileKey
          }

          if (pregunta.tipo === "audio" && pregunta.audio instanceof File) {
            const fileKey = `audio_pregunta_${index}`
            data.append(fileKey, pregunta.audio)
            preguntasModificadas[index].audio = fileKey
          }
        })

        // Añadir las preguntas modificadas
        data.append("preguntas", JSON.stringify(preguntasModificadas))

        // Ejecutar la operación correspondiente
        if (currentEvaluation) {
          data.append("id", currentEvaluation.id)
          await updateEvaluation(currentEvaluation.id, data)
          setSuccessTitle("Evaluación Editada")
          setSuccessMessage("La evaluación ha sido editada con éxito")
        } else {
          await createEvaluation(data)
          setSuccessTitle("Evaluación Creada")
          setSuccessMessage("La evaluación ha sido creada con éxito")
        }
      }

      // Refrescar la lista
      refetch()

      setIsFormOpen(false)
      setIsSuccessModalOpen(true)
    } catch (error) {
      console.error("Error al procesar la evaluación:", error)
      setErrorMessage(`Error: ${error.message || "Ocurrió un error al procesar la evaluación"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (evaluationToDelete) {
      try {
        setIsLoading(true)
        setErrorMessage("")

        await deleteEvaluation(evaluationToDelete.id)

        // Refrescar la lista
        refetch()

        setIsDeleteModalOpen(false)
        setSuccessTitle("Evaluación Eliminada")
        setSuccessMessage("La evaluación ha sido eliminada con éxito")
        setIsSuccessModalOpen(true)
        setEvaluationToDelete(null)
      } catch (error) {
        console.error("Error al eliminar la evaluación:", error)
        setErrorMessage(`Error: ${error.message || "Ocurrió un error al eliminar la evaluación"}`)
      } finally {
        setIsLoading(false)
      }
    }
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
        <h2 className="text-xl font-semibold mb-4">Lista de evaluaciones</h2>

        {/* Mostrar error si existe */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">{errorMessage}</div>
        )}

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <span className="ml-2">Cargando...</span>
          </div>
        ) : (
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
        )}
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

export default Evaluations
