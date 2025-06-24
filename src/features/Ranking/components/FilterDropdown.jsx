"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'

const FilterDropdown = ({ 
  options = [], 
  selectedValue, 
  onSelect, 
  placeholder = "Seleccionar opción",
  displayKey = "name",
  valueKey = "id",
  loading = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find(option => option[valueKey] === selectedValue)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md shadow-sm text-xs hover:bg-gray-50 disabled:opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
      >
        <SlidersHorizontal className="w-3 h-3 text-gray-500" />
        {selectedOption ? (
          <span className="font-medium text-[#1f384c] truncate max-w-[100px]">
            {selectedOption[displayKey]}
          </span>
        ) : (
          <span className="text-gray-500">{loading ? "Cargando..." : placeholder}</span>
        )}
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-56 bg-white shadow-lg max-h-40 rounded-md py-1 text-xs overflow-auto">
          {options.length > 0 ? (
            <>
              {options.map((option) => (
                <div
                  key={option[valueKey]}
                  className={`cursor-pointer select-none relative py-1.5 px-3 hover:bg-gray-100 ${
                    selectedValue === option[valueKey]
                      ? "bg-blue-50 text-[#1f384c] font-medium"
                      : ""
                  }`}
                  onClick={() => {
                    onSelect(option[valueKey])
                    setIsOpen(false)
                  }}
                >
                  {option[displayKey]}
                </div>
              ))}
              {selectedValue && (
                <div
                  className="cursor-pointer select-none relative py-1.5 px-3 text-red-600 hover:bg-red-50 border-t"
                  onClick={() => {
                    onSelect("")
                    setIsOpen(false)
                  }}
                >
                  <X className="w-3 h-3 inline mr-1" />
                  Limpiar filtro
                </div>
              )}
            </>
          ) : (
            <div className="py-2 px-3 text-gray-500">
              {loading ? "Cargando opciones..." : "No hay opciones disponibles"}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterDropdown