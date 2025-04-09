"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe, FileText, Calendar } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

const Ranking = () => {
  // Estado para el año y mes seleccionados
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMonth, setSelectedMonth] = useState("Mayo")
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Lista de meses
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Add click outside handler
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

  // Datos de ejemplo para las tablas de ranking
  const rankingData = [
    { top: 1, nombre: "Rafael Pereira", puntos: 967 },
    { top: 2, nombre: "Brayan Restrepo", puntos: 724 },
    { top: 3, nombre: "Zurangely Portillo", puntos: 601 },
    { top: 4, nombre: "Dickson Mosquera", puntos: 510 },
    { top: 5, nombre: "Diego Alejandro", puntos: 508 },
  ]

  // Función para seleccionar un año
  const handleYearSelect = (year) => {
    setSelectedYear(year)
  }

  // Función para seleccionar un mes
  const handleMonthSelect = (month) => {
    setSelectedMonth(month)
    setIsMonthDropdownOpen(false)
  }

  // Función para alternar el menú desplegable de meses
  const toggleMonthDropdown = () => {
    setIsMonthDropdownOpen(!isMonthDropdownOpen)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Ranking</h1>
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

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        {/* Filtros de año y mes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center w-full sm:w-auto">
            <span className="mr-2 text-xs font-medium text-[#1f384c] whitespace-nowrap">Año</span>
            <div className="flex gap-1 flex-wrap sm:flex-nowrap">
              {[2023, 2024, 2025].map((year) => (
                <button
                  key={year}
                  className={`px-3 py-1 flex-1 sm:flex-none text-xs ${
                    selectedYear === year ? "bg-[#1f384c] text-white" : "bg-white text-[#1f384c]"
                  } hover:bg-[#f0f0f0] hover:text-[#1f384c] rounded border border-[#d6dade] transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <span className="mr-2 text-xs font-medium text-[#1f384c]">Mes</span>
            <div className="relative flex-1 sm:flex-none">
              <button
                className="w-full sm:w-[120px] px-3 py-1 bg-white hover:bg-[#f0f0f0] text-[#1f384c] text-xs rounded border border-[#d6dade] flex items-center justify-between transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                onClick={toggleMonthDropdown}
              >
                <span>{selectedMonth}</span>
                <ChevronDown className="h-3 w-3 ml-1 transition-transform duration-200" />
              </button>

              {isMonthDropdownOpen && (
                <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-[120px] mt-1 bg-white border border-[#d6dade] rounded-md shadow-lg z-20">
                  <ul className="py-1 max-h-40 overflow-auto">
                    {months.map((month) => (
                      <li
                        key={month}
                        className={`px-2 py-1 text-xs cursor-pointer hover:bg-[#f0f0f0] ${
                          selectedMonth === month ? "bg-[#f1f2f7] font-medium" : ""
                        }`}
                        onClick={() => handleMonthSelect(month)}
                      >
                        {month}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta Aprendices */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-md hover:bg-blue-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Aprendices</p>
                <h2 className="text-3xl font-bold text-blue-500">2000</h2>
              </div>
            </div>
          </div>

          {/* Tarjeta Ficha */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-purple-500 transition-all duration-300 hover:shadow-md hover:bg-purple-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Ficha</p>
                <h2 className="text-3xl font-bold text-purple-500">120</h2>
              </div>
            </div>
          </div>

          {/* Tarjeta Programa */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-green-500 transition-all duration-300 hover:shadow-md hover:bg-green-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Programa</p>
                <h2 className="text-3xl font-bold text-green-500">120</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de tablas */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
            {[
              { 
                title: "Aprendices", 
                data: rankingData,
                color: "blue",
                icon: <Globe className="h-4 w-4" />
              },
              { 
                title: "Ficha", 
                data: rankingData,
                color: "purple",
                icon: <FileText className="h-4 w-4" />
              },
              { 
                title: "Programa", 
                data: rankingData,
                color: "green",
                icon: <Calendar className="h-4 w-4" />
              },
            ].map((section) => (
              <div key={section.title} className={`bg-white rounded-lg border-t-4 border-t-${section.color}-500 p-3 transition-all duration-300 hover:shadow-md`}>
                <div className="flex items-center gap-1 mb-3">
                  <div className={`bg-${section.color}-50 p-1 rounded-full text-${section.color}-500 transition-transform duration-200 hover:scale-110`}>
                    {section.icon}
                  </div>
                  <h2 className="text-sm font-bold text-[#1f384c]">{section.title}</h2>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 pb-1 border-b border-[#d6dade]">
                    <div className="text-xs font-medium text-[#1f384c]">Top</div>
                    <div className="text-xs font-medium text-[#1f384c]">Nombre</div>
                    <div className="text-xs font-medium text-[#1f384c] text-right">Puntos</div>
                  </div>
                  {section.data.map((item) => (
                    <div key={item.top} className="grid grid-cols-3 py-1 transition-colors duration-200 hover:bg-gray-50 rounded">
                      <div className={`text-${section.color}-500 text-xs font-bold`}>{item.top}</div>
                      <div className="text-[#1f384c] text-xs font-medium truncate">{item.nombre}</div>
                      <div className={`text-${section.color}-500 text-xs font-bold text-right`}>{item.puntos}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add the ConfirmationModal component here */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmText="Cerrar Sesión"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />
    </div>
  )
}

export default Ranking

