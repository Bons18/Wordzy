"use client"

import { useRef, useEffect } from "react"
import { Search } from "lucide-react"
import SearchInput from "./SearchInput"
import SearchResults from "./SearchResults"
import RecentFichas from "./RecentFichas"

const SearchView = ({
  searchTerm,
  searchResults,
  showSearchResults,
  isSearchLoading,
  recentFichas,
  onSearchChange,
  onSelectFicha,
  onClearRecentFichas,
  setShowSearchResults,
}) => {
  const searchContainerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setShowSearchResults])

  return (
    <div className="max-h-screen">
      <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-100 p-8">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Search className="w-5 h-5 text-gray-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">Buscar Ficha</h1>
            </div>
            <p className="text-gray-600 text-sm">Busca por código de ficha, número, nombre del programa o instructor</p>
          </div>

          <div className="mb-6 relative" ref={searchContainerRef}>
            <SearchInput
              value={searchTerm}
              onChange={onSearchChange}
              onFocus={() => {
                if (searchTerm.trim() && searchResults.length > 0) {
                  setShowSearchResults(true)
                }
              }}
            />

            <SearchResults
              results={searchResults}
              searchTerm={searchTerm}
              onSelectFicha={onSelectFicha}
              isVisible={showSearchResults}
              isLoading={isSearchLoading}
            />
          </div>

          <RecentFichas fichas={recentFichas} onSelectFicha={onSelectFicha} onClearHistory={onClearRecentFichas} />
        </div>
      </div>
    </div>
  )
}

export default SearchView
