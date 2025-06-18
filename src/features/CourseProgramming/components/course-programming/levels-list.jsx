"use client"

import { Trash } from "lucide-react"
import Tooltip from "../../../../shared/components/Tooltip"
import ThemesList from "./themes-list"
import TopicModal from "../../../Topics/components/TopicModal"
import ConfirmationModal from "../../../../shared/components/ConfirmationModal"
import { useState } from "react"
import { useGetTopics } from "../../../Topics/hooks/useGetTopics"
import { usePostTopic } from "../../../Topics/hooks/usePostTopic"

export default function LevelsList({ levels, setLevels, activeTabs, setActiveTabs }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedLevelId, setSelectedLevelId] = useState(null)
  const { topics, refetch } = useGetTopics()
  const { postTopic } = usePostTopic()

  const handleAddTopic = (levelId) => {
    setSelectedLevelId(levelId)
    setIsModalOpen(true)
  }

  const handleSubmitTopic = async (topicData) => {
    try {
      await postTopic(topicData)
      await refetch() // actualiza los temas disponibles
      setIsModalOpen(false)
      setSuccessMessage(`Tema "${topicData.name}" creado exitosamente`)
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error al agregar el tema:", error)
      setSuccessMessage(error.message || "Ocurrió un error al agregar el tema")
      setShowSuccessModal(true)
    }
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
            id: `theme-${Date.now()}`,
            name: "",
            selectedTheme: null, // Cambiar a null en lugar de string vacío
            expanded: true,
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

  const addThemeWithTopic = (levelId, topicValue) => {
    setLevels(
      levels.map((level) => {
        if (level.id === levelId) {
          const newTheme = {
            id: `theme-${Date.now()}`,
            name: "",
            selectedTheme: topicValue, // Esto debería ser el objeto completo {value, label}
            expanded: true,
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

  const getLevelDisplayName = (level) => {
    return level.name ? level.name : `Nivel ${levels.findIndex((l) => l.id === level.id) + 1}`
  }

  const getExistingTopics = () => {
    return (
      topics?.map((topic) => ({
        nombre: topic.name,
        descripcion: topic.description || "",
      })) || []
    )
  }

  // Función para obtener temas ya utilizados en toda la programación
  const getUsedTopicIds = () => {
    const usedIds = new Set()

    levels.forEach((level) => {
      level.themes?.forEach((theme) => {
        if (theme.selectedTheme) {
          if (typeof theme.selectedTheme === "string") {
            usedIds.add(theme.selectedTheme)
          } else if (theme.selectedTheme.value) {
            usedIds.add(theme.selectedTheme.value)
          }
        }
      })
    })

    return usedIds
  }

  // Función para obtener TODOS los temas (no filtrados) - necesarios para el display
  const getAllTopicsForDisplay = () => {
    return (
      topics?.map((topic) => ({
        value: topic._id,
        label: topic.name, // Usar topic.name que es el nombre real
        description: topic.description || "",
      })) || []
    )
  }

  // Función para obtener temas disponibles (no utilizados) - para el select
  const getAvailableTopics = () => {
    const usedIds = getUsedTopicIds()

    return (
      topics
        ?.filter((topic) => !usedIds.has(topic._id))
        .map((topic) => ({
          value: topic._id,
          label: topic.name, // Usar topic.name que es el nombre real
          description: topic.description || "",
        })) || []
    )
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
                    onClick={() => handleAddTopic(level.id)}
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
              </div>

              {level.themes?.length > 0 && (
                <ThemesList
                  level={level}
                  levels={levels}
                  setLevels={setLevels}
                  activeTabs={activeTabs}
                  setActiveTabs={setActiveTabs}
                  createdTopics={getAllTopicsForDisplay()} // Pasar TODOS los temas para el display correcto
                />
              )}
            </div>
          )}
        </div>
      ))}

      {isModalOpen && (
        <TopicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitTopic}
          existingTopics={getExistingTopics()}
        />
      )}

      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={() => setShowSuccessModal(false)}
        title="Operación Exitosa"
        message={successMessage}
        confirmText="Aceptar"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />
    </div>
  )
}
