"use client"

import { forwardRef } from "react"
import { FiSearch } from "react-icons/fi"

const SearchInput = forwardRef(
  ({ value, onChange, onFocus, placeholder = "Ej: ADSO-2024-01, 2691851...", className = "" }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full pl-3 pr-8 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
        />
      </div>
    )
  },
)

SearchInput.displayName = "SearchInput"

export default SearchInput
