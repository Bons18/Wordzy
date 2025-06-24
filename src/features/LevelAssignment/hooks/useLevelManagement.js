"use client"

import { useState, useEffect, useCallback } from "react"
import { localStorageService } from "../services/localStorageService"
import { DEFAULT_LEVELS } from "../utils/constants"

export const useLevelManagement = (selectedFicha) => {
  const [currentLevelStates, setCurrentLevelStates] = useState(DEFAULT_LEVELS)
  const [tempLevelStates, setTempLevelStates] = useState(DEFAULT_LEVELS)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Cargar niveles cuando cambia la ficha seleccionada
  useEffect(() => {
    if (selectedFicha) {
      const savedLevels = localStorageService.loadFichaLevels(selectedFicha.id)
      setCurrentLevelStates(savedLevels)
      setTempLevelStates(savedLevels)
    }
  }, [selectedFicha])

  // Verificar cambios
  useEffect(() => {
    const changes = JSON.stringify(currentLevelStates) !== JSON.stringify(tempLevelStates)
    setHasChanges(changes)
  }, [currentLevelStates, tempLevelStates])

  const handleLevelToggle = useCallback((levelId) => {
    setTempLevelStates((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }))
  }, [])

  const handleQuickAction = useCallback(
    (action) => {
      let newStates = { ...tempLevelStates }
      switch (action) {
        case "activar-todos":
          newStates = { A1: true, A2: true, B1: true, B2: true, C1: true, C2: true }
          break
        case "desactivar-todos":
          newStates = { A1: false, A2: false, B1: false, B2: false, C1: false, C2: false }
          break
        case "hasta-a2":
          newStates = { A1: true, A2: true, B1: false, B2: false, C1: false, C2: false }
          break
        case "hasta-b1":
          newStates = { A1: true, A2: true, B1: true, B2: false, C1: false, C2: false }
          break
        case "hasta-b2":
          newStates = { A1: true, A2: true, B1: true, B2: true, C1: false, C2: false }
          break
        case "hasta-c1":
          newStates = { A1: true, A2: true, B1: true, B2: true, C1: true, C2: false }
          break
      }
      setTempLevelStates(newStates)
    },
    [tempLevelStates],
  )

  const saveLevels = useCallback(async () => {
    if (!selectedFicha) return { success: false, message: "No hay ficha seleccionada" }

    try {
      setIsSaving(true)

      // Simular delay de guardado
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Actualizar estado local
      setCurrentLevelStates(tempLevelStates)

      // Guardar en localStorage
      localStorageService.saveFichaLevels(selectedFicha.id, tempLevelStates)

      setHasChanges(false)
      return { success: true, message: `Niveles actualizados exitosamente para la ficha ${selectedFicha.codigo}` }
    } catch (error) {
      console.error("Error saving levels:", error)
      return { success: false, message: "Error al guardar los cambios. Inténtalo de nuevo." }
    } finally {
      setIsSaving(false)
    }
  }, [selectedFicha, tempLevelStates])

  const resetChanges = useCallback(() => {
    setTempLevelStates(currentLevelStates)
    setHasChanges(false)
  }, [currentLevelStates])

  return {
    currentLevelStates,
    tempLevelStates,
    hasChanges,
    isSaving,
    handleLevelToggle,
    handleQuickAction,
    saveLevels,
    resetChanges,
  }
}
