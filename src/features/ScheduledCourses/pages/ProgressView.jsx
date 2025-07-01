"use client"

import { useEffect, useState, useRef } from "react"
import GenericTable from "../../../shared/components/Table"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useParams, useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import { useApprenticeProgress } from "../hooks/use-apprentice-progress"
import { useGetProgrammingByProgramName } from "../hooks/use-get-programming-by-program-name"

const ProgressViewWithRealData = () => {
  const { nombre } = useParams()
  const navigate = useNavigate()
  const [learnerData, setLearnerData] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [fichaNombre, setFichaNombre] = useState("")
  const [nivelNombre, setNivelNombre] = useState("")
  const [nivelNumber, setNivelNumber] = useState(1)
  const [apprenticeId, setApprenticeId] = useState(null)
  const [fichaPrograma, setFichaPrograma] = useState("")
  const { logout } = useAuth()
  const dropdownRef = useRef(null)

  // Hook para obtener progreso del aprendiz
  const {
    progress,
    statistics,
    loading: progressLoading,
    error: progressError,
    refetch,
  } = useApprenticeProgress(apprenticeId, nivelNumber)

  // Hook para obtener la programación del curso
  const { programming } = useGetProgrammingByProgramName(fichaPrograma)

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

  // Calcular estadísticas basadas en evaluaciones aprobadas
  const [calculatedStats, setCalculatedStats] = useState(null)

  useEffect(() => {
    if (progress.length > 0 && programming && nivelNumber) {
      console.log("🔄 Calculando estadísticas basadas en evaluaciones aprobadas...")

      // Obtener el nivel actual de la programación
      const currentLevel = programming.levels?.[nivelNumber - 1]
      if (!currentLevel) {
        console.log("❌ No se encontró el nivel en la programación")
        return
      }

      // Obtener evaluaciones programadas para este nivel
      const evaluacionesProgramadas = getEvaluationsFromLevel(currentLevel)
      console.log(`📝 Evaluaciones programadas en nivel ${nivelNumber}:`, evaluacionesProgramadas.length)

      // Filtrar solo evaluaciones aprobadas
      const evaluacionesAprobadas = progress.filter((p) => p.passed === true)
      console.log(`✅ Evaluaciones aprobadas:`, evaluacionesAprobadas.length)

      // Calcular puntos solo de evaluaciones aprobadas
      const puntosAprobadas = evaluacionesAprobadas.reduce((sum, p) => sum + (p.score || 0), 0)
      console.log(`💰 Puntos de evaluaciones aprobadas:`, puntosAprobadas)

      // Contar evaluaciones aprobadas vs programadas
      let evaluacionesAprobadasProgramadas = 0
      evaluacionesProgramadas.forEach((evalProgramada) => {
        const evalId = evalProgramada.evaluationId
        const evalAprobada = evaluacionesAprobadas.find(
          (er) =>
            er.evaluationId === evalId ||
            er.evaluationId?._id === evalId ||
            er.evaluationId?.toString() === evalId?.toString(),
        )
        if (evalAprobada) {
          evaluacionesAprobadasProgramadas++
        }
      })

      setCalculatedStats({
        evaluacionesAprobadas: evaluacionesAprobadasProgramadas,
        evaluacionesProgramadas: evaluacionesProgramadas.length,
        puntosAprobadas: puntosAprobadas,
        totalEvaluacionesRealizadas: progress.length,
      })

      console.log(`📊 Estadísticas calculadas:`, {
        evaluacionesAprobadas: evaluacionesAprobadasProgramadas,
        evaluacionesProgramadas: evaluacionesProgramadas.length,
        puntosAprobadas: puntosAprobadas,
      })
    }
  }, [progress, programming, nivelNumber])

  useEffect(() => {
    const selectedFichaNombre = sessionStorage.getItem("selectedFichaNombre")
    const selectedNivelNombre = sessionStorage.getItem("selectedNivelNombre")
    const selectedNivelNumber = sessionStorage.getItem("selectedNivelNumber")
    const selectedTraineeData = sessionStorage.getItem("selectedTraineeData")
    const selectedFichaPrograma = sessionStorage.getItem("selectedFichaPrograma")

    if (selectedFichaNombre) setFichaNombre(selectedFichaNombre)
    if (selectedNivelNombre) setNivelNombre(selectedNivelNombre)
    if (selectedNivelNumber) setNivelNumber(Number.parseInt(selectedNivelNumber))
    if (selectedFichaPrograma) setFichaPrograma(selectedFichaPrograma)

    // Cargar datos del aprendiz desde sessionStorage
    if (selectedTraineeData) {
      try {
        const traineeData = JSON.parse(selectedTraineeData)
        setApprenticeId(traineeData._id || traineeData.id)

        setLearnerData({
          nombre: `${traineeData.nombre} ${traineeData.apellido}`,
          nivelActual: selectedNivelNombre,
          ficha: selectedFichaNombre,
          correo: traineeData.correo,
          telefono: traineeData.telefono,
          estado: traineeData.estado,
          documento: traineeData.documento,
          tipoDocumento: traineeData.tipoDocumento,
        })
      } catch (error) {
        console.error("Error parsing trainee data:", error)
        navigate("/progreso/cursosProgramados/niveles/aprendices")
      }
    } else {
      navigate("/progreso/cursosProgramados/niveles/aprendices")
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [navigate, nombre])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!learnerData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  // Formatear datos del aprendiz - CORREGIDO
  const formattedLearnerData = [
    { id: 1, atributo: "Nombre", valor: learnerData.nombre },
    { id: 2, atributo: "Nivel Actual", valor: learnerData.nivelActual },
    { id: 3, atributo: "Ficha", valor: learnerData.ficha },
    { id: 4, atributo: "Estado", valor: learnerData.estado },
    { id: 5, atributo: "Documento", valor: `${learnerData.tipoDocumento} ${learnerData.documento}` },
    { id: 6, atributo: "Correo", valor: learnerData.correo },
    { id: 7, atributo: "Teléfono", valor: learnerData.telefono },
    {
      id: 8,
      atributo: "Evaluaciones Aprobadas", // ✅ CAMBIO: Texto actualizado
      valor: calculatedStats
        ? `${calculatedStats.evaluacionesAprobadas}/${calculatedStats.evaluacionesProgramadas}` // ✅ CAMBIO: Formato 1/2
        : "0/0",
    },
    {
      id: 9,
      atributo: "Puntos Totales Obtenidos", // ✅ Solo puntos de evaluaciones aprobadas
      valor: calculatedStats?.puntosAprobadas || 0,
    },
  ]

  // Formatear progreso para la tabla - CORREGIDO
  const formattedProgress = progress.map((attempt) => {
    console.log("🔍 Procesando intento:", attempt) // Debug

    return {
      id: attempt._id,
      fecha: new Date(attempt.createdAt).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      hora: new Date(attempt.createdAt).toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      // Usar los campos correctos del modelo de evaluación
      tipo: attempt.evaluationId?.tipoEvaluacion || "Evaluación",
      nombreEvaluacion: attempt.evaluationId?.nombre || `Evaluación ${attempt.attemptNumber}`,
      puntajeObtenido: `${attempt.score}/${attempt.maxScore}`,
      porcentaje: `${attempt.percentage}%`,
      estado: attempt.passed ? "Aprobado" : "No Aprobado",
      duracion: `${attempt.timeSpent || 0} min`,
      intentos: attempt.attemptNumber,
      rawData: attempt, // Datos completos para acciones
    }
  })

  const progressColumns = [
    { key: "fecha", label: "Fecha", width: "10%" },
    { key: "hora", label: "Hora", width: "8%" },
    { key: "tipo", label: "Tipo", width: "12%" },
    { key: "nombreEvaluacion", label: "Nombre Evaluación", width: "25%" },
    { key: "puntajeObtenido", label: "Puntaje", width: "10%" },
    {
      key: "estado",
      label: "Estado",
      width: "12%",
      render: (item) => (
        <div
          className={`px-2 py-1 rounded-full text-xs text-white text-center w-24 ${
            item.estado === "Aprobado" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {item.estado}
        </div>
      ),
    },
    { key: "duracion", label: "Duración", width: "8%" },
    { key: "intentos", label: "Intento", width: "8%" },
  ]

  const handleBack = () => {
    navigate("/progreso/cursosProgramados/niveles/aprendices")
  }

  const handleRefresh = () => {
    refetch()
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
          <div className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-green-600">
              Progreso de {learnerData.nombre} - {nivelNombre} - Ficha {fichaNombre}
            </span>
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
        <div className="container mx-auto p-4 max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Volver a Aprendices
            </button>
            <button
              onClick={handleRefresh}
              disabled={progressLoading}
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {progressLoading ? "Cargando..." : "🔄 Actualizar"}
            </button>
          </div>

          {/* Debug de estadísticas calculadas */}
          {calculatedStats && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800">📊 Estadísticas Calculadas:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                <div>
                  <span className="font-medium">Evaluaciones Aprobadas:</span> {calculatedStats.evaluacionesAprobadas}
                </div>
                <div>
                  <span className="font-medium">Evaluaciones Programadas:</span>{" "}
                  {calculatedStats.evaluacionesProgramadas}
                </div>
                <div>
                  <span className="font-medium">Puntos Aprobadas:</span> {calculatedStats.puntosAprobadas}
                </div>
                <div>
                  <span className="font-medium">Total Realizadas:</span> {calculatedStats.totalEvaluacionesRealizadas}
                </div>
              </div>
            </div>
          )}

          {/* Información del aprendiz */}
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-[#1F384C] mb-4 text-center">PROGRESO DEL APRENDIZ</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden max-w-4xl w-full">
              <table className="w-full">
                <tbody>
                  {formattedLearnerData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-2 px-4 font-semibold text-[#1F384C] bg-gray-50 w-[30%]">{item.atributo}</td>
                      <td className="py-2 px-4 w-[70%]">
                        {typeof item.valor === "object" ? item.valor : item.valor || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de progreso */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1F384C]">TABLA DE PROGRESO</h2>
              {calculatedStats && (
                <div className="text-sm text-gray-600 flex gap-4">
                  <span>Total: {calculatedStats.totalEvaluacionesRealizadas} evaluaciones</span>
                  <span>Puntos: {calculatedStats.puntosAprobadas}</span>
                </div>
              )}
            </div>

            {progressLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                <span className="ml-2">Cargando evaluaciones...</span>
              </div>
            ) : progressError ? (
              <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg">
                <p className="font-semibold">Error al cargar las evaluaciones</p>
                <p className="text-sm">{progressError}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reintentar
                </button>
              </div>
            ) : formattedProgress.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-600">No hay evaluaciones registradas para este nivel</p>
                <p className="text-sm text-gray-500 mt-1">
                  Las evaluaciones aparecerán aquí una vez que el aprendiz las complete
                </p>
              </div>
            ) : (
              <GenericTable
                data={formattedProgress}
                columns={progressColumns}
                showActions={{ show: true, edit: false, delete: false, add: false }}
                defaultItemsPerPage={10}
                tooltipText="Ver Retroalimentación"
                emptyMessage="No hay evaluaciones registradas para este nivel"
                exportToExcel={{
                  enabled: true,
                  filename: `progreso_${learnerData.nombre.replace(/\s+/g, "_")}_${nivelNombre}_${fichaNombre}`,
                  exportFunction: (data) => {
                    let table = '<table border="1">'
                    table += "<tr>"
                    progressColumns.forEach((column) => {
                      table += `<th>${column.label}</th>`
                    })
                    table += "</tr>"

                    data.forEach((item) => {
                      table += "<tr>"
                      progressColumns.forEach((column) => {
                        if (column.key === "estado") {
                          table += `<td>${item.estado}</td>`
                        } else {
                          table += `<td>${item[column.key] || ""}</td>`
                        }
                      })
                      table += "</tr>"
                    })

                    table += "</table>"

                    const blob = new Blob(["\ufeff", table], {
                      type: "application/vnd.ms-excel;charset=utf-8",
                    })
                    const url = URL.createObjectURL(blob)

                    const a = document.createElement("a")
                    a.href = url
                    a.download = `progreso_${learnerData.nombre.replace(/\s+/g, "_")}_${nivelNombre}_${fichaNombre}.xls`
                    document.body.appendChild(a)
                    a.click()

                    setTimeout(() => {
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    }, 0)
                  },
                }}
              />
            )}

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
      </div>
    </div>
  )
}

export default ProgressViewWithRealData
