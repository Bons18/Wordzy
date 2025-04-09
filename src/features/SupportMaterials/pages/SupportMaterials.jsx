// "use client"

// import { useState, useRef } from "react"
// import {
//   AlignCenter,
//   AlignJustify,
//   AlignLeft,
//   AlignRight,
//   Bold,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Edit,
//   Eye,
//   Image,
//   Italic,
//   Link,
//   List,
//   ListOrdered,
//   Maximize2,
//   Plus,
//   Search,
//   Trash2,
//   Underline,
// } from "lucide-react"

// export default function SupportMaterials() {
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [showDetailModal, setShowDetailModal] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [selectedMaterial, setSelectedMaterial] = useState(null)

//   // Referencias para los editores
//   const addEditorRef = useRef(null)
//   const editEditorRef = useRef(null)

//   const handleAdd = () => {
//     setShowAddModal(true)
//   }

//   const handleEdit = (material) => {
//     setSelectedMaterial(material)
//     setShowEditModal(true)
//   }

//   const handleView = (material) => {
//     setSelectedMaterial(material)
//     setShowDetailModal(true)
//   }

//   const handleDelete = (material) => {
//     setSelectedMaterial(material)
//     setShowDeleteConfirm(true)
//   }

//   // Funciones para el editor de texto
//   const execCommand = (command, value = null, editorRef) => {
//     if (!editorRef.current) return

//     // Asegurarse de que el editor tiene el foco
//     editorRef.current.focus()

//     // Ejecutar el comando
//     document.execCommand(command, false, value)
//   }

//   return (
//     <div className="p-6">
//       <div className="p-6">
//         <div className="flex justify-between mb-6">
//           <div className="space-y-1">
//             <h2 className="text-2xl font-bold text-[#1f384c]">MATERIAL DE APOYO</h2>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               <span className="text-[#627b87]">Administrador</span>
//               <ChevronDown className="h-4 w-4 text-[#627b87]" />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between mb-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Buscar..."
//               className="w-full max-w-md pl-10 pr-4 py-2 border border-[#d9d9d9] rounded"
//             />
//             <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#627b87]" />
//           </div>

