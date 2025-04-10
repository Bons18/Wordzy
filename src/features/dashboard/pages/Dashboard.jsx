"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Eye } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { FiEye } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import Tooltip from "../../../shared/components/Tooltip"

// Datos de niveles que coinciden con ScheduledCoursesPage
const scheduledCourses = [
  { id: 1, nivel: "Nivel 1", cantidadFichas: "25", cantidadInstructores: "3", progreso: "25%" },
  { id: 2, nivel: "Nivel 2", cantidadFichas: "30", cantidadInstructores: "4", progreso: "100%" },
  { id: 3, nivel: "Nivel 3", cantidadFichas: "29", cantidadInstructores: "1", progreso: "50%" },
  { id: 4, nivel: "Nivel 4", cantidadFichas: "10", cantidadInstructores: "5", progreso: "10%" },
  { id: 5, nivel: "Nivel 5", cantidadFichas: "13", cantidadInstructores: "2", progreso: "75%" },
  { id: 6, nivel: "Nivel 6", cantidadFichas: "8", cantidadInstructores: "3", progreso: "80%" },
]

// Datos históricos por año
const historicalData = {
  2023: [
    { id: 1, nivel: "Nivel 1", cantidadFichas: "20", cantidadInstructores: "2", progreso: "100%" },
    { id: 2, nivel: "Nivel 2", cantidadFichas: "22", cantidadInstructores: "3", progreso: "100%" },
    { id: 3, nivel: "Nivel 3", cantidadFichas: "18", cantidadInstructores: "2", progreso: "100%" },
    { id: 4, nivel: "Nivel 4", cantidadFichas: "15", cantidadInstructores: "4", progreso: "90%" },
    { id: 5, nivel: "Nivel 5", cantidadFichas: "10", cantidadInstructores: "2", progreso: "85%" },
    { id: 6, nivel: "Nivel 6", cantidadFichas: "5", cantidadInstructores: "1", progreso: "70%" },
  ],
  2024: [
    { id: 1, nivel: "Nivel 1", cantidadFichas: "22", cantidadInstructores: "3", progreso: "100%" },
    { id: 2, nivel: "Nivel 2", cantidadFichas: "25", cantidadInstructores: "4", progreso: "95%" },
    { id: 3, nivel: "Nivel 3", cantidadFichas: "24", cantidadInstructores: "2", progreso: "80%" },
    { id: 4, nivel: "Nivel 4", cantidadFichas: "18", cantidadInstructores: "3", progreso: "60%" },
    { id: 5, nivel: "Nivel 5", cantidadFichas: "15", cantidadInstructores: "2", progreso: "40%" },
    { id: 6, nivel: "Nivel 6", cantidadFichas: "10", cantidadInstructores: "2", progreso: "20%" },
  ],
  2025: scheduledCourses, // Año actual
}

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [activeRankingTab, setActiveRankingTab] = useState("aprendices")
  const [selectedYear, setSelectedYear] = useState(2025) // Año actual por defecto
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [displayedCourses, setDisplayedCourses] = useState(scheduledCourses)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const yearDropdownRef = useRef(null)

  // Sample data for the dashboard
  const competencyData = {
    listening: 45,
    vocabulary: 30,
    grammar: 32,
    reading: 18,
    writing: 15,
  }

  // Sample ranking data
  const rankingData = [
    { id: 1, name: "Rafael Pereira", points: 967 },
    { id: 2, name: "Brayan Restrepo", points: 724 },
    { id: 3, name: "Zurangely Portillo", points: 601 },
    { id: 4, name: "Dickson Mosquera", points: 510 },
    { id: 5, name: "Diego Alejandro", points: 508 },
  ]

  const studentPoints = 862
  const completionRate = 20.79
  const lessonsStats = {
    won: 60,
    lost: 40,
  }

  useEffect(() => {
    // Actualizar los cursos mostrados cuando cambia el año seleccionado
    if (historicalData[selectedYear]) {
      setDisplayedCourses(historicalData[selectedYear])
    } else {
      setDisplayedCourses(scheduledCourses)
    }
  }, [selectedYear])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false)
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

  const handleYearSelect = (year) => {
    setSelectedYear(year)
    setShowYearDropdown(false)
  }

  const navigateToLevelDetail = (level) => {
    // Guardar el nivel seleccionado en sessionStorage para usarlo en las siguientes páginas
    sessionStorage.setItem("selectedNivelId", level.id)
    sessionStorage.setItem("selectedNivelNombre", level.nivel)
    navigate("/progreso/cursosProgramados/fichas")
  }

  // Helper function to get status color based on progress percentage
  const getStatusColor = (progress) => {
    const percentage = Number.parseInt(progress)
    if (percentage >= 80) return "bg-blue-500"
    if (percentage >= 50) return "bg-yellow-300"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-3 px-4 sm:px-6 border-b border-[#d6dade] shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1f384c]">Dashboard</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50"
            >
              <span>Administrador</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
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

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1f384c]">Cerrar Sesión</h3>
                      <p className="mt-2 text-[#627b87]">¿Está seguro de que desea cerrar la sesión actual?</p>
                    </div>

                    <div className="flex justify-center gap-3">
                      <button
                        className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                        onClick={() => setShowLogoutConfirm(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        {/* Two Column Layout for Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ranking Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-[#1f384c] mb-4">Ranking de Aprendices</h2>

              {/* Ranking Tabs */}
              <div className="flex border-b border-gray-200 mb-5">
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeRankingTab === "aprendices" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                  onClick={() => setActiveRankingTab("aprendices")}
                >
                  Aprendices
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeRankingTab === "ficha" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                  onClick={() => setActiveRankingTab("ficha")}
                >
                  Ficha
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${activeRankingTab === "programa" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                  onClick={() => setActiveRankingTab("programa")}
                >
                  Programa
                </button>
              </div>

              {/* Ranking Charts */}
              <div>
                {/* Aprendices Chart */}
                <div className={`${activeRankingTab === "aprendices" ? "block" : "hidden"}`}>
                  <div className="space-y-3">
                    {rankingData.map((student) => (
                      <div key={student.id} className="flex items-center">
                        <div className="w-6 text-sm font-medium text-gray-700 mr-2">{student.id}</div>
                        <div className="w-28 sm:w-32 text-sm text-gray-700 mr-2 truncate">{student.name}</div>
                        <div className="flex-1">
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-blue-500 h-3 rounded-full"
                                  style={{ width: `${(student.points / 1000) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700 ml-2">{student.points}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ficha Chart */}
                <div className={`${activeRankingTab === "ficha" ? "block" : "hidden"}`}>
                  <div className="space-y-3">
                    {rankingData.map((student) => (
                      <div key={student.id} className="flex items-center">
                        <div className="w-6 text-sm font-medium text-gray-700 mr-2">{student.id}</div>
                        <div className="w-28 sm:w-32 text-sm text-gray-700 mr-2 truncate">{student.name}</div>
                        <div className="flex-1">
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-indigo-500 h-3 rounded-full"
                                  style={{ width: `${(student.points / 1000) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700 ml-2">{student.points}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Programa Chart */}
                <div className={`${activeRankingTab === "programa" ? "block" : "hidden"}`}>
                  <div className="space-y-3">
                    {rankingData.map((student) => (
                      <div key={student.id} className="flex items-center">
                        <div className="w-6 text-sm font-medium text-gray-700 mr-2">{student.id}</div>
                        <div className="w-28 sm:w-32 text-sm text-gray-700 mr-2 truncate">{student.name}</div>
                        <div className="flex-1">
                          <div className="relative pt-1">
                            <div className="flex items-center justify-between">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className="bg-green-500 h-3 rounded-full"
                                  style={{ width: `${(student.points / 1000) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-gray-700 ml-2">{student.points}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Student Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-[420px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#1f384c]">Análisis de Puntos por Estudiante</h2>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">TRIMESTRE</div>
              </div>

              <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                  <p className="text-indigo-600 font-medium mb-2">Año</p>
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                      2023
                    </button>
                    <button className="px-4 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                      2024
                    </button>
                    <button className="px-4 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700">
                      2025
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-indigo-600 font-medium mb-2">Mes</p>
                  <div className="relative">
                    <select className="appearance-none bg-gray-100 border-0 rounded-md py-1 pl-4 pr-8 text-gray-700 cursor-pointer">
                      <option>Mayo</option>
                      <option>Junio</option>
                      <option>Julio</option>
                      <option>Agosto</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow relative mt-4">
                {/* Chart container with grid lines */}
                <div className="h-full relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-indigo-600 font-medium">
                    <span>50%</span>
                    <span>40%</span>
                    <span>30%</span>
                    <span>20%</span>
                    <span>10%</span>
                  </div>

                  {/* Horizontal grid lines */}
                  <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div
                        key={index}
                        className="w-full border-t border-red-100"
                        style={{ borderColor: index === 2 ? "#ef4444" : "#f3f4f6" }}
                      ></div>
                    ))}
                  </div>

                  {/* Bar chart */}
                  <div className="absolute left-10 right-4 bottom-0 top-0 flex items-end justify-around">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-indigo-600 font-medium mb-1">29.21%</div>
                      <div
                        className="w-14 bg-red-400 rounded-t-lg"
                        style={{ height: "29.21%", marginBottom: "32px" }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-indigo-600 font-medium mb-1">21.87%</div>
                      <div
                        className="w-14 bg-yellow-300 rounded-t-lg"
                        style={{ height: "21.87%", marginBottom: "32px" }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-indigo-600 font-medium mb-1">18.15%</div>
                      <div
                        className="w-14 bg-red-400 rounded-t-lg"
                        style={{ height: "18.15%", marginBottom: "32px" }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-indigo-600 font-medium mb-1">15.34%</div>
                      <div
                        className="w-14 bg-indigo-500 rounded-t-lg"
                        style={{ height: "15.34%", marginBottom: "32px" }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-indigo-600 font-medium mb-1">15.34%</div>
                      <div
                        className="w-14 bg-indigo-500 rounded-t-lg"
                        style={{ height: "15.34%", marginBottom: "32px" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Language Competency Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#1f384c]">Competencias lingüísticas</h2>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">TRIMESTRE</div>
              </div>

              <div className="flex flex-wrap mb-4 gap-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Bueno</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                  <span className="text-sm text-gray-600">Intermedio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Bajo</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 mt-4">
                {Object.entries(competencyData).map(([skill, value]) => (
                  <div key={skill} className="flex flex-col items-center">
                    <div className="h-40 w-10 bg-gray-100 rounded-md relative mb-2">
                      <div
                        className="absolute bottom-0 w-full bg-blue-400 rounded-md"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 capitalize">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons Progress - MODIFICADO */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-[470px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#1f384c]">Progreso de niveles</h2>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium">AÑO</div>
              </div>

              {/* Selector de año - REDISEÑADO */}
              <div className="flex items-center mb-4 justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500">Año:</span>
                  <div className="relative inline-block" ref={yearDropdownRef}>
                    <button
                      onClick={() => setShowYearDropdown(!showYearDropdown)}
                      className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      {selectedYear}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${showYearDropdown ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showYearDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[100px]">
                        {Object.keys(historicalData).map((year) => (
                          <button
                            key={year}
                            onClick={() => handleYearSelect(Number.parseInt(year))}
                            className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${
                              Number.parseInt(year) === selectedYear
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
                    <span className="text-xs text-gray-600">Bueno</span>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-300 mr-1.5"></div>
                    <span className="text-xs text-gray-600">Intermedio</span>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                    <span className="text-xs text-gray-600">Bajo</span>
                  </div>
                </div>
              </div>

              <div className="flex-grow overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                        Nivel
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center py-2">
                        Fichas
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                        Progreso
                      </th>
                      <th className="text-left text-xs text-center font-medium text-gray-500 uppercase tracking-wider py-2">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCourses.map((course) => (
                      <tr key={course.id} className="border-t border-gray-100">
                        <td className="py-2 text-sm text-gray-700">{course.nivel}</td>
                        <td className="py-2 text-sm text-gray-700 text-center">{course.cantidadFichas}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2 w-full">
                            <div className="flex-1 min-w-[100px]">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getStatusColor(course.progreso)}`}
                                  style={{ width: course.progreso }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm text-gray-600 w-11 text-right">{course.progreso}</span>
                          </div>
                        </td>
                        <td className="py-2 text-center">
                          <Tooltip text="Ver Fichas" position="top">
                          <button
                            onClick={() => navigateToLevelDetail(course)}
                            className="px-3 py-1 text-xs text-center rounded-md transition-colors"
                          >
                            <Eye className="h-5 w-6 text-blue-500" />
                          </button>
                          </Tooltip>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Lesson Stats */}
            <div className="mt-auto grid grid-cols-2 gap-4 pt-4">
                <div className="bg-green-50 rounded-lg p-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Ganadas</h3>
                    <p className="text-xl font-bold text-green-800">{lessonsStats.won}%</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Perdidas</h3>
                    <p className="text-xl font-bold text-red-800">{lessonsStats.lost}%</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
