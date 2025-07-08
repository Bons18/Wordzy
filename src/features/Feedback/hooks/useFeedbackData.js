"use client"

import { useState, useEffect } from "react"
import { getFichasFromAPI, getInstructors, getNiveles } from "../services/feedbackService"

export const useFeedbackData = () => {
  const [fichas, setFichas] = useState([])
  const [instructors, setInstructors] = useState([])
  const [niveles, setNiveles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Cargando datos iniciales...")

      // Cargar fichas desde la API
      const fichasData = await getFichasFromAPI()
      console.log("Fichas cargadas:", fichasData.length)
      setFichas(fichasData)

      // Cargar instructores (datos mock)
      const instructorsData = getInstructors()
      console.log("Instructores cargados:", instructorsData.length)
      setInstructors(instructorsData)

      // Cargar niveles (datos mock)
      const nivelesData = getNiveles()
      console.log("Niveles cargados:", nivelesData.length)
      setNiveles(nivelesData)
    } catch (err) {
      console.error("Error al cargar datos iniciales:", err)
      setError(err.message || "Error al cargar los datos iniciales")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  return {
    fichas,
    instructors,
    niveles,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      // Recargar datos
      loadInitialData()
    },
  }
}
