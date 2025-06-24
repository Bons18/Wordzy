"use client"

import { useState, useEffect } from "react"
import { getStudentsByProgram } from "../services/rankingService"

export const useGetStudentsByProgram = (programCode) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      if (!programCode) {
        setStudents([])
        return
      }

      try {
        setLoading(true)
        setError(null)

        console.log(`🔍 Fetching students for program: ${programCode}`)
        const response = await getStudentsByProgram(programCode)

        if (response.success) {
          console.log(`✅ Students fetched for program ${programCode}:`, response.data.length)
          setStudents(response.data)
        } else {
          throw new Error("Error al obtener estudiantes por programa")
        }
      } catch (err) {
        console.error(`❌ Error fetching students for program ${programCode}:`, err)
        setError(err.message || "Error al cargar estudiantes")
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [programCode])

  return {
    students,
    loading,
    error,
  }
}
