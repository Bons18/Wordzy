"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import GenericTable from "../../../shared/components/Table"
import FeedbackFilters from "../components/FeedbackFilters"
import { useFeedbackData } from "../hooks/useFeedbackData"
import { useFeedbackSearch } from "../hooks/useFeedbackSearch"
import StudentDetailPanel from "../components/StudentDetailPanel"
import { useStudentDetails } from "../hooks/useStudentDetails"

const Feedback = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const dropdownRef = useRef(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedFeedbackItem, setSelectedFeedbackItem] = useState(null)

  // Hooks para datos y búsqueda
  const { fichas, instructors, niveles, loading: dataLoading, error: dataError } = useFeedbackData()
  const { feedbackData, loading: searchLoading, error: searchError, hasSearched, searchFeedback } = useFeedbackSearch()

  // Columnas para la tabla de retroalimentación
  const columns = [
    { key: "programa", label: "Programa", width: "20%" },
    { key: "ficha", label: "Ficha", width: "10%" },
    { key: "nivel", label: "Nivel", width: "10%" },
    { key: "tema", label: "Tema", width: "25%" },
    { key: "actividad", label: "Actividad", width: "20%" },
    {
      key: "ejecutada",
      label: "Ejecutada",
      width: "10%",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            item.ejecutada === "Sí" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {item.ejecutada}
        </span>
      ),
    },
  ]

  // Cerrar dropdown al hacer clic fuera
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

  const handleSearch = (filters) => {
    console.log("Ejecutando búsqueda con filtros:", filters)
    searchFeedback(filters)
  }

  const handleViewDetail = (item) => {
    console.log("Mostrando detalle:", item)
    setSelectedFeedbackItem(item)
    setShowDetailModal(true)
  }

  if (dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando datos iniciales...</p>
          <p className="text-gray-500 text-sm mt-2">Obteniendo fichas de la API...</p>
        </div>
      </div>
    )
  }

  if (dataError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error al cargar los datos</h3>
            <p className="text-red-700">{dataError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  const FeedbackDetailsContent = ({ feedbackItem }) => {
    const { studentData, loading, error, loadStudentData } = useStudentDetails()
    const [showStudentPanel, setShowStudentPanel] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)

    useEffect(() => {
      if (feedbackItem?.id) {
        loadStudentData(feedbackItem.id)
      }
    }, [feedbackItem?.id])

    const columns = [
      { key: "aprendiz", label: "Aprendiz", width: "25%" },
      { key: "ficha", label: "Ficha", width: "15%" },
      { key: "hora", label: "Hora", width: "15%" },
      {
        key: "estado",
        label: "Estado",
        width: "15%",
        render: (item) => (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${
              item.estado === "Presente" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {item.estado}
          </span>
        ),
      },
      {
        key: "calificacion",
        label: "Calificación",
        width: "15%",
        render: (item) => (
          <span
            className={`font-medium ${
              Number.parseFloat(item.calificacion) >= 4.0
                ? "text-green-600"
                : Number.parseFloat(item.calificacion) >= 3.0
                  ? "text-yellow-600"
                  : "text-red-600"
            }`}
          >
            {item.calificacion}
          </span>
        ),
      },
    ]

    const handleViewStudentDetail = (student) => {
      setSelectedStudent(student)
      setShowStudentPanel(true)
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando detalles...</p>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error al cargar los detalles: {error}</p>
        </div>
      )
    }

    return (
      <>
        {/* Información de la retroalimentación */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1f384c] mb-4">Información de la Actividad</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Programa</p>
              <p className="font-medium">{feedbackItem.programa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ficha</p>
              <p className="font-medium">{feedbackItem.ficha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nivel</p>
              <p className="font-medium">{feedbackItem.nivel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tema</p>
              <p className="font-medium">{feedbackItem.tema}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Actividad</p>
              <p className="font-medium">{feedbackItem.actividad}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  feedbackItem.ejecutada === "Sí" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {feedbackItem.ejecutada === "Sí" ? "Ejecutada" : "Pendiente"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabla de aprendices */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-medium text-[#1f384c]">Lista de Aprendices ({studentData.length})</h4>
          </div>
          <GenericTable
            data={studentData}
            columns={columns}
            onShow={handleViewStudentDetail}
            defaultItemsPerPage={5}
            showActions={{ show: true, edit: false, delete: false, add: false }}
            tooltipText="Ver detalle del aprendiz"
            showSearch={true}
          />
        </div>

        {/* Modal de detalle del estudiante */}
        <StudentDetailPanel
          isOpen={showStudentPanel}
          onClose={() => setShowStudentPanel(false)}
          selectedStudent={selectedStudent}
          feedbackItem={feedbackItem}
        />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1f384c]">Retroalimentación</h1>
            <p className="text-sm text-gray-600 mt-1">Gestión de retroalimentación de actividades de inglés</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>Administrador</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6">
        {/* Filtros de búsqueda */}
        <FeedbackFilters
          fichas={fichas}
          instructors={instructors}
          niveles={niveles}
          onSearch={handleSearch}
          loading={searchLoading}
        />

        {/* Error de búsqueda */}
        {searchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{searchError}</p>
          </div>
        )}

        {/* Tabla de resultados - Solo se muestra si se ha realizado una búsqueda */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-[#1f384c]">
                Resultados de Retroalimentación ({feedbackData.length})
              </h3>
            </div>

            {searchLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
                  <p className="text-gray-600">Buscando datos...</p>
                </div>
              </div>
            ) : feedbackData.length > 0 ? (
              <GenericTable
                data={feedbackData}
                columns={columns}
                onShow={handleViewDetail}
                defaultItemsPerPage={10}
                showActions={{ show: true, edit: false, delete: false, add: false }}
                tooltipText="Ver detalle de retroalimentación"
                showSearch={true}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron resultados con los filtros aplicados</p>
              </div>
            )}
          </div>
        )}

        {/* Mensaje inicial - Solo se muestra si NO se ha realizado una búsqueda */}
        {!hasSearched && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bienvenido al módulo de Retroalimentación</h3>
              <p className="text-gray-500 text-base mb-4">
                Selecciona los filtros y haz clic en "Buscar" para ver los resultados de retroalimentación
              </p>
              <div className="text-sm text-gray-400">
                <p>• Fichas cargadas desde la API: {fichas.length}</p>
                <p>• Instructores disponibles: {instructors.length}</p>
                <p>• Niveles configurados: {niveles.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalle de retroalimentación */}
      {showDetailModal && selectedFeedbackItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#1f384c]">Detalle de Retroalimentación</h2>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <FeedbackDetailsContent feedbackItem={selectedFeedbackItem} />
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cerrar sesión */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmButtonText="Cerrar Sesión"
        confirmButtonClass="bg-[#f44144] hover:bg-red-600"
      />
    </div>
  )
}

export default Feedback
