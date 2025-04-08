"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"

export default function CourseProgramming() {
  const navigate = useNavigate()
  const [selectedProgram, setSelectedProgram] = useState("")
  const [levels, setLevels] = useState([]) // Inicialmente sin niveles
  const [activeStatus, setActiveStatus] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)
  const [isFormDirty, setIsFormDirty] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const { logout } = useAuth()
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
  
    const handleLogoutClick = () => {
      setIsDropdownOpen(false)
      setShowLogoutConfirm(true)
    }
  
    const handleLogout = () => {
      logout()
      navigate("/login")
    }

  const examOptions = [
    { value: "examen1", label: "Seleccionar examen" },
    { value: "examen2", label: "Examen Parcial" },
    { value: "examen3", label: "Examen Final" },
    { value: "examen4", label: "Quiz" },
  ]

  const materialOptions = [
    { value: "material1", label: "Seleccionar material" },
    { value: "material2", label: "Documento PDF" },
    { value: "material3", label: "Video Tutorial" },
    { value: "material4", label: "Presentación" },
  ]

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

  const themeOptions = [
    { value: "tema1", label: "Tema 1" },
    { value: "tema2", label: "Tema 2" },
    { value: "tema3", label: "Tema 3" },
  ]

  const activityOptions = [
    { value: "actividad1", label: "Seleccionar actividad" },
    { value: "actividad2", label: "Selección Múltiple" },
    { value: "actividad3", label: "Relacionar" },
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

  const handleCreateProgramming = () => {
    // Crear un objeto con la información de la programación
    const newProgramming = {
      id: Math.floor(Math.random() * 1000) + 6, // Generar un ID aleatorio mayor que los existentes
      nombre: selectedProgram ? programOptions.find((p) => p.value === selectedProgram)?.label : "Nueva Programación",
      fechaInicio: startDate || "01-01-2023",
      fechaFin: endDate || "01-06-2025",
      estado: activeStatus ? "Activo" : "Inactivo",
    }

    // En un caso real, aquí se haría una llamada a una API
    // Para simular, guardamos en localStorage
    try {
      // Obtener programaciones existentes
      const existingSchedules = JSON.parse(localStorage.getItem("courseSchedules") || "[]")

      // Agregar la nueva programación
      const updatedSchedules = [...existingSchedules, newProgramming]

      // Guardar en localStorage
      localStorage.setItem("courseSchedules", JSON.stringify(updatedSchedules))

      // Mostrar mensaje de éxito
      setSuccessMessage("Programación creada exitosamente")
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

  const toggleLevelExpand = (levelId) => {
    setLevels(levels.map((level) => (level.id === levelId ? { ...level, expanded: !level.expanded } : level)))
  }

  const updateLevelName = (levelId, name) => {
    setLevels(levels.map((level) => (level.id === levelId ? { ...level, name } : level)))
  }

  const addTheme = (levelId) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const newTheme = {
            id: level.themes.length + 1,
            name: "",
            selectedTheme: "",
            expanded: false,
            progress: 0,
            activities: [],
            showActivities: false,
          }
          return { ...level, themes: [...level.themes, newTheme] }
        }
        return level
      }),
    )
  }

  const toggleThemeExpand = (levelId, themeId) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) =>
            theme.id === themeId ? { ...theme, expanded: !theme.expanded } : theme,
          )
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  const updateTheme = (levelId, themeId, selectedTheme) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) =>
            theme.id === themeId ? { ...theme, selectedTheme } : theme,
          )
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  const deleteLevel = (levelId) => {
    setLevels(levels.filter((level) => level.id !== levelId))
  }

  const deleteTheme = (levelId, themeId) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.filter((theme) => theme.id !== themeId)
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  const toggleActivitiesSection = (levelId, themeId) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const updatedThemes = level.themes.map((theme) =>
            theme.id === themeId ? { ...theme, showActivities: !theme.showActivities } : theme,
          )
          return { ...level, themes: updatedThemes }
        }
        return level
      }),
    )
  }

  // Custom dropdown component
  const CustomSelect = ({ placeholder, options = [], value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    // Find the selected option label
    const selectedOption = options.find((option) => option.value === value)
    const displayText = selectedOption ? selectedOption.label : placeholder

    return (
      <div className="relative">
        <button
          type="button"
          className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>{displayText}</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
            <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer select-none px-3 py-2 hover:bg-gray-100 ${value === option.value ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  // Custom toggle switch component
  const ToggleSwitch = ({ checked, onChange }) => {
    return (
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${checked ? "bg-green-500" : "bg-gray-200"}`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    )
  }

  // Get level display name
  const getLevelDisplayName = (level) => {
    return level.name ? level.name : `Nivel ${level.id}`
  }

  // Get theme display name
  const getThemeDisplayName = (theme) => {
    if (theme.selectedTheme) {
      const selectedOption = themeOptions.find((option) => option.value === theme.selectedTheme)
      return selectedOption ? selectedOption.label : `Tema ${theme.id}`
    }
    return `Tema ${theme.id}`
  }

  // Componente para la sección de actividades
  const ActivitiesSection = ({ levelId, themeId }) => {
    const [selectedActivity, setSelectedActivity] = useState("")
    const [activityValue, setActivityValue] = useState("")
    const [localActiveTab, setLocalActiveTab] = useState("Actividades")

    // Encontrar el nivel y tema actual
    const currentLevel = levels.find((level) => level.id === levelId)
    const currentTheme = currentLevel?.themes.find((theme) => theme.id === themeId)

    // Si no se encuentra el tema, no mostrar nada
    if (!currentTheme) return null

    // Obtener las opciones según la pestaña activa
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

    // Obtener las actividades del tema actual
    const themeActivities = currentTheme.activities || []

    const addNewActivity = () => {
      if (localActiveTab !== "Material" && (!selectedActivity || activityValue <= 0)) return
      if (localActiveTab === "Material" && !selectedActivity) return

      const options = getOptionsForActiveTab()
      const selectedOption = options.find((opt) => opt.value === selectedActivity)
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

    return (
      <div className="mt-4">
        <div className="border rounded-md">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${localActiveTab === "Actividades" ? "bg-blue-50 border-b-2 border-blue-500" : ""}`}
              onClick={() => setLocalActiveTab("Actividades")}
            >
              Actividades
            </button>
            <button
              className={`px-4 py-2 ${localActiveTab === "Exámenes" ? "bg-blue-50 border-b-2 border-blue-500" : ""}`}
              onClick={() => setLocalActiveTab("Exámenes")}
            >
              Exámenes
            </button>
            <button
              className={`px-4 py-2 ${localActiveTab === "Material" ? "bg-blue-50 border-b-2 border-blue-500" : ""}`}
              onClick={() => setLocalActiveTab("Material")}
            >
              Material de Apoyo
            </button>
          </div>

          <div className="p-4">
            <div>
              <h3 className="font-medium mb-4">{localActiveTab}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className={localActiveTab === "Material" ? "col-span-3" : "col-span-2"}>
                  <label className="block mb-1 text-sm font-medium">
                    {localActiveTab === "Material"
                      ? "Material"
                      : localActiveTab === "Exámenes"
                        ? "Examen"
                        : "Actividad"}
                  </label>
                  <CustomSelect
                    placeholder={`Seleccionar ${localActiveTab === "Material" ? "material" : localActiveTab === "Exámenes" ? "examen" : "actividad"}`}
                    options={getOptionsForActiveTab()}
                    value={selectedActivity}
                    onChange={setSelectedActivity}
                  />
                </div>
                {localActiveTab !== "Material" && (
                  <div>
                    <label className="block mb-1 text-sm font-medium">Valor</label>
                    <div className="flex items-center w-full">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full rounded-l-md border border-gray-300 px-3 py-1.5"
                        value={activityValue}
                        onChange={(e) => setActivityValue(Number.parseInt(e.target.value) || 0)}
                      />
                      <span className="bg-gray-100 border border-l-0 border-gray-300 px-2 py-1.5 rounded-r-md">%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mb-4">
                <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Crear{" "}
                  {localActiveTab === "Material" ? "Material" : localActiveTab === "Exámenes" ? "Examen" : "Actividad"}
                </button>
                <button
                  className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center"
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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredActivities().map((activity) => (
                      <tr key={activity.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="p-1 hover:bg-gray-100 rounded-full">
                              <Eye className="h-4 w-4 text-gray-500" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-100 rounded-full"
                              onClick={() => deleteActivity(activity.id)}
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">100%</span> por página
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700">{currentPage}</span>
                    <span className="text-sm text-gray-700">de</span>
                    <span className="text-sm text-gray-700">{totalPages}</span>
                    <span className="text-sm text-gray-700">páginas</span>
                    <button
                      className="p-1 rounded-md hover:bg-gray-200"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-gray-200"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Programacion De Cursos</h1>
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
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Añadir Programación</h1>
          </header>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium">Programa</label>
              <CustomSelect
                placeholder="Selecciona un Programa"
                options={programOptions}
                value={selectedProgram}
                onChange={(value) => setSelectedProgram(value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="font-medium">Fecha de Inicio</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Fecha de Fin</label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Estado</label>
                <div className="flex items-center pt-2">
                  <ToggleSwitch checked={activeStatus} onChange={setActiveStatus} />
                </div>
              </div>
            </div>

            <button
              onClick={addLevel}
              className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Añadir Nivel
            </button>

            <div className="space-y-4 mt-4">
              {levels.map((level) => (
                <div key={level.id} className="border rounded-md">
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleLevelExpand(level.id)}
                  >
                    <h3 className="font-medium">{getLevelDisplayName(level)}</h3>
                    <div className="flex items-center">
                      <button
                        className="p-1 hover:bg-gray-100 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLevel(level.id)
                        }}
                      >
                        <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      {level.expanded ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {level.expanded && (
                    <div className="p-4 border-t">
                      <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium">Nombre del Nivel</label>
                        <input
                          type="text"
                          placeholder="Nombre del nivel"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          value={level.name}
                          onChange={(e) => updateLevelName(level.id, e.target.value)}
                        />
                      </div>

                      <div className="flex space-x-2 mb-4">
                        <button
                          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                          onClick={() => { }} // Agregar modal de crear tema
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Crear Tema
                        </button>
                        <button
                          className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                          onClick={() => addTheme(level.id)}
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Añadir Tema
                        </button>
                      </div>

                      <div className="space-y-3">
                        {level.themes.map((theme) => (
                          <div key={theme.id} className="border rounded-md">
                            <div
                              className="flex items-center justify-between p-3 cursor-pointer"
                              onClick={() => toggleThemeExpand(level.id, theme.id)}
                            >
                              <div className="flex items-center">
                                <h4 className="font-medium">{getThemeDisplayName(theme)}</h4>
                                {theme.progress > 0 && (
                                  <span className="ml-2 text-sm text-gray-500">{theme.progress}%</span>
                                )}
                              </div>
                              <div className="flex items-center">
                                <button
                                  className="p-1 hover:bg-gray-100 rounded-full"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTheme(level.id, theme.id)
                                  }}
                                >
                                  <svg
                                    className="h-4 w-4 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                                {theme.expanded ? (
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                  </svg>
                                ) : (
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                )}
                              </div>
                            </div>

                            {theme.expanded && (
                              <div className="p-4 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block mb-1 text-sm font-medium">Tema</label>
                                    <CustomSelect
                                      placeholder="Seleccionar tema"
                                      options={themeOptions}
                                      value={theme.selectedTheme}
                                      onChange={(value) => updateTheme(level.id, theme.id, value)}
                                    />
                                  </div>
                                  <div className="flex items-end">
                                    <div className="flex-1">
                                      <label className="block mb-1 text-sm font-medium">Valor</label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        className="w-full rounded-l-md border border-gray-300 px-3 py-1.5"
                                        value={theme.progress || ""}
                                        onChange={(e) => {
                                          const value = Number.parseInt(e.target.value) || 0
                                          const updatedLevels = levels.map((l) => {
                                            if (l.id === level.id) {
                                              const updatedThemes = l.themes.map((t) =>
                                                t.id === theme.id ? { ...t, progress: value } : t,
                                              )
                                              return { ...l, themes: updatedThemes }
                                            }
                                            return l
                                          })
                                          setLevels(updatedLevels)
                                        }}
                                      />
                                    </div>
                                    <span className="bg-gray-100 border border-l-0 border-gray-300 px-2 py-1.5 rounded-r-md">%</span>
                                  </div>
                                </div>
                                <button
                                  className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                  onClick={() => toggleActivitiesSection(level.id, theme.id)}
                                >
                                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                  </svg>
                                  Añadir Evaluaciones y Material
                                </button>

                                {/* Sección de actividades */}
                                {theme.showActivities && <ActivitiesSection levelId={level.id} themeId={theme.id} />}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Botones fijos en la parte inferior */}
            <div className="sticky bottom-0 bg-white py-4 border-t mt-8 flex justify-between">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProgramming}
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                Crear Programación
              </button>
            </div>
          </div>
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
      </div>
    </div>
  )
}

