"use client"
import { ArrowLeft } from "lucide-react"
import LevelCard from "./LevelCard"
import QuickActions from "./QuickActions"
import { NIVELES } from "../utils/constants"

const LevelsView = ({
  selectedFicha,
  currentLevelStates,
  tempLevelStates,
  hasChanges,
  onLevelToggle,
  onQuickAction,
  onSaveChanges,
  onChangeFicha,
  isSaving,
}) => {
  const activeLevels = Object.values(currentLevelStates).filter(Boolean).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Información de la ficha */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{selectedFicha.codigo}</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  {activeLevels}/6 activos
                </span>
                {hasChanges && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Cambios sin guardar
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-1">{selectedFicha.programa}</p>
              <p className="text-gray-600 text-sm">Instructor: {selectedFicha.instructor}</p>
              <p className="text-gray-600 text-sm">Aprendices: {selectedFicha.aprendices}</p>
            </div>
            <button
              onClick={onChangeFicha}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cambiar Ficha
            </button>
          </div>
        </div>

        {/* Gestión de niveles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Niveles de Inglés</h1>
              <p className="text-sm text-gray-600">
                Activa o desactiva los niveles disponibles para los aprendices de esta ficha
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onSaveChanges}
                disabled={!hasChanges || isSaving}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>

          <QuickActions onAction={onQuickAction} />

          {/* Grid de niveles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NIVELES.map((nivel) => {
              const isActive = tempLevelStates[nivel.id]
              const hasChanged = currentLevelStates[nivel.id] !== tempLevelStates[nivel.id]

              return (
                <LevelCard
                  key={nivel.id}
                  nivel={nivel}
                  isActive={isActive}
                  hasChanged={hasChanged}
                  onToggle={onLevelToggle}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelsView
