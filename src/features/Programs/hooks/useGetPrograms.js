// "use client"

// import { useEffect, useState, useCallback } from "react"
// import { programService } from "../services/programService"

// export function useGetPrograms() {
//   const [programs, setPrograms] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchPrograms = useCallback(async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const data = await programService.getAll()
//       setPrograms(data || [])
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Error desconocido al obtener los programas")
//       console.error("Error in useGetPrograms:", err)
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     fetchPrograms()
//   }, [fetchPrograms])

//   return { programs, loading, error, refetch: fetchPrograms }
// }
"use client"

import { useState, useEffect } from "react"
import { programService } from "../services/programService"

export const useGetPrograms = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await programService.getAll()
      setPrograms(data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al cargar programas")
      console.error("Error fetching programs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
  }
}
