export default function MaterialDetailModal({ isOpen, onClose, material }) {
  if (!isOpen || !material) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[#1f384c] mb-6">Detalle de material de apoyo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
              <div className="w-full text-sm rounded-md rounded bg-[#f6f6fb] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">{material.nombre}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creado por:</label>
              <div className="w-full text-sm rounded-md rounded bg-[#f6f6fb] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">{material.creadoPor}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">fecha:</label>
              <div className="w-full text-sm rounded-md rounded bg-[#f6f6fb] border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">{material.fecha}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <div className="p-4 min-h-[200px]">
                <div className="text-sm text-[#627b87]" dangerouslySetInnerHTML={{ __html: material.contenido }} />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
