"use client"

import { useEffect, useRef } from "react"

const ProgressBar = ({ level, percentage }) => {
  const getProgressBarColor = (level) => {
    if (level === 1) return { bg: "#f44144", text: "text-white" } // Rojo
    if (level === 2) return { bg: "#FFD700", text: "text-black" } // Amarillo dorado
    if (level === 3) return { bg: "#35dc4e", text: "text-white" } // Verde
    return { bg: "#f44144", text: "text-white" } // Default rojo
  }

  const { bg, text } = getProgressBarColor(level)

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between items-center px-1">
        <span className="font-semibold text-[#1f384c]">Nivel {level}</span>
        <span className="text-gray-600 font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`rounded-full h-4 transition-all duration-300 ${text}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: bg,
            minWidth: "30px",
          }}
        />
      </div>
    </div>
  )
}

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef} 
        className="bg-white rounded-xl p-8 w-full max-w-xl mx-4 shadow-2xl"
      >
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h2 className="text-2xl font-bold text-center text-[#1f384c]">
            PROGRESO POR NIVELES
          </h2>
        </div>

        <div className="space-y-6 mb-8">
          {progressData.map((progress) => (
            <ProgressBar
              key={progress.nivel}
              level={progress.nivel}
              percentage={progress.porcentaje}
            />
          ))}
        </div>

        <div className="flex justify-center pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-3 px-12 rounded-lg text-lg font-medium 
                     hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApprenticeProgressModal

