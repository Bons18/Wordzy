
"use client"

import { useState, useEffect, useRef } from "react"
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
  Upload,
  FileText,
  Music,
  Trash2,
} from "lucide-react"

const SupportMaterialForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  mode = "create",
  topics = [],
  successMessage,
  setSuccessMessage,
  setShowSuccessModal,
}) => {
  const [formData, setFormData] = useState({
    titulo: "",
    tema: "",
    fecha_creacion: new Date().toISOString().split("T")[0],
    estado: "Activo",
    contenido: "<div>Material de Apoyo...</div>",
  })

  const [uploadingFile, setUploadingFile] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const editorRef = useRef(null)
  const imageInputRef = useRef(null)
  const documentInputRef = useRef(null)
  const audioInputRef = useRef(null)

  // Función para hacer elementos del editor eliminables
  const makeContentEditable = (editorRef) => {
    if (!editorRef.current) return

    // Agregar event listeners a imágenes, documentos y audios
    const images = editorRef.current.querySelectorAll("img")
    const documents = editorRef.current.querySelectorAll(".document-link")
    const audios = editorRef.current.querySelectorAll(".audio-container")

    // Hacer imágenes eliminables
    images.forEach((img) => {
      img.style.cursor = "pointer"
      img.style.transition = "all 0.2s ease"
      img.title = "Haz clic para eliminar esta imagen"

      // Remover listeners anteriores si existen
      img.removeEventListener("click", img._clickHandler)
      img.removeEventListener("mouseenter", img._mouseEnterHandler)
      img.removeEventListener("mouseleave", img._mouseLeaveHandler)

      // Crear nuevos handlers
      img._clickHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm("¿Deseas eliminar esta imagen?")) {
          // Eliminar el contenedor div si existe
          const parent = img.closest("div")
          if (parent && parent.style.textAlign === "center") {
            parent.remove()
          } else {
            img.remove()
          }
        }
      }

      img._mouseEnterHandler = () => {
        img.style.border = "3px solid #ff4444"
        img.style.opacity = "0.8"
      }

      img._mouseLeaveHandler = () => {
        img.style.border = "1px solid #ddd"
        img.style.opacity = "1"
      }

      // Agregar los nuevos listeners
      img.addEventListener("click", img._clickHandler)
      img.addEventListener("mouseenter", img._mouseEnterHandler)
      img.addEventListener("mouseleave", img._mouseLeaveHandler)
    })

    // Hacer documentos eliminables
    documents.forEach((doc) => {
      doc.style.cursor = "pointer"
      doc.style.position = "relative"
      doc.title = "Haz clic para eliminar este documento"

      // Agregar botón de eliminar
      const deleteBtn = document.createElement("button")
      deleteBtn.innerHTML = "✕"
      deleteBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        cursor: pointer;
        display: none;
      `

      doc.appendChild(deleteBtn)

      doc.addEventListener("mouseenter", () => {
        deleteBtn.style.display = "block"
      })

      doc.addEventListener("mouseleave", () => {
        deleteBtn.style.display = "none"
      })

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm("¿Deseas eliminar este documento?")) {
          doc.remove()
        }
      })
    })

    // Hacer audios eliminables
    audios.forEach((audio) => {
      audio.style.cursor = "pointer"
      audio.style.position = "relative"
      audio.title = "Haz clic para eliminar este audio"

      // Agregar botón de eliminar
      const deleteBtn = document.createElement("button")
      deleteBtn.innerHTML = "✕"
      deleteBtn.style.cssText = `
        position: absolute;
        top: 5px;
        right: 5px;
        background: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        cursor: pointer;
        display: none;
      `

      audio.appendChild(deleteBtn)

      audio.addEventListener("mouseenter", () => {
        deleteBtn.style.display = "block"
      })

      audio.addEventListener("mouseleave", () => {
        deleteBtn.style.display = "none"
      })

      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm("¿Deseas eliminar este audio?")) {
          audio.remove()
        }
      })
    })
  }

  // Función para limpiar todo el contenido
  const clearAllContent = (editorRef) => {
    if (!editorRef.current) return

    if (confirm("¿Deseas eliminar todo el contenido? Esta acción no se puede deshacer.")) {
      editorRef.current.innerHTML = "<div>Material de Apoyo...</div>"
    }
  }

  // Inicializar el formulario solo una vez
  useEffect(() => {
    if (!isInitialized) {
        console.log("mat",initialData)
      if (mode === "edit" && initialData && Object.keys(initialData).length > 0) {
        const newFormData = {
          titulo: initialData.titulo || initialData.nombre || "",
          tema: initialData.tema || "",
          fecha_creacion: initialData.fecha_creacion
          ? new Date(initialData.fecha_creacion).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],

          estado: initialData.estado || "Activo",
          contenido: initialData.contenido || "<div>Material de Apoyo...</div>",
        }
        setFormData(newFormData)

        // Establecer el contenido en el editor cuando se monte
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML = newFormData.contenido
            // Hacer elementos eliminables
            makeContentEditable(editorRef)
          }
        }, 100)
      } else if (mode === "create") {
        const newFormData = {
          titulo: "",
          tema: "",
          fecha_creacion: new Date().toISOString().split("T")[0],
          estado: "Activo",
          contenido: "<div>Material de Apoyo...</div>",
        }
        setFormData(newFormData)

        // Establecer el contenido en el editor cuando se monte
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML = newFormData.contenido
            // Hacer elementos eliminables
            makeContentEditable(editorRef)
          }
        }, 100)
      }
      setIsInitialized(true)
    }
  }, [mode, initialData, isInitialized])

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función para subir archivos
  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      setUploadingFile(true)
      console.log("Subiendo archivo:", file.name, "Tamaño:", file.size)

      const response = await fetch("http://localhost:3000/api/upload/support-material", {
        method: "POST",
        body: formData,
      })

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Error al subir el archivo: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("Upload result:", result)

      // Verificar la estructura de la respuesta
      if (result.success && result.data && result.data.url) {
        return result.data.url
      } else {
        console.error("Estructura de respuesta inesperada:", result)
        throw new Error("Respuesta del servidor inválida")
      }
    } catch (error) {
      console.error("Error al subir archivo:", error)
      setSuccessMessage(`Error al subir el archivo: ${error.message}`)
      setShowSuccessModal(true)
      return null
    } finally {
      setUploadingFile(false)
    }
  }

  // Manejar subida de imágenes con tamaño fijo
  const handleImageUpload = async () => {
    const file = imageInputRef.current?.files[0]
    if (!file) return

    console.log("Archivo seleccionado:", file.name)

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:3000${fileUrl}`
      console.log("URL completa del archivo:", fullUrl)

      // Verificar que la URL funciona
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        console.log("✅ Imagen cargada correctamente:", fullUrl)
        // Crear imagen con tamaño fijo y responsive
        const imageHtml = `<div style="margin: 10px 0; text-align: center;"><img src="${fullUrl}" alt="${file.name}" style="max-width: 100%; height: auto; width: 400px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" /></div>`

        // Insertar en el editor
        if (editorRef.current) {
          editorRef.current.focus()

          // Obtener la selección actual
          const selection = window.getSelection()
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            range.deleteContents()

            // Crear un elemento temporal para insertar el HTML
            const tempDiv = document.createElement("div")
            tempDiv.innerHTML = imageHtml

            // Insertar el contenido
            while (tempDiv.firstChild) {
              range.insertNode(tempDiv.firstChild)
            }

            // Mover el cursor después de la imagen
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
          } else {
            // Si no hay selección, agregar al final
            editorRef.current.innerHTML += imageHtml
          }

          // Aplicar funcionalidad de eliminación al nuevo contenido
          setTimeout(() => makeContentEditable(editorRef), 100)
        }
      }

      img.onerror = () => {
        console.error("❌ Error al cargar la imagen:", fullUrl)
        setSuccessMessage("Error: La imagen no se puede cargar. Verifica que el servidor esté funcionando.")
        setShowSuccessModal(true)
      }

      // Iniciar la carga de la imagen
      img.src = fullUrl
    }

    // Limpiar el input
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  // Manejar subida de documentos
  const handleDocumentUpload = async () => {
    const file = documentInputRef.current?.files[0]
    if (!file) return

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:3000${fileUrl}`
      console.log("URL completa del archivo:", fullUrl)
      const linkHtml = `<div class="document-link" style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f8f9fa;"><a href="${fullUrl}" target="_blank" download="${file.name}" style="color: #007bff; text-decoration: none; font-weight: 500;">📄 ${file.name}</a><br><small style="color: #6c757d;">Haz clic para descargar</small></div>`
      editorRef.current.focus()
      document.execCommand("insertHTML", false, linkHtml)
      // Aplicar funcionalidad de eliminación al nuevo contenido
      setTimeout(() => makeContentEditable(editorRef), 100)
    }

    // Limpiar el input
    if (documentInputRef.current) {
      documentInputRef.current.value = ""
    }
  }

  // Manejar subida de audio
  const handleAudioUpload = async () => {
    const file = audioInputRef.current?.files[0]
    if (!file) return

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = fileUrl.startsWith("http") ? fileUrl : `http://localhost:3000${fileUrl}`
      console.log("URL completa del archivo:", fullUrl)
      const audioHtml = `<div class="audio-container" style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f8f9fa;"><audio controls style="width: 100%; max-width: 400px;"><source src="${fullUrl}" type="${file.type}">Tu navegador no soporta el elemento de audio.</audio><br><small style="color: #6c757d;">🎵 ${file.name}</small></div>`
      editorRef.current.focus()
      document.execCommand("insertHTML", false, audioHtml)
      // Aplicar funcionalidad de eliminación al nuevo contenido
      setTimeout(() => makeContentEditable(editorRef), 100)
    }

    // Limpiar el input
    if (audioInputRef.current) {
      audioInputRef.current.value = ""
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

  const handleSubmit = async () => {
    try {
      // Validar campos requeridos
      if (!formData.titulo || formData.titulo.trim() === "") {
        setSuccessMessage("El título es obligatorio")
        setShowSuccessModal(true)
        return
      }

    //   if (!formData.tema || formData.tema.trim() === "") {
    //     setSuccessMessage("El tema es obligatorio")
    //     setShowSuccessModal(true)
    //     return
    //   }

      // Obtener el contenido del editor
      const contenido = editorRef.current ? editorRef.current.innerHTML : formData.contenido

      // Validar que el contenido no esté vacío
      if (!contenido || contenido.trim() === "" || contenido === "<div><br></div>") {
        setSuccessMessage("El contenido es obligatorio")
        setShowSuccessModal(true)
        return
      }

      // Crear datos del material
      const materialData = {
        titulo: formData.titulo.trim(),
        tema: formData.tema.trim(),
        fecha_creacion: formData.fecha_creacion,
        estado: formData.estado,
        contenido: contenido,
      }

      console.log("Datos finales a enviar:", materialData)

      if (mode === "edit" && initialData._id) {
        await onSubmit(initialData._id, materialData)
      } else {
        await onSubmit(materialData)
      }
    } catch (error) {
      console.error("Error al procesar el material:", error)
      setSuccessMessage(`Error al procesar el material: ${error.message}`)
      setShowSuccessModal(true)
    }
  }

  return (
    <>
      {/* Inputs ocultos para archivos */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        style={{ display: "none" }}
        onChange={handleDocumentUpload}
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleAudioUpload}
      />

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Ingrese título"
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha:</label>
            <input
              type="date"
              name="fecha_creacion"
              value={formData.fecha_creacion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
            />  
          </div>
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
  <button
    type="button"
    onClick={() =>
      setFormData((prev) => ({
        ...prev,
        estado: prev.estado === "activo" ? "inactivo" : "activo",
      }))
    }
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
      formData.estado === "activo" ? "bg-green-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        formData.estado === "activo" ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
  <span className="ml-2 text-sm text-[#000000] capitalize">
    {formData.estado}
  </span>
</div>

        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contenido: <span className="text-red-500">*</span>
          </label>
          <div className="border border-[#d9d9d9] rounded">
            <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2 flex-wrap bg-gray-50">
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("bold")}
                type="button"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("italic")}
                type="button"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("underline")}
                type="button"
              >
                <Underline className="h-4 w-4" />
              </button>
              <span className="mx-1 text-[#d9d9d9]">|</span>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("justifyLeft")}
                type="button"
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("justifyCenter")}
                type="button"
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("justifyRight")}
                type="button"
              >
                <AlignRight className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("justifyFull")}
                type="button"
              >
                <AlignJustify className="h-4 w-4" />
              </button>
              <span className="mx-1 text-[#d9d9d9]">|</span>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("insertUnorderedList")}
                type="button"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                className="p-1 text-[#627b87] hover:bg-white rounded"
                onClick={() => execCommand("insertOrderedList")}
                type="button"
              >
                <ListOrdered className="h-4 w-4" />
              </button>
              <div className="ml-auto flex items-center gap-2">
                <button
                  className="p-1 text-[#627b87] hover:bg-white rounded"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingFile}
                  title="Subir imagen"
                  type="button"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-white rounded"
                  onClick={() => documentInputRef.current?.click()}
                  disabled={uploadingFile}
                  title="Subir documento"
                  type="button"
                >
                  <FileText className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-white rounded"
                  onClick={() => audioInputRef.current?.click()}
                  disabled={uploadingFile}
                  title="Subir audio"
                  type="button"
                >
                  <Music className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-white rounded"
                  onClick={() => {
                    const url = prompt("Ingrese la URL:")
                    const text = prompt("Ingrese el texto del enlace:")
                    if (url) {
                      editorRef.current.focus()
                      const linkHtml = `<a href="${url}" target="_blank">${text || url}</a>`
                      document.execCommand("insertHTML", false, linkHtml)
                    }
                  }}
                  type="button"
                >
                  <Link className="h-4 w-4" />
                </button>
                <button className="p-1 text-[#627b87] hover:bg-white rounded" type="button">
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  className="p-1 text-[#627b87] hover:bg-white rounded"
                  onClick={() => clearAllContent(editorRef)}
                  title="Limpiar todo el contenido"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={editorRef}
              className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto border-none outline-none bg-white"
              contentEditable={true}
              suppressContentEditableWarning={true}
            />
          </div>
          {uploadingFile && (
            <div className="mt-2 text-sm text-blue-600">
              <Upload className="inline h-4 w-4 mr-1" />
              Subiendo archivo...
            </div>
          )}
        </div>
      </div>

      {/* Footer fijo */}
      <div className="p-6 border-t border-gray-200 flex justify-between flex-shrink-0">
        <button
          className="bg-[#f44144] text-white text-sm py-2 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors"
          onClick={onCancel}
          type="button"
        >
          Cancelar
        </button>
        <button
          className="px-6 py-2 bg-[#46ae69] text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
          onClick={handleSubmit}
          disabled={uploadingFile || isLoading}
          type="button"
        >
          {mode === "create" ? "Añadir" : "Guardar"}
        </button>
      </div>
    </>
  )
}

export default SupportMaterialForm
