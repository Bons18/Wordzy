"use client"

import { useState } from "react"
import { Search, Upload, X, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Badges = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    badgeName: "",
    points: "",
    description: "",
    file: null,
    filePreview: null,
    fileSize: null
  })

  const validateForm = () => {
    const errors = {}
    if (!formData.badgeName.trim()) errors.badgeName = "El nombre es requerido"
    if (!formData.points) errors.points = "Los puntos son requeridos"
    if (!formData.description.trim()) errors.description = "La descripción es requerida"
    if (!formData.file) errors.file = "La imagen es requerida"
    return errors
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        file: selectedFile,
        filePreview: URL.createObjectURL(selectedFile),
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(1)
      }))
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    console.log(formData)
    // Reset form after successful submission
    setFormData({
      badgeName: "",
      points: "",
      description: "",
      file: null,
      filePreview: null,
      fileSize: null
    })
    navigate("/programacion/insigneas2")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white py-3 px-4 sm:px-6 border-b border-[#d6dade] shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1f384c]">CREAR INSIGNIAS</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        <div className="max-w-xl mx-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre de la insignia */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#1f384c]">
                Nombre de la insignia:
              </label>
              <input
                type="text"
                name="badgeName"
                value={formData.badgeName}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-md border ${formErrors.badgeName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Nombre"
              />
              {formErrors.badgeName && (
                <p className="text-xs text-red-500">{formErrors.badgeName}</p>
              )}
            </div>

            {/* Subir imagen - improved layout */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#1f384c]">
                Subir imagen:
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  {!formData.file ? (
                    <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-500">Haga clic para cargar o arrastrar y soltar</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG (MAX. 800x400px)</p>
                    </div>
                  ) : (
                    <div className="w-full p-6">
                      {formData.filePreview && (
                        <div className="flex flex-col items-center">
                          <img 
                            src={formData.filePreview} 
                            alt="Preview" 
                            className="h-40 w-40 object-contain rounded-lg shadow-sm mb-4"
                          />
                          <div className="w-full max-w-sm bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                  <Upload className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                                    {formData.file.name}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Tamaño: {formData.fileSize} MB
                                  </p>
                                </div>
                              </div>
                              <button 
                                type="button"
                                onClick={() => setFormData(prev => ({
                                  ...prev,
                                  file: null,
                                  filePreview: null,
                                  fileSize: null
                                }))}
                                className="p-1.5 hover:bg-red-50 rounded-lg group transition-colors"
                              >
                                <X className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
              {formErrors.file && (
                <p className="text-xs text-red-500">{formErrors.file}</p>
              )}
            </div>

            {/* Points and Description in a more compact layout */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#1f384c]">
                  Puntos:
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md border ${formErrors.points ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Puntos"
                />
                {formErrors.points && (
                  <p className="text-xs text-red-500">{formErrors.points}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#1f384c]">
                  Descripción:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none`}
                  placeholder="Descripción"
                />
                {formErrors.description && (
                  <p className="text-xs text-red-500">{formErrors.description}</p>
                )}
              </div>
            </div>

            {/* Buttons with reduced padding */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Badges

