"use client"

import { useEffect, useRef } from "react"
import { FiCheck } from "react-icons/fi"

const SuccessModal = ({ isOpen, onClose, message }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)

      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => {
        clearTimeout(timer)
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }

    return () => {}
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <FiCheck className="text-green-500 text-2xl" />
          </div>
        </div>

        <h2 className="text-[18px] font-bold text-center mb-6">{message}</h2>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-2 bg-[#f44144] text-white rounded-md text-[14px] hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal

