"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Eye, Search, Trash2 } from "lucide-react"

export default function Scale() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEscala, setSelectedEscala] = useState(null)

  const handleAdd = () => {
    setShowAddModal(true)
  }

  const handleEdit = (escala) => {
    setSelectedEscala(escala)
    setShowEditModal(true)
  }

  const handleView = (escala) => {
    setSelectedEscala(escala)
    setShowDetailModal(true)
  }

  const handleDelete = (escala) => {
    setSelectedEscala(escala)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la escala de la base de datos
    // Por ahora, solo cerramos el modal
    setShowDeleteModal(false)
    // Normalmente aquí actualizaríamos el estado o haríamos una llamada a la API
  }

  return (
    <div className="min-h-screen bg-[#f6f6fb] p-6">
      {/* Main Content */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <div className="flex justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[#627b87]">Administrador</span>
              <ChevronDown className="h-4 w-4 text-[#627b87]" />
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full max-w-md pl-10 pr-4 py-2 border border-[#d9d9d9] rounded"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#627b87]" />
          </div>

          <button className="flex items-center gap-2 bg-[#46ae69] text-white px-4 py-2 rounded" onClick={handleAdd}>
            Añadir Tema
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f6f6fb]">
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Inicial</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Final</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Rango Inicial</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Rango Final</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Valoración</th>
                <th className="font-medium text-center py-3 px-4 text-[#627b87]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {escalasData.map((escala, index) => (
                <tr key={index} className="border-b border-[#d9d9d9]">
                  <td className="py-3 px-4">{escala.fechaInicial}</td>
                  <td className="py-3 px-4">{escala.fechaFinal}</td>
                  <td className="py-3 px-4">{escala.rangoInicial}%</td>
                  <td className="py-3 px-4">{escala.rangoFinal}%</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        escala.valoracion === "Aprueba" ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
                      }`}
                    >
                      {escala.valoracion}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2">
                      <button className="bg-[#ffa600] text-white rounded-full p-1.5" onClick={() => handleEdit(escala)}>
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="bg-[#dc3545] text-white rounded-full p-1.5"
                        onClick={() => handleDelete(escala)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={() => handleView(escala)}>
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span>10</span>
            <span className="text-[#627b87]">por página</span>
          </div>

          <div className="flex items-center gap-2">
            <span>1</span>
            <span className="text-[#627b87]">de 1 páginas</span>
            <button className="p-1 rounded border border-[#d9d9d9]">
              <ChevronLeft className="h-4 w-4 text-[#627b87]" />
            </button>
            <button className="p-1 rounded border border-[#d9d9d9]">
              <ChevronRight className="h-4 w-4 text-[#627b87]" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir Métrica de Valoración:</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Fecha Inicial</label>
                    <input
                      type="text"
                      placeholder="20/02/25"
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Fecha Final</label>
                    <input
                      type="text"
                      placeholder="20/02/26"
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Rango Inicial</label>
                    <input type="text" placeholder="75%" className="w-full px-3 py-2 border border-[#d9d9d9] rounded" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Rango Final</label>
                    <input
                      type="text"
                      placeholder="100%"
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Valoración</label>
                  <input
                    type="text"
                    placeholder="Aprueba"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>

                <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
                  <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

                  <div className="flex items-center justify-between mb-1">
                    <span>0</span>
                    <span>74% Deficiente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
                    <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span>75%</span>
                    <span>100% Excelente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
                    <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowAddModal(false)}>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEscala && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar Métrica de Valoración:</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Fecha Inicial</label>
                    <input
                      type="text"
                      defaultValue={selectedEscala.fechaInicial}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Fecha Final</label>
                    <input
                      type="text"
                      defaultValue={selectedEscala.fechaFinal}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Rango Inicial</label>
                    <input
                      type="text"
                      defaultValue={`${selectedEscala.rangoInicial}%`}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#627b87] mb-1">Rango Final</label>
                    <input
                      type="text"
                      defaultValue={`${selectedEscala.rangoFinal}%`}
                      className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Valoración</label>
                  <input
                    type="text"
                    defaultValue={selectedEscala.valoracion}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>

                <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
                  <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

                  <div className="flex items-center justify-between mb-1">
                    <span>0</span>
                    <span>74% Deficiente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
                    <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span>75%</span>
                    <span>100% Excelente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
                    <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowEditModal(false)}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedEscala && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Detalle de Métrica Valoración:</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Fecha Inicial</div>
                    <div className="font-medium">{selectedEscala.fechaInicial}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Fecha Final:</div>
                    <div className="font-medium">{selectedEscala.fechaFinal}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Rango Inicial</div>
                    <div className="font-medium">{selectedEscala.rangoInicial}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Rango Final</div>
                    <div className="font-medium">{selectedEscala.rangoFinal}%</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-[#627b87] mb-1">Valoración</div>
                  <div className="font-medium">{selectedEscala.valoracion}</div>
                </div>

                <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
                  <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

                  <div className="flex items-center justify-between mb-1">
                    <span>0</span>
                    <span>74% Deficiente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
                    <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span>75%</span>
                    <span>100% Excelente</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
                    <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEscala && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-4">Eliminar Métrica de Valoración</h2>

              <p className="mb-6 text-[#627b87]">
                ¿Está seguro de que desea eliminar esta métrica de valoración? Esta acción no se puede deshacer.
              </p>

              <div className="border p-4 rounded-md bg-[#f6f6fb] mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Fecha Inicial:</div>
                    <div className="font-medium">{selectedEscala.fechaInicial}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Fecha Final:</div>
                    <div className="font-medium">{selectedEscala.fechaFinal}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Rango:</div>
                    <div className="font-medium">
                      {selectedEscala.rangoInicial}% - {selectedEscala.rangoFinal}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87] mb-1">Valoración:</div>
                    <div className="font-medium">{selectedEscala.valoracion}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={confirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Datos de ejemplo
const escalasData = [
  {
    fechaInicial: "20/10/2023",
    fechaFinal: "20/10/2026",
    rangoInicial: 1,
    rangoFinal: 69,
    valoracion: "No aprueba",
  },
  {
    fechaInicial: "20/10/2020",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 90,
    valoracion: "Aprueba",
  },
  {
    fechaInicial: "20/10/2024",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 80,
    valoracion: "No aprueba",
  },
  {
    fechaInicial: "20/10/2021",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 75,
    valoracion: "Aprueba",
  },
  {
    fechaInicial: "20/10/2022",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 100,
    valoracion: "No aprueba",
  },
  {
    fechaInicial: "20/03/2023",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 85,
    valoracion: "No aprueba",
  },
  {
    fechaInicial: "20/02/2022",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 95,
    valoracion: "Aprueba",
  },
]

