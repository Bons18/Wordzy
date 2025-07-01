"use client"

import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import useGetCourses from "../../File/hooks/useGetCourses"
import { formatDate } from "../../../shared/utils/dateFormatter"
import { useGetCourseProgrammings } from "../../CourseProgramming/hooks/useGetCoursePrograming"
import useGetApprentices from "../../Apprentices/hooks/useGetApprentices"

const columns = [
  { key: "code", label: "Ficha" },
  { key: "fk_programs", label: "Programa" },
  { key: "start_date", label: "Fecha Inicio" },
  { key: "end_date", label: "Fecha Fin" },
  {
    key: "progreso",
    label: "Progreso General",
    render: (item) => (
      <div className="flex items-center gap-5">
        <div className="flex-1 min-w-[100px]">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: item.progreso || "0%" }}></div>
          </div>
        </div>
        <span className="text-sm text-gray-600 w-13 text-right">{item.progreso || "0%"}</span>
      </div>
    ),
  },
]

const ScheduledCoursesPageUpdated = () => {
  const navigate = useNavigate()
  const { courses, loading: coursesLoading, error: coursesError } = useGetCourses()
  const { programmings, loading: programmingsLoading } = useGetCourseProgrammings()
  const { apprentices, loading: apprenticesLoading } = useGetApprentices()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const dropdownRef = useRef(null)

  // Estados para el progreso calculado
  const [coursesWithProgress, setCoursesWithProgress] = useState([])
  const [progressLoading, setProgressLoading] = useState(true)

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

  // Función para obtener progreso de un aprendiz específico
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

  // Función principal para calcular progreso de una ficha - CORREGIDA
  const calculateFichaProgress = async (course) => {
    try {
      console.log(`\n🎯 === CALCULANDO PROGRESO FICHA ${course.code} ===`)
      console.log(`📋 Programa: ${course.fk_programs}`)

      // 1. Filtrar aprendices de esta ficha
      const fichaApprentices = apprentices.filter(
        (apprentice) => apprentice.ficha && apprentice.ficha.includes(Number.parseInt(course.code)),
      )

      console.log(`👥 Aprendices en ficha ${course.code}:`, fichaApprentices.length)

      if (fichaApprentices.length === 0) {
        console.log(`⚠️ No hay aprendices en la ficha ${course.code}`)
        return 0
      }

      // 2. Buscar la programación del programa
      const programming = programmings.find(
        (prog) => prog.programId?.name === course.fk_programs || prog.programId?.abbreviation === course.fk_programs,
      )

      if (!programming) {
        console.log(`❌ No se encontró programación para ${course.fk_programs}`)
        return 0
      }

      console.log(`📚 Programación encontrada: ${programming.levels?.length || 0} niveles`)

      if (!programming.levels || programming.levels.length === 0) {
        console.log(`⚠️ No hay niveles en la programación`)
        return 0
      }

      // 3. Obtener progreso de todos los aprendices de la ficha
      console.log(`🔄 Obteniendo progreso de ${fichaApprentices.length} aprendices...`)
      const allApprenticesProgress = await Promise.all(
        fichaApprentices.map(async (apprentice) => {
          const apprenticeId = apprentice._id || apprentice.id
          const progressData = await fetchApprenticeProgress(apprenticeId)
          console.log(`  📊 ${apprentice.nombre}: ${progressData.length} evaluaciones realizadas`)
          return {
            apprenticeId,
            apprenticeName: `${apprentice.nombre} ${apprentice.apellido}`,
            progress: progressData,
          }
        }),
      )

      // 4. Calcular progreso por nivel y luego promedio de la ficha
      let totalProgresoNiveles = 0
      let nivelesConEvaluaciones = 0

      console.log(`🔢 Procesando ${programming.levels.length} niveles...`)

      programming.levels.forEach((level, index) => {
        const nivelNumero = index + 1
        console.log(`\n📚 === NIVEL ${nivelNumero}: ${level.name} ===`)

        // Obtener evaluaciones programadas para este nivel
        const evaluacionesProgramadas = getEvaluationsFromLevel(level)
        console.log(`📝 Evaluaciones programadas en nivel ${nivelNumero}:`, evaluacionesProgramadas.length)

        if (evaluacionesProgramadas.length > 0) {
          nivelesConEvaluaciones++

          // Calcular progreso promedio de todos los aprendices en este nivel
          let totalCompletitudNivel = 0

          allApprenticesProgress.forEach(({ apprenticeName, progress }) => {
            const evaluacionesRealizadas = progress.filter((p) => p.level === nivelNumero)
            console.log(`  👤 ${apprenticeName}: ${evaluacionesRealizadas.length} evaluaciones en nivel ${nivelNumero}`)

            // Contar evaluaciones APROBADAS vs programadas
            let evaluacionesAprobadas = 0
            evaluacionesProgramadas.forEach((evalProgramada) => {
              const evalId = evalProgramada.evaluationId
              const evalRealizada = evaluacionesRealizadas.find(
                (er) =>
                  (er.evaluationId === evalId ||
                    er.evaluationId?._id === evalId ||
                    er.evaluationId?.toString() === evalId?.toString()) &&
                  er.passed === true, // SOLO CONTAR SI ESTÁ APROBADA
              )

              if (evalRealizada) {
                evaluacionesAprobadas++ // Solo cuenta si está aprobada
                console.log(`    ✅ Evaluación APROBADA: ${evalId}`)
              } else {
                // Verificar si fue realizada pero no aprobada
                const evalRealizadaNoAprobada = evaluacionesRealizadas.find(
                  (er) =>
                    (er.evaluationId === evalId ||
                      er.evaluationId?._id === evalId ||
                      er.evaluationId?.toString() === evalId?.toString()) &&
                    er.passed === false,
                )

                if (evalRealizadaNoAprobada) {
                  console.log(`    ❌ Evaluación NO APROBADA: ${evalId} (no cuenta)`)
                } else {
                  console.log(`    ⏳ Evaluación pendiente: ${evalId}`)
                }
              }
            })

            // Calcular porcentaje de completitud para este aprendiz en este nivel
            const completitudAprendiz = (evaluacionesAprobadas / evaluacionesProgramadas.length) * 100
            totalCompletitudNivel += completitudAprendiz
            console.log(
              `    📊 ${apprenticeName}: ${evaluacionesAprobadas}/${evaluacionesProgramadas.length} APROBADAS = ${Math.round(completitudAprendiz)}%`,
            )
          })

          // Promedio del nivel (dividir entre TODOS los aprendices de la ficha)
          const promedioNivel = fichaApprentices.length > 0 ? totalCompletitudNivel / fichaApprentices.length : 0
          totalProgresoNiveles += promedioNivel
          console.log(`📈 NIVEL ${nivelNumero} PROMEDIO: ${Math.round(promedioNivel)}%`)
        } else {
          console.log(`⚠️ Nivel ${nivelNumero}: Sin evaluaciones programadas`)
        }
      })

      // 5. CAMBIO CRÍTICO: Calcular progreso general como promedio de TODOS los niveles
      // No solo los que tienen evaluaciones, sino TODOS los niveles de la programación
      const progresoGeneral =
        programming.levels.length > 0 ? Math.round(totalProgresoNiveles / programming.levels.length) : 0

      console.log(`\n🎯 === RESULTADO FINAL FICHA ${course.code} ===`)
      console.log(`📊 Total niveles en programación: ${programming.levels.length}`)
      console.log(`📊 Niveles con evaluaciones: ${nivelesConEvaluaciones}`)
      console.log(`📈 Progreso total acumulado: ${Math.round(totalProgresoNiveles)}%`)
      console.log(`🏆 PROGRESO GENERAL: ${progresoGeneral}% (promedio de ${programming.levels.length} niveles)`)

      return progresoGeneral
    } catch (error) {
      console.error(`❌ Error calculando progreso de ficha ${course.code}:`, error)
      return 0
    }
  }

  // Efecto para calcular progreso cuando todos los datos estén listos
  useEffect(() => {
    const calculateAllProgress = async () => {
      if (
        !coursesLoading &&
        !programmingsLoading &&
        !apprenticesLoading &&
        courses.length > 0 &&
        programmings.length > 0 &&
        apprentices.length > 0
      ) {
        setProgressLoading(true)
        console.log("🔄 === INICIANDO CÁLCULO DE PROGRESO GENERAL ===")
        console.log(`📋 Fichas: ${courses.length}`)
        console.log(`📚 Programaciones: ${programmings.length}`)
        console.log(`👥 Aprendices: ${apprentices.length}`)

        const coursesWithCalculatedProgress = await Promise.all(
          courses.map(async (course) => {
            const progreso = await calculateFichaProgress(course)
            return {
              ...course,
              start_date: formatDate(course.start_date),
              end_date: formatDate(course.end_date),
              progreso: `${progreso}%`,
            }
          }),
        )

        setCoursesWithProgress(coursesWithCalculatedProgress)
        setProgressLoading(false)

        console.log("\n✅ === CÁLCULO COMPLETADO ===")
        console.log("📊 === RESUMEN FINAL ===")
        coursesWithCalculatedProgress.forEach((course) => {
          console.log(`📋 Ficha ${course.code}: ${course.progreso}`)
        })
      }
    }

    calculateAllProgress()
  }, [courses, programmings, apprentices, coursesLoading, programmingsLoading, apprenticesLoading])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleShowLevels = (ficha) => {
    console.log("Ficha seleccionada:", ficha)

    // Guardar información de la ficha seleccionada
    sessionStorage.setItem("selectedFichaId", ficha.id)
    sessionStorage.setItem("selectedFichaNombre", ficha.code)
    sessionStorage.setItem("selectedFichaPrograma", ficha.fk_programs)

    const programId = ficha.fk_programs_id || ficha.program_id || ficha.programId
    console.log("Program ID encontrado:", programId)

    if (programId) {
      sessionStorage.setItem("selectedProgramId", programId)
    } else {
      console.error("No se encontró ID del programa en:", ficha)
    }

    navigate("/progreso/cursosProgramados/niveles")
  }

  if (coursesLoading || programmingsLoading || apprenticesLoading || progressLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-2">
          {coursesLoading
            ? "Cargando fichas..."
            : programmingsLoading
              ? "Cargando programaciones..."
              : apprenticesLoading
                ? "Cargando aprendices..."
                : "Calculando progreso general..."}
        </span>
      </div>
    )
  }

  if (coursesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {coursesError}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
          <div className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-green-600">Lista de Fichas</span>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Administrador</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6">
        

        {/* Información de estado de carga */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800">📊 Estado de Datos:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
            <div>
              <span className="font-medium">Fichas:</span> {courses.length}
            </div>
            <div>
              <span className="font-medium">Programaciones:</span> {programmings.length}
            </div>
            <div>
              <span className="font-medium">Aprendices:</span> {apprentices.length}
            </div>
            <div>
              <span className="font-medium">Progreso:</span> {progressLoading ? "🔄 Calculando..." : "✅ Calculado"}
            </div>
          </div>
        </div>

        {/* Progreso de fichas - MEJORADO */}
        <div className="mb-4 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800">📊 Progreso General de Fichas (Promedio de Niveles):</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 text-sm">
            {coursesWithProgress.map((course) => {
              // Encontrar la programación para mostrar información adicional
              const programming = programmings.find(
                (prog) =>
                  prog.programId?.name === course.fk_programs || prog.programId?.abbreviation === course.fk_programs,
              )
              const totalNiveles = programming?.levels?.length || 0

              return (
                <div key={course.id} className="bg-white p-3 rounded border">
                  <div className="font-medium">Ficha {course.code}</div>
                  <div className="text-gray-600 text-xs">{course.fk_programs}</div>
                  <div className="text-xs text-gray-500 mb-1">
                    {totalNiveles > 0 ? `${totalNiveles} niveles programados` : "Sin niveles programados"}
                  </div>
                  <div
                    className={`font-bold ${Number.parseInt(course.progreso) > 0 ? "text-green-600" : "text-gray-400"}`}
                  >
                    Progreso: {course.progreso}
                  </div>
                  {Number.parseInt(course.progreso) === 0 && totalNiveles > 0 && (
                    <div className="text-xs text-orange-500">⚠️ Sin evaluaciones aprobadas</div>
                  )}
                  {totalNiveles === 0 && <div className="text-xs text-red-500">❌ Sin programación</div>}
                </div>
              )
            })}
          </div>
        </div>

        <GenericTable
          data={coursesWithProgress}
          columns={columns}
          onShow={handleShowLevels}
          tooltipText="Ver Niveles"
          showActions={{ show: true, edit: false, delete: false, add: false }}
        />

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    </div>
  )
}

export default ScheduledCoursesPageUpdated
