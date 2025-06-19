"use client"

import { useState, useEffect, useRef } from "react"

const ApprenticeDetailModal = ({ apprentice, isOpen, onClose, onShowProgress }) => {
  const [apprenticeData, setApprenticeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const modalRef = useRef(null)

  useEffect(() => {
    if (apprentice) {
      // Cargar datos del aprendiz
      setApprenticeData(apprentice)
      setLoading(false)
    } else if (isOpen) {
      // Si el modal está abierto pero no hay aprendiz, establecer loading en false
      setLoading(false)
    }
  }, [apprentice, isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Función para calcular progreso por niveles basado en el progreso actual del aprendiz
  const getProgressByLevels = (currentProgress, currentLevel) => {
    const levels = ["Nivel 1", "Nivel 2", "Nivel 3"]
    const progressData = []

    levels.forEach((level, index) => {
      let progress = 0

      if (currentLevel === level) {
        // Si es el nivel actual, usar el progreso actual
        progress = currentProgress || 0
      } else if (levels.indexOf(currentLevel) > index) {
        // Si ya pasó este nivel, mostrar 100%
        progress = 100
      } else {
        // Si aún no llega a este nivel, mostrar 0%
        progress = 0
      }

      progressData.push({
        level: level,
        progress: progress,
      })
    })

    return progressData
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detalle del Aprendiz</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
            </div>
          ) : apprenticeData ? (
            <div className="p-4">
              <h3 className="text-sm font-bold mb-4">
                {apprenticeData.nombre} {apprenticeData.apellido}
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-3">Información General</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <p className="font-bold text-sm">Nombre:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.nombre}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Apellido:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.apellido}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Documento:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.documento}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Tipo Documento:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.tipoDocumento}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Teléfono:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.telefono}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Correo:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.correo}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Estado:</p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apprenticeData.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {apprenticeData.estado}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Nivel Actual:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.nivel}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Ficha:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.ficha?.[0] || "No asignada"}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Programa:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.programa}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Progreso Actual:</p>
                    <p className="text-gray-600 text-sm">{apprenticeData.progresoActual}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Progreso por Niveles</h4>
                {apprenticeData ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {getProgressByLevels(apprenticeData.progresoActual, apprenticeData.nivel).map((level, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-center mb-2">
                          <h5 className="font-bold text-sm text-gray-800">{level.level}</h5>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div
                              className={`h-3 rounded-full transition-all duration-300 ${
                                level.progress >= 80
                                  ? "bg-green-500"
                                  : level.progress >= 50
                                    ? "bg-yellow-500"
                                    : level.progress > 0
                                      ? "bg-blue-500"
                                      : "bg-gray-300"
                              }`}
                              style={{ width: `${level.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{level.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-sm">No hay información de progreso disponible</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 text-sm">No se ha seleccionado ningún aprendiz</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApprenticeDetailModal
