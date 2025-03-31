"use client"

import { useEffect, useRef } from "react"

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
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
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-500 text-2xl font-bold">!</span>
          </div>
        </div>

        <h2 className="text-[18px] font-bold text-center mb-4">
          ¿Estás seguro de que deseas eliminar esta evaluación?
        </h2>

        <p className="text-[14px] text-gray-600 text-center mb-6">
          {itemName ? `"${itemName}"` : "Esta acción no se puede deshacer."}
        </p>

        <div className="flex justify-center space-x-4">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-md text-[14px] hover:bg-gray-300">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#46ae69] text-white rounded-md text-[14px] hover:bg-green-600 transition-colors"
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal

