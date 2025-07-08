"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, User, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import GenericTable from "../../../shared/components/Table"
import { useStudentDetails } from "../hooks/useStudentDetails"
import StudentDetailPanel from "../components/StudentDetailPanel"

const FeedbackDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { studentData, loading, error, loadStudentData } = useStudentDetails()
  const [showStudentPanel, setShowStudentPanel] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Mock data para la actividad (en una app real vendría de la API)
  const [feedbackItem] = useState({
    id: Number.parseInt(id),
    programa: "ADSO",
    ficha: "2669742",
    nivel: "Básico",
    tema: "Present Simple",
    actividad: "Grammar Exercise 1",
    ejecutada: "Sí",
    instructor: "Ana García",
    fecha: "2024-01-15",
    totalPreguntas: 20,
    aprendicesPresentes: 25,
  })

  useEffect(() => {
    if (id) {
      loadStudentData(Number.parseInt(id))
    }
  }, [id])

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

  const handleBack = () => {
    navigate("/feedback")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando detalles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error al cargar los detalles</h3>
            <p className="text-red-700">{error}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => loadStudentData(Number.parseInt(id))}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={handleBack}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6 shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#1f384c] hover:text-[#2a4a64] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Retroalimentación
            </button>
          </div>
          <h1 className="text-2xl font-bold text-[#1f384c]">Detalle de Retroalimentación</h1>
          <p className="text-sm text-gray-600 mt-1">
            {feedbackItem.tema} - {feedbackItem.actividad}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6">
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
            <div>
              <p className="text-sm text-gray-600">Instructor</p>
              <p className="font-medium">{feedbackItem.instructor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="font-medium">{feedbackItem.fecha}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Preguntas</p>
              <p className="font-medium">{feedbackItem.totalPreguntas}</p>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Aprendices</p>
                <p className="text-xl font-bold text-gray-900">{studentData.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Presentes</p>
                <p className="text-xl font-bold text-green-600">
                  {studentData.filter((s) => s.estado === "Presente").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Ausentes</p>
                <p className="text-xl font-bold text-red-600">
                  {studentData.filter((s) => s.estado === "Ausente").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Promedio</p>
                <p className="text-xl font-bold text-yellow-600">
                  {studentData.length > 0
                    ? (
                        studentData
                          .filter((s) => s.estado === "Presente")
                          .reduce((acc, s) => acc + Number.parseFloat(s.calificacion), 0) /
                        studentData.filter((s) => s.estado === "Presente").length
                      ).toFixed(1)
                    : "0.0"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de aprendices */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-medium text-[#1f384c]">Lista de Aprendices ({studentData.length})</h4>
          </div>
          <GenericTable
            data={studentData}
            columns={columns}
            onShow={handleViewStudentDetail}
            defaultItemsPerPage={10}
            showActions={{ show: true, edit: false, delete: false, add: false }}
            tooltipText="Ver detalle del aprendiz"
            showSearch={true}
          />
        </div>
      </div>

      {/* Modal de detalle del estudiante */}
      <StudentDetailPanel
        isOpen={showStudentPanel}
        onClose={() => setShowStudentPanel(false)}
        selectedStudent={selectedStudent}
        feedbackItem={feedbackItem}
      />
    </div>
  )
}

export default FeedbackDetails
