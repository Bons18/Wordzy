"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import { useApprenticesWithProgress } from "../hooks/use-apprentices-with-progress"
import ProgrammingDebugInfo from "./programming-debug-info"

const columns = [
  {
    key: "nombre",
    label: "Nombre",
    render: (item) => `${item.nombre} ${item.apellido}`,
  },
  { key: "correo", label: "Correo" },
  { key: "telefono", label: "Teléfono" },
  {
    key: "progreso",
    label: "Progreso",
    width: "18%",
    render: (item) => {
      const nivelNumber = Number.parseInt(sessionStorage.getItem("selectedNivelNumber")) || 1
      const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
      const progressPercentage = levelProgress?.porcentaje || 0

      return (
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 min-w-[100px]">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          <span className="text-sm text-gray-600 w-11 text-right mr-8">{progressPercentage}%</span>
        </div>
      )
    },
  },
  {
    key: "puntos",
    label: "Puntos Totales",
    width: "12%",
    render: (item) => {
      const nivelNumber = Number.parseInt(sessionStorage.getItem("selectedNivelNumber")) || 1
      const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
      const totalPoints = levelProgress?.puntosObtenidos || 0

      return <span className="font-medium text-gray-800">{totalPoints}</span>
    },
  },
  {
    key: "evaluaciones",
    label: "Evaluaciones",
    width: "12%",
    render: (item) => {
      const nivelNumber = Number.parseInt(sessionStorage.getItem("selectedNivelNumber")) || 1
      const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
      const aprobadas = levelProgress?.evaluacionesAprobadas || 0
      const programadas = levelProgress?.evaluacionesProgramadas || 0

      return (
        <span className="text-sm">
          {aprobadas}/{programadas}
        </span>
      )
    },
  },
]

const TraineesPageUpdated = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showDebug, setShowDebug] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [filteredTrainees, setFilteredTrainees] = useState([])
  const [fichaNombre, setFichaNombre] = useState("")
  const [fichaPrograma, setFichaPrograma] = useState("")
  const [nivelNombre, setNivelNombre] = useState("")
  const [nivelNumber, setNivelNumber] = useState(null)
  const dropdownRef = useRef(null)
  const [fichaId, setFichaId] = useState(null)

  // Usar el hook corregido
  const { apprentices, loading, error } = useApprenticesWithProgress(fichaNombre, fichaId)

  useEffect(() => {
    // Recuperar información del nivel y ficha seleccionados
    const selectedNivelNombre = sessionStorage.getItem("selectedNivelNombre")
    const selectedFichaNombre = sessionStorage.getItem("selectedFichaNombre")
    const selectedFichaPrograma = sessionStorage.getItem("selectedFichaPrograma")
    const selectedNivelNumber = sessionStorage.getItem("selectedNivelNumber")
    const selectedFichaId = sessionStorage.getItem("selectedFichaId")

    console.log("📋 Datos del sessionStorage:", {
      selectedNivelNombre,
      selectedFichaNombre,
      selectedFichaPrograma,
      selectedNivelNumber,
      selectedFichaId,
    })

    if (selectedNivelNombre && selectedFichaNombre && selectedFichaId) {
      setNivelNombre(selectedNivelNombre)
      setFichaNombre(selectedFichaNombre)
      setFichaPrograma(selectedFichaPrograma || "")
      setNivelNumber(Number.parseInt(selectedNivelNumber) || 1)
      setFichaId(selectedFichaId)
    } else {
      navigate("/progreso/cursosProgramados")
    }
  }, [navigate])

  useEffect(() => {
    // Filtrar aprendices que están en el nivel actual
    if (apprentices.length > 0) {
      console.log("📊 Aprendices con progreso calculado:", apprentices)
      setFilteredTrainees(apprentices)
    }
  }, [apprentices, nivelNumber])

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

  const handleShowProgress = (trainee) => {
    console.log("🔍 Seleccionando aprendiz:", trainee)
    sessionStorage.setItem("selectedTraineeId", trainee.id || trainee._id)
    sessionStorage.setItem("selectedTraineeData", JSON.stringify(trainee))
    navigate(
      `/progreso/cursosProgramados/niveles/aprendices/progreso/${encodeURIComponent(`${trainee.nombre} ${trainee.apellido}`)}`,
    )
  }

  const handleBack = () => {
    navigate("/progreso/cursosProgramados/niveles")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-2">Calculando progreso de aprendices...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">
          <p className="font-semibold">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
          <div className="text-sm text-gray-500 mt-1">
            <span className="font-medium text-green-600">
              Aprendices del {nivelNombre} - Ficha {fichaNombre}
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
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Volver a Niveles
          </button>
          <button
            onClick={() => setShowDebug(!showDebug)}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-600 transition-colors"
          >
            {showDebug ? "🔍 Ocultar Debug" : "🔍 Mostrar Debug"}
          </button>
        </div>

        {/* Información de debug de la programación */}
        {showDebug && <ProgrammingDebugInfo programName={fichaPrograma} />}

        {/* Información de estado */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800">📊 Estado Actual:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
            <div>
              <span className="font-medium">Nivel:</span> {nivelNombre} (#{nivelNumber})
            </div>
            <div>
              <span className="font-medium">Ficha:</span> {fichaNombre}
            </div>
            <div>
              <span className="font-medium">Programa:</span> {fichaPrograma}
            </div>
            <div>
              <span className="font-medium">Aprendices:</span> {filteredTrainees.length}
            </div>
          </div>
        </div>

        <GenericTable
          data={filteredTrainees}
          columns={columns}
          onShow={handleShowProgress}
          tooltipText="Ver Progreso"
          showActions={{ show: true, edit: false, delete: false, add: false }}
          exportToExcel={{
            enabled: true,
            filename: `aprendices_${nivelNombre}_ficha_${fichaNombre}`,
            exportFunction: (data) => {
              let table = '<table border="1">'
              table += "<tr>"
              columns.forEach((column) => {
                table += `<th>${column.label}</th>`
              })
              table += "</tr>"

              data.forEach((item) => {
                table += "<tr>"
                columns.forEach((column) => {
                  if (column.key === "nombre") {
                    table += `<td>${item.nombre} ${item.apellido}</td>`
                  } else if (column.key === "progreso") {
                    const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
                    table += `<td>${levelProgress?.porcentaje || 0}%</td>`
                  } else if (column.key === "puntos") {
                    const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
                    table += `<td>${levelProgress?.puntosObtenidos || 0}</td>`
                  } else if (column.key === "evaluaciones") {
                    const levelProgress = item.progresoNiveles?.find((p) => p.nivel === nivelNumber)
                    const aprobadas = levelProgress?.evaluacionesAprobadas || 0
                    const programadas = levelProgress?.evaluacionesProgramadas || 0
                    table += `<td>${aprobadas}/${programadas}</td>`
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
              a.download = `aprendices_${nivelNombre}_ficha_${fichaNombre}.xls`
              document.body.appendChild(a)
              a.click()

              setTimeout(() => {
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }, 0)
            },
          }}
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

export default TraineesPageUpdated
