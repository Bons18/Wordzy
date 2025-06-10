// "use client"

// import { useEffect, useRef } from "react"

// const MaterialDetailModal = ({ material, isOpen, onClose, content }) => {
//   const modalRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose()
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isOpen, onClose])

//   if (!isOpen || !material) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE MATERIAL DE APOYO</h2>

//         <div className="space-y-3">
//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Nombre:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.nombre}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Tema:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.tema}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Estado:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.estado}</div>
//           </div>

//           <div className="mt-4">
//             <h3 className="text-[14px] font-bold mb-2">Contenido:</h3>
//             <div className="border border-gray-300 rounded-lg p-3">
//               <div dangerouslySetInnerHTML={{ __html: content || "<div>No hay contenido disponible</div>" }} />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center mt-8">
//           <button
//             onClick={onClose}
//             className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MaterialDetailModal


"use client"

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
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Importar los temas desde el archivo de TopicsPage
import { topics } from "../../Topics/pages/TopicsPage"

// Datos de ejemplo
const initialMaterialsData = [
  {
    id: 1,
    nombre: "Gramática y vocabulario",
    tema: "Verb to be",
    estado: "Activo",
    contenido: "<p>Este material contiene información sobre el verbo 'to be' en inglés, sus usos y conjugaciones.</p>",
  },
  {
    id: 2,
    nombre: "Comprensión auditiva y pronunciación",
    tema: "verb tobe",
    estado: "Inactivo",
    contenido: "<p>Ejercicios de comprensión auditiva y guía de pronunciación para principiantes.</p>",
  },
  {
    id: 3,
    nombre: "Lectura y escritura",
    tema: "Verb to be",
    estado: "Activo",
    contenido: "<p>Actividades de lectura y escritura para practicar el verbo 'to be'.</p>",
  },
  {
    id: 4,
    nombre: "Recursos interactivos",
    tema: "Pronunciador",
    estado: "Activo",
    contenido: "<p>Herramientas interactivas para mejorar la pronunciación en inglés.</p>",
  },
  {
    id: 5,
    nombre: "Cultura y contexto",
    tema: "Pronunciador",
    estado: "Activo",
    contenido: "<p>Información cultural y contextual para entender mejor el idioma inglés.</p>",
  },
  {
    id: 6,
    nombre: "The crown",
    tema: "Verb to be",
    estado: "Inactivo",
    contenido: "<p>Material basado en la serie 'The Crown' para practicar inglés.</p>",
  },
  {
    id: 7,
    nombre: "Postal",
    tema: "Pronunciador",
    estado: "Inactivo",
    contenido: "<p>Ejercicio de escritura de postales en inglés.</p>",
  },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "tema", label: "Tema" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

export default function SupportMaterials() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [materials, setMaterials] = useState([...initialMaterialsData])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Nuevos estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    tema: "",
    creadoPor: "Yaritza lopez",
    fecha: new Date().toISOString().split("T")[0],
    estado: "Activo",
    contenido: "<div>Material de Apoyo...</div>",
  })

  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Referencias para los editores
  const addEditorRef = useRef(null)
  const editEditorRef = useRef(null)

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
        nombre: selectedMaterial.nombre,
        tema: selectedMaterial.tema,
        creadoPor: "Yaritza lopez",
        fecha: new Date().toISOString().split("T")[0],
        estado: selectedMaterial.estado,
        contenido: selectedMaterial.contenido || "<div>Material de Apoyo...</div>",
      })

      // Establecer el contenido en el editor cuando se monte
      setTimeout(() => {
        if (editEditorRef.current) {
          editEditorRef.current.innerHTML = selectedMaterial.contenido || "<div>Material de Apoyo...</div>"
        }
      }, 100)
    }
  }, [showEditModal, selectedMaterial])

  // Inicializar el editor cuando se abre el modal de añadir
  useEffect(() => {
    if (showAddModal) {
      setFormData({
        nombre: "",
        tema: "",
        creadoPor: "Yaritza lopez",
        fecha: new Date().toISOString().split("T")[0],
        estado: "Activo",
        contenido: "<div>Material de Apoyo...</div>",
      })

      // Establecer el contenido en el editor cuando se monte
      setTimeout(() => {
        if (addEditorRef.current) {
          addEditorRef.current.innerHTML = "<div>Material de Apoyo...</div>"
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

  const handleDelete = (material) => {
    setItemToDelete(material.id)
    setSelectedMaterial(material)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteMaterial = () => {
    try {
      // Eliminar de la lista local
      const updatedMaterials = materials.filter((m) => m.id !== itemToDelete)
      setMaterials(updatedMaterials)

      // Mostrar mensaje de éxito
      setSuccessMessage("Material eliminado exitosamente")
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error al eliminar el material:", error)
      setSuccessMessage("Ocurrió un error al eliminar el material")
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

  // Guardar un nuevo material
  const handleSaveNewMaterial = () => {
    try {
      // Obtener el contenido del editor
      const contenido = addEditorRef.current ? addEditorRef.current.innerHTML : formData.contenido

      // Crear nuevo material
      const newMaterial = {
        id: materials.length > 0 ? Math.max(...materials.map((m) => m.id)) + 1 : 1,
        nombre: formData.nombre,
        tema: formData.tema,
        estado: formData.estado,
        contenido: contenido,
      }

      // Añadir a la lista
      setMaterials([...materials, newMaterial])

      // Mostrar mensaje de éxito
      setSuccessMessage("Material añadido exitosamente")
      setShowSuccessModal(true)
      setShowAddModal(false)
    } catch (error) {
      console.error("Error al añadir el material:", error)
      setSuccessMessage("Ocurrió un error al añadir el material")
      setShowSuccessModal(true)
    }
  }

  // Actualizar un material existente
  const handleUpdateMaterial = () => {
    try {
      // Obtener el contenido del editor
      const contenido = editEditorRef.current ? editEditorRef.current.innerHTML : formData.contenido

      // Actualizar el material
      const updatedMaterials = materials.map((m) => {
        if (m.id === selectedMaterial.id) {
          return {
            ...m,
            nombre: formData.nombre,
            tema: formData.tema,
            estado: formData.estado,
            contenido: contenido,
          }
        }
        return m
      })

      setMaterials(updatedMaterials)

      // Mostrar mensaje de éxito
      setSuccessMessage("Material actualizado exitosamente")
      setShowSuccessModal(true)
      setShowEditModal(false)
    } catch (error) {
      console.error("Error al actualizar el material:", error)
      setSuccessMessage("Ocurrió un error al actualizar el material")
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
          data={materials}
          columns={columns}
          onShow={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          title=""
          showActions={{ show: true, edit: true, delete: true, add: true }}
        />
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir material de apoyo</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingrese nombre"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <select
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  >
                    <option value="">Seleccione un tema</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.nombre}>
                        {topic.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
                  <input
                    type="text"
                    name="creadoPor"
                    value={formData.creadoPor}
                    onChange={handleInputChange}
                    placeholder="Yaritza lopez"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
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
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2 flex-wrap">
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("bold", null, addEditorRef)}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("italic", null, addEditorRef)}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("underline", null, addEditorRef)}
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyLeft", null, addEditorRef)}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyCenter", null, addEditorRef)}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyRight", null, addEditorRef)}
                    >
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyFull", null, addEditorRef)}
                    >
                      <AlignJustify className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("insertUnorderedList", null, addEditorRef)}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("insertOrderedList", null, addEditorRef)}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                        onClick={() => {
                          const imageUrl = prompt("Ingrese la URL de la imagen:")
                          if (imageUrl) execCommand("insertImage", imageUrl, addEditorRef)
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
                    ref={addEditorRef}
                    className="p-4 min-h-[200px] border-none outline-none"
                    contentEditable={true}
                    dangerouslySetInnerHTML={{ __html: formData.contenido }}
                  />
                </div>
              </div>

              <div className="flex justify-between px-4">
                <button
                  className="bg-[#f44144] text-white text-sm py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-[#46ae69] text-white rounded-lg text-sm hover:bg-green-600"
                  onClick={handleSaveNewMaterial}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {showEditModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar material de apoyo</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <select
                    name="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  >
                    <option value="">Seleccione un tema</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.nombre}>
                        {topic.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
                  <input
                    type="text"
                    name="creadoPor"
                    value={formData.creadoPor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
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
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2 flex-wrap">
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("bold", null, editEditorRef)}
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("italic", null, editEditorRef)}
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("underline", null, editEditorRef)}
                    >
                      <Underline className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyLeft", null, editEditorRef)}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyCenter", null, editEditorRef)}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyRight", null, editEditorRef)}
                    >
                      <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("justifyFull", null, editEditorRef)}
                    >
                      <AlignJustify className="h-4 w-4" />
                    </button>
                    <span className="mx-1 text-[#d9d9d9]">|</span>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("insertUnorderedList", null, editEditorRef)}
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                      onClick={() => execCommand("insertOrderedList", null, editEditorRef)}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
                        onClick={() => {
                          const imageUrl = prompt("Ingrese la URL de la imagen:")
                          if (imageUrl) execCommand("insertImage", imageUrl, editEditorRef)
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
                      <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded">
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div
                    ref={editEditorRef}
                    className="p-4 min-h-[200px] border-none outline-none"
                    contentEditable={true}
                  />
                </div>
              </div>

              <div className="flex justify-between px-4">
                <button
                  className="bg-[#f44144] text-white text-sm py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-[#46ae69] text-white rounded-lg text-sm hover:bg-green-600"
                  onClick={handleUpdateMaterial}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Material Modal */}
      {showDetailModal && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Detalle de material de apoyo</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    {selectedMaterial.nombre}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{selectedMaterial.tema}</div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">Yaritza lopez</div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    {formData.fecha || "20-02-2025"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedMaterial.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedMaterial.estado}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
                <div className="border border-[#d9d9d9] rounded">
                  <div className="p-4 min-h-[200px] overflow-auto">
                    <div
                      className="text-sm text-[#627b87]"
                      dangerouslySetInnerHTML={{
                        __html: selectedMaterial.contenido || "<div>Material de Apoyo...</div>",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-4 py-2 bg-[#dc3545] text-white rounded-lg hover:bg-red-600"
                  onClick={() => setShowDetailModal(false)}
                >
                  Cerrar
                </button>
              </div>
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
