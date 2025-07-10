"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/Modal"
import { normalizeText } from "../../../shared/utils/normalizeText"
import { useCheckTopicStatusChange } from "../hooks/useCheckTopicStatusChange"

const EditTopicModal = ({ isOpen, onClose, onSubmit, topic, existingTopics }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState("")
  const [statusWarning, setStatusWarning] = useState("")
  const [usageInfo, setUsageInfo] = useState(null)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)

  // ✅ Hook para verificar cambios de estado
  const { checkStatusChange } = useCheckTopicStatusChange()

  useEffect(() => {
    if (topic) {
      setName(topic.name)
      setDescription(topic.description || "")
      setStatus(topic.status) // Asegúrate que topic.status es boolean
      setHasChanges(false)
      setError("")
      setStatusWarning("")
      setUsageInfo(null)
    }
  }, [topic, isOpen])

  // Validar en tiempo real si el nombre ya existe
  useEffect(() => {
    const trimmed = name.trim()
    const normalized = normalizeText(trimmed)

    const exists = existingTopics.some((t) => normalizeText(t.name) === normalized && t._id !== topic._id)

    if (exists) {
      setError("El tema ya existe")
    } else {
      setError("") // Limpia el error si ya no hay duplicado
    }
  }, [name, existingTopics])

  // ✅ MEJORADA: Función para manejar cambio de estado con validación
  const toggleStatus = async () => {
    const newStatus = !status

    // Si se está activando el tema, no hay restricciones
    if (newStatus === true) {
      setStatus(newStatus)
      setHasChanges(true)
      setStatusWarning("")
      setUsageInfo(null)
      return
    }

    // Si se está desactivando, verificar si está en uso
    if (newStatus === false && topic) {
      setIsCheckingStatus(true)
      try {
        const statusCheck = await checkStatusChange(topic._id, newStatus)

        if (!statusCheck.canChange && statusCheck.reason === "in_use") {
          // No permitir el cambio y guardar información detallada
          setStatusWarning("No se puede desactivar este tema porque está siendo utilizado en programaciones activas.")
          setUsageInfo(statusCheck.usageInfo)
          return // No cambiar el estado
        } else {
          // Permitir el cambio
          setStatus(newStatus)
          setHasChanges(true)
          setStatusWarning("")
          setUsageInfo(null)
        }
      } catch (error) {
        console.error("Error al verificar cambio de estado:", error)
        setStatusWarning("Error al verificar si el tema puede ser desactivado. Intente nuevamente.")
        setUsageInfo(null)
        return
      } finally {
        setIsCheckingStatus(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "name") {
      setName(value)
      setError("")
    }
    if (name === "description") setDescription(value)
    setHasChanges(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (error || statusWarning) return

    const trimmedName = name.trim()
    const trimmedDescription = description.trim()

    if (!trimmedName) return

    const exists = existingTopics.some(
      (t) => normalizeText(t.name) === normalizeText(trimmedName) && t._id !== topic._id,
    )

    if (exists) {
      setError("El tema ya existe")
      return
    }

    onSubmit({
      name: trimmedName,
      description: trimmedDescription,
      status,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-xl font-bold text-[#1f384c]">EDITAR TEMA</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status}
                onChange={toggleStatus}
                disabled={isCheckingStatus}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A] ${
                  isCheckingStatus ? "opacity-50 cursor-not-allowed" : ""
                }`}
              ></div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {isCheckingStatus ? "Verificando..." : status ? "Activo" : "Inactivo"}
              </span>
            </label>
          </div>

          {/* ✅ MEJORADA: Advertencia ordenada cuando no se puede desactivar */}
          {statusWarning && usageInfo && (
            <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm text-red-800">No se puede desactivar el tema <strong>"{usageInfo.topicName}"</strong> porque está siendo utilizado en programaciones activas.</h3>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Información sobre temas inactivos */}
          {status === false && !statusWarning && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">
                    <strong>Información:</strong> Los temas inactivos no aparecen disponibles para seleccionar en nuevas
                    programaciones de cursos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Advertencia preventiva cuando se selecciona inactivo */}
          {status === false && topic?.status === true && !statusWarning && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Advertencia:</strong> Si este tema está siendo utilizado en programaciones activas, no podrá
                    ser desactivado hasta que sea removido de dichas programaciones.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges || !!error || !!statusWarning || isCheckingStatus}
            className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
              hasChanges && !error && !statusWarning && !isCheckingStatus
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isCheckingStatus ? "Verificando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditTopicModal
