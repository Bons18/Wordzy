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
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DEL INSTRUCTOR</h2>

        <div className="space-y-3 px-8">
          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Nombre:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.nombre}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Apellido:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.apellido}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Documento:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.documento}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Tipo documento:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.tipoDocumento}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Telefono:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.telefono}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Estado:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.estado}</div>
          </div>

          <div className="flex items-center">
            <div className="w-2/5 font-bold text-[14px]">Correo:</div>
            <div className="w-3/5 text-[14px] text-gray-500">{instructor.correo}</div>
          </div>

          <div className="mt-6">
            <h3 className="text-[14px] font-bold mb-3 text-center">Fichas en formacion asociadas</h3>

            <div className="space-y-2">
              {instructor.fichas &&
                instructor.fichas.map((ficha, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-[14px] text-gray-500">{ficha.numero}</div>
                    <div className="text-[14px] text-gray-500">
                      Nivel {ficha.nivel || Math.floor(Math.random() * 6) + 1}
                    </div>
                    <button
                      onClick={() => onViewFicha(ficha)}
                      className="p-2 text-white rounded-lg transition-colors flex items-center justify-center"
                      style={{ backgroundColor: "#1F384C" }}
                      aria-label="Ver detalle de ficha"
                    >
                      <FiEye size={18} />
                    </button>
                  </div>
                ))}
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

export default InstructorDetailModal

