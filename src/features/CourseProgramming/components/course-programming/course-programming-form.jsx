"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "../../../../shared/utils/dateFormatter"
import ConfirmationModal from "../../../../shared/components/ConfirmationModal"
import LevelsList from "./levels-list"
import CustomSelect from "./ui/custom-select"
import ToggleSwitch from "./ui/toggle-switch"

export default function CourseProgrammingForm() {
  const navigate = useNavigate()
  const { id } = useParams() // Para edición
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

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (id) {
      setIsEditMode(true)
      loadProgrammingData(id)
    }
  }, [id])

  const loadProgrammingData = (programmingId) => {
    try {
      // Obtener programaciones existentes
      const existingSchedules = JSON.parse(localStorage.getItem("courseSchedules") || "[]")
      const defaultSchedules = [
        { id: 1, nombre: "Programa 1", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 2, nombre: "Programa 2", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 3, nombre: "Programa 3", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 4, nombre: "Programa 4", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 5, nombre: "Programa 5", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
      ]

      // Combinar programaciones predeterminadas y guardadas
      const allSchedules = [...defaultSchedules, ...existingSchedules]

      // Buscar la programación por ID
      const programming = allSchedules.find((p) => p.id.toString() === programmingId.toString())

      if (programming) {
        // Encontrar el programa correspondiente en las opciones
        const programOptions = [
          { value: "programa1", label: "Programa 1" },
          { value: "programa2", label: "Programa 2" },
          { value: "programa3", label: "Programa 3" },
        ]

        const programOption = programOptions.find((p) => p.label === programming.nombre)

        // Establecer los valores del formulario
        setSelectedProgram(programOption ? programOption.value : "")
        setActiveStatus(programming.estado === "Activo")

        // Convertir fechas al formato esperado por el input date
        if (programming.fechaInicio) {
          const [day, month, year] = programming.fechaInicio.split("-")
          setStartDate(`${year}-${month}-${day}`)
        }

        if (programming.fechaFin) {
          const [day, month, year] = programming.fechaFin.split("-")
          setEndDate(`${year}-${month}-${day}`)
        }

        // Cargar niveles si existen
        if (programming.levels) {
          setLevels(programming.levels)
        }
      } else {
        console.error("Programación no encontrada")
      }
    } catch (error) {
      console.error("Error al cargar datos de programación:", error)
    }
  }

  // Marcar el formulario como modificado cuando cambia cualquier valor importante
  useEffect(() => {
    if (selectedProgram || levels.length > 0 || startDate || endDate) {
      setIsFormDirty(true)
    }
  }, [selectedProgram, levels, startDate, endDate])

  const programOptions = [
    { value: "programa1", label: "Programa 1" },
    { value: "programa2", label: "Programa 2" },
    { value: "programa3", label: "Programa 3" },
  ]

  const handleCancel = () => {
    // Confirmar si hay cambios sin guardar
    if (isFormDirty) {
      setShowCancelConfirm(true)
    } else {
      navigate("/programacion/programacionCursos")
    }
  }

  const confirmCancel = () => {
    navigate("/programacion/programacionCursos")
  }

  // Función para verificar duplicados en nombres de niveles
  const checkDuplicateLevelNames = () => {
    const levelNames = levels.map((level) => level.name?.trim()).filter((name) => name && name.length > 0)

    const duplicateNames = levelNames.filter((name, index) => levelNames.indexOf(name) !== index)

    if (duplicateNames.length > 0) {
      return [`Nombres de niveles duplicados: ${[...new Set(duplicateNames)].join(", ")}`]
    }
    return []
  }

  // Función para verificar temas duplicados
  const checkDuplicateThemes = () => {
    const allThemes = []
    const duplicateThemes = []

    levels.forEach((level) => {
      if (level.themes) {
        level.themes.forEach((theme) => {
          if (theme.selectedTheme) {
            if (allThemes.includes(theme.selectedTheme)) {
              // Encontrar el nombre del tema para el mensaje de error
              const themeOptions = [
                { value: "tema1", label: "Tema 1" },
                { value: "tema2", label: "Tema 2" },
                { value: "tema3", label: "Tema 3" },
              ]
              const themeName = themeOptions.find((t) => t.value === theme.selectedTheme)?.label || theme.selectedTheme

              if (!duplicateThemes.includes(themeName)) {
                duplicateThemes.push(themeName)
              }
            } else {
              allThemes.push(theme.selectedTheme)
            }
          }
        })
      }
    })

    if (duplicateThemes.length > 0) {
      return [`Temas duplicados: ${duplicateThemes.join(", ")}`]
    }
    return []
  }

  // Función para verificar actividades, exámenes y materiales duplicados
  const checkDuplicateActivities = () => {
    const errors = []
    const activities = { Actividades: [], Exámenes: [], Material: [] }

    levels.forEach((level) => {
      if (level.themes) {
        level.themes.forEach((theme) => {
          if (theme.activities) {
            theme.activities.forEach((activity) => {
              const type = activity.type
              const activityKey = `${activity.name}-${type}`

              if (activities[type].includes(activityKey)) {
                // Verificar si ya hemos reportado este tipo de duplicado
                const errorMsg = `${activity.name} duplicado en la sección de ${type}`
                if (!errors.some((e) => e.includes(errorMsg))) {
                  errors.push(errorMsg)
                }
              } else {
                activities[type].push(activityKey)
              }
            })
          }
        })
      }
    })

    return errors
  }

  // Función para validar el formulario
  const validateForm = () => {
    const errors = []

    // 1. Validar que se haya seleccionado un programa
    if (!selectedProgram) {
      errors.push("Debe seleccionar un programa")
    }

    // 2. Validar que se haya ingresado una fecha de inicio
    if (!startDate) {
      errors.push("Debe ingresar una fecha de inicio")
    }

    // 3. Validar que haya al menos 3 niveles
    if (levels.length < 3) {
      errors.push(`Debe añadir al menos 3 niveles (actualmente tiene ${levels.length})`)
    }

    // 4, 5, 6, 7, 8, 9, 10. Validaciones para niveles, temas, actividades y exámenes
    let totalThemeValue = 0
    const levelsWithoutThemes = []
    const themesWithoutValue = []
    const themesWithoutMaterial = []
    const themesWithoutEvaluations = []
    const activitiesNotSum100 = []
    const examsNotSum100 = []

    levels.forEach((level, levelIndex) => {
      // 4. Validar que cada nivel tenga al menos un tema
      if (!level.themes || level.themes.length === 0) {
        levelsWithoutThemes.push(`Nivel ${level.name || levelIndex + 1}`)
      } else {
        let levelThemeValue = 0

        level.themes.forEach((theme, themeIndex) => {
          // 5. Validar que cada tema tenga un valor asignado
          if (!theme.progress || theme.progress <= 0) {
            themesWithoutValue.push(`Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1}`)
          } else {
            levelThemeValue += theme.progress
          }

          // 7. Validar que cada tema tenga material y evaluaciones
          if (!theme.activities || !theme.activities.some((a) => a.type === "Material")) {
            themesWithoutMaterial.push(`Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1}`)
          }

          if (!theme.activities || !theme.activities.some((a) => a.type === "Actividades" || a.type === "Exámenes")) {
            themesWithoutEvaluations.push(`Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1}`)
          }

          // 8, 9, 10. Validar valores de actividades y exámenes
          if (theme.activities && theme.activities.length > 0) {
            // Calcular suma de valores para actividades
            const activities = theme.activities.filter((a) => a.type === "Actividades")
            if (activities.length > 0) {
              let activityValueSum = 0
              let allHaveValues = true

              activities.forEach((activity) => {
                const valueStr = activity.value.replace("%", "")
                const value = Number.parseInt(valueStr)
                if (isNaN(value) || value <= 0) {
                  allHaveValues = false
                } else {
                  activityValueSum += value
                }
              })

              if (!allHaveValues) {
                errors.push(
                  `Algunas actividades en el Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1} no tienen valor asignado`,
                )
              } else if (activityValueSum !== 100) {
                activitiesNotSum100.push(
                  `Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1} (suma: ${activityValueSum}%)`,
                )
              }
            }

            // Calcular suma de valores para exámenes
            const exams = theme.activities.filter((a) => a.type === "Exámenes")
            if (exams.length > 0) {
              let examValueSum = 0
              let allHaveValues = true

              exams.forEach((exam) => {
                const valueStr = exam.value.replace("%", "")
                const value = Number.parseInt(valueStr)
                if (isNaN(value) || value <= 0) {
                  allHaveValues = false
                } else {
                  examValueSum += value
                }
              })

              if (!allHaveValues) {
                errors.push(
                  `Algunos exámenes en el Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1} no tienen valor asignado`,
                )
              } else if (examValueSum !== 100) {
                examsNotSum100.push(
                  `Tema ${themeIndex + 1} del Nivel ${level.name || levelIndex + 1} (suma: ${examValueSum}%)`,
                )
              }
            }
          }
        })

        // 6. Validar que la suma de valores de temas sea 100
        totalThemeValue += levelThemeValue
        if (levelThemeValue !== 100) {
          errors.push(
            `La suma de valores de los temas en el Nivel ${level.name || levelIndex + 1} debe ser 100% (actual: ${levelThemeValue}%)`,
          )
        }
      }
    })

    // Agregar errores específicos a la lista
    if (levelsWithoutThemes.length > 0) {
      errors.push(`Los siguientes niveles no tienen temas: ${levelsWithoutThemes.join(", ")}`)
    }

    if (themesWithoutValue.length > 0) {
      errors.push(`Los siguientes temas no tienen valor asignado: ${themesWithoutValue.join(", ")}`)
    }

    if (themesWithoutMaterial.length > 0) {
      errors.push(`Los siguientes temas no tienen material de apoyo: ${themesWithoutMaterial.join(", ")}`)
    }

    if (themesWithoutEvaluations.length > 0) {
      errors.push(`Los siguientes temas no tienen actividades o exámenes: ${themesWithoutEvaluations.join(", ")}`)
    }

    if (activitiesNotSum100.length > 0) {
      errors.push(`Las actividades de los siguientes temas no suman 100%: ${activitiesNotSum100.join(", ")}`)
    }

    if (examsNotSum100.length > 0) {
      errors.push(`Los exámenes de los siguientes temas no suman 100%: ${examsNotSum100.join(", ")}`)
    }

    // Validar duplicados
    errors.push(...checkDuplicateLevelNames())
    errors.push(...checkDuplicateThemes())
    errors.push(...checkDuplicateActivities())

    return errors
  }

  // Función para obtener el siguiente ID disponible
  const getNextId = () => {
    try {
      const existingSchedules = JSON.parse(localStorage.getItem("courseSchedules") || "[]")
      const defaultSchedules = [
        { id: 1, nombre: "Programa 1", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 2, nombre: "Programa 2", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 3, nombre: "Programa 3", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 4, nombre: "Programa 4", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
        { id: 5, nombre: "Programa 5", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
      ]

      // Combinar programaciones y encontrar el ID máximo
      const allSchedules = [...defaultSchedules, ...existingSchedules]
      const maxId = Math.max(...allSchedules.map((s) => s.id), 0)
      return maxId + 1
    } catch (error) {
      console.error("Error al obtener el siguiente ID:", error)
      return Math.floor(Math.random() * 1000) + 6 // Fallback
    }
  }

  const handleSaveProgramming = () => {
    // Validar el formulario
    const errors = validateForm()

    if (errors.length > 0) {
      setValidationErrors(errors)
      setShowValidationModal(true)
      return
    }

    const formattedStartDate = startDate ? formatDate(new Date(startDate)) : formatDate(new Date())
    const formattedEndDate = endDate ? formatDate(new Date(endDate)) : ""

    const programmingData = {
      id: isEditMode ? Number.parseInt(id) : getNextId(),
      nombre: selectedProgram ? programOptions.find((p) => p.value === selectedProgram)?.label : "Nueva Programación",
      fechaInicio: formattedStartDate,
      fechaFin: formattedEndDate,
      estado: activeStatus ? "Activo" : "Inactivo",
      levels: levels, // Guardar los niveles
    }

    try {
      // Obtener programaciones existentes
      const existingSchedules = JSON.parse(localStorage.getItem("courseSchedules") || "[]")

      if (isEditMode) {
        // Actualizar programación existente
        const updatedSchedules = existingSchedules.map((s) => (s.id.toString() === id.toString() ? programmingData : s))
        localStorage.setItem("courseSchedules", JSON.stringify(updatedSchedules))
        setSuccessMessage("Programación actualizada exitosamente")
      } else {
        // Agregar nueva programación
        const updatedSchedules = [...existingSchedules, programmingData]
        localStorage.setItem("courseSchedules", JSON.stringify(updatedSchedules))
        setSuccessMessage("Programación creada exitosamente")
      }

      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error al guardar la programación:", error)
      setSuccessMessage("Ocurrió un error al guardar la programación")
      setShowSuccessModal(true)
    }
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false)
    navigate("/programacion/programacionCursos")
  }

  const addLevel = () => {
    const newLevel = {
      id: levels.length + 1,
      name: "",
      expanded: false, // Nivel colapsado por defecto
      themes: [],
    }
    setLevels([...levels, newLevel])
  }

  return (
    <div className="max-w-3xl mx-auto py-2 p-6 bg-white rounded-lg shadow">
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
            options={programOptions}
            value={selectedProgram}
            onChange={(value) => setSelectedProgram(value)}
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
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Añadir Nivel
          </button>
          <div className="text-sm text-gray-500">{levels.length} de 3 niveles mínimos requeridos</div>
        </div>

        <LevelsList levels={levels} setLevels={setLevels} activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

        {/* Botones fijos en la parte inferior */}
        <div className="bg-white py-5 border-t flex justify-between">
          <button
            onClick={handleCancel}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveProgramming}
            className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
          >
            {isEditMode ? "Guardar Cambios" : "Añadir Programación"}
          </button>
        </div>
      </div>

      {/* Modal de confirmación para cancelar */}
      <ConfirmationModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={confirmCancel}
        title="Cancelar Cambios"
        message="¿Está seguro que desea cancelar? Se perderán los cambios no guardados."
        confirmText="Cancelar Cambios"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      {/* Modal de éxito */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={handleSuccessConfirm}
        title="Operación Exitosa"
        message={successMessage}
        confirmText="Aceptar"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />

      {/* Modal de errores de validación */}
      <ConfirmationModal
        isOpen={showValidationModal}
        onConfirm={() => setShowValidationModal(false)}
        title="Error de Validación"
        message={
          <div className="max-h-96 overflow-y-auto">
            <p className="mb-2">Por favor corrija los siguientes errores antes de continuar:</p>
            <ul className="list-disc pl-5 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-sm text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        }
        confirmText="Entendido"
        confirmColor="bg-blue-500 hover:bg-blue-600"
        showButtonCancel={false}
      />
    </div>
  )
}