//           <button className="flex items-center gap-2 bg-[#46ae69] text-white px-4 py-2 rounded" onClick={handleAdd}>
//             <Plus className="h-4 w-4" />
//             Añadir Tema
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-[#f6f6fb]">
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Nombre</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Tema</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Estado</th>
//                 <th className="font-medium text-center py-3 px-4 text-[#627b87]">Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {materialesData.map((material, index) => (
//                 <tr key={index} className="border-b border-[#d9d9d9]">
//                   <td className="py-3 px-4">{material.nombre}</td>
//                   <td className="py-3 px-4">{material.tema}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         material.estado === "Activo" ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
//                       }`}
//                     >
//                       {material.estado}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         className="bg-[#ffa600] text-white rounded-full p-1.5"
//                         onClick={() => handleEdit(material)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="bg-[#dc3545] text-white rounded-full p-1.5"
//                         onClick={() => handleDelete(material)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="bg-[#1f384c] text-white rounded-full p-1.5"
//                         onClick={() => handleView(material)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex justify-between items-center mt-4 text-sm">
//           <div className="flex items-center gap-2">
//             <span>10</span>
//             <span className="text-[#627b87]">por página</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <span>1</span>
//             <span className="text-[#627b87]">de 1 páginas</span>
//             <button className="p-1 rounded border border-[#d9d9d9]">
//               <ChevronLeft className="h-4 w-4 text-[#627b87]" />
//             </button>
//             <button className="p-1 rounded border border-[#d9d9d9]">
//               <ChevronRight className="h-4 w-4 text-[#627b87]" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add Material Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir material de apoyo</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
//                   <input
//                     type="text"
//                     placeholder="Ingrese nombre"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
//                   <input
//                     type="text"
//                     placeholder="Ingrese Tema"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
//                   <input
//                     type="text"
//                     placeholder="Yaritza lopez"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
//                   <input
//                     type="text"
//                     placeholder="20/02/2025"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="border border-[#d9d9d9] rounded">
//                   <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2">
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("bold", null, addEditorRef)}
//                     >
//                       <Bold className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("italic", null, addEditorRef)}
//                     >
//                       <Italic className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("underline", null, addEditorRef)}
//                     >
//                       <Underline className="h-4 w-4" />
//                     </button>
//                     <span className="mx-1 text-[#d9d9d9]">|</span>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyLeft", null, addEditorRef)}
//                     >
//                       <AlignLeft className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyCenter", null, addEditorRef)}
//                     >
//                       <AlignCenter className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyRight", null, addEditorRef)}
//                     >
//                       <AlignRight className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyFull", null, addEditorRef)}
//                     >
//                       <AlignJustify className="h-4 w-4" />
//                     </button>
//                     <span className="mx-1 text-[#d9d9d9]">|</span>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("insertUnorderedList", null, addEditorRef)}
//                     >
//                       <List className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("insertOrderedList", null, addEditorRef)}
//                     >
//                       <ListOrdered className="h-4 w-4" />
//                     </button>
//                     <div className="ml-auto flex items-center gap-2">
//                       <button
//                         className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                         onClick={() => {
//                           const imageUrl = prompt("Ingrese la URL de la imagen:")
//                           if (imageUrl) execCommand("insertImage", imageUrl, addEditorRef)
//                         }}
//                       >
//                         <Image className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                         onClick={() => {
//                           const url = prompt("Ingrese la URL:")
//                           const text = prompt("Ingrese el texto del enlace:")
//                           if (url) {
//                             // Crear un enlace con el texto proporcionado
//                             const linkHtml = `<a href="${url}" target="_blank">${text || url}</a>`
//                             document.execCommand("insertHTML", false, linkHtml)
//                           }
//                         }}
//                       >
//                         <Link className="h-4 w-4" />
//                       </button>
//                       <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded">
//                         <Maximize2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div
//                     ref={addEditorRef}
//                     className="p-4 min-h-[200px] border-none outline-none"
//                     contentEditable={true}
//                     dangerouslySetInnerHTML={{ __html: "<div>Material de Apoyo...</div>" }}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
//                   onClick={() => setShowAddModal(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowAddModal(false)}>
//                   Añadir
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Material Modal */}
//       {showEditModal && selectedMaterial && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar material de apoyo</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedMaterial.nombre}
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedMaterial.tema}
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
//                   <input
//                     type="text"
//                     defaultValue="Yaritza lopez"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
//                   <input
//                     type="text"
//                     defaultValue="20/02/2025"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="border border-[#d9d9d9] rounded">
//                   <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2">
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("bold", null, editEditorRef)}
//                     >
//                       <Bold className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("italic", null, editEditorRef)}
//                     >
//                       <Italic className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("underline", null, editEditorRef)}
//                     >
//                       <Underline className="h-4 w-4" />
//                     </button>
//                     <span className="mx-1 text-[#d9d9d9]">|</span>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyLeft", null, editEditorRef)}
//                     >
//                       <AlignLeft className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyCenter", null, editEditorRef)}
//                     >
//                       <AlignCenter className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyRight", null, editEditorRef)}
//                     >
//                       <AlignRight className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("justifyFull", null, editEditorRef)}
//                     >
//                       <AlignJustify className="h-4 w-4" />
//                     </button>
//                     <span className="mx-1 text-[#d9d9d9]">|</span>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("insertUnorderedList", null, editEditorRef)}
//                     >
//                       <List className="h-4 w-4" />
//                     </button>
//                     <button
//                       className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                       onClick={() => execCommand("insertOrderedList", null, editEditorRef)}
//                     >
//                       <ListOrdered className="h-4 w-4" />
//                     </button>
//                     <div className="ml-auto flex items-center gap-2">
//                       <button
//                         className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                         onClick={() => {
//                           const imageUrl = prompt("Ingrese la URL de la imagen:")
//                           if (imageUrl) execCommand("insertImage", imageUrl, editEditorRef)
//                         }}
//                       >
//                         <Image className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded"
//                         onClick={() => {
//                           const url = prompt("Ingrese la URL:")
//                           const text = prompt("Ingrese el texto del enlace:")
//                           if (url) {
//                             // Seleccionar el editor de edición
//                             editEditorRef.current.focus()
//                             // Crear un enlace con el texto proporcionado
//                             const linkHtml = `<a href="${url}" target="_blank">${text || url}</a>`
//                             document.execCommand("insertHTML", false, linkHtml)
//                           }
//                         }}
//                       >
//                         <Link className="h-4 w-4" />
//                       </button>
//                       <button className="p-1 text-[#627b87] hover:bg-[#f6f6fb] rounded">
//                         <Maximize2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div
//                     ref={editEditorRef}
//                     className="p-4 min-h-[200px] border-none outline-none"
//                     contentEditable={true}
//                     dangerouslySetInnerHTML={{ __html: "<div>Material de Apoyo...</div>" }}
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
//                   onClick={() => setShowEditModal(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowEditModal(false)}>
//                   Guardar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Detail Material Modal */}
//       {showDetailModal && selectedMaterial && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Detalle de material de apoyo</h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Nombre:</label>
//                   <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
//                     {selectedMaterial.nombre}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
//                   <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{selectedMaterial.tema}</div>
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
//                   <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">Yaritza lopez</div>
//                 </div>
//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
//                   <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">20/02/2025</div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="border border-[#d9d9d9] rounded">
//                   <div className="p-4 min-h-[200px]">
//                     <div className="text-sm text-[#627b87] mb-2">Material de Apoyo...</div>
//                     <div className="border border-dashed border-[#d9d9d9] rounded h-32 flex items-center justify-center">
//                       <div className="text-center text-[#627b87]">
//                         <div className="text-sm">Contenido del material</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={() => setShowDetailModal(false)}>
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && selectedMaterial && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//             <h3 className="text-lg font-medium text-[#1f384c] mb-4">
//               ¿Está seguro de que desea eliminar este material de apoyo?
//             </h3>

