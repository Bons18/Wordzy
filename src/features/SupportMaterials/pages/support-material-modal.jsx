"use client"

import { useRef, useState, useEffect } from "react"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ImageIcon,
  Italic,
  Link,
  List,
  ListOrdered,
  Maximize2,
  Underline,
} from "lucide-react"

// Valores iniciales para el formulario
const initialFormData = {
  nombre: "",
  creadoPor: "",
  fecha: "",
  contenido: "Material de Apoyo",
}

export default function SupportMaterialModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(initialFormData)
  const editorRef = useRef(null)

  // Limpiar el formulario cuando el modal se cierra
  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData)
      // También limpiaremos el editor si existe
      if (editorRef.current) {
        editorRef.current.innerHTML = initialFormData.contenido
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    // Capturar el contenido del editor
    if (editorRef.current) {
      const contenido = editorRef.current.innerHTML
      onSubmit({ ...formData, contenido, tipoMaterial: "Material" })
    } else {
      onSubmit({ ...formData, tipoMaterial: "Material" })
    }
  }

  // Funciones para el editor de texto
  const execCommand = (command, value = null) => {
    if (!editorRef.current) return

    // Asegurarse de que el editor tiene el foco
    editorRef.current.focus()

    // Ejecutar el comando
    document.execCommand(command, false, value)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1f384c]">CREAR MATERIAL DE APOYO</h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del material"
                className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Creado por:</label>
              <input
                type="text"
                name="creadoPor"
                value={formData.creadoPor}
                onChange={handleChange}
                placeholder="Ingrese el nombre del creador"
                className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha:</label>
              <input
                type="text"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                placeholder="dd-mm-aaaa"
                className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full text-sm rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2">
                <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded" onClick={() => execCommand("bold")}>
                  <Bold className="h-4 w-4" />
                </button>
                <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded" onClick={() => execCommand("italic")}>
                  <Italic className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("underline")}
                >
                  <Underline className="h-4 w-4" />
                </button>
                <span className="mx-1 text-[#d9d9d9]">|</span>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("justifyLeft")}
                >
                  <AlignLeft className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("justifyCenter")}
                >
                  <AlignCenter className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("justifyRight")}
                >
                  <AlignRight className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("justifyFull")}
                >
                  <AlignJustify className="h-4 w-4" />
                </button>
                <span className="mx-1 text-[#d9d9d9]">|</span>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("insertUnorderedList")}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                  onClick={() => execCommand("insertOrderedList")}
                >
                  <ListOrdered className="h-4 w-4" />
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                    onClick={() => {
                      const imageUrl = prompt("Ingrese la URL de la imagen:")
                      if (imageUrl) execCommand("insertImage", imageUrl)
                    }}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                    onClick={() => {
                      const url = prompt("Ingrese la URL:")
                      const text = prompt("Ingrese el texto del enlace:")
                      if (url) {
                        // Crear un enlace con el texto proporcionado
                        const linkHtml = `<a href="${url}" target="_blank">${text || url}</a>`
                        document.execCommand("insertHTML", false, linkHtml)
                      }
                    }}
                  >
                    <Link className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                ref={editorRef}
                className="p-4 min-h-[200px] border-none outline-none"
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: initialFormData.contenido }}
              />
            </div>
          </div>

          <div className="bg-whi mt-5 flex justify-between">
            <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors" onClick={onClose}>
              Cancelar
            </button>
            <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors" onClick={handleSubmit}>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
