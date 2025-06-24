"use client"
import { Search } from "lucide-react"

const SearchResults = ({ results, searchTerm, onSelectFicha, isVisible, isLoading }) => {
  if (!isVisible) return null

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p className="text-sm">Buscando...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0 && searchTerm.trim()) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="p-4 text-center text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No se encontraron fichas que coincidan con "{searchTerm}"</p>
        </div>
      </div>
    )
  }

  if (results.length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
        <div className="p-3 border-b border-gray-100 bg-blue-50">
          <p className="text-sm text-blue-800 font-medium">
            {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado
            {results.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="py-2">
          {results.map((ficha) => (
            <div
              key={ficha.id}
              onClick={() => onSelectFicha(ficha)}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="font-medium text-gray-900">{ficha.codigo}</span>
                    <span className="text-sm text-gray-600">#{ficha.numero}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 text-sm">{ficha.programa}</h3>
                  <p className="text-xs text-gray-600">
                    Instructor: {ficha.instructor} • {ficha.aprendices} aprendices
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {ficha.nivelesActivos || 0}/{ficha.totalNiveles || 6} niveles
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default SearchResults
