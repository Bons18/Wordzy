"use client"

const LevelCard = ({ nivel, isActive, hasChanged, onToggle }) => {
  return (
    <div
      className={`p-6 rounded-[10px] border-[1px] ${
        isActive ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"
      } ${hasChanged ? "border-yellow-300 bg-yellow-50" : ""}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold ${nivel.color}`}
          >
            {nivel.id}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900">{nivel.nombre}</h3>
            <p className="text-sm text-gray-600">{nivel.descripcion}</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isActive} onChange={() => onToggle(nivel.id)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
        </label>
      </div>

      {isActive && (
        <div className="flex items-center text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          {hasChanged ? "Se activará al guardar" : "Nivel activo para los aprendices"}
        </div>
      )}
      {!isActive && hasChanged && (
        <div className="flex items-center text-sm text-red-600">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
          Se desactivará al guardar
        </div>
      )}
    </div>
  )
}

export default LevelCard
