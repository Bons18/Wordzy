"use client"

import { useEffect, useRef } from "react"
import { FiEye } from "react-icons/fi"

const InstructorDetailModal = ({ instructor, isOpen, onClose, onViewFicha }) => {
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
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-md mx-4 max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-center text-[#1f384c]">DETALLE DEL INSTRUCTOR</h2>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="space-y-3 px-2">
            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Nombre:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.nombre}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Apellido:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.apellido}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Documento:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.documento}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Tipo documento:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.tipoDocumento}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Telefono:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.telefono}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Estado:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.estado}</div>
            </div>

            <div className="flex gap-x-4">
              <div className="w-2/5 font-bold text-base whitespace-nowrap">Correo:</div>
              <div className="w-3/5 text-base text-gray-500">{instructor.correo}</div>
            </div>

            <div className="mt-4">
              <h3 className="text-base font-bold mb-3">Fichas en formacion asociadas</h3>

              <div className="space-y-2 px-2">
                {instructor.fichas &&
                  instructor.fichas.map((ficha, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">{ficha.numero} :</div>
                      <button
                        onClick={() => onViewFicha(ficha)}
                        className="p-1 text-white rounded-lg transition-colors flex items-center justify-center"
                        style={{ backgroundColor: "#1F384C" }}
                        aria-label="Ver detalle de ficha"
                      >
                        <FiEye size={16} />
                      </button>
                    </div>
                  ))}
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

export default InstructorDetailModal

