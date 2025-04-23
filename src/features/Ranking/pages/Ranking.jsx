"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe, FileText, Calendar, Search, X, SlidersHorizontal, Filter } from "lucide-react"
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
  const monthDropdownRef = useRef(null)

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("aprendices")

  // Estados para los filtros
  const [selectedFicha, setSelectedFicha] = useState("")
  const [selectedPrograma, setSelectedPrograma] = useState("")
  const [showFichaDropdown, setShowFichaDropdown] = useState(false)
  const [showProgramaDropdown, setShowProgramaDropdown] = useState(false)

  // Estado para almacenar las métricas
  const [metrics, setMetrics] = useState({
    aprendices: 0,
    fichas: 0,
    programas: 0,
  })

  // Lista de fichas disponibles (simuladas)
  const fichas = ["2889927-801", "2889927-802", "2889927-803", "2889927-804"]

  // Lista de programas disponibles
  const programas = ["Análisis y desarrollo de software", "Técnico en programación"]

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

  // Mapeo de nombres de meses a números
  const monthToNumber = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12,
  }

  // Add click outside handler for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setIsMonthDropdownOpen(false)
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

  // Base de datos completa con información de año y mes
  const fullRankingData = {
    // Datos para 2023
    2023: {
      // Enero 2023
      1: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 567,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 524, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 501,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 410,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 408,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 590,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 485,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 442,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 420,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 380,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 724,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 645, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 580,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 580, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 530, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 1500,
          fichas: 4,
          programas: 2,
        },
      },
      // Mayo 2023
      5: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 667,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 624, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 551,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 510,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 458,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 690,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 585,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 542,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 520,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 480,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 824,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 745, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 680,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 680, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 630, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 1700,
          fichas: 4,
          programas: 2,
        },
      },
    },
    // Datos para 2024
    2024: {
      // Enero 2024
      1: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 767,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 624, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 551,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 510,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 458,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 790,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 585,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 542,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 520,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 480,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 924,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 745, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 680,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 680, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 630, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 1800,
          fichas: 4,
          programas: 2,
        },
      },
      // Mayo 2024
      5: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 967,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 724, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 601,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 510,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 508,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 890,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 685,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 542,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 520,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 480,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 1024,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 845, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 780,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 780, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 830, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 2000,
          fichas: 4,
          programas: 2,
        },
      },
    },
    // Datos para 2025
    2025: {
      // Enero 2025
      1: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 1067,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 824, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 701,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 610,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 608,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 990,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 785,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 642,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 620,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 580,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 1124,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 945, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 880,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 880, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 930, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 2200,
          fichas: 4,
          programas: 2,
        },
      },
      // Mayo 2025 (datos futuros proyectados)
      5: {
        aprendices: [
          {
            top: 1,
            nombre: "Rafael Pereira",
            puntos: 1267,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Brayan Restrepo", puntos: 924, ficha: "2889927-803", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Zurangely Portillo",
            puntos: 801,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Dickson Mosquera",
            puntos: 710,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Diego Alejandro",
            puntos: 708,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        ficha: [
          {
            top: 1,
            nombre: "Laura S.",
            puntos: 1090,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 2,
            nombre: "Carlos M.",
            puntos: 885,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 3,
            nombre: "Miguel A.",
            puntos: 742,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 4,
            nombre: "Ana Gómez",
            puntos: 720,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          {
            top: 5,
            nombre: "Pedro Ruiz",
            puntos: 680,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
        ],
        programa: [
          {
            top: 1,
            nombre: "Carolina M.",
            puntos: 1324,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 2, nombre: "Alejandro G.", puntos: 1045, ficha: "2889927-804", programa: "Técnico en programación" },
          {
            top: 3,
            nombre: "Santiago R.",
            puntos: 980,
            ficha: "2889927-801",
            programa: "Análisis y desarrollo de software",
          },
          { top: 4, nombre: "María López", puntos: 980, ficha: "2889927-802", programa: "Técnico en programación" },
          { top: 5, nombre: "Beatriz H.", puntos: 1030, ficha: "2889927-804", programa: "Técnico en programación" },
        ],
        metrics: {
          aprendices: 2500,
          fichas: 4,
          programas: 2,
        },
      },
    },
  }

  // Obtener los datos actuales según el año y mes seleccionados
  const getCurrentData = () => {
    const monthNumber = monthToNumber[selectedMonth]

    // Verificar si existen datos para el año y mes seleccionados
    if (fullRankingData[selectedYear] && fullRankingData[selectedYear][monthNumber]) {
      return fullRankingData[selectedYear][monthNumber]
    }

    // Si no hay datos para el mes específico, buscar el mes más cercano disponible
    if (fullRankingData[selectedYear]) {
      const availableMonths = Object.keys(fullRankingData[selectedYear]).map(Number)
      if (availableMonths.length > 0) {
        // Encontrar el mes más cercano
        const closestMonth = availableMonths.reduce((prev, curr) =>
          Math.abs(curr - monthNumber) < Math.abs(prev - monthNumber) ? curr : prev,
        )
        return fullRankingData[selectedYear][closestMonth]
      }
    }

    // Si no hay datos para el año, usar los datos de 2024/Mayo como fallback
    return fullRankingData[2024][5]
  }

  // Actualizar los datos cuando cambia el año o mes
  useEffect(() => {
    const currentData = getCurrentData()
    setMetrics(currentData.metrics)
  }, [selectedYear, selectedMonth])

  // Función para filtrar los datos según los filtros seleccionados
  const getFilteredData = (category) => {
    const currentData = getCurrentData()
    let filteredData = [...currentData[category]]

    // Aplicar filtro según la categoría
    if (category === "ficha" && selectedFicha) {
      filteredData = filteredData.filter((item) => item.ficha === selectedFicha)
    } else if (category === "programa" && selectedPrograma) {
      filteredData = filteredData.filter((item) => item.programa === selectedPrograma)
      // Ordenar por puntos de mayor a menor cuando se filtra por programa
      filteredData.sort((a, b) => b.puntos - a.puntos)
    }

    return filteredData
  }

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

  // Limpiar los filtros
  const clearFilters = () => {
    setSelectedFicha("")
    setSelectedPrograma("")
  }

  // Renderizar el filtro contextual según la categoría
  const renderContextualFilter = (category) => {
    if (category === "ficha") {
      return (
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md shadow-sm text-xs hover:bg-gray-50"
            onClick={() => setShowFichaDropdown(!showFichaDropdown)}
          >
            <SlidersHorizontal className="w-3 h-3 text-gray-500" />
            {selectedFicha ? (
              <span className="font-medium text-[#1f384c]">{selectedFicha}</span>
            ) : (
              <span className="text-gray-500">Seleccionar ficha</span>
            )}
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showFichaDropdown && (
            <div className="absolute right-0 z-10 mt-1 w-36 bg-white shadow-lg max-h-40 rounded-md py-1 text-xs overflow-auto">
              {fichas.map((ficha) => (
                <div
                  key={ficha}
                  className={`cursor-pointer select-none relative py-1.5 px-3 hover:bg-gray-100 ${
                    selectedFicha === ficha ? "bg-blue-50 text-[#1f384c] font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedFicha(ficha)
                    setShowFichaDropdown(false)
                  }}
                >
                  {ficha}
                </div>
              ))}
              {selectedFicha && (
                <div
                  className="cursor-pointer select-none relative py-1.5 px-3 text-red-600 hover:bg-red-50 border-t"
                  onClick={() => {
                    setSelectedFicha("")
                    setShowFichaDropdown(false)
                  }}
                >
                  <X className="w-3 h-3 inline mr-1" />
                  Limpiar filtro
                </div>
              )}
            </div>
          )}
        </div>
      )
    } else if (category === "programa") {
      return (
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md shadow-sm text-xs hover:bg-gray-50"
            onClick={() => setShowProgramaDropdown(!showProgramaDropdown)}
          >
            <SlidersHorizontal className="w-3 h-3 text-gray-500" />
            {selectedPrograma ? (
              <span className="font-medium text-[#1f384c] truncate max-w-[100px]">{selectedPrograma}</span>
            ) : (
              <span className="text-gray-500">Seleccionar programa</span>
            )}
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showProgramaDropdown && (
            <div className="absolute right-0 z-10 mt-1 w-56 bg-white shadow-lg max-h-40 rounded-md py-1 text-xs overflow-auto">
              {programas.map((programa) => (
                <div
                  key={programa}
                  className={`cursor-pointer select-none relative py-1.5 px-3 hover:bg-gray-100 ${
                    selectedPrograma === programa ? "bg-blue-50 text-[#1f384c] font-medium" : ""
                  }`}
                  onClick={() => {
                    setSelectedPrograma(programa)
                    setShowProgramaDropdown(false)
                  }}
                >
                  {programa}
                </div>
              ))}
              {selectedPrograma && (
                <div
                  className="cursor-pointer select-none relative py-1.5 px-3 text-red-600 hover:bg-red-50 border-t"
                  onClick={() => {
                    setSelectedPrograma("")
                    setShowProgramaDropdown(false)
                  }}
                >
                  <X className="w-3 h-3 inline mr-1" />
                  Limpiar filtro
                </div>
              )}
            </div>
          )}
        </div>
      )
    }

    return null
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
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-[#d6dade]">
          <div className="flex items-center">
            <div className="bg-gray-50 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-[#1f384c]" />
            </div>
            <span className="text-sm font-medium text-[#1f384c] mr-3">Filtros:</span>
          </div>

          <div className="flex items-center">
            <span className="text-xs font-medium text-[#1f384c] mr-2">Año</span>
            <div className="flex bg-gray-50 rounded-md border border-[#d6dade] p-0.5">
              {[2023, 2024, 2025].map((year) => (
                <button
                  key={year}
                  className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 ${
                    selectedYear === year
                      ? "bg-[#1f384c] text-white shadow-sm"
                      : "bg-transparent text-[#1f384c] hover:bg-gray-100"
                  }`}
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-xs font-medium text-[#1f384c] mr-2">Mes</span>
            <div className="relative" ref={monthDropdownRef}>
              <button
                className="flex items-center justify-between min-w-[120px] px-3 py-1.5 bg-white text-[#1f384c] text-xs rounded-md border border-[#d6dade] hover:bg-gray-50 transition-all duration-200 shadow-sm"
                onClick={toggleMonthDropdown}
              >
                <span className="font-medium">{selectedMonth}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 ml-2 transition-transform duration-200 ${isMonthDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMonthDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[180px] bg-white border border-[#d6dade] rounded-lg shadow-lg z-20 py-2">
                  {months.map((month) => (
                    <button
                      key={month}
                      className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                        selectedMonth === month
                          ? "bg-blue-50 text-[#1f384c] font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleMonthSelect(month)}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <div className="bg-blue-50 px-3 py-1.5 rounded-md text-xs text-[#1f384c] font-medium flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
              Periodo: {selectedMonth} {selectedYear}
            </div>
          </div>
        </div>

        {/* Tarjetas de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Tarjeta Top Ranking de Aprendices */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-md hover:bg-blue-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-blue-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Top Ranking de Aprendices</p>
                <h2 className="text-3xl font-bold text-blue-500">{metrics.aprendices}</h2>
              </div>
            </div>
          </div>

          {/* Tarjeta Total de Fichas */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-purple-500 transition-all duration-300 hover:shadow-md hover:bg-purple-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-purple-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Total de Fichas</p>
                <h2 className="text-3xl font-bold text-purple-500">{metrics.fichas}</h2>
              </div>
            </div>
          </div>

          {/* Tarjeta Total de Programas */}
          <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-sm border-l-4 border-l-green-500 transition-all duration-300 hover:shadow-md hover:bg-green-50/30 cursor-pointer">
            <div className="flex items-center">
              <div className="bg-green-50 p-3 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#1f384c]">Total de Programas</p>
                <h2 className="text-3xl font-bold text-green-500">{metrics.programas}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de tablas */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
            {[
              {
                title: "Top Ranking de Aprendices",
                category: "aprendices",
                color: "blue",
                icon: <Globe className="h-4 w-4" />,
              },
              {
                title: "Total de Fichas",
                category: "ficha",
                color: "purple",
                icon: <FileText className="h-4 w-4" />,
              },
              {
                title: "Total de Programas",
                category: "programa",
                color: "green",
                icon: <Calendar className="h-4 w-4" />,
              },
            ].map((section) => (
              <div
                key={section.title}
                className={`bg-white rounded-lg border-t-4 border-t-${section.color}-500 p-3 transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <div
                      className={`bg-${section.color}-50 p-1 rounded-full text-${section.color}-500 transition-transform duration-200 hover:scale-110`}
                    >
                      {section.icon}
                    </div>
                    <h2 className="text-sm font-bold text-[#1f384c]">{section.title}</h2>
                  </div>
                  {/* Filtro contextual */}
                  {renderContextualFilter(section.category)}
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 pb-1 border-b border-[#d6dade]">
                    <div className="text-xs font-medium text-[#1f384c]">Top</div>
                    <div className="text-xs font-medium text-[#1f384c]">Nombre</div>
                    <div className="text-xs font-medium text-[#1f384c] text-right">Puntos</div>
                  </div>
                  {getFilteredData(section.category).length > 0 ? (
                    getFilteredData(section.category)
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          key={item.top}
                          className="grid grid-cols-3 py-1 transition-colors duration-200 hover:bg-gray-50 rounded"
                        >
                          <div className={`text-${section.color}-500 text-xs font-bold`}>{item.top}</div>
                          <div className="text-[#1f384c] text-xs font-medium truncate">{item.nombre}</div>
                          <div className={`text-${section.color}-500 text-xs font-bold text-right`}>{item.puntos}</div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4">
                      <Search className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                      <p className="text-gray-500 text-xs">No se encontraron resultados</p>
                    </div>
                  )}
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
