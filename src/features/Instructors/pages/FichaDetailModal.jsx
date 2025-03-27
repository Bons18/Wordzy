"use client"

import { useEffect, useRef } from "react"

const FichaDetailModal = ({ ficha, isOpen, onClose }) => {
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

  if (!isOpen || !ficha) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-[#1f384c] mb-8">DETALLE FICHA ASOCIADA</h2>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Ficha:</div>
            <div className="w-2/3 text-xl text-gray-500">{ficha.numero}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 font-bold text-xl">Fecha Inicio:</div>
            <div className="w-1/2 text-xl text-gray-500">{ficha.fechaInicio}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Programa:</div>
            <div className="w-2/3 text-xl text-gray-500">{ficha.programa}</div>
          </div>

          <div className="flex">
            <div className="w-1/2 font-bold text-xl">Fecha fin:</div>
            <div className="w-1/2 text-xl text-gray-500">{ficha.fechaFin}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-6">Listado de Estudiantes</h3>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Apellido</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tipo Documento</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Documento</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ficha.estudiantes &&
                ficha.estudiantes.map((estudiante, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">{estudiante.nombre}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{estudiante.apellido}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{estudiante.tipoDocumento}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{estudiante.documento}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          estudiante.estado === "Condicionado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {estudiante.estado || "En formación"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
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

export default FichaDetailModal

