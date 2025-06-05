"use client"

import { useEffect, useRef } from "react"
import { FiEye } from "react-icons/fi"

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DEL APRENDIZ</h2>
        
        <div className="space-y-3 px-16">
          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Nombre:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.nombre}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Apellido:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.apellido}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Documento:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.documento}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Tipo Documento:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.tipoDocumento}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Telefono:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.telefono}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Estado:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.estado}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Nivel actual:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.nivel}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Ficha:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.ficha[0]}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Programa:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.programa}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Correo:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.correo}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Progreso actual:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{apprentice.progresoActual}%</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Progreso Niveles:</div>
            <div className="w-3/5 flex justify-start">
              <button
                onClick={onShowProgress}
                className="p-2 text-white rounded-lg transition-colors flex items-center justify-center"
                style={{ backgroundColor: "#1F384C" }}
                aria-label="Ver progreso de niveles"
              >
                <FiEye size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApprenticeDetailModal
