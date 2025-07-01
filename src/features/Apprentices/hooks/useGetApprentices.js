"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

const useGetApprentices = () => {
  const [apprentices, setApprentices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Datos de ejemplo como fallback - usar useMemo para evitar recreación
  const fallbackData = useMemo(
    () => [
      {
        id: 1,
        tipoUsuario: "aprendiz",
        nombre: "Carlita",
        apellido: "Pérez",
        documento: "1023456789",
        tipoDocumento: "CC",
        ficha: [2889927],
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
        tipoUsuario: "aprendiz",
        nombre: "Ana",
        apellido: "Gómez",
        documento: "1029876543",
        tipoDocumento: "PPT",
        ficha: [2996778],
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
        tipoUsuario: "aprendiz",
        nombre: "Luis",
        apellido: "Martínez",
        documento: "1034567890",
        tipoDocumento: "PEP",
        ficha: [2889927, 2996778],
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
        tipoUsuario: "aprendiz",
        nombre: "María",
        apellido: "gonzales",
        documento: "2345447567",
        tipoDocumento: "CC",
        ficha: [2889927],
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
    ],
    [],
  )

  const fetchApprentices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Obteniendo aprendices desde API...")

      // Usar la ruta específica de aprendices usando la variable de entorno
      const response = await fetch(`${import.meta.env.VITE_LOCAL_DB_URL}/apprentice`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("✅ Datos de aprendices recibidos:", data)

      // Normalizar datos (convertir _id a id si es necesario)
      const normalizedData = data.map((apprentice) => ({
        ...apprentice,
        id: apprentice._id || apprentice.id,
        // Asegurar que los campos específicos de aprendiz existan
        ficha: Array.isArray(apprentice.ficha) ? apprentice.ficha : [apprentice.ficha],
        progresoNiveles: apprentice.progresoNiveles || [
          { nivel: 1, porcentaje: 0 },
          { nivel: 2, porcentaje: 0 },
          { nivel: 3, porcentaje: 0 },
        ],
      }))

      setApprentices(normalizedData)
      console.log(`✅ ${normalizedData.length} aprendices cargados exitosamente`)
    } catch (err) {
      console.error("❌ Error al obtener aprendices:", err)
      setError(err.message)

      // Usar datos de fallback en caso de error
      console.log("🔄 Usando datos de ejemplo como fallback")
      setApprentices(fallbackData)
    } finally {
      setLoading(false)
    }
  }, [fallbackData])

  // Ejecutar solo una vez al montar el componente
  useEffect(() => {
    fetchApprentices()
  }, []) // Dependencias vacías para ejecutar solo una vez

  const refetch = useCallback(() => {
    console.log("🔄 Refrescando datos de aprendices...")
    return fetchApprentices()
  }, [fetchApprentices])

  return {
    apprentices,
    loading,
    error,
    refetch,
  }
}

export default useGetApprentices
