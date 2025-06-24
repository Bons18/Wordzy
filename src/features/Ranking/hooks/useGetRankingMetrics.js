"use client"

import { useState, useEffect } from "react"
import { getRankingMetrics } from "../services/rankingService"

export const useGetRankingMetrics = () => {
  const [metrics, setMetrics] = useState({ aprendices: 0, fichas: 0, programas: 0 })
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRankingMetrics = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("🚀 useGetRankingMetrics: Starting fetch...")

      const response = await getRankingMetrics()

      if (response.success) {
        console.log("✅ useGetRankingMetrics: Data received successfully")
        console.log("📊 Metrics:", response.data)
        console.log("👥 Students with points:", response.students.filter((s) => s.puntos > 0).length)

        setMetrics(response.data)
        setCourses(response.courses)
        setStudents(response.students)
        setPrograms(response.programs)
      } else {
        throw new Error("Error al obtener métricas del ranking")
      }
    } catch (err) {
      console.error("❌ useGetRankingMetrics error:", err)
      setError(err.message || "Error al cargar las métricas del ranking")
      setMetrics({ aprendices: 0, fichas: 0, programas: 0 })
      setCourses([])
      setStudents([])
      setPrograms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRankingMetrics()
  }, [])

  return {
    metrics,
    courses,
    students,
    programs,
    loading,
    error,
    refetch: fetchRankingMetrics,
  }
}
