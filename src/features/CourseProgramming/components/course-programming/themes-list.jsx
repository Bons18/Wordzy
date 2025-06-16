"use client"

import { Trash } from "lucide-react"
import Tooltip from "../../../../shared/components/Tooltip"
import CustomSelect from "./ui/custom-select"
import ActivitiesSection from "./activities-section"

export default function ThemesList({ level, levels, setLevels, activeTabs, setActiveTabs, createdTopics = [] }) {
  const themeOptions = [
    ...(createdTopics || [])
  ]

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

  const getThemeDisplayName = (theme) => {
    return theme.selectedTheme?.label || "Tema"
  }

  const getLocalActiveTab = (levelId, themeId) => {
    return activeTabs[`${levelId}-${themeId}`] || "Actividades"
  }

  const setLocalActiveTab = (levelId, themeId, tab) => {
    setActiveTabs((prev) => ({
      ...prev,
      [`${levelId}-${themeId}`]: tab,
    }))
  }

  const calculateTotalThemeValue = () => {
    return level.themes?.reduce((total, theme) => total + (theme.progress || 0), 0) || 0
  }

  const totalThemeValue = calculateTotalThemeValue()
  const isValueValid = totalThemeValue === 100

  return (
    <div className="space-y-3">
      {level.themes?.length > 0 && (
        <div className="flex justify-between items-center px-2 py-1 bg-gray-50 rounded">
          <span className="text-sm font-medium">Valor total de temas:</span>
          <span className={`text-sm font-medium ${isValueValid ? "text-green-600" : "text-red-600"}`}>
            {totalThemeValue}% {isValueValid ? "✓" : `(debe ser 100%)`}
          </span>
        </div>
      )}

      {level.themes?.map((theme) => (
        <div key={theme.id} className="border rounded-md">
          <div
            className="flex items-center justify-between p-2 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onClick={() => toggleThemeExpand(level.id, theme.id)}
          >
            <div className="flex items-center justify-between w-full">
              <h4 className="block text-sm font-medium text-gray-700">{getThemeDisplayName(theme)}</h4>
              {theme.progress > 0 && (
                <span className="mr-1 block text-sm font-medium text-gray-700">{theme.progress}%</span>
              )}
            </div>
            <div className="flex items-center">
              <Tooltip text="Eliminar" position="top">
                <button
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteTheme(level.id, theme.id)
                  }}
                >
                  <Trash className="h-4 w-6 text-red-500" />
                </button>
              </Tooltip>
              {theme.expanded ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>

          {theme.expanded && (
            <div className="p-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tema <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    placeholder="Seleccionar tema"
                    options={themeOptions}
                    value={theme.selectedTheme} 
                    onChange={(value) => updateTheme(level.id, theme.id, value)} 
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full rounded-l-md border border-gray-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-sm text-white rounded-md"
                onClick={() => toggleActivitiesSection(level.id, theme.id)}
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Añadir Evaluaciones y Material
              </button>

              {theme.showActivities && (
                <ActivitiesSection
                  levelId={level.id}
                  themeId={theme.id}
                  localActiveTab={getLocalActiveTab(level.id, theme.id)}
                  setLocalActiveTab={(tab) => setLocalActiveTab(level.id, theme.id, tab)}
                  levels={levels}
                  setLevels={setLevels}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}