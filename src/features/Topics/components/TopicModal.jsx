import { useState, useEffect } from "react"
import Modal from "../../../shared/components/Modal"

const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const TopicModal = ({ isOpen, onClose, onSubmit, existingTopics = [] }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value)
    setHasChanges(true)
    if (error) setError("") // Limpiar error al escribir
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError("El nombre es requerido")
      return
    }

    const normalizedName = normalizeText(trimmedName)

    // Verificar si existingTopics es un array antes de usar some
    const exists =
      Array.isArray(existingTopics) && existingTopics.some((t) => normalizeText(t.name) === normalizedName)

    if (exists) {
      setError("El tema ya existe")
      return
    }

    // Log para depuración
    console.log("Enviando datos del tema:", {
      name: trimmedName,
      description: description.trim(),
    })

    // Llamar a onSubmit con los datos del tema
    onSubmit({
      name: trimmedName,
      description: description.trim(),
      status: true,
    })

    // Limpiar el formulario
    setName("")
    setDescription("")
    setHasChanges(false)
    onClose()
  }

  const handleCancel = () => {
    setName("")
    setDescription("")
    setHasChanges(false)
    setError("") // Limpiar error al cerrar
    onClose()
  }

  useEffect(() => {
    if (!isOpen) {
      // Resetear estado al cerrar
      setName("")
      setDescription("")
      setHasChanges(false)
      setError("")
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <h1 className="text-xl font-bold text-[#1f384c]">AÑADIR TEMA</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={handleInputChange(setName)}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
              error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={handleInputChange(setDescription)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        <div className="flex justify-between space-x-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
              hasChanges ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Añadir Tema
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TopicModal
