"use client"

import { useEffect, useRef } from "react"

const UserDetailModal = ({ user, isOpen, onClose }) => {
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
      <div ref={modalRef} className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center text-[#1f384c] mb-8">DETALLE USUARIO</h2>

        <div className="space-y-6">
          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Nombre:</div>
            <div className="w-2/3 text-xl text-gray-500">{user.nombre}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Correo:</div>
            <div className="w-2/3 text-xl text-gray-500">{user.correo}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Estado:</div>
            <div className="w-2/3 text-xl text-gray-500">{user.estado}</div>
          </div>

          <div className="flex">
            <div className="w-1/3 font-bold text-xl">Rol:</div>
            <div className="w-2/3 text-xl text-gray-500">{user.rol}</div>
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

export default UserDetailModal

