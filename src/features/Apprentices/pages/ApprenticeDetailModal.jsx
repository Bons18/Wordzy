"use client"

import { useEffect, useRef } from "react"
import { FiEye } from "react-icons/fi"

const InfoRow = ({ label, value }) => (
  <div className="flex items-start py-2 border-b border-gray-100">
    <div className="w-2/5 font-bold text-base text-[#1f384c]">{label}:</div>
    <div className="w-3/5 text-base text-gray-600 break-words">{value}</div>
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
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-center text-[#1f384c]">
            DETALLE DEL APRENDIZ
          </h2>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="space-y-1">
            {apprenticeInfo.map((info, index) => (
              <InfoRow key={index} label={info.label} value={info.value} />
            ))}

            <div className="flex items-center py-2 border-b border-gray-100">
              <div className="w-2/5 font-bold text-base text-[#1f384c]">Progreso Niveles:</div>
              <div className="w-3/5 flex justify-start">
                <button
                  onClick={onShowProgress}
                  className="px-3 py-1 text-white rounded-lg transition-colors flex items-center gap-1 hover:opacity-90"
                  style={{ backgroundColor: "#1F384C" }}
                  aria-label="Ver progreso de niveles"
                >
                  <FiEye size={16} />
                  <span className="text-sm">Ver Progreso</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-center rounded-b-lg">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-base font-medium hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApprenticeDetailModal

