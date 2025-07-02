"use client"

import { useEffect, useState, useRef } from "react"
import GenericTable from "../../../shared/components/Table"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useParams, useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import { useApprenticeProgress } from "../hooks/use-apprentice-progress"
import { useGetProgrammingByProgramName } from "../hooks/use-get-programming-by-program-name"
import { formatDate } from "../../../shared/utils/dateFormatter"
import CustomSelect from "../../CourseProgramming/components/course-programming/ui/custom-select"


const ProgressViewWithTopicsFinal = () => {
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

  // Estados para el filtro por temas
  const [availableTopics, setAvailableTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [filteredProgress, setFilteredProgress] = useState([])

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

  // Función para extraer evaluaciones de un nivel con información de temas
  const getEvaluationsFromLevel = (level) => {
    const evaluations = []
    if (level.topics && level.topics.length > 0) {
      level.topics.forEach((topic) => {
        // Usar directamente los datos de la programación que ya incluyen name
        const topicId = topic.topicId
        const topicName = topic.name || "Tema no identificado"

        if (topic.activities && topic.activities.length > 0) {
          topic.activities.forEach((activity) => {
            evaluations.push({
              evaluationId: activity.evaluationId,
              type: "activity",
              value: activity.value,
              topicId: topicId,
              topicName: topicName,
            })
          })
        }
        if (topic.exams && topic.exams.length > 0) {
          topic.exams.forEach((exam) => {
            evaluations.push({
              evaluationId: exam.evaluationId,
              type: "exam",
              value: exam.value,
              topicId: topicId,
              topicName: topicName,
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
    if (programming && nivelNumber) {
      // Obtener el nivel actual de la programación
      const currentLevel = programming.levels?.[nivelNumber - 1]
      if (!currentLevel) {
        console.log("❌ No se encontró el nivel en la programación")
        setCalculatedStats(null)
        return
      }

      // Obtener evaluaciones programadas para este nivel
      const evaluacionesProgramadas = getEvaluationsFromLevel(currentLevel)

      // Filtrar evaluaciones programadas por tema si hay un tema seleccionado
      let evaluacionesProgramadasFiltradas = evaluacionesProgramadas
      if (selectedTopic !== "all") {
        evaluacionesProgramadasFiltradas = evaluacionesProgramadas.filter(
          (evalProgramada) => evalProgramada.topicId === selectedTopic,
        )
      }

      // Filtrar progreso por tema si hay un tema seleccionado
      let progressFiltrado = progress
      if (selectedTopic !== "all") {
        progressFiltrado = progress.filter((attempt) => {
          const evaluationProgramada = evaluacionesProgramadas.find(
            (evalItem) =>
              evalItem.evaluationId === attempt.evaluationId ||
              evalItem.evaluationId === attempt.evaluationId?._id ||
              evalItem.evaluationId?.toString() === attempt.evaluationId?.toString(),
          )
          return evaluationProgramada?.topicId === selectedTopic
        })
      }

      // Filtrar solo evaluaciones aprobadas del progreso filtrado
      const evaluacionesAprobadas = progressFiltrado.filter((p) => p.passed === true)

      // Calcular puntos solo de evaluaciones aprobadas del filtro actual
      const puntosAprobadas = evaluacionesAprobadas.reduce((sum, p) => sum + (p.score || 0), 0)
      // Contar evaluaciones aprobadas vs programadas (del filtro actual)
      let evaluacionesAprobadasProgramadas = 0
      evaluacionesProgramadasFiltradas.forEach((evalProgramada) => {
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
        evaluacionesProgramadas: evaluacionesProgramadasFiltradas.length,
        puntosAprobadas: puntosAprobadas,
        totalEvaluacionesRealizadas: progressFiltrado.length,
        temaSeleccionado:
          selectedTopic === "all"
            ? "Todos los temas"
            : availableTopics.find((t) => t.id === selectedTopic)?.name || "Tema seleccionado",
      })
    } else {
      setCalculatedStats(null)
    }
  }, [progress, programming, nivelNumber, selectedTopic, availableTopics])

  // Efecto para obtener temas disponibles y enriquecer los datos de progreso
  useEffect(() => {
    const loadTopicsAndEnrichProgress = () => {
      if (programming && nivelNumber) {
        // Obtener el nivel actual de la programación
        const currentLevel = programming.levels?.[nivelNumber - 1]

        if (!currentLevel || !currentLevel.topics) {
          console.log("❌ No se encontraron temas en el nivel actual")
          setAvailableTopics([])
          setFilteredProgress(progress)
          return
        }

        // Extraer información de temas directamente de la programación
        const topicsInfo = currentLevel.topics.map((topic, index) => {
          return {
            id: topic.topicId,
            name: topic.name || `Tema ${topic.topicId}`,
            description: topic.description || "",
          }
        })

        setAvailableTopics(topicsInfo.filter((topic) => topic.name && topic.id))

        // Enriquecer el progreso con información de temas
        const evaluacionesProgramadas = getEvaluationsFromLevel(currentLevel)

        const enrichedProgress = progress.map((attempt) => {
          // Buscar la evaluación programada correspondiente
          const evaluationProgramada = evaluacionesProgramadas.find(
            (evalItem) =>
              evalItem.evaluationId === attempt.evaluationId ||
              evalItem.evaluationId === attempt.evaluationId?._id ||
              evalItem.evaluationId?.toString() === attempt.evaluationId?.toString(),
          )

          return {
            ...attempt,
            topicId: evaluationProgramada?.topicId || null,
            topicName: evaluationProgramada?.topicName || "Tema no identificado",
          }
        })
        setFilteredProgress(enrichedProgress)
      } else {
        setFilteredProgress(progress)
      }
    }

    loadTopicsAndEnrichProgress()
  }, [programming, nivelNumber, progress])

  // Efecto para filtrar progreso por tema seleccionado
  useEffect(() => {
    if (selectedTopic === "all") {
      // Mostrar todas las evaluaciones con nombres de temas
      const enrichedProgress = progress.map((attempt) => {
        if (programming && nivelNumber) {
          const currentLevel = programming.levels?.[nivelNumber - 1]
          if (currentLevel) {
            const evaluacionesProgramadas = getEvaluationsFromLevel(currentLevel)
            const evaluationProgramada = evaluacionesProgramadas.find(
              (evalItem) =>
                evalItem.evaluationId === attempt.evaluationId ||
                evalItem.evaluationId === attempt.evaluationId?._id ||
                evalItem.evaluationId?.toString() === attempt.evaluationId?.toString(),
            )

            if (evaluationProgramada) {
              return {
                ...attempt,
                topicId: evaluationProgramada.topicId,
                topicName: evaluationProgramada.topicName,
              }
            }
          }
        }

        return {
          ...attempt,
          topicName: "Tema no identificado",
        }
      })

      setFilteredProgress(enrichedProgress)
    } else {
      // Filtrar por tema específico
      const filtered = progress
        .filter((attempt) => {
          if (programming && nivelNumber) {
            const currentLevel = programming.levels?.[nivelNumber - 1]
            if (currentLevel) {
              const evaluacionesProgramadas = getEvaluationsFromLevel(currentLevel)
              const evaluationProgramada = evaluacionesProgramadas.find(
                (evalItem) =>
                  evalItem.evaluationId === attempt.evaluationId ||
                  evalItem.evaluationId === attempt.evaluationId?._id ||
                  evalItem.evaluationId?.toString() === attempt.evaluationId?.toString(),
              )

              return evaluationProgramada?.topicId === selectedTopic
            }
          }
          return false
        })
        .map((attempt) => {
          // Enriquecer con información del tema seleccionado
          const topicInfo = availableTopics.find((topic) => topic.id === selectedTopic)
          return {
            ...attempt,
            topicId: selectedTopic,
            topicName: topicInfo?.name || "Tema seleccionado",
          }
        })
      setFilteredProgress(filtered)
    }
  }, [selectedTopic, progress, programming, nivelNumber, availableTopics])

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

  // Formatear datos del aprendiz
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
      atributo: "Evaluaciones Aprobadas",
      valor: calculatedStats
        ? `${calculatedStats.evaluacionesAprobadas}/${calculatedStats.evaluacionesProgramadas}`
        : "0/0",
    },
    {
      id: 9,
      atributo: "Puntos Totales Obtenidos",
      valor: calculatedStats?.puntosAprobadas || 0,
    },
  ]

  // Formatear progreso para la tabla
  const formattedProgress = filteredProgress.map((attempt) => {
    return {
      id: attempt._id,
      fecha: formatDate(attempt.createdAt),
      hora: new Date(attempt.createdAt).toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      tipo: attempt.evaluationId?.tipoEvaluacion || "Evaluación",
      nombreEvaluacion: attempt.evaluationId?.nombre || `Evaluación ${attempt.attemptNumber}`,
      puntajeObtenido: `${attempt.score}/${attempt.maxScore}`,
      porcentaje: `${attempt.percentage}%`,
      estado: attempt.passed ? "Aprobado" : "No Aprobado",
      duracion: `${attempt.timeSpent || 0} min`,
      intentos: attempt.attemptNumber,
      rawData: attempt,
    }
  })

  const progressColumns = [
    { key: "fecha", label: "Fecha", width: "15%" },
    { key: "hora", label: "Hora", width: "15%" },
    { key: "tipo", label: "Tipo", width: "15%" },
    { key: "nombreEvaluacion", label: "Nombre Evaluación", width: "30%" },
    { key: "puntajeObtenido", label: "Puntaje", width: "15%" },
    {
      key: "estado",
      label: "Estado",
      width: "20%",
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
    { key: "intentos", label: "Intentos", width: "12%" },
  ]

  const handleBack = () => {
    navigate("/progreso/cursosProgramados/niveles/aprendices")
  }

  const handleRefresh = () => {
    refetch()
  }

  // Preparar opciones para el CustomSelect
  const topicSelectOptions = [
    { value: "all", label: "Todos los temas" },
    ...availableTopics.map((topic) => ({
      value: topic.id,
      label: topic.name,
    })),
  ]

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
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
              <RefreshCw size={15} />
              {progressLoading ? "Cargando..." : "Actualizar"}
            </button>
          </div>

          {/* Información del aprendiz */}
          <div className="mb-6 flex flex-col items-center">
            <h2 className="text-lg font-bold text-[#1F384C] mb-4 text-center">PROGRESO DEL APRENDIZ</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden max-w-4xl w-full">
              <table className="w-full text-sm">
                <tbody>
                  {formattedLearnerData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-2 px-4 font-semibold text-[#1F384C]  bg-gray-50 w-[30%]">{item.atributo}</td>
                      <td className="py-2 px-4 w-[70%]">
                        {typeof item.valor === "object" ? item.valor : item.valor || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Filtro por temas con CustomSelect */}
          <div className="p-4 bg-gray-50 rounded-[10px]">
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <label htmlFor="topic-select" className="text-base font-semibold text-gray-700 mb-2 block">
                  Filtrar por Tema:
                </label>
                <CustomSelect
                  options={topicSelectOptions}
                  value={selectedTopic}
                  onChange={setSelectedTopic}
                />
              </div>
              <div className="text-sm text-gray-600 mt-6">
                <div className="text-sm font-medium">Evaluaciones mostradas:</div>
                <div>
                  {formattedProgress.length} de {progress.length} total
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de progreso */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1F384C]">
                TABLA DE PROGRESO
                {selectedTopic !== "all" && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    - {availableTopics.find((t) => t.id === selectedTopic)?.name || "Tema seleccionado"}
                  </span>
                )}
              </h2>
              {calculatedStats && (
                <div className="text-sm text-gray-600 flex gap-4">
                  <span>Filtradas: {formattedProgress.length}</span>
                  <span>Total: {calculatedStats.totalEvaluacionesRealizadas}</span>
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
                <p className="text-gray-600">
                  {selectedTopic === "all"
                    ? "No hay evaluaciones registradas para este nivel"
                    : `No hay evaluaciones registradas para el tema seleccionado`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedTopic === "all"
                    ? "Las evaluaciones aparecerán aquí una vez que el aprendiz las complete"
                    : "Selecciona 'Todos los temas' para ver todas las evaluaciones o elige otro tema"}
                </p>
              </div>
            ) : (
              <GenericTable
                data={formattedProgress}
                columns={progressColumns}
                showActions={{ show: true, edit: false, delete: false, add: false }}
                defaultItemsPerPage={10}
                tooltipText="Ver Retroalimentación"
                emptyMessage={
                  selectedTopic === "all"
                    ? "No hay evaluaciones registradas para este nivel"
                    : "No hay evaluaciones para el tema seleccionado"
                }
                exportToExcel={{
                  enabled: true,
                  filename: `progreso_${learnerData.nombre.replace(/\s+/g, "_")}_${nivelNombre}_${fichaNombre}${selectedTopic !== "all" ? `_${availableTopics.find((t) => t.id === selectedTopic)?.name?.replace(/\s+/g, "_") || "tema"}` : ""}`,
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
                    a.download = `progreso_${learnerData.nombre.replace(/\s+/g, "_")}_${nivelNombre}_${fichaNombre}${selectedTopic !== "all" ? `_${availableTopics.find((t) => t.id === selectedTopic)?.name?.replace(/\s+/g, "_") || "tema"}` : ""}.xls`
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

export default ProgressViewWithTopicsFinal
