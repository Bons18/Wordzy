"use client"

import { useState, useEffect } from "react"
import { Eye, Trash } from "lucide-react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Tooltip from "../../../../shared/components/Tooltip"
import CustomSelect from "./ui/custom-select"
import EvaluationModal from "./evaluation-modal"
import EvaluationDetailModal from "../../../Evaluations/components/EvaluationDetailModal"


export default function ActivitiesSection({ levelId, themeId, localActiveTab, setLocalActiveTab, levels, setLevels }) {
  const [selectedActivity, setSelectedActivity] = useState("")
  const [activityValue, setActivityValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [showPagination, setShowPagination] = useState(true)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [evaluationType, setEvaluationType] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState(null)

  // Estado para almacenar las actividades y exámenes creados pero no agregados a la tabla
  const [createdActivities, setCreatedActivities] = useState([])
  const [createdExams, setCreatedExams] = useState([])

  // Opciones predeterminadas
  const defaultActivityOptions = [
    { value: "actividad1", label: "Completación" },
    { value: "actividad2", label: "Selección Múltiple" },
    { value: "actividad3", label: "Relacionar" },
  ]

  const defaultExamOptions = [
    { value: "examen1", label: "Examen" },
    { value: "examen2", label: "Examen Parcial" },
    { value: "examen3", label: "Examen Final" },
    { value: "examen4", label: "Quiz" },
  ]

  const materialOptions = [
    { value: "material1", label: "Imagenes" },
    { value: "material2", label: "Documento PDF" },
    { value: "material3", label: "Video Tutorial" },
    { value: "material4", label: "Presentación" },
  ]

  // Encontrar el nivel y tema actual
  const currentLevel = levels.find((level) => level.id === levelId)
  const currentTheme = currentLevel?.themes.find((theme) => theme.id === themeId)

  // Combinar opciones predeterminadas con las creadas por el usuario
  const activityOptions = [
    ...defaultActivityOptions,
    ...createdActivities.map((activity) => ({
      value: `custom-${activity.id}`,
      label: activity.nombre,
      customData: activity,
    })),
  ]

  const examOptions = [
    ...defaultExamOptions,
    ...createdExams.map((exam) => ({
      value: `custom-${exam.id}`,
      label: exam.nombre,
      customData: exam,
    })),
  ]

  // Limpiar la selección cuando cambia la pestaña
  useEffect(() => {
    setSelectedActivity("")
    setActivityValue("")
  }, [localActiveTab])

  if (!currentTheme) return null

  const getOptionsForActiveTab = () => {
    switch (localActiveTab) {
      case "Actividades":
        return activityOptions
      case "Exámenes":
        return examOptions
      case "Material":
        return materialOptions
      default:
        return activityOptions
    }
  }

  const addNewActivity = () => {
    if (localActiveTab !== "Material" && (!selectedActivity || activityValue <= 0)) return
    if (localActiveTab === "Material" && !selectedActivity) return

    const options = getOptionsForActiveTab()
    const selectedOption = options.find((opt) => opt.value === selectedActivity)

    // Verificar si es una actividad o examen personalizado
    const isCustom = selectedOption?.value?.startsWith("custom-")

    const newActivity = {
      id: Date.now(),
      name: selectedOption
        ? selectedOption.label
        : localActiveTab === "Material"
          ? "Material"
          : localActiveTab === "Exámenes"
            ? "Examen"
            : "Actividad",
      value: localActiveTab === "Material" ? "N/A" : `${activityValue}%`,
      type: localActiveTab,
      // Si es una actividad o examen personalizado, incluir los datos completos
      ...(isCustom && { evaluationData: selectedOption.customData }),
    }

    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) => {
            if (theme.id === themeId) {
              const activities = theme.activities || []
              return { ...theme, activities: [...activities, newActivity] }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )

    // Si era una actividad o examen personalizado, eliminarlo de la lista de creados
    if (isCustom) {
      if (localActiveTab === "Actividades") {
        setCreatedActivities((prev) => prev.filter((item) => `custom-${item.id}` !== selectedActivity))
      } else if (localActiveTab === "Exámenes") {
        setCreatedExams((prev) => prev.filter((item) => `custom-${item.id}` !== selectedActivity))
      }
    }

    // Limpiar el formulario sin cambiar la pestaña activa
    setSelectedActivity("")
    if (localActiveTab !== "Material") {
      setActivityValue(0)
    }
  }

  const deleteActivity = (activityId) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) => {
            if (theme.id === themeId) {
              const activities = theme.activities || []
              return { ...theme, activities: activities.filter((a) => a.id !== activityId) }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  const getFilteredActivities = () => {
    return (currentTheme.activities || []).filter((activity) => activity.type === localActiveTab)
  }

  // Calcular el valor total de las actividades o exámenes
  const calculateTotalValue = () => {
    const filteredActivities = getFilteredActivities()
    if (filteredActivities.length === 0 || localActiveTab === "Material") return 0

    return filteredActivities.reduce((total, activity) => {
      const valueStr = activity.value.replace("%", "")
      const value = Number.parseInt(valueStr)
      return isNaN(value) ? total : total + value
    }, 0)
  }

  const totalValue = calculateTotalValue()
  const isValueValid = localActiveTab === "Material" || totalValue === 100

  // Reemplazamos filteredData con el resultado de getFilteredActivities
  const filteredData = getFilteredActivities()

  // Si showPagination es true, aplicamos la paginación
  const currentData = showPagination
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleCreateEvaluation = (type) => {
    // Solo abrir el modal para Actividad o Examen, no para Material
    if (type === "Material") {
      // Aquí podría ir otra lógica para el material, por ahora solo mostramos un mensaje
      alert("Funcionalidad de creación de material en desarrollo")
      return
    }

    setEvaluationType(type)
    setShowEvaluationModal(true)
  }

  const handleEvaluationSubmit = (formData) => {
    // En lugar de agregar directamente a la tabla, agregamos a la lista de creados
    const newItem = {
      ...formData,
      id: Date.now(),
    }

    if (formData.tipoEvaluacion === "Examen") {
      setCreatedExams((prev) => [...prev, newItem])
      // Cambiar a la pestaña de exámenes
      setLocalActiveTab("Exámenes")
    } else {
      setCreatedActivities((prev) => [...prev, newItem])
      // Cambiar a la pestaña de actividades
      setLocalActiveTab("Actividades")
    }

    setShowEvaluationModal(false)
  }

  const handleViewDetail = (activity) => {
    // Si la actividad tiene datos de evaluación, mostrarlos
    if (activity.evaluationData) {
      setSelectedDetail(activity.evaluationData)
      setShowDetailModal(true)
    } else {
      // Si no tiene datos de evaluación, mostrar un mensaje
      alert("No hay detalles disponibles para esta evaluación")
    }
  }

  return (
    <div className="mt-4">
      <div className="border rounded-md">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
              localActiveTab === "Actividades" ? "bg-blue-50 border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setLocalActiveTab("Actividades")}
          >
            Actividades
          </button>
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
              localActiveTab === "Exámenes" ? "bg-blue-50 border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setLocalActiveTab("Exámenes")}
          >
            Exámenes
          </button>
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
              localActiveTab === "Material" ? "bg-blue-50 border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setLocalActiveTab("Material")}
          >
            Material de Apoyo
          </button>
        </div>

        <div className="p-4">
          <div>
            {localActiveTab !== "Material" && filteredData.length > 0 && (
              <div className="flex justify-between items-center px-2 py-1 mb-3 bg-gray-50 rounded">
                <span className="text-sm font-medium">Valor total:</span>
                <span className={`text-sm font-medium ${isValueValid ? "text-green-600" : "text-red-600"}`}>
                  {totalValue}% {isValueValid ? "✓" : `(debe ser 100%)`}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className={localActiveTab === "Material" ? "col-span-3" : "col-span-2"}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {localActiveTab === "Material" ? "Material" : localActiveTab === "Exámenes" ? "Examen" : "Actividad"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  placeholder={`Seleccionar ${
                    localActiveTab === "Material" ? "material" : localActiveTab === "Exámenes" ? "examen" : "actividad"
                  }`}
                  options={getOptionsForActiveTab()}
                  value={selectedActivity}
                  onChange={setSelectedActivity}
                />
              </div>
              {localActiveTab !== "Material" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center w-full">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full rounded-l-md border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={activityValue}
                      onChange={(e) => setActivityValue(Number.parseInt(e.target.value) || 0)}
                    />
                    <span className="bg-gray-100 border border-l-0 border-gray-300 px-2 py-1.5 rounded-r-md">%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2 mb-4">
              <button
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-sm text-white rounded-md flex items-center"
                onClick={() =>
                  handleCreateEvaluation(
                    localActiveTab === "Material" ? "Material" : localActiveTab === "Exámenes" ? "Examen" : "Actividad",
                  )
                }
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear{" "}
                {localActiveTab === "Material" ? "Material" : localActiveTab === "Exámenes" ? "Examen" : "Actividad"}
              </button>
              <button
                className="px-3 py-2 bg-green-500 hover:bg-green-600 text-sm text-white rounded-md flex items-center"
                onClick={addNewActivity}
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Añadir{" "}
                {localActiveTab === "Material" ? "Material" : localActiveTab === "Exámenes" ? "Examen" : "Actividad"}
              </button>
            </div>

            <div className="border rounded-md">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="bg-gray-100 px-2 py-2 text-left text-sm font-medium text-gray-600 truncate">
                      Nombre
                    </th>
                    <th className="bg-gray-100 px-2 py-2 text-left text-sm font-medium text-gray-600 truncate">
                      Valor
                    </th>
                    <th className="bg-gray-100 px-2 py-2 text-left text-sm font-medium text-gray-600 w-28">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2 text-sm text-left border-b border-gray-200 text-gray-700 truncate">
                        {activity.name}
                      </td>
                      <td className="px-2 py-2 text-sm text-left border-b border-gray-200 text-gray-700 truncate">
                        {activity.value}
                      </td>
                      <td className="px-2 py-2 border-b border-gray-200">
                        <div className="flex space-x-2">
                          <Tooltip text="Detalle" position="top">
                            <button
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={() => handleViewDetail(activity)}
                            >
                              <Eye className="h-5 w-6 text-blue-500" />
                            </button>
                          </Tooltip>
                          <Tooltip text="Eliminar" position="top">
                            <button
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={() => deleteActivity(activity.id)}
                            >
                              <Trash className="h-4 w-6 text-red-500" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentData.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-2 py-4 text-sm text-center text-gray-500">
                        No hay{" "}
                        {localActiveTab === "Material"
                          ? "materiales"
                          : localActiveTab === "Exámenes"
                            ? "exámenes"
                            : "actividades"}{" "}
                        agregados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between items-center text-xs font-medium text-gray-600 ml-2 p-1">
                <div>{filteredData.length} elementos</div>

                {filteredData.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span>
                      Página {currentPage} de {totalPages > 0 ? totalPages : 1}
                    </span>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Página anterior"
                      >
                        <FiChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                        aria-label="Página siguiente"
                      >
                        <FiChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para el formulario de evaluación */}
      <EvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        onSubmit={handleEvaluationSubmit}
        evaluation={evaluationType === "Examen" ? { tipoEvaluacion: "Examen" } : { tipoEvaluacion: "Actividad" }}
      />

      {/* Modal para ver detalles de la evaluación */}
      <EvaluationDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        evaluation={selectedDetail}
      />
    </div>
  )
}
