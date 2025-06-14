"use client"

import { useState, useEffect } from "react"

const useGetApprentices = () => {
  const [apprentices, setApprentices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Datos de ejemplo como fallback
  const fallbackData = [
    {
      id: 1,
      nombre: "Carlita",
      apellido: "Pérez",
      documento: "1023456789",
      tipoDocumento: "CC",
      ficha: [2889927],
      nivel: 1,
      estado: "En formación",
      telefono: "3102568799",
      programa: "ADSO",
      correo: "carlos.perez@example.com",
      progresoActual: 15,
      progresoNiveles: [
        { nivel: 1, porcentaje: 25 },
        { nivel: 2, porcentaje: 0 },
        { nivel: 3, porcentaje: 0 },
      ],
    },
    {
      id: 2,
      nombre: "Ana",
      apellido: "Gómez",
      documento: "1029876543",
      tipoDocumento: "PPT",
      ficha: [2996778],
      nivel: 2,
      estado: "Condicionado",
      telefono: "3156789012",
      programa: "Contabilidad",
      correo: "ana.gomez@example.com",
      progresoActual: 45,
      progresoNiveles: [
        { nivel: 1, porcentaje: 100 },
        { nivel: 2, porcentaje: 50 },
        { nivel: 3, porcentaje: 0 },
      ],
    },
    {
      id: 3,
      nombre: "Luis",
      apellido: "Martínez",
      documento: "1034567890",
      tipoDocumento: "PEP",
      ficha: [2889927, 2996778],
      nivel: 3,
      estado: "En formación",
      telefono: "3209876543",
      programa: "Diseño Gráfico",
      correo: "luis.martinez@example.com",
      progresoActual: 75,
      progresoNiveles: [
        { nivel: 1, porcentaje: 100 },
        { nivel: 2, porcentaje: 100 },
        { nivel: 3, porcentaje: 75 },
      ],
    },
    {
      id: 4,
      nombre: "María",
      apellido: "gonzales",
      documento: "2345447567",
      tipoDocumento: "CC",
      ficha: [2889927],
      nivel: 3,
      estado: "En formación",
      telefono: "3102568799",
      programa: "ADSO",
      correo: "correo@correo.com",
      progresoActual: 20,
      progresoNiveles: [
        { nivel: 1, porcentaje: 25 },
        { nivel: 2, porcentaje: 50 },
        { nivel: 3, porcentaje: 100 },
      ],
    },
  ]

  const fetchApprentices = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("http://localhost:3000/api/apprentice")

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Normalizar datos (convertir _id a id si es necesario)
      const normalizedData = data.map((apprentice) => ({
        ...apprentice,
        id: apprentice._id || apprentice.id,
      }))

      setApprentices(normalizedData)
    } catch (err) {
      console.error("Error al obtener aprendices:", err)
      setError(err.message)

      // Usar datos de fallback en caso de error
      console.log("Usando datos de ejemplo como fallback")
      setApprentices(fallbackData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApprentices()
  }, [])

  const refetch = () => {
    fetchApprentices()
  }

  return {
    apprentices,
    loading,
    error,
    refetch,
  }
}

export default useGetApprentices
