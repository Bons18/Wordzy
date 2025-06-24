"use client"

import { useState, useEffect } from "react"
import { getStudentsByCourse } from "../services/rankingService"

export const useGetStudentsByCourse = (courseNumber) => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      if (!courseNumber) {
        setStudents([])
        return
      }

      try {
        setLoading(true)
        setError(null)

        console.log(`🔍 Fetching students for course: ${courseNumber}`)
        const response = await getStudentsByCourse(courseNumber)

        if (response.success) {
          console.log(`✅ Students fetched for course ${courseNumber}:`, response.data.length)
          setStudents(response.data)
        } else {
          throw new Error("Error al obtener estudiantes por ficha")
        }
      } catch (err) {
        console.error(`❌ Error fetching students for course ${courseNumber}:`, err)
        setError(err.message || "Error al cargar estudiantes")
        setStudents([])
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [courseNumber])

  return {
    students,
    loading,
    error,
  }
}
