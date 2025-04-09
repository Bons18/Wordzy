"use client"

import { useState, useEffect, useRef } from "react"

export default function CustomSelect({ placeholder, options = [], value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Log para depuración
  useEffect(() => {
    console.log("CustomSelect - Opciones:", options)
    console.log("CustomSelect - Valor seleccionado:", value)
    console.log(
      "CustomSelect - Opción seleccionada:",
      options.find((opt) => opt.value === value),
    )
  }, [options, value])

  // Find the selected option label
  const selectedOption = options.find((option) => option.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>{displayText}</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {options && options.length > 0 ? (
              options.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer select-none text-sm px-3 py-2 hover:bg-gray-100 ${value === option.value ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    console.log("Seleccionando opción:", option)
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="text-sm px-3 py-2 text-gray-500">No hay opciones disponibles</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
