import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { format, parseISO } from "date-fns"
import ConfirmationModal from "../../../../shared/components/ConfirmationModal"
import LevelsList from "./levels-list"
import CustomSelect from "./ui/custom-select"
import ToggleSwitch from "./ui/toggle-switch"
import { useGetPrograms } from "../../../Programs/hooks/useGetPrograms"
import { usePostCourseProgramming } from "../../hooks/usePostCoursePrograming"
import { usePutCourseProgramming } from "../../hooks/usePutCoursePrograming"
import { useGetCourseProgrammingById } from "../../hooks/useGetCourseProgrammingById"


export default function CourseProgrammingForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { programming } = useGetCourseProgrammingById(id)
  const { programs } = useGetPrograms()
  const { postCourseProgramming, loading: postLoading, error: postError } = usePostCourseProgramming()
  const { putCourseProgramming, loading: putLoading, error: putError } = usePutCourseProgramming()


  const [selectedProgram, setSelectedProgram] = useState("")
  const [levels, setLevels] = useState([])
  const [activeStatus, setActiveStatus] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isFormDirty, setIsFormDirty] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [activeTabs, setActiveTabs] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [validationErrors, setValidationErrors] = useState([])
  const [showValidationModal, setShowValidationModal] = useState(false)

  // Cargar datos de programación existente para edición
  useEffect(() => {
    if (id && programming) {
      setIsEditMode(true)
      setSelectedProgram(programming.programId._id)
      setStartDate(format(parseISO(programming.startDate), "yyyy-MM-dd"))
      setEndDate(programming.endDate ? format(parseISO(programming.endDate), "yyyy-MM-dd") : "")
      setActiveStatus(programming.status)

      const transformedLevels = (programming.levels || []).map(level => ({
        _id: level._id,
        id: level._id,
        name: level.name,
        expanded: false,
        themes: (level.topics || []).map(topic => {
          const selectedOption = topic.topicId
            ? { value: topic.topicId._id, label: topic.topicId.name }
            : null

          return {
            _id: topic._id,
            id: topic._id,
            selectedTheme: selectedOption,
            progress: topic.value,
            expanded: false,
            showActivities: false,
            activities: [
              ...(topic.activities || []).map(act => ({
                id: act._id,
                name: act.evaluationId?.nombre || "Actividad",
                value: `${act.value}%`,
                type: "Actividades",
                evaluationData: act.evaluationId ? { ...act, ...act.evaluationId } : act,
                evaluationId: act.evaluationId?._id || act.evaluationId,
              })),
              ...(topic.exams || []).map(exam => ({
                id: exam._id,
                name: exam.evaluationId?.nombre || "Examen",
                value: `${exam.value}%`,
                type: "Exámenes",
                evaluationData: exam.evaluationId ? { ...exam, ...exam.evaluationId } : exam,
                evaluationId: exam.evaluationId?._id || exam.evaluationId,
              })),
              ...(topic.materials || []).map(mat => ({
                id: mat._id,
                name: mat.materialId?.titulo || "Material",
                value: "N/A",
                type: "Material",
                evaluationData: mat.materialId ? { ...mat, ...mat.materialId } : mat
              }))
            ]
          }
        })
      }))

      setLevels(transformedLevels)
    }
  }, [id, programming])

  const transformDataForBackend = () => {
    return {
      programId: selectedProgram,
      startDate: new Date(startDate).toISOString(),
      endDate: endDate ? new Date(endDate).toISOString() : null,
      status: activeStatus,
      levels: levels.map(level => ({
        name: level.name,
        topics: level.themes.map(theme => {
          const activities = theme.activities?.filter(a => a.type === "Actividades") || []
          const exams = theme.activities?.filter(a => a.type === "Exámenes") || []
          const materials = theme.activities?.filter(a => a.type === "Material") || []

          return {
            topicId: typeof theme.selectedTheme === 'object' && theme.selectedTheme?.value
              ? theme.selectedTheme.value
              : theme.selectedTheme, // esto evita que se mande un objeto entero
            value: theme.progress || 0,
            activities: activities.map(a => ({
              evaluationId: a.evaluationData._id,
              value: parseInt(a.value.replace('%', ''))
            })),
            exams: exams.map(e => ({
              evaluationId: e.evaluationData._id,
              value: parseInt(e.value.replace('%', ''))
            })),
            materials: materials.map(m => ({
              materialId: m.evaluationData._id
            }))
          }
        })
      }))
    }
  }


  const validateForm = () => {
    const errors = []

    // Validaciones básicas
    if (!selectedProgram) {
      errors.push("Debe seleccionar un programa")
    }

    if (!startDate) {
      errors.push("Debe ingresar una fecha de inicio")
    }

    // Validar que existan al menos 3 niveles
    if (levels.length < 3) {
      errors.push("Debe añadir al menos tres niveles")
    }

    // Validar que cada uno de los tres primeros niveles tenga nombre
    levels.slice(0, 3).forEach((level, index) => {
      if (!level.name || level.name.trim() === "") {
        errors.push(`El nivel ${index + 1} debe tener un nombre`)
      }
    })

    // Validar solo el primer nivel
    if (levels.length > 0) {
      const firstLevel = levels[0]
      const firstLevelName = firstLevel.name || "Nivel 1"

      // 1. Validar que tenga al menos un tema
      if (!firstLevel.themes || firstLevel.themes.length === 0) {
        errors.push(`${firstLevelName} debe tener al menos un tema`)
      } else {
        // 2. Validar que la suma de valores de los temas sea 100%
        const themeSum = firstLevel.themes.reduce((sum, theme) => sum + (theme.progress || 0), 0)
        if (themeSum !== 100) {
          errors.push(`La suma de valores de los temas en ${firstLevelName} debe ser 100% (actual: ${themeSum}%)`)
        }

        // 3. Validar actividades, exámenes y materiales por tema
        firstLevel.themes.forEach((theme, themeIndex) => {
          const activities = (theme.activities || []).filter(a => a.type === "Actividades")
          const exams = (theme.activities || []).filter(a => a.type === "Exámenes")
          const materials = (theme.activities || []).filter(a => a.type === "Material")

          // Actividades
          if (activities.length === 0) {
            errors.push(`El tema ${themeIndex + 1} del ${firstLevelName} necesita al menos una actividad`)
          } else {
            const actSum = activities.reduce((sum, a) => {
              const value = parseInt(a.value?.replace('%', '') || 0)
              return sum + value
            }, 0)
            if (actSum !== 100) {
              errors.push(`Las actividades del tema ${themeIndex + 1} (${firstLevelName}) suman ${actSum}% (deben sumar 100%)`)
            }

            activities.forEach((a, i) => {
              if (!a.evaluationId) {
                errors.push(`La actividad ${i + 1} del tema ${themeIndex + 1} (${firstLevelName}) no tiene un ID válido`)
              }
              if (a.value == null || a.value === "") {
                errors.push(`La actividad ${i + 1} del tema ${themeIndex + 1} (${firstLevelName}) no tiene un valor asignado`)
              }
            })
          }

          // Exámenes
          if (exams.length === 0) {
            errors.push(`El tema ${themeIndex + 1} del ${firstLevelName} necesita al menos un examen`)
          } else {
            const examSum = exams.reduce((sum, e) => {
              const value = parseInt(e.value?.replace('%', '') || 0)
              return sum + value
            }, 0)
            if (examSum !== 100) {
              errors.push(`Los exámenes del tema ${themeIndex + 1} (${firstLevelName}) suman ${examSum}% (deben sumar 100%)`)
            }

            exams.forEach((e, i) => {
              if (!e.evaluationId) {
                errors.push(`El examen ${i + 1} del tema ${themeIndex + 1} (${firstLevelName}) no tiene un ID válido`)
              }
              if (e.value == null || e.value === "") {
                errors.push(`El examen ${i + 1} del tema ${themeIndex + 1} (${firstLevelName}) no tiene un valor asignado`)
              }
            })
          }

          // Materiales de apoyo
          if (materials.length === 0) {
            errors.push(`El tema ${themeIndex + 1} del ${firstLevelName} necesita al menos un material de apoyo`)
          }
        })
      }
    }

    return errors
  }



  const handleSaveProgramming = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      setValidationErrors(errors)
      setShowValidationModal(true)
      return
    }

    const programmingData = transformDataForBackend()

    try {
      let result
      if (isEditMode) {
        result = await putCourseProgramming(id, programmingData)
        setSuccessMessage("Programación actualizada exitosamente")
      } else {
        console.log("🟢 Payload enviado al backend:", JSON.stringify(programmingData, null, 2));
        result = await postCourseProgramming(programmingData)
        setSuccessMessage("Programación creada exitosamente")
      }

      setShowSuccessModal(true)
      setTimeout(() => {
        navigate("/programacion/programacionCursos")
      }, 1500)
    } catch (error) {
      setSuccessMessage(error.message || "Ocurrió un error al guardar")
      setShowSuccessModal(true)
    }
  }

  const addLevel = () => {
    const newLevel = {
      id: `level-${Date.now()}`,
      name: "",
      expanded: true,
      themes: []
    }
    setLevels([...levels, newLevel])
  }

  const handleCancel = () => {
    if (isFormDirty) {
      setShowCancelConfirm(true)
    } else {
      navigate("/programacion/programacionCursos")
    }
  }

  const confirmCancel = () => {
    navigate("/programacion/programacionCursos")
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false)
    navigate("/programacion/programacionCursos")
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-[#1f384c] mb-4">
          {isEditMode ? "EDITAR PROGRAMACIÓN" : "AÑADIR PROGRAMACIÓN"}
        </h1>
      </header>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Programa <span className="text-red-500">*</span>
          </label>
          <CustomSelect
            placeholder="Selecciona un Programa"
            options={programs.map(program => ({
              value: program._id,
              label: program.name
            }))}
            value={selectedProgram}
            onChange={setSelectedProgram}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
            <input
              type="date"
              className="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <div className="flex items-center pt-2">
              <ToggleSwitch checked={activeStatus} onChange={setActiveStatus} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={addLevel}
            className="flex items-center px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md"
            disabled={postLoading || putLoading}
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Añadir Nivel
          </button>
          <div className="text-sm text-gray-500">{levels.length} de 3 niveles mínimos requeridos</div>
        </div>

        <LevelsList
          levels={levels}
          setLevels={setLevels}
          activeTabs={activeTabs}
          setActiveTabs={setActiveTabs}
        />

        <div className="bg-white py-4 border-t mt-8 flex justify-between">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
            disabled={postLoading || putLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveProgramming}
            className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
            disabled={postLoading || putLoading}
          >
            {(postLoading || putLoading) ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? "Guardando..." : "Creando..."}
              </span>
            ) : (
              isEditMode ? "Guardar Cambios" : "Añadir Programación"
            )}
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={confirmCancel}
        title="Cancelar Cambios"
        message="¿Está seguro que desea cancelar? Se perderán los cambios no guardados."
        confirmText="Cancelar Cambios"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={handleSuccessConfirm}
        title="Operación Exitosa"
        message={successMessage}
        confirmText="Aceptar"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />

      <ConfirmationModal
        isOpen={showValidationModal}
        onConfirm={() => setShowValidationModal(false)}
        title="Error de Validación"
        message={
          <div className="max-h-96 overflow-y-auto">
            <p className="mb-2">Por favor corrija los siguientes errores antes de continuar:</p>
            <ul className="list-disc list-inside space-y-1 pl-0">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        }
        confirmText="Entendido"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />
    </div>
  )
}