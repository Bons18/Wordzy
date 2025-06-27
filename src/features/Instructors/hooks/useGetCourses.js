"use client"

import { useState, useEffect } from "react"
import { API_ENDPOINTS } from "../../../shared/config/api"

const useGetCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🔍 Obteniendo fichas/cursos desde API...")

      const response = await fetch(API_ENDPOINTS.COURSES, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("✅ Fichas/cursos recibidos:", data)

      // Normalizar datos para el frontend
      const normalizedCourses = data.map((course) => ({
        id: course._id || course.id,
        code: course.code,
        area: course.area,
        fk_programs: course.fk_programs,
        course_status: course.course_status,
        offer_type: course.offer_type,
        start_date: course.start_date,
        end_date: course.end_date,
        status: course.status,
        // Campos adicionales que pueden ser útiles
        quarter: course.quarter,
        fk_coordination: course.fk_coordination,
        fk_itinerary: course.fk_itinerary,
      }))

      setCourses(normalizedCourses)
      console.log(`✅ ${normalizedCourses.length} fichas/cursos cargados exitosamente`)
    } catch (err) {
      console.error("❌ Error al obtener fichas/cursos:", err)
      setError(err.message)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const refetch = () => {
    console.log("🔄 Refrescando datos de fichas/cursos...")
    return fetchCourses()
  }

  return {
    courses,
    loading,
    error,
    refetch,
  }
}

export default useGetCourses
