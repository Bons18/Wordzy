"use client"

import { useState, useRef, useCallback } from "react"
import { MOCK_FICHAS } from "../utils/mockData"

export const useFichaSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchTimeoutRef = useRef(null)

  const executeSearch = useCallback((value) => {
    if (!value.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsLoading(true)

    // Simular delay de búsqueda
    setTimeout(() => {
      const filtered = MOCK_FICHAS.filter(
        (ficha) =>
          ficha.codigo.toLowerCase().includes(value.toLowerCase()) ||
          ficha.numero.includes(value) ||
          ficha.instructor.toLowerCase().includes(value.toLowerCase()) ||
          ficha.programa.toLowerCase().includes(value.toLowerCase()),
      )
      setSearchResults(filtered)
      setShowSearchResults(true)
      setIsLoading(false)
    }, 300)
  }, [])

  const handleSearchInputChange = useCallback(
    (value) => {
      setSearchTerm(value)

      // Limpiar timeout anterior
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }

      // Si está vacío, limpiar resultados inmediatamente
      if (!value.trim()) {
        setSearchResults([])
        setShowSearchResults(false)
        setIsLoading(false)
        return
      }

      // Debounce de 300ms
      searchTimeoutRef.current = setTimeout(() => {
        executeSearch(value)
      }, 300)
    },
    [executeSearch],
  )

  const clearSearch = useCallback(() => {
    setSearchTerm("")
    setSearchResults([])
    setShowSearchResults(false)
    setIsLoading(false)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  return {
    searchTerm,
    searchResults,
    showSearchResults,
    isLoading,
    handleSearchInputChange,
    clearSearch,
    setShowSearchResults,
  }
}
