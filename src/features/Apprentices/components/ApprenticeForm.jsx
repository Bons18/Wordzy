"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/Modal"
import InputField from "../../../shared/components/InputField"
import Button from "../../../shared/components/Button"

const ApprenticeForm = ({ apprentice, isOpen, onClose, onSubmit, title }) => {
  const initialFormState = {
    nombre: "",
    apellido: "",
    documento: "",
    tipoDocumento: "CC",
    ficha: [],
    nivel: 1,
    estado: "En formación",
    telefono: "",
    programa: "",
    correo: "",
    progresoActual: 0,
    progresoNiveles: [
      { nivel: 1, porcentaje: 0 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [fichaInput, setFichaInput] = useState("")

  // Cargar datos del aprendiz si estamos editando
  useEffect(() => {
    if (apprentice) {
      // Asegurarse de que ficha sea un array
      const fichaArray = Array.isArray(apprentice.ficha) ? apprentice.ficha : [apprentice.ficha].filter(Boolean)

      setFormData({
        ...apprentice,
        ficha: fichaArray,
      })
    } else {
      setFormData(initialFormState)
    }
    setErrors({})
    setFichaInput("")
  }, [apprentice, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error cuando el usuario corrige el campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFichaInputChange = (e) => {
    setFichaInput(e.target.value)
  }

  const handleAddFicha = () => {
    if (fichaInput && !isNaN(fichaInput)) {
      const fichaNumber = Number.parseInt(fichaInput, 10)
      if (!formData.ficha.includes(fichaNumber)) {
        setFormData((prev) => ({
          ...prev,
          ficha: [...prev.ficha, fichaNumber],
        }))
        setFichaInput("")
      }
    }
  }

  const handleRemoveFicha = (fichaToRemove) => {
    setFormData((prev) => ({
      ...prev,
      ficha: prev.ficha.filter((ficha) => ficha !== fichaToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"
    if (!formData.documento.trim()) newErrors.documento = "El documento es requerido"
    if (!formData.tipoDocumento) newErrors.tipoDocumento = "El tipo de documento es requerido"
    if (formData.ficha.length === 0) newErrors.ficha = "Debe agregar al menos una ficha"
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es requerido"
    if (!formData.programa.trim()) newErrors.programa = "El programa es requerido"

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido"
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "El formato del correo es inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "APRENDIZ"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            required
          />

          <InputField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={errors.apellido}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Documento <span className="text-red-500">*</span>
            </label>
            <select
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.tipoDocumento ? "border-red-500" : "border-gray-300"}`}
              required
            >
              <option value="CC">Cédula de Ciudadanía (CC)</option>
              <option value="TI">Tarjeta de Identidad (TI)</option>
              <option value="PPT">Permiso por Protección Temporal (PPT)</option>
              <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
            </select>
            {errors.tipoDocumento && <p className="text-red-500 text-xs mt-1">{errors.tipoDocumento}</p>}
          </div>

          <InputField
            label="Documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            error={errors.documento}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ficha(s) <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="number"
                value={fichaInput}
                onChange={handleFichaInputChange}
                className={`flex-1 p-2 border rounded-l-md ${errors.ficha ? "border-red-500" : "border-gray-300"}`}
                placeholder="Ingrese número de ficha"
              />
              <button type="button" onClick={handleAddFicha} className="bg-[#1f384c] text-white px-3 py-2 rounded-r-md">
                Agregar
              </button>
            </div>
            {errors.ficha && <p className="text-red-500 text-xs mt-1">{errors.ficha}</p>}

            <div className="mt-2 flex flex-wrap gap-2">
              {formData.ficha.map((ficha) => (
                <div key={ficha} className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-1">
                  <span>{ficha}</span>
                  <button type="button" onClick={() => handleRemoveFicha(ficha)} className="text-red-500 font-bold">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivel <span className="text-red-500">*</span>
            </label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value={1}>Nivel 1</option>
              <option value={2}>Nivel 2</option>
              <option value={3}>Nivel 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado <span className="text-red-500">*</span>
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="En formación">En formación</option>
              <option value="Condicionado">Condicionado</option>
              <option value="Retirado">Retirado</option>
              <option value="Graduado">Graduado</option>
            </select>
          </div>

          <InputField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
            required
          />

          <InputField
            label="Programa"
            name="programa"
            value={formData.programa}
            onChange={handleChange}
            error={errors.programa}
            required
          />

          <InputField
            label="Correo Electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
            required
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#1f384c] hover:bg-[#152736] text-white">
            {apprentice ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ApprenticeForm
