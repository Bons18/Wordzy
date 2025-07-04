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
        console.log("👥 Students received:", response.students?.length || 0)
        console.log("🏫 Courses received:", response.courses?.length || 0)
        console.log("📚 Programs received:", response.programs?.length || 0)

        // Verificar que tenemos estudiantes con puntos
        const studentsWithPoints =
          response.students?.filter((student) => {
            const points = Number.parseInt(student.puntos) || 0
            return points > 0
          }) || []

        console.log("🎯 Students with points:", studentsWithPoints.length)

        if (studentsWithPoints.length > 0) {
          console.log(
            "🏆 Sample students with points:",
            studentsWithPoints.slice(0, 3).map((s) => ({
              nombre: s.nombre || s.name,
              puntos: s.puntos,
            })),
          )
        }

        setMetrics(response.data)
        setCourses(response.courses || [])
        setStudents(response.students || [])
        setPrograms(response.programs || [])
      } else {
        throw new Error(response.message || "Error al obtener métricas del ranking")
      }
    } catch (err) {
      console.error("❌ useGetRankingMetrics error:", err)
      setError(err.message || "Error al cargar las métricas del ranking")

      // Establecer datos de prueba si hay error
      console.log("🔧 Setting test data due to API error...")
      const testStudents = [
        { nombre: "Juan", apellido: "Pérez", puntos: 95, ficha: ["2691"], programa: "ADSO" },
        { nombre: "María", apellido: "García", puntos: 87, ficha: ["2692"], programa: "ADSO" },
        { nombre: "Carlos", apellido: "López", puntos: 82, ficha: ["2691"], programa: "Multimedia" },
        { nombre: "Ana", apellido: "Martínez", puntos: 78, ficha: ["2693"], programa: "ADSO" },
        { nombre: "Luis", apellido: "Rodríguez", puntos: 75, ficha: ["2692"], programa: "Multimedia" },
      ]

      setMetrics({ aprendices: testStudents.length, fichas: 3, programas: 2 })
      setCourses([
        { code: "2691", name: "Ficha 2691" },
        { code: "2692", name: "Ficha 2692" },
        { code: "2693", name: "Ficha 2693" },
      ])
      setStudents(testStudents)
      setPrograms([
        { name: "ADSO", code: "ADSO" },
        { name: "Multimedia", code: "MULT" },
      ])
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
