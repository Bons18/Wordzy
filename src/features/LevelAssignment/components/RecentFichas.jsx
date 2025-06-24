"use client"
import { Clock } from "lucide-react"
import { FiTrash } from "react-icons/fi"

const RecentFichas = ({ fichas, onSelectFicha, onClearHistory }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Fichas Recientes</h2>
        </div>
        {fichas.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-500 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <FiTrash className="w-4 h-4" />
            Borrar historial
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-4 text-sm">Fichas consultadas recientemente</p>

      {fichas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fichas.map((ficha) => (
            <div
              key={ficha.id}
              onClick={() => onSelectFicha(ficha)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-1">{ficha.codigo}</h3>
              <p className="text-sm text-gray-600 mb-1">{ficha.programa}</p>
              <p className="text-sm text-gray-500">{ficha.instructor}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 text-sm">No hay fichas recientes</p>
          <p className="text-gray-400 text-xs mt-1">Las fichas que consultes aparecerán aquí</p>
        </div>
      )}
    </div>
  )
}

export default RecentFichas
