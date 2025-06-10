import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
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
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import LoadingSpinner from "../../../shared/components/LoadingSpinner"
import ErrorMessage from "../../../shared/components/ErrorMessage"
import useSupportMaterials from "../../../shared/hooks/useSupportMaterials"
import { useGetTopics } from "../../Topics/hooks/useGetTopics"

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "tema", label: "Tema" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "Activo" || item.estado === "activo"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

// Datos de prueba temporales para cuando no hay conexión
const testMaterials = [
//   {
//     _id: "1",
//     nombre: "Material de prueba 1",
//     tema: "Verb to be",
//     estado: "Activo",
//     contenido: "<p>Contenido de prueba</p>",
//   },
//   {
//     _id: "2",
//     nombre: "Material de prueba 2",
//     tema: "Pronunciador",
//     estado: "Inactivo",
//     contenido: "<p>Otro contenido de prueba</p>",
//   },
]

export default function SupportMaterials() {
  // Hook personalizado para manejar materiales
  const { materials, loading, error, createMaterial, updateMaterial, deleteMaterial, setMaterials, setError } =
    useSupportMaterials()

  // Debug: verificar qué datos estamos recibiendo
  console.log("SupportMaterials - materials:", materials, "loading:", loading, "error:", error)
  console.log("SupportMaterials - materials es array?", Array.isArray(materials))

  const { topics } = useGetTopics();
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

  // Nuevos estados para el formulario (sin descripción, tipo y creado por)
  const [formData, setFormData] = useState({
    titulo: "",
    tema: "",
    fecha: new Date().toISOString().split("T")[0],
    estado: "activo",
    contenido: "<div>Material de Apoyo...</div>",
  })

  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Referencias para los editores
  const addEditorRef = useRef(null)
  const editEditorRef = useRef(null)

  // Referencias para inputs de archivos
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
      img.style.border = "2px solid transparent"
      img.title = "Haz clic para eliminar esta imagen"

      img.addEventListener("click", (e) => {
        e.preventDefault()
        if (confirm("¿Deseas eliminar esta imagen?")) {
          img.remove()
        }
      })

      img.addEventListener("mouseenter", () => {
        img.style.border = "2px solid #ff4444"
      })

      img.addEventListener("mouseleave", () => {
        img.style.border = "2px solid transparent"
      })
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Inicializar el formulario cuando se abre el modal de edición
  useEffect(() => {
    if (showEditModal && selectedMaterial) {
      setFormData({
        titulo: selectedMaterial.titulo || selectedMaterial.nombre || "",
        tema: selectedMaterial.tema || "",
        
        estado: selectedMaterial.estado || "activo",
        contenido: selectedMaterial.contenido || "<div>Material de Apoyo...</div>",
      })

      // Establecer el contenido en el editor cuando se monte
      setTimeout(() => {
        if (editEditorRef.current) {
          editEditorRef.current.innerHTML = selectedMaterial.contenido || "<div>Material de Apoyo...</div>"
          // Hacer elementos eliminables
          makeContentEditable(editEditorRef)
        }
      }, 100)
    }
  }, [showEditModal, selectedMaterial])

  // Inicializar el editor cuando se abre el modal de añadir
  useEffect(() => {
    if (showAddModal) {
      setFormData({
        titulo: "",
        tema: "",
        fecha: new Date().toISOString().split("T")[0],
        estado: "activo",
        contenido: "<div>Material de Apoyo...</div>",
      })

      // Establecer el contenido en el editor cuando se monte
      setTimeout(() => {
        if (addEditorRef.current) {
          addEditorRef.current.innerHTML = "<div>Material de Apoyo...</div>"
          // Hacer elementos eliminables
          makeContentEditable(addEditorRef)
        }
      }, 100)
    }
  }, [showAddModal])

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleAdd = () => {
    setShowAddModal(true)
  }

  const handleEdit = (material) => {
    setSelectedMaterial(material)
    setShowEditModal(true)
  }

  const handleView = (material) => {
    setSelectedMaterial(material)
    setShowDetailModal(true)
  }

  const handleDelete = (id) => {
    setItemToDelete(id)
    setSelectedMaterial(id)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteMaterial = async () => {
    try {
      console.log(`Eliminando material con ID: ${itemToDelete}`)

      await deleteMaterial(itemToDelete)

      setSuccessMessage("Material eliminado exitosamente de la base de datos")
      setShowSuccessModal(true)

      console.log("Material eliminado exitosamente")
    } catch (error) {
      console.error("Error al eliminar el material:", error)
      setSuccessMessage(`Error al eliminar el material: ${error.message}`)
      setShowSuccessModal(true)
    } finally {
      setShowDeleteConfirm(false)
      setItemToDelete(null)
    }
  }

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
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al subir el archivo")
      }

      const result = await response.json()
      return result.data.url
    } catch (error) {
      console.error("Error al subir archivo:", error)
      setSuccessMessage("Error al subir el archivo")
      setShowSuccessModal(true)
      return null
    } finally {
      setUploadingFile(false)
    }
  }

  // Manejar subida de imágenes con tamaño fijo
  const handleImageUpload = async (editorRef) => {
    const file = imageInputRef.current?.files[0]
    if (!file) return

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = `http://localhost:3000${fileUrl}`
      // Crear imagen con tamaño fijo y responsive
      const imageHtml = `<img src="${fullUrl}" alt="${file.name}" class="editor-image" style="max-width: 100%; height: auto; width: 400px; border-radius: 8px; margin: 10px 0;" />`
      editorRef.current.focus()
      document.execCommand("insertHTML", false, imageHtml)
      // Aplicar funcionalidad de eliminación al nuevo contenido
      setTimeout(() => makeContentEditable(editorRef), 100)
    }

    // Limpiar el input
    if (imageInputRef.current) {
      imageInputRef.current.value = ""
    }
  }

  // Manejar subida de documentos
  const handleDocumentUpload = async (editorRef) => {
    const file = documentInputRef.current?.files[0]
    if (!file) return

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = `http://localhost:3000${fileUrl}`
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
  const handleAudioUpload = async (editorRef) => {
    const file = audioInputRef.current?.files[0]
    if (!file) return

    const fileUrl = await uploadFile(file)
    if (fileUrl) {
      const fullUrl = `http://localhost:3000${fileUrl}`
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

  // Guardar un nuevo material
  const handleSaveNewMaterial = async () => {
    try {
      // Validar campos requeridos
      if (!formData.titulo || formData.titulo.trim() === "") {
        setSuccessMessage("El título es obligatorio")
        setShowSuccessModal(true)
        return
      }

      if (!formData.tema || formData.tema.trim() === "") {
        setSuccessMessage("El tema es obligatorio")
        setShowSuccessModal(true)
        return
      }

      // Obtener el contenido del editor
      const contenido = addEditorRef.current ? addEditorRef.current.innerHTML : formData.contenido

      // Validar que el contenido no esté vacío
      if (!contenido || contenido.trim() === "" || contenido === "<div><br></div>") {
        setSuccessMessage("El contenido es obligatorio")
        setShowSuccessModal(true)
        return
      }

      // Crear nuevo material (sin descripción, tipo y creado por)
      const materialData = {
        titulo: formData.titulo.trim(),
        tema: formData.tema.trim(),
        fecha: formData.fecha,
        estado: formData.estado,
        contenido: contenido,
      }

      console.log("Datos finales a enviar:", materialData)

      await createMaterial(materialData)
      setSuccessMessage("Material añadido exitosamente")
      setShowSuccessModal(true)
      setShowAddModal(false)
    } catch (error) {
      console.error("Error al añadir el material:", error)
      setSuccessMessage(`Error al añadir el material: ${error.message}`)
      setShowSuccessModal(true)
    }
  }

  // Actualizar un material existente
  const handleUpdateMaterial = async () => {
    try {
      // Validar campos requeridos
      if (!formData.titulo || formData.titulo.trim() === "") {
        setSuccessMessage("El título es obligatorio")
        setShowSuccessModal(true)
        return
      }

      if (!formData.tema || formData.tema.trim() === "") {
        setSuccessMessage("El tema es obligatorio")
        setShowSuccessModal(true)
        return
      }

      // Obtener el contenido del editor
      const contenido = editEditorRef.current ? editEditorRef.current.innerHTML : formData.contenido

      // Validar que el contenido no esté vacío
      if (!contenido || contenido.trim() === "" || contenido === "<div><br></div>") {
        setSuccessMessage("El contenido es obligatorio")
        setShowSuccessModal(true)
        return
      }

      // Actualizar el material (sin descripción, tipo y creado por)
      const materialData = {
        titulo: formData.titulo.trim(),
        tema: formData.tema.trim(),
        fecha: formData.fecha,
        estado: formData.estado,
        contenido: contenido,
      }

      await updateMaterial(selectedMaterial._id, materialData)
      setSuccessMessage("Material actualizado exitosamente")
      setShowSuccessModal(true)
      setShowEditModal(false)
    } catch (error) {
      console.error("Error al actualizar el material:", error)
      setSuccessMessage(`Error al actualizar el material: ${error.message}`)
      setShowSuccessModal(true)
    }
  }

  // Funciones para el editor de texto
  const execCommand = (command, value = null, editorRef) => {
    if (!editorRef.current) return

    // Asegurarse de que el editor tiene el foco
    editorRef.current.focus()

    // Ejecutar el comando
    document.execCommand(command, false, value)
  }

  // Mostrar loading si está cargando
  if (loading && materials.length === 0) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">MATERIAL DE APOYO</h1>
          </div>
        </header>
        <div className="container mx-auto px-6">
          <LoadingSpinner size="large" message="Cargando materiales de apoyo..." />
        </div>
      </div>
    )
  }

  // Mostrar error si hay error
  if (error && materials.length === 0) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">MATERIAL DE APOYO</h1>
          </div>
        </header>
        <div className="container mx-auto px-6">
          <ErrorMessage
            message={error}
            onRetry={() => {
              if (setError) setError(null)
              window.location.reload()
            }}
          />
        </div>
      </div>
    )
  }

  // Asegurar que materials sea un array antes de pasarlo a GenericTable
  // Si no hay materiales del backend, usar datos de prueba temporales
  const materialsArray = Array.isArray(materials) && materials.length > 0 ? materials : testMaterials

  // Mapear los datos para asegurar que tengan la estructura correcta
  const mappedMaterials = materialsArray.map((material) => ({
    ...material,
    nombre: material.titulo || material.nombre, // Para mostrar en la tabla
    _id: material._id || material.id,
  }))

  console.log("SupportMaterials - materialsArray final:", mappedMaterials)

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">MATERIAL DE APOYO</h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Administrador</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6">
        <GenericTable
          data={mappedMaterials}
          columns={columns}
          onShow={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          title=""
          showActions={{ show: true, edit: true, delete: true, add: true }}
        />
      </div>

      {/* Inputs ocultos para archivos */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={() => handleImageUpload(showAddModal ? addEditorRef : editEditorRef)}
      />
      <input
        ref={documentInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
        style={{ display: "none" }}
        onChange={() => handleDocumentUpload(showAddModal ? addEditorRef : editEditorRef)}
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={() => handleAudioUpload(showAddModal ? addEditorRef : editEditorRef)}
      />

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header fijo */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-bold text-[#1f384c]">Añadir material de apoyo</h2>
            </div>

            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">
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
                  <label className="block text-sm text-[#627b87] mb-1">
                    Tema: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    required
                  >
                    <option value="">Seleccione un tema</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
                  <input
                    type="date"
                    name="fecha"
                    
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-[#627b87] mb-1">
                  Contenido: <span className="text-red-500">*</span>
                </label>
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2 flex-wrap bg-gray-50">
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("bold", null, addEditorRef)}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("italic", null, addEditorRef)}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("underline", null, addEditorRef)}
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyLeft", null, addEditorRef)}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyCenter", null, addEditorRef)}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyRight", null, addEditorRef)}
                    >
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyFull", null, addEditorRef)}
                    >
                      <AlignJustify className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("insertUnorderedList", null, addEditorRef)}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("insertOrderedList", null, addEditorRef)}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir imagen"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => documentInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir documento"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => audioInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir audio"
                      >
                        <Music className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
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
                      <button className="p-1 text-[#627b87] hover:bg-white rounded">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => clearAllContent(showAddModal ? addEditorRef : editEditorRef)}
                        title="Limpiar todo el contenido"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={addEditorRef}
                    className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto border-none outline-none bg-white"
                    contentEditable={true}
                    dangerouslySetInnerHTML={{ __html: formData.contenido }}
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
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-[#46ae69] text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                onClick={handleSaveNewMaterial}
                disabled={uploadingFile}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {showEditModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header fijo */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-bold text-[#1f384c]">Editar material de apoyo</h2>
            </div>

            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">
                    Título: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">
                    Tema: <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                    required
                  >
                    <option value="">Seleccione un tema</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.name}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-[#627b87] mb-1">
                  Contenido: <span className="text-red-500">*</span>
                </label>
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2 flex-wrap bg-gray-50">
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("bold", null, editEditorRef)}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("italic", null, editEditorRef)}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("underline", null, editEditorRef)}
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyLeft", null, editEditorRef)}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyCenter", null, editEditorRef)}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyRight", null, editEditorRef)}
                    >
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("justifyFull", null, editEditorRef)}
                    >
                      <AlignJustify className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("insertUnorderedList", null, editEditorRef)}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-white rounded"
                      onClick={() => execCommand("insertOrderedList", null, editEditorRef)}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir imagen"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => documentInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir documento"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => audioInputRef.current?.click()}
                        disabled={uploadingFile}
                        title="Subir audio"
                      >
                        <Music className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => {
                          const url = prompt("Ingrese la URL:")
                          const text = prompt("Ingrese el texto del enlace:")
                          if (url) {
                            // Seleccionar el editor de edición
                            editEditorRef.current.focus()
                            // Crear un enlace con el texto proporcionado
                            const linkHtml = `<a href="${url}" target="_blank">${text || url}</a>`
                            document.execCommand("insertHTML", false, linkHtml)
                          }
                        }}
                      >
                        <Link className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-[#627b87] hover:bg-white rounded">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 text-[#627b87] hover:bg-white rounded"
                        onClick={() => clearAllContent(showAddModal ? addEditorRef : editEditorRef)}
                        title="Limpiar todo el contenido"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={editEditorRef}
                    className="p-4 min-h-[300px] max-h-[400px] overflow-y-auto border-none outline-none bg-white"
                    contentEditable={true}
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
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 bg-[#46ae69] text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                onClick={handleUpdateMaterial}
                disabled={uploadingFile}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Material Modal */}
      {showDetailModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header fijo */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-bold text-[#1f384c]">Detalle de material de apoyo</h2>
            </div>

            {/* Contenido con scroll */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Título:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    {selectedMaterial.titulo || selectedMaterial.nombre}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{selectedMaterial.tema}</div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    {selectedMaterial.fecha ? new Date(selectedMaterial.fecha).toLocaleDateString() : "20-02-2025"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedMaterial.estado === "Activo" || selectedMaterial.estado === "activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedMaterial.estado}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
                <div className="border border-[#d9d9d9] rounded bg-white">
                  <div className="p-4 min-h-[300px] overflow-auto">
                    <div
                      className="text-sm text-[#627b87] editor-content"
                      dangerouslySetInnerHTML={{
                        __html: selectedMaterial.contenido || "<div>Material de Apoyo...</div>",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer fijo */}
            <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
              <button
                className="px-6 py-2 bg-[#dc3545] text-white rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => setShowDetailModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar material */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteMaterial}
        title="Eliminar Material"
        message="¿Está seguro que desea eliminar este material de apoyo? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      {/* Modal de éxito */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={() => setShowSuccessModal(false)}
        title="Operación Exitosa"
        message={successMessage}
        confirmText="Aceptar"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />

      {/* Modal de confirmación para cerrar sesión */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmText="Cerrar Sesión"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />
    </div>
  )
}
