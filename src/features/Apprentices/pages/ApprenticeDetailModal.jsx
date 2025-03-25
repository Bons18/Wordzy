"use client"

import { useEffect, useRef } from "react"
import { FiEye } from "react-icons/fi"

const InfoRow = ({ label, value }) => (
  <div className="flex items-start py-3 border-b border-gray-100">
    <div className="w-1/3 font-bold text-lg text-[#1f384c]">{label}:</div>
    <div className="w-2/3 text-lg text-gray-600 break-words">{value}</div>
  </div>
)

const ApprenticeDetailModal = ({ apprentice, isOpen, onClose, onShowProgress }) => {
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

  const apprenticeInfo = [
    { label: "Nombre", value: apprentice.nombre },
    { label: "Apellido", value: apprentice.apellido },
    { label: "Documento", value: apprentice.documento },
    { label: "Tipo Documento", value: apprentice.tipoDocumento },
    { label: "Telefono", value: apprentice.telefono },
    { label: "Estado", value: apprentice.estado },
    { label: "Nivel actual", value: apprentice.nivel },
    { label: "Ficha", value: apprentice.ficha[0] },
    { label: "Programa", value: apprentice.programa },
    { label: "Correo", value: apprentice.correo },
    { label: "Progreso actual", value: `${apprentice.progresoActual}%` },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-[#1f384c] pb-6 mb-6 border-b border-gray-200">
          DETALLE DEL APRENDIZ
        </h2>

        <div className="space-y-2">
          {apprenticeInfo.map((info, index) => (
            <InfoRow key={index} label={info.label} value={info.value} />
          ))}

          <div className="flex items-center py-3 border-b border-gray-100">
            <div className="w-1/3 font-bold text-lg text-[#1f384c]">Progreso Niveles:</div>
            <div className="w-2/3 flex justify-start">
              <button
                onClick={onShowProgress}
                className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 hover:opacity-90"
                style={{ backgroundColor: "#1F384C" }}
                aria-label="Ver progreso de niveles"
              >
                <FiEye size={20} />
                <span>Ver Progreso</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-3 px-12 rounded-lg text-lg font-medium hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApprenticeDetailModal

