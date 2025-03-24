"use client"

import { useEffect, useRef } from "react"

const ApprenticeProgressModal = ({ isOpen, onClose, progressData }) => {
  const modalRef = useRef(null)

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

  if (!isOpen) return null

  const getProgressBarColor = (level, percentage) => {
    if (level === 1) return "#f44144" // Rojo
    if (level === 2) return "#ffff00" // Amarillo
    if (level === 3) return "#35dc4e" // Verde
    return "#f44144" // Default rojo
  }

  const getTextColor = (backgroundColor) => {
    // Para el amarillo, usamos texto negro para mejor contraste
    if (backgroundColor === "#ffff00") return "text-black"
    return "text-white"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center text-[#1f384c] mb-8">PROGRESO NIVELES</h2>

        <div className="space-y-8">
          {progressData.map((progress) => (
            <div key={progress.nivel} className="flex items-center">
              <div className="w-1/4 font-bold text-xl">Nivel {progress.nivel}:</div>
              <div className="w-3/4">
                <div
                  className={`rounded-full h-8 flex items-center justify-center ${getTextColor(getProgressBarColor(progress.nivel, progress.porcentaje))}`}
                  style={{
                    width: `${progress.porcentaje}%`,
                    backgroundColor: getProgressBarColor(progress.nivel, progress.porcentaje),
                    minWidth: "60px",
                  }}
                >
                  {progress.porcentaje}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-3 px-10 rounded-lg text-lg font-medium hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApprenticeProgressModal

