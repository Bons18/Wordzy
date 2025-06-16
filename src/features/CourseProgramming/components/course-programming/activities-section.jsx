import { useState } from "react"
import { Eye, Trash } from "lucide-react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Tooltip from "../../../../shared/components/Tooltip"
import CustomSelect from "./ui/custom-select"
import EvaluationModal from "./evaluation-modal"
import EvaluationDetailModal from "../../../Evaluations/components/EvaluationDetailModal"
import SupportMaterialModal from "../../../SupportMaterials/pages/support-material-modal"
import MaterialDetail from "../../../SupportMaterials/pages/MaterialDetail"
import useGetEvaluations from "../../../Evaluations/hooks/useGetEvaluations"
import useSupportMaterials from "../../../../shared/hooks/useSupportMaterials"

export default function ActivitiesSection({ levelId, themeId, localActiveTab, setLocalActiveTab, levels, setLevels }) {
  const [selectedActivity, setSelectedActivity] = useState("")
  const [activityValue, setActivityValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false)
  const [evaluationType, setEvaluationType] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState(null)
  const [showSupportMaterialModal, setShowSupportMaterialModal] = useState(false)

  const [showMaterialDetailModal, setShowMaterialDetailModal] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const { evaluations } = useGetEvaluations()
  const { materials } = useSupportMaterials()

  const currentLevel = levels.find((level) => level.id === levelId)
  const currentTheme = currentLevel?.themes.find((theme) => theme.id === themeId)

  // Obtener actividades y exámenes del backend
  const activityOptions = evaluations
    ?.filter(e => e.tipoEvaluacion === 'Actividad')
    .map(e => ({
      value: e._id,
      label: e.nombre,
      customData: e
    })) || []

  const examOptions = evaluations
    ?.filter(e => e.tipoEvaluacion === 'Examen')
    .map(e => ({
      value: e._id,
      label: e.nombre,
      customData: e
    })) || []

  const materialOptions = materials?.map(m => ({
    value: m._id,
    label: m.titulo,
    customData: m
  })) || []

  const addNewActivity = () => {
    if (localActiveTab !== "Material" && (!selectedActivity || activityValue <= 0)) return
    if (localActiveTab === "Material" && !selectedActivity) return

    const options = getOptionsForActiveTab()
    const selectedOption = options.find((opt) => opt.value === selectedActivity)

    const newActivity = {
      evaluationId: selectedOption.value,
      name: selectedOption.label,
      value: localActiveTab === "Material" ? "N/A" : `${activityValue}%`,
      type: localActiveTab,
      evaluationData: selectedOption.customData
    }

    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) => {
            if (theme.id === themeId) {
              return { ...theme, activities: [...(theme.activities || []), newActivity] }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )

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
              return {
                ...theme,
                activities: (theme.activities || []).filter((a) => a.id !== activityId)
              }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  const getOptionsForActiveTab = () => {
    switch (localActiveTab) {
      case "Actividades": return activityOptions
      case "Exámenes": return examOptions
      case "Material": return materialOptions
      default: return activityOptions
    }
  }

  const getFilteredActivities = () => {
    return (currentTheme?.activities || []).filter((activity) => activity.type === localActiveTab)
  }

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

  const filteredData = getFilteredActivities()
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleCreateEvaluation = (type) => {
    if (type === "Material") {
      setShowSupportMaterialModal(true)
      return
    }

    setEvaluationType(type)
    setShowEvaluationModal(true)
  }

  const handleEvaluationSubmit = (formData) => {
    const newItem = {
      ...formData,
      _id: `eval-${Date.now()}`,
      tipoEvaluacion: evaluationType === "Examen" ? "Examen" : "Actividad"
    }

    const newActivity = {
      evaluationId: selectedOption.value,
      name: newItem.nombre,
      value: "100%",
      type: evaluationType === "Examen" ? "Exámenes" : "Actividades",
      evaluationData: newItem
    }

    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) => {
            if (theme.id === themeId) {
              return { ...theme, activities: [...(theme.activities || []), newActivity] }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )

    setShowEvaluationModal(false)
  }

  const handleSupportMaterialSubmit = (materialData) => {
    const newMaterial = {
      ...materialData,
      _id: `mat-${Date.now()}`
    }

    const newActivity = {
      id: newMaterial._id,
      name: newMaterial.nombre,
      value: "N/A",
      type: "Material",
      evaluationData: newMaterial
    }

    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) => {
            if (theme.id === themeId) {
              return { ...theme, activities: [...(theme.activities || []), newActivity] }
            }
            return theme
          })
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )

    setShowSupportMaterialModal(false)
  }

    const handleViewDetail = (activity) => {
    if (activity.type === "Material") {
      setSelectedMaterial(activity.evaluationData);
      setShowMaterialDetailModal(true);
    } else {
      setSelectedDetail(activity.evaluationData);
      setShowDetailModal(true);
    }
  };

  if (!currentTheme) return null

  return (
    <div className="mt-4">
      <div className="border rounded-md">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${localActiveTab === "Actividades" ? "bg-blue-50 border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setLocalActiveTab("Actividades")}
          >
            Actividades
          </button>
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${localActiveTab === "Exámenes" ? "bg-blue-50 border-b-2 border-blue-500" : ""
              }`}
            onClick={() => setLocalActiveTab("Exámenes")}
          >
            Exámenes
          </button>
          <button
            className={`px-4 py-2 block text-sm font-medium text-gray-700 ${localActiveTab === "Material" ? "bg-blue-50 border-b-2 border-blue-500" : ""
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
                  placeholder={`Seleccionar ${localActiveTab === "Material" ? "material" : localActiveTab === "Exámenes" ? "examen" : "actividad"
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

      <EvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => setShowEvaluationModal(false)}
        onSubmit={handleEvaluationSubmit}
        evaluation={evaluationType === "Examen" ? { tipoEvaluacion: "Examen" } : { tipoEvaluacion: "Actividad" }}
      />

      <EvaluationDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        evaluation={selectedDetail}
      />

      <SupportMaterialModal
        isOpen={showSupportMaterialModal}
        onClose={() => setShowSupportMaterialModal(false)}
        onSubmit={handleSupportMaterialSubmit}
      />

       {/* Modal de detalle del material - Versión mejorada */}
      {showMaterialDetailModal && selectedMaterial && (
        <MaterialDetail 
          material={selectedMaterial} 
          onClose={() => {
            setShowMaterialDetailModal(false);
            setSelectedMaterial(null);
          }} 
        />
      )}
    </div>
  )
}