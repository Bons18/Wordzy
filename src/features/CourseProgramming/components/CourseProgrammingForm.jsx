"use client"

import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function CourseProgramming() {
  const [selectedProgram, setSelectedProgram] = useState("")
  const [levels, setLevels] = useState([]) // Inicialmente sin niveles
  const [activeStatus, setActiveStatus] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

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
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Programación de los Cursos</h1>
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
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
                  {level.expanded ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
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
                      onClick={() =>''} //agregar modal de crear tema
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Crear Tema
                    </button>
                    <button
                      className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                      onClick={() => addTheme(level.id)}
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
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
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
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
                              <div className="flex items-end space-x-2">
                                <div className="flex-1">
                                  <label className="block mb-1 text-sm font-medium">Valor</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2"
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
                                <span className="mb-2">%</span>
                              </div>
                            </div>
                            <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md">
                              <svg
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Añadir Evaluaciones/Material
                            </button>
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
      </div>
    </div>
  )
}

