"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Ranking = () => {
  const navigate = useNavigate()
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Insignia experto",
      points: 5000,
      description: "El máximo...",
      icon: "/public/experto.png",
      color: "rgba(255, 215, 0, 0.1)",
    },
    {
      id: 2,
      name: "Insignia intermedia",
      points: 3000,
      description: "Conseguiste...",
      icon: "/public/intermedia.png",
      color: "rgba(192, 192, 192, 0.1)",
    },
    {
      id: 3,
      name: "Insignia principiante",
      points: 1000,
      description: "Se obtiene...",
      icon: "/public/principiante.png",
      color: "rgba(205, 127, 50, 0.1)",
    },
  ])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  const [badgeToDelete, setBadgeToDelete] = useState(null)

  const handleInputChange = (id, field, value) => {
    setBadges(badges.map((badge) => (badge.id === id ? { ...badge, [field]: value } : badge)))
  }

  const handleDeleteClick = (id) => {
    setBadgeToDelete(id)
    setShowDeleteConfirm(true)
  }

  const handleDelete = () => {
    setBadges(badges.filter((badge) => badge.id !== badgeToDelete))
    setShowDeleteConfirm(false)
  }

  const handleSaveClick = () => {
    setShowSaveConfirm(true)
  }

  const handleSave = () => {
    // Here you would make your API call
    setShowSaveConfirm(false)
  }

  const handleCancel = () => {
    navigate("/programacion/insigneas")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1f384c] mb-8">EDITAR INSIGNIAS</h1>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
        {badges.map((badge, index) => (
          <div 
            key={badge.id} 
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6 last:mb-0 p-4 border border-gray-100 rounded-lg"
          >
            {/* Badge Icon */}
            <div className="sm:col-span-1 flex justify-center sm:justify-start">
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={badge.icon || "/placeholder.svg"} 
                  alt={badge.name} 
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>

            {/* Badge Name */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-[#1f384c] mb-1">
                Nombre de la insignia:
              </label>
              <input
                type="text"
                value={badge.name}
                onChange={(e) => handleInputChange(badge.id, "name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Points */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#1f384c] mb-1">
                Puntos:
              </label>
              <input
                type="number"
                value={badge.points}
                onChange={(e) => handleInputChange(badge.id, "points", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-5">
              <label className="block text-sm font-medium text-[#1f384c] mb-1">
                Descripción
              </label>
              <textarea
                value={badge.description}
                onChange={(e) => handleInputChange(badge.id, "description", e.target.value)}
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Updated Delete Button */}
            <div className="sm:col-span-1 flex items-center justify-center sm:justify-end">
              <button
                onClick={() => handleDeleteClick(badge.id)}
                className="px-3 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors w-full sm:w-auto"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Updated Action Buttons */}
      <div className="flex justify-end gap-4">
        <button 
          onClick={handleCancel}
          className="px-6 py-2.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSaveClick}
          className="px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-[#1f384c]">
                  Eliminar Insignia
                </h3>
                <p className="mt-2 text-[#627b87]">
                  ¿Está seguro de que desea eliminar esta insignia?
                </p>
              </div>
              
              <div className="flex justify-center gap-3">
                <button
                  className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-[#1f384c]">
                  Guardar Cambios
                </h3>
                <p className="mt-2 text-[#627b87]">
                  ¿Está seguro de que desea guardar los cambios realizados?
                </p>
              </div>
              
              <div className="flex justify-center gap-3">
                <button
                  className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                  onClick={() => setShowSaveConfirm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                  onClick={handleSave}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Ranking

