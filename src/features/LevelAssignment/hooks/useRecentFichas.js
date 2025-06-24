"use client"

import { useState, useEffect, useCallback } from "react"
import { localStorageService } from "../services/localStorageService"

export const useRecentFichas = () => {
  const [recentFichas, setRecentFichas] = useState([])

  useEffect(() => {
    const savedFichas = localStorageService.loadRecentFichas()
    setRecentFichas(savedFichas)
  }, [])

  const addRecentFicha = useCallback((ficha) => {
    const fichaReciente = {
      id: ficha.id,
      codigo: ficha.codigo,
      programa: ficha.programa,
      instructor: ficha.instructor,
    }

    setRecentFichas((prev) => {
      const exists = prev.find((f) => f.id === ficha.id)
      let newRecents

      if (exists) {
        newRecents = [fichaReciente, ...prev.filter((f) => f.id !== ficha.id)]
      } else {
        newRecents = [fichaReciente, ...prev.slice(0, 4)]
      }

      localStorageService.saveRecentFichas(newRecents)
      return newRecents
    })
  }, [])

  const clearRecentFichas = useCallback(() => {
    localStorageService.clearRecentFichas()
    setRecentFichas([])
  }, [])

  return {
    recentFichas,
    addRecentFicha,
    clearRecentFichas,
  }
}
