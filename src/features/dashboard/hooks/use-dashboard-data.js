"use client"

import { useState, useEffect } from "react"
import { useGetCourseProgrammings } from "../../CourseProgramming/hooks/useGetCoursePrograming"
import useGetCourses from "../../File/hooks/useGetCourses"
import useGetApprentices from "../../Apprentices/hooks/useGetApprentices"

export function useDashboardData() {
  const { courses, loading: coursesLoading } = useGetCourses()
  const { programmings, loading: programmingsLoading } = useGetCourseProgrammings()
  const { apprentices, loading: apprenticesLoading } = useGetApprentices()

  const [dashboardData, setDashboardData] = useState({
    levelProgress: [],
    totalStats: {
      totalFichas: 0,
      totalApprentices: 0,
      totalLevels: 0,
    },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para extraer evaluaciones de un nivel
  const getEvaluationsFromLevel = (level) => {
    const evaluations = []
    if (level.topics && level.topics.length > 0) {
      level.topics.forEach((topic) => {
        if (topic.activities && topic.activities.length > 0) {
          topic.activities.forEach((activity) => {
            evaluations.push({
              evaluationId: activity.evaluationId,
              type: "activity",
              value: activity.value,
            })
          })
        }
        if (topic.exams && topic.exams.length > 0) {
          topic.exams.forEach((exam) => {
            evaluations.push({
              evaluationId: exam.evaluationId,
              type: "exam",
              value: exam.value,
            })
          })
        }
      })
    }
    return evaluations
  }

  // Función para obtener progreso de un aprendiz
  const fetchApprenticeProgress = async (apprenticeId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/apprentice-progress?apprenticeId=${apprenticeId}`, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.success ? data.data : []
    } catch (error) {
      console.error(`❌ Error obteniendo progreso para aprendiz ${apprenticeId}:`, error)
      return []
    }
  }

  // Función mejorada para encontrar programación por ficha
  const findProgrammingForCourse = (course, programmings) => {
    const courseProgramName = course.fk_programs?.toUpperCase().trim()

    return programmings.find((prog) => {
      const progName = prog.programId?.name?.toUpperCase().trim()
      const progAbbr = prog.programId?.abbreviation?.toUpperCase().trim()

      // Buscar coincidencias exactas
      return progName === courseProgramName || progAbbr === courseProgramName
    })
  }

  // Función principal para calcular datos del dashboard
  const calculateDashboardData = async () => {
    if (coursesLoading || programmingsLoading || apprenticesLoading) {
      return
    }

    try {
      setLoading(true)

      console.log("🚀 Iniciando cálculo del dashboard...")
      console.log("📊 Datos disponibles:", {
        courses: courses.length,
        programmings: programmings.length,
        apprentices: apprentices.length,
      })

      // Usar TODAS las fichas sin filtrar por año
      const validCourses = courses
      console.log(`📅 Procesando TODAS las fichas disponibles:`, validCourses.length)

      // Encontrar fichas que tienen programación de inglés
      const coursesWithProgramming = []
      const coursesWithoutProgramming = []

      validCourses.forEach((course) => {
        const programming = findProgrammingForCourse(course, programmings)
        if (programming && programming.levels && programming.levels.length > 0) {
          coursesWithProgramming.push(course)
          console.log(`✅ Ficha ${course.code} (${course.fk_programs}) TIENE programación`)
        } else {
          coursesWithoutProgramming.push(course)
          console.log(`❌ Ficha ${course.code} (${course.fk_programs}) SIN programación`)
        }
      })

      console.log("📚 Fichas con programación de inglés:", coursesWithProgramming.length)
      console.log("🚫 Fichas sin programación de inglés:", coursesWithoutProgramming.length)

      if (coursesWithProgramming.length === 0) {
        console.log("⚠️ No hay fichas con programación de inglés")
        setDashboardData({
          levelProgress: [],
          totalStats: {
            totalFichas: 0,
            totalApprentices: 0,
            totalLevels: 0,
          },
        })
        return
      }

      // Crear un mapa de niveles únicos
      const allLevelsMap = new Map()

      // Procesar cada ficha con programación
      for (const course of coursesWithProgramming) {
        console.log(`\n🔄 Procesando ficha: ${course.code} - ${course.fk_programs}`)

        const programming = findProgrammingForCourse(course, programmings)

        if (!programming) {
          console.log(`❌ No se encontró programación para: ${course.fk_programs}`)
          continue
        }

        console.log(`📋 Programación encontrada: ${programming.programId?.name}`)
        console.log(`📋 Niveles en programación: ${programming.levels?.length}`)

        // Obtener aprendices de esta ficha
        const fichaApprentices = apprentices.filter((apprentice) => {
          const hasThisFicha = apprentice.ficha && apprentice.ficha.includes(Number.parseInt(course.code))
          if (hasThisFicha) {
            console.log(
              `👤 Aprendiz ${apprentice.nombre || apprentice.name || apprentice._id} pertenece a ficha ${course.code}`,
            )
          }
          return hasThisFicha
        })

        console.log(`👥 Aprendices en ficha ${course.code}:`, fichaApprentices.length)

        if (fichaApprentices.length === 0) {
          console.log(`⚠️ No hay aprendices en la ficha ${course.code}`)
          // Continuar procesando aunque no haya aprendices para contar la ficha
        }

        // Procesar cada nivel de esta programación
        for (let levelIndex = 0; levelIndex < programming.levels.length; levelIndex++) {
          const level = programming.levels[levelIndex]
          const levelNumber = levelIndex + 1
          const levelName = level.name || `Nivel ${levelNumber}`

          console.log(`\n📖 Procesando ${levelName} (índice ${levelIndex})`)

          // Obtener evaluaciones programadas para este nivel
          const evaluacionesProgramadas = getEvaluationsFromLevel(level)

          console.log(`📋 Evaluaciones en ${levelName}:`, evaluacionesProgramadas.length)

          if (evaluacionesProgramadas.length === 0) {
            console.log(`⚠️ ${levelName} sin evaluaciones - SALTANDO`)
            continue
          }

          // Mostrar detalles de las evaluaciones
          evaluacionesProgramadas.forEach((evaluation, idx) => {
            console.log(`  📝 Evaluación ${idx + 1}: ${evaluation.evaluationId} (${evaluation.type})`)
          })

          // Inicializar datos del nivel si no existen
          if (!allLevelsMap.has(levelNumber)) {
            allLevelsMap.set(levelNumber, {
              nivel: levelName,
              cantidadFichas: 0,
              cantidadAprendices: 0,
              totalCompletitud: 0,
              totalAprendicesProcessed: 0,
              fichasWithThisLevel: new Set(),
            })
            console.log(`🆕 Creado nuevo nivel en mapa: ${levelName}`)
          }

          const levelData = allLevelsMap.get(levelNumber)

          // Agregar esta ficha al nivel si no ha sido agregada
          if (!levelData.fichasWithThisLevel.has(course.code)) {
            levelData.fichasWithThisLevel.add(course.code)
            levelData.cantidadFichas++
            console.log(`✅ Ficha ${course.code} agregada al ${levelName} (total fichas: ${levelData.cantidadFichas})`)
          }

          // Procesar cada aprendiz de esta ficha para este nivel
          for (const apprentice of fichaApprentices) {
            const apprenticeId = apprentice._id || apprentice.id
            const apprenticeName = apprentice.nombre || apprentice.name || apprenticeId

            console.log(`\n👤 Procesando aprendiz: ${apprenticeName}`)

            const progressData = await fetchApprenticeProgress(apprenticeId)
            console.log(`📊 Datos de progreso obtenidos: ${progressData.length} registros`)

            // Filtrar evaluaciones de este nivel específico
            const evaluacionesRealizadas = progressData.filter((p) => p.level === levelNumber)
            console.log(`📊 Evaluaciones realizadas en nivel ${levelNumber}: ${evaluacionesRealizadas.length}`)

            // Contar evaluaciones aprobadas
            let evaluacionesAprobadas = 0
            evaluacionesProgramadas.forEach((evalProgramada) => {
              const evalId = evalProgramada.evaluationId
              const evalRealizada = evaluacionesRealizadas.find(
                (er) =>
                  (er.evaluationId === evalId ||
                    er.evaluationId?._id === evalId ||
                    er.evaluationId?.toString() === evalId?.toString()) &&
                  er.passed === true,
              )

              if (evalRealizada) {
                evaluacionesAprobadas++
                console.log(`✅ Evaluación aprobada: ${evalId}`)
              } else {
                console.log(`❌ Evaluación no aprobada: ${evalId}`)
              }
            })

            // Calcular porcentaje de completitud para este aprendiz
            const completitudAprendiz = (evaluacionesAprobadas / evaluacionesProgramadas.length) * 100
            levelData.totalCompletitud += completitudAprendiz
            levelData.totalAprendicesProcessed++

            console.log(
              `📊 ${apprenticeName} en ${levelName}: ${evaluacionesAprobadas}/${evaluacionesProgramadas.length} (${Math.round(completitudAprendiz)}%)`,
            )
          }

          console.log(`📈 Estado actual del ${levelName}:`, {
            fichas: levelData.cantidadFichas,
            aprendicesProcessed: levelData.totalAprendicesProcessed,
            completitudTotal: levelData.totalCompletitud,
          })
        }
      }

      console.log("\n🗺️ Mapa de niveles final:")
      allLevelsMap.forEach((data, levelNumber) => {
        console.log(`Nivel ${levelNumber}:`, {
          nombre: data.nivel,
          fichas: data.cantidadFichas,
          aprendices: data.totalAprendicesProcessed,
          completitud: data.totalCompletitud,
        })
      })

      // Convertir Map a array y calcular promedios finales
      const levelProgressArray = Array.from(allLevelsMap.entries())
        .map(([levelNumber, data]) => {
          const progresoPromedio =
            data.totalAprendicesProcessed > 0 ? Math.round(data.totalCompletitud / data.totalAprendicesProcessed) : 0

          console.log(
            `📈 RESULTADO Nivel ${levelNumber} - Fichas: ${data.cantidadFichas}, Aprendices: ${data.totalAprendicesProcessed}, Progreso: ${progresoPromedio}%`,
          )

          return {
            id: levelNumber,
            nivel: data.nivel,
            cantidadFichas: data.cantidadFichas,
            cantidadAprendices: data.totalAprendicesProcessed,
            progreso: `${progresoPromedio}%`,
          }
        })
        .filter((level) => level.cantidadFichas > 0) // Solo mostrar niveles con fichas
        .sort((a, b) => a.id - b.id)

      console.log("\n📊 Array final de niveles:", levelProgressArray)

      // Calcular estadísticas totales
      const totalStats = {
        totalFichas: coursesWithProgramming.length,
        totalApprentices: apprentices.filter((apprentice) =>
          coursesWithProgramming.some(
            (course) => apprentice.ficha && apprentice.ficha.includes(Number.parseInt(course.code)),
          ),
        ).length,
        totalLevels: levelProgressArray.length,
      }

      console.log("\n📈 Estadísticas totales:", totalStats)

      setDashboardData({
        levelProgress: levelProgressArray,
        totalStats,
      })

      console.log("✅ RESUMEN FINAL:", {
        fichasConProgramacion: totalStats.totalFichas,
        apprenticesTotal: totalStats.totalApprentices,
        nivelesConDatos: totalStats.totalLevels,
        levelDetails: levelProgressArray,
      })
    } catch (err) {
      console.error("❌ Error calculando datos del dashboard:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!coursesLoading && !programmingsLoading && !apprenticesLoading) {
      calculateDashboardData()
    }
  }, [courses, programmings, apprentices, coursesLoading, programmingsLoading, apprenticesLoading])

  return {
    dashboardData,
    loading: loading || coursesLoading || programmingsLoading || apprenticesLoading,
    error,
    refetch: calculateDashboardData,
    // Agregar estos datos para el componente de debug
    programmings,
    courses,
    apprentices,
  }
}
