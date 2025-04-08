"use client"

import { Trash } from "lucide-react"
import Tooltip from "../../../../shared/components/Tooltip"
import ThemesList from "./themes-list"

export default function LevelsList({ levels, setLevels, activeTabs, setActiveTabs }) {
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

  const deleteLevel = (levelId) => {
    setLevels(levels.filter((level) => level.id !== levelId))
  }

  // Get level display name
  const getLevelDisplayName = (level) => {
    return level.name ? level.name : `Nivel ${level.id}`
  }

  return (
    <div className="space-y-4 mt-4">
      {levels.map((level) => (
        <div key={level.id} className="border rounded-md">
          <div
            className="flex items-center justify-between p-2 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onClick={() => toggleLevelExpand(level.id)}
          >
            <h3 className="block text-sm font-medium text-gray-700">{getLevelDisplayName(level)}</h3>
            <div className="flex items-center">
              <Tooltip text="Eliminar" position="top">
                <button
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteLevel(level.id)
                  }}
                >
                  <Trash className="h-4 w-6 text-red-500" />
                </button>
              </Tooltip>
              {level.expanded ? (
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

          {level.expanded && (
            <div className="p-4 border-t">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Nivel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre del nivel"
                  className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={level.name}
                  onChange={(e) => updateLevelName(level.id, e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <button
                    className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-sm text-white rounded-md"
                    onClick={() => {}} // Agregar modal de crear tema
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Crear Tema
                  </button>
                  <button
                    className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-sm text-white rounded-md"
                    onClick={() => addTheme(level.id)}
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Añadir Tema
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {level.themes.length} {level.themes.length === 1 ? "tema" : "temas"}
                </div>
              </div>

              <ThemesList
                level={level}
                levels={levels}
                setLevels={setLevels}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
