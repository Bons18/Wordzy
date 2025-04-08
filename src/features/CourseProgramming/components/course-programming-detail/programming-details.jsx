"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import Tooltip from "../../../../shared/components/Tooltip"

export default function ProgrammingDetails({ programming }) {
  const [expandedLevels, setExpandedLevels] = useState({})
  const [expandedThemes, setExpandedThemes] = useState({})
  const [activeTabsByTheme, setActiveTabsByTheme] = useState({})

  const toggleLevelExpand = (levelId) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }))
  }

  const toggleThemeExpand = (levelId, themeId) => {
    const key = `${levelId}-${themeId}`
    setExpandedThemes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const setActiveTab = (levelId, themeId, tab) => {
    const key = `${levelId}-${themeId}`
    setActiveTabsByTheme((prev) => ({
      ...prev,
      [key]: tab,
    }))
  }

  const getActiveTab = (levelId, themeId) => {
    const key = `${levelId}-${themeId}`
    return activeTabsByTheme[key] || "Actividades"
  }

  // Función para obtener el nombre del tema
  const getThemeName = (theme) => {
    if (theme.selectedTheme) {
      const themeOptions = [
        { value: "tema1", label: "Tema 1" },
        { value: "tema2", label: "Tema 2" },
        { value: "tema3", label: "Tema 3" },
      ]
      const selectedOption = themeOptions.find((option) => option.value === theme.selectedTheme)
      if (selectedOption) {
        return selectedOption.label
      }
    }
    return `Tema ${theme.id}`
  }

  // Filtrar actividades por tipo
  const getFilteredActivities = (activities, type) => {
    if (!activities) return []
    return activities.filter((activity) => activity.type === type)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-[#1f384c] mb-4">DETALLE DE PROGRAMACIÓN</h1>
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Programa</label>
            <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-700 text-sm">{programming.nombre}</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                programming.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {programming.estado}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-700 text-sm">{programming.fechaInicio}</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
            <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-700 text-sm">
              {programming.fechaFin || "No definida"}
            </div>
          </div>
        </div>

        {/* Mostrar niveles y temas */}
        <div className="border-t pt-4 mt-4">
          <h2 className="text-lg font-medium text-[#1f384c] mb-4">Niveles y Temas</h2>

          {programming.levels && programming.levels.length > 0 ? (
            <div className="space-y-4">
              {programming.levels.map((level) => (
                <div key={level.id} className="border rounded-md">
                  <div
                    className="flex items-center justify-between p-2 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    onClick={() => toggleLevelExpand(level.id)}
                  >
                    <h3 className="block text-sm font-medium text-gray-700">{level.name || `Nivel ${level.id}`}</h3>
                    <div className="flex items-center">
                      {expandedLevels[level.id] ? (
                        <FiChevronUp className="h-4 w-4" />
                      ) : (
                        <FiChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  {expandedLevels[level.id] && (
                    <div className="p-4 border-t">
                      {level.themes && level.themes.length > 0 ? (
                        <div className="space-y-3">
                          {level.themes.map((theme) => (
                            <div key={theme.id} className="border rounded-md">
                              <div
                                className="flex items-center justify-between p-2 cursor-pointer rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                onClick={() => toggleThemeExpand(level.id, theme.id)}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <h4 className="block text-sm font-medium text-gray-700">{getThemeName(theme)}</h4>
                                  {theme.progress > 0 && (
                                    <span className="mr-1 block text-sm font-medium text-gray-700">
                                      {theme.progress}%
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  {expandedThemes[`${level.id}-${theme.id}`] ? (
                                    <FiChevronUp className="h-4 w-4" />
                                  ) : (
                                    <FiChevronDown className="h-4 w-4" />
                                  )}
                                </div>
                              </div>

                              {expandedThemes[`${level.id}-${theme.id}`] && (
                                <div className="p-4 border-t">
                                  {/* Actividades, Exámenes y Material */}
                                  {theme.activities && theme.activities.length > 0 && (
                                    <div className="mt-4 border rounded-md">
                                      <div className="flex border-b">
                                        <button
                                          className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
                                            getActiveTab(level.id, theme.id) === "Actividades"
                                              ? "bg-blue-50 border-b-2 border-blue-500"
                                              : ""
                                          }`}
                                          onClick={() => setActiveTab(level.id, theme.id, "Actividades")}
                                        >
                                          Actividades
                                        </button>
                                        <button
                                          className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
                                            getActiveTab(level.id, theme.id) === "Exámenes"
                                              ? "bg-blue-50 border-b-2 border-blue-500"
                                              : ""
                                          }`}
                                          onClick={() => setActiveTab(level.id, theme.id, "Exámenes")}
                                        >
                                          Exámenes
                                        </button>
                                        <button
                                          className={`px-4 py-2 block text-sm font-medium text-gray-700 ${
                                            getActiveTab(level.id, theme.id) === "Material"
                                              ? "bg-blue-50 border-b-2 border-blue-500"
                                              : ""
                                          }`}
                                          onClick={() => setActiveTab(level.id, theme.id, "Material")}
                                        >
                                          Material de Apoyo
                                        </button>
                                      </div>
                                      <div className="p-4">
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
                                                <th className="bg-gray-100 px-2 py-2 text-left text-sm font-medium text-gray-600 w-20">
                                                  Acción
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {getFilteredActivities(
                                                theme.activities,
                                                getActiveTab(level.id, theme.id),
                                              ).map((activity) => (
                                                <tr key={activity.id} className="hover:bg-gray-50">
                                                  <td className="px-2 py-2 text-sm text-left border-b border-gray-200 text-gray-700 truncate">
                                                    {activity.name}
                                                  </td>
                                                  <td className="px-2 py-2 text-sm text-left border-b border-gray-200 text-gray-700 truncate">
                                                    {activity.value}
                                                  </td>
                                                  <td className="px-2 py-2 border-b border-gray-200">
                                                    <Tooltip text="Detalle" position="top">
                                                      <button className="p-1 hover:bg-gray-100 rounded-full">
                                                        <Eye className="h-5 w-6 text-gray-500" />
                                                      </button>
                                                    </Tooltip>
                                                  </td>
                                                </tr>
                                              ))}
                                              {getFilteredActivities(theme.activities, getActiveTab(level.id, theme.id))
                                                .length === 0 && (
                                                <tr>
                                                  <td
                                                    colSpan={3}
                                                    className="px-2 py-4 text-sm text-center text-gray-500"
                                                  >
                                                    No hay{" "}
                                                    {getActiveTab(level.id, theme.id) === "Material"
                                                      ? "materiales"
                                                      : getActiveTab(level.id, theme.id) === "Exámenes"
                                                        ? "exámenes"
                                                        : "actividades"}{" "}
                                                    agregados
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No hay temas configurados</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No hay niveles configurados para esta programación</div>
          )}
        </div>
      </div>
    </div>
  )
}
