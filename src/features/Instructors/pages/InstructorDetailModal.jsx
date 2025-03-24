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
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-[#1f384c] mb-8">DETALLE DEL INSTRUCTOR</h2>

        <div className="space-y-6">
          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Nombre:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.nombre}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Apellido:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.apellido}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Documento:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.documento}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Tipo Documento:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.tipoDocumento}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Telefono:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.telefono}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Estado:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.estado}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Correo:</div>
            <div className="w-2/3 text-xl text-gray-500">{instructor.correo}</div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Fichas en formacion asociadas</h3>

            <div className="space-y-4">
              {instructor.fichas &&
                instructor.fichas.map((ficha, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="text-lg text-gray-500">{ficha.numero} :</div>
                    <button
                      onClick={() => onViewFicha(ficha)}
                      className="p-2 text-white rounded-lg transition-colors flex items-center justify-center"
                      style={{ backgroundColor: "#1F384C" }}
                      aria-label="Ver detalle de ficha"
                    >
                      <FiEye size={20} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
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

export default InstructorDetailModal