//             <div className="flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
//                 onClick={() => setShowDeleteConfirm(false)}
//               >
//                 Cancelar
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#dc3545] text-white rounded"
//                 onClick={() => {
//                   // Aquí iría la lógica para eliminar el material
//                   setShowDeleteConfirm(false)
//                 }}
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Datos de ejemplo
// const materialesData = [
//   { nombre: "Gramática y vocabulario", tema: "Verb to be", estado: "Activo" },
//   { nombre: "Comprensión auditiva y pronunciación", tema: "verb tobe", estado: "Inactivo" },
//   { nombre: "Lectura y escritura", tema: "Verb to be", estado: "Activo" },
//   { nombre: "Recursos interactivos", tema: "Pronunciador", estado: "Activo" },
//   { nombre: "Cultura y contexto", tema: "Pronunciador", estado: "Activo" },
//   { nombre: "The crown", tema: "Verb to be", estado: "Inactivo" },
//   { nombre: "Postal", tema: "Pronunciador", estado: "Inactivo" },
// ]

"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronDown,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
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

// Datos de ejemplo
const materialesData = [
  { id: 1, nombre: "Gramática y vocabulario", tema: "Verb to be", estado: "Activo" },
  { id: 2, nombre: "Comprensión auditiva y pronunciación", tema: "verb tobe", estado: "Inactivo" },
  { id: 3, nombre: "Lectura y escritura", tema: "Verb to be", estado: "Activo" },
  { id: 4, nombre: "Recursos interactivos", tema: "Pronunciador", estado: "Activo" },
  { id: 5, nombre: "Cultura y contexto", tema: "Pronunciador", estado: "Activo" },
  { id: 6, nombre: "The crown", tema: "Verb to be", estado: "Inactivo" },
  { id: 7, nombre: "Postal", tema: "Pronunciador", estado: "Inactivo" },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
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
    setSelectedMaterial(material)
    setShowDeleteConfirm(true)
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
          <h1 className="text-2xl font-bold text-[#1f384c]">Material de Apoyo</h1>
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
          data={materialesData}
          columns={columns}
          onShow={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          title=""
          showActions={{ show: true, edit: true, delete: true, add: true }}
        />
      </div>

      {/* Add Material Modal - Mantenido del original pero con mejor espaciado */}
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
                    placeholder="Ingrese nombre"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <input
                    type="text"
                    placeholder="Ingrese Tema"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
                  <input
                    type="text"
                    placeholder="Yaritza lopez"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
                  <input
                    type="text"
                    placeholder="20/02/2025"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2">
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
                        <Image className="h-4 w-4" />
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
                    dangerouslySetInnerHTML={{ __html: "<div>Material de Apoyo...</div>" }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowAddModal(false)}>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Material Modal - Mantenido del original pero con mejor espaciado */}
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
                    defaultValue={selectedMaterial.nombre}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
                  <input
                    type="text"
                    defaultValue={selectedMaterial.tema}
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">Creado por:</label>
                  <input
                    type="text"
                    defaultValue="Yaritza lopez"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
                  <input
                    type="text"
                    defaultValue="20/02/2025"
                    className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="border border-[#d9d9d9] rounded">
                  <div className="flex items-center gap-2 border-b border-[#d9d9d9] p-2">
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
                        <Image className="h-4 w-4" />
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
                    dangerouslySetInnerHTML={{ __html: "<div>Material de Apoyo...</div>" }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-[#dc3545] text-white rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-[#46ae69] text-white rounded" onClick={() => setShowEditModal(false)}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Material Modal - Mantenido del original pero con mejor espaciado */}
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
                  <label className="block text-sm text-[#627b87] mb-1">fecha:</label>
                  <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">20/02/2025</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="border border-[#d9d9d9] rounded">
                  <div className="p-4 min-h-[200px]">
                    <div className="text-sm text-[#627b87] mb-2">Material de Apoyo...</div>
                    <div className="border border-dashed border-[#d9d9d9] rounded h-32 flex items-center justify-center">
                      <div className="text-center text-[#627b87]">
                        <div className="text-sm">Contenido del material</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium text-[#1f384c] mb-4">
              ¿Está seguro de que desea eliminar este material de apoyo?
            </h3>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-[#dc3545] text-white rounded"
                onClick={() => {
                  // Aquí iría la lógica para eliminar el material
                  setShowDeleteConfirm(false)
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

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

