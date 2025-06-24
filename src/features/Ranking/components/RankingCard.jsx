import { Search } from "lucide-react"

const RankingCard = ({ title, icon, color, data = [], loading = false, filterComponent = null }) => {
  // Debug: mostrar datos recibidos
  console.log(`🎯 RankingCard "${title}" received data:`, data)

  return (
    <div
      className={`bg-white rounded-lg border-t-4 border-t-${color}-500 p-3 transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <div
            className={`bg-${color}-50 p-1 rounded-full text-${color}-500 transition-transform duration-200 hover:scale-110`}
          >
            {icon}
          </div>
          <h2 className="text-sm font-bold text-[#1f384c]">{title}</h2>
        </div>
        {filterComponent}
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-3 pb-1 border-b border-[#d6dade]">
          <div className="text-xs font-medium text-[#1f384c]">Top</div>
          <div className="text-xs font-medium text-[#1f384c]">Nombre</div>
          <div className="text-xs font-medium text-[#1f384c] text-right">Puntos</div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto"></div>
            <p className="text-gray-500 text-xs mt-2">Cargando...</p>
          </div>
        ) : data.length > 0 ? (
          data.slice(0, 5).map((item, index) => {
            const puntos = item.puntos || 0
            console.log(`🏆 Showing student ${index + 1}:`, item.nombre, "Points:", puntos)

            return (
              <div
                key={index}
                className="grid grid-cols-3 py-1 transition-colors duration-200 hover:bg-gray-50 rounded"
              >
                <div className={`text-${color}-500 text-xs font-bold`}>{index + 1}</div>
                <div className="text-[#1f384c] text-xs font-medium truncate" title={item.nombre || item.name || "N/A"}>
                  {item.nombre || item.name || "N/A"}
                </div>
                <div className={`text-${color}-500 text-xs font-bold text-right`}>{puntos}</div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-4">
            <Search className="w-5 h-5 text-gray-300 mx-auto mb-1" />
            <p className="text-gray-500 text-xs">No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RankingCard
