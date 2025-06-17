"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/Modal"
import {
  validateInstructorData,
  processServerError,
  prepareInstructorData,
} from "../services/instructorValidationService"

const InstructorForm = ({ isOpen, onClose, onSubmit, instructor, isEditMode, loading }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    tipoDocumento: "CC",
    estado: "Activo",
    telefono: "",
    correo: "",
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [errors, setErrors] = useState({})
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    if (isEditMode && instructor) {
      setFormData({
        nombre: instructor.nombre || "",
        apellido: instructor.apellido || "",
        documento: instructor.documento || "",
        tipoDocumento: instructor.tipoDocumento || "CC",
        estado: instructor.estado || "Activo",
        telefono: instructor.telefono || "",
        correo: instructor.correo || "",
      })
      setHasChanges(false)
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        documento: "",
        tipoDocumento: "CC",
        estado: "Activo",
        telefono: "",
        correo: "",
      })
      setHasChanges(false)
    }
    setErrors({})
  }, [isEditMode, instructor, isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Aplicar trim automáticamente para campos de texto
    let processedValue = value
    if (["nombre", "apellido", "documento", "telefono"].includes(name)) {
      processedValue = value.trimStart() // Solo trim al inicio para mejor UX
    }
    if (name === "correo") {
      processedValue = value.toLowerCase().trimStart()
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }))
    setHasChanges(true)

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const toggleEstado = () => {
    setFormData((prev) => ({
      ...prev,
      estado: prev.estado === "Activo" ? "Inactivo" : "Activo",
    }))
    setHasChanges(true)
  }

  const validateForm = async () => {
    setIsValidating(true)

    try {
      // Agregar tipoUsuario para validación completa
      const dataToValidate = {
        ...formData,
        tipoUsuario: "instructor",
      }

      const validationErrors = await validateInstructorData(
        dataToValidate,
        isEditMode,
        instructor?._id || instructor?.id,
      )

      setErrors(validationErrors)
      return Object.keys(validationErrors).length === 0
    } catch (error) {
      console.error("Error en validación:", error)
      setErrors({ general: "Error al validar los datos" })
      return false
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const isValid = await validateForm()
    if (!isValid) {
      return
    }

    // Preparar datos usando la función del servicio
    const submitData = prepareInstructorData(formData)

    console.log("Enviando datos del formulario:", submitData)

    try {
      await onSubmit(submitData)
      handleCancel()
    } catch (error) {
      console.error("Error en el formulario:", error)

      // Procesar errores del servidor usando el servicio
      const serverErrors = processServerError(error)
      setErrors(serverErrors)
    }
  }

  const handleCancel = () => {
    setFormData({
      nombre: "",
      apellido: "",
      documento: "",
      tipoDocumento: "CC",
      estado: "Activo",
      telefono: "",
      correo: "",
    })
    setHasChanges(false)
    setErrors({})
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <h1 className="text-xl font-bold text-[#1f384c]">{isEditMode ? "EDITAR INSTRUCTOR" : "AÑADIR INSTRUCTOR"}</h1>

      {errors.general && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{errors.general}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              maxLength={50}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                errors.nombre
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            <p className="text-xs text-gray-500 mt-1">Mínimo 2 caracteres, máximo 50</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              maxLength={50}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                errors.apellido
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
            <p className="text-xs text-gray-500 mt-1">Mínimo 2 caracteres, máximo 50</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo Documento <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                errors.tipoDocumento
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            >
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="PPT">Permiso por Protección Temporal</option>
              <option value="PEP">Permiso Especial de Permanencia</option>
            </select>
            {errors.tipoDocumento && <p className="text-red-500 text-sm mt-1">{errors.tipoDocumento}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Documento <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="documento"
              value={formData.documento}
              onChange={handleInputChange}
              minLength={6}
              maxLength={20}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
                errors.documento
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.documento && <p className="text-red-500 text-sm mt-1">{errors.documento}</p>}
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres, máximo 20 (único)</p>
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
              errors.telefono
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          />
          {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Correo <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${
              errors.correo
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
            required
          />
          {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
          <p className="text-xs text-gray-500 mt-1">Formato: usuario@dominio.com (único)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.estado === "Activo"}
                onChange={toggleEstado}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
            </label>
            <span className="ml-3 text-sm text-gray-700">{formData.estado === "Activo" ? "Activo" : "Inactivo"}</span>
          </div>
          {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
          <p className="text-xs text-gray-500 mt-1">Estados válidos: Activo, Inactivo</p>
        </div>

        <div className="flex justify-between space-x-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-red-500 hover:bg-red-600 focus:ring-red-500"
            disabled={loading || isValidating}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!hasChanges || loading || isValidating}
            className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
              hasChanges && !loading && !isValidating
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isValidating
              ? "Validando..."
              : loading
                ? "Guardando..."
                : isEditMode
                  ? "Guardar Cambios"
                  : "Añadir Instructor"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default InstructorForm
