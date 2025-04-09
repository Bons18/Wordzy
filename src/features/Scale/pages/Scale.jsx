// "use client"

// import { useState } from "react"
// import { ChevronDown, ChevronLeft, ChevronRight, Edit, Eye, Search, Trash2 } from "lucide-react"

// export default function Scale() {
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [showDetailModal, setShowDetailModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [selectedEscala, setSelectedEscala] = useState(null)

//   const handleAdd = () => {
//     setShowAddModal(true)
//   }

//   const handleEdit = (escala) => {
//     setSelectedEscala(escala)
//     setShowEditModal(true)
//   }

//   const handleView = (escala) => {
//     setSelectedEscala(escala)
//     setShowDetailModal(true)
//   }

//   const handleDelete = (escala) => {
//     setSelectedEscala(escala)
//     setShowDeleteModal(true)
//   }

//   const confirmDelete = () => {
//     // Aquí iría la lógica para eliminar la escala de la base de datos
//     // Por ahora, solo cerramos el modal
//     setShowDeleteModal(false)
//     // Normalmente aquí actualizaríamos el estado o haríamos una llamada a la API
//   }

//   return (
//     <div className="min-h-screen bg-[#f6f6fb] p-6">
//       {/* Main Content */}
//       <div className="bg-white p-6 rounded-md shadow-sm">
//         <div className="flex justify-between mb-6">
//           <div className="space-y-1">
//             <h2 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h2>
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
//             Añadir Tema
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-[#f6f6fb]">
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Inicial</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Final</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Rango Inicial</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Rango Final</th>
//                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Valoración</th>
//                 <th className="font-medium text-center py-3 px-4 text-[#627b87]">Acciones</th>
//               </tr>
//             </thead>
//             <tbody>
//               {escalasData.map((escala, index) => (
//                 <tr key={index} className="border-b border-[#d9d9d9]">
//                   <td className="py-3 px-4">{escala.fechaInicial}</td>
//                   <td className="py-3 px-4">{escala.fechaFinal}</td>
//                   <td className="py-3 px-4">{escala.rangoInicial}%</td>
//                   <td className="py-3 px-4">{escala.rangoFinal}%</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-2 py-1 rounded text-xs ${
//                         escala.valoracion === "Aprueba" ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
//                       }`}
//                     >
//                       {escala.valoracion}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center gap-2">
//                       <button className="bg-[#ffa600] text-white rounded-full p-1.5" onClick={() => handleEdit(escala)}>
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button
//                         className="bg-[#dc3545] text-white rounded-full p-1.5"
//                         onClick={() => handleDelete(escala)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                       <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={() => handleView(escala)}>
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

//       {/* Add Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir Métrica de Valoración:</h2>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Fecha Inicial</label>
//                     <input
//                       type="text"
//                       placeholder="20/02/25"
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Fecha Final</label>
//                     <input
//                       type="text"
//                       placeholder="20/02/26"
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Rango Inicial</label>
//                     <input type="text" placeholder="75%" className="w-full px-3 py-2 border border-[#d9d9d9] rounded" />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Rango Final</label>
//                     <input
//                       type="text"
//                       placeholder="100%"
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Valoración</label>
//                   <input
//                     type="text"
//                     placeholder="Aprueba"
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>

//                 <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
//                   <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>0</span>
//                     <span>74% Deficiente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
//                     <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
//                   </div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>75%</span>
//                     <span>100% Excelente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
//                     <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-6">
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

//       {/* Edit Modal */}
//       {showEditModal && selectedEscala && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar Métrica de Valoración:</h2>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Fecha Inicial</label>
//                     <input
//                       type="text"
//                       defaultValue={selectedEscala.fechaInicial}
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Fecha Final</label>
//                     <input
//                       type="text"
//                       defaultValue={selectedEscala.fechaFinal}
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Rango Inicial</label>
//                     <input
//                       type="text"
//                       defaultValue={`${selectedEscala.rangoInicial}%`}
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm text-[#627b87] mb-1">Rango Final</label>
//                     <input
//                       type="text"
//                       defaultValue={`${selectedEscala.rangoFinal}%`}
//                       className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-[#627b87] mb-1">Valoración</label>
//                   <input
//                     type="text"
//                     defaultValue={selectedEscala.valoracion}
//                     className="w-full px-3 py-2 border border-[#d9d9d9] rounded"
//                   />
//                 </div>

//                 <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
//                   <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>0</span>
//                     <span>74% Deficiente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
//                     <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
//                   </div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>75%</span>
//                     <span>100% Excelente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
//                     <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2 mt-6">
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

//       {/* Detail Modal */}
//       {showDetailModal && selectedEscala && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Detalle de Métrica Valoración:</h2>

//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Fecha Inicial</div>
//                     <div className="font-medium">{selectedEscala.fechaInicial}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Fecha Final:</div>
//                     <div className="font-medium">{selectedEscala.fechaFinal}</div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Rango Inicial</div>
//                     <div className="font-medium">{selectedEscala.rangoInicial}%</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Rango Final</div>
//                     <div className="font-medium">{selectedEscala.rangoFinal}%</div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-sm text-[#627b87] mb-1">Valoración</div>
//                   <div className="font-medium">{selectedEscala.valoracion}</div>
//                 </div>

//                 <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4">
//                   <div className="text-center font-medium mb-2">Aprueba a partir = 75</div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>0</span>
//                     <span>74% Deficiente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-2 rounded-full">
//                     <div className="bg-[#dc3545] h-2 rounded-full" style={{ width: "74%" }}></div>
//                   </div>

//                   <div className="flex items-center justify-between mb-1">
//                     <span>75%</span>
//                     <span>100% Excelente</span>
//                   </div>

//                   <div className="w-full bg-gray-200 h-2 mb-4 rounded-full">
//                     <div className="bg-[#46ae69] h-2 rounded-full" style={{ width: "25%" }}></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-center mt-6">
//                 <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={() => setShowDetailModal(false)}>
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && selectedEscala && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-[#1f384c] mb-4">Eliminar Métrica de Valoración</h2>

//               <p className="mb-6 text-[#627b87]">
//                 ¿Está seguro de que desea eliminar esta métrica de valoración? Esta acción no se puede deshacer.
//               </p>

//               <div className="border p-4 rounded-md bg-[#f6f6fb] mb-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Fecha Inicial:</div>
//                     <div className="font-medium">{selectedEscala.fechaInicial}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Fecha Final:</div>
//                     <div className="font-medium">{selectedEscala.fechaFinal}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Rango:</div>
//                     <div className="font-medium">
//                       {selectedEscala.rangoInicial}% - {selectedEscala.rangoFinal}%
//                     </div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87] mb-1">Valoración:</div>
//                     <div className="font-medium">{selectedEscala.valoracion}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button
//                   className="px-4 py-2 border border-[#d9d9d9] rounded text-[#627b87]"
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <button className="px-4 py-2 bg-[#dc3545] text-white rounded" onClick={confirmDelete}>
//                   Eliminar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// // Datos de ejemplo
// const escalasData = [
//   {
//     fechaInicial: "20/10/2023",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 1,
//     rangoFinal: 69,
//     valoracion: "No aprueba",
//   },
//   {
//     fechaInicial: "20/10/2020",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 90,
//     valoracion: "Aprueba",
//   },
//   {
//     fechaInicial: "20/10/2024",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 80,
//     valoracion: "No aprueba",
//   },
//   {
//     fechaInicial: "20/10/2021",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 75,
//     valoracion: "Aprueba",
//   },
//   {
//     fechaInicial: "20/10/2022",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 100,
//     valoracion: "No aprueba",
//   },
//   {
//     fechaInicial: "20/03/2023",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 85,
//     valoracion: "No aprueba",
//   },
//   {
//     fechaInicial: "20/02/2022",
//     fechaFinal: "20/10/2026",
//     rangoInicial: 70,
//     rangoFinal: 95,
//     valoracion: "Aprueba",
//   },
// ]

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos de ejemplo
const escalasData = [
  {
    id: 1,
    fechaInicial: "20/10/2023",
    fechaFinal: "20/10/2026",
    rangoInicial: 1,
    rangoFinal: 69,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración para calificaciones insuficientes. Los estudiantes que obtengan una calificación en este rango deberán realizar actividades de refuerzo.",
  },
  {
    id: 2,
    fechaInicial: "20/10/2020",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 90,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones satisfactorias. Los estudiantes que obtengan una calificación en este rango han demostrado un dominio adecuado de los contenidos.",
  },
  {
    id: 3,
    fechaInicial: "20/10/2024",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 80,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración especial para evaluaciones de nivel avanzado. A pesar de estar en un rango normalmente aprobatorio, en este contexto se requiere un desempeño superior.",
  },
  {
    id: 4,
    fechaInicial: "20/10/2021",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 75,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones mínimas aprobatorias. Los estudiantes en este rango han cumplido con los requisitos básicos del curso.",
  },
  {
    id: 5,
    fechaInicial: "20/10/2022",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 100,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración especial para evaluaciones de certificación internacional. Requiere revisión adicional independientemente del puntaje obtenido.",
  },
  {
    id: 6,
    fechaInicial: "20/03/2023",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 85,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración para evaluaciones de nivel experto. Se requiere un desempeño excepcional para aprobar este tipo de evaluaciones.",
  },
  {
    id: 7,
    fechaInicial: "20/02/2022",
    fechaFinal: "20/10/2026",
    rangoInicial: 70,
    rangoFinal: 95,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones en cursos de nivelación. Los estudiantes en este rango han demostrado un progreso significativo.",
  },
]

const columns = [
  { key: "fechaInicial", label: "Fecha Inicial" },
  { key: "fechaFinal", label: "Fecha Final" },
  { key: "rangoInicial", label: "Rango Inicial", render: (item) => `${item.rangoInicial}%` },
  { key: "rangoFinal", label: "Rango Final", render: (item) => `${item.rangoFinal}%` },
  {
    key: "valoracion",
    label: "Valoración",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.valoracion}
      </span>
    ),
  },
]

const Scale = () => {
  const [selectedEscala, setSelectedEscala] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [scales, setScales] = useState([...escalasData])
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Formulario para crear/editar
  const [formData, setFormData] = useState({
    fechaInicial: "",
    fechaFinal: "",
    rangoInicial: "",
    rangoFinal: "",
    valoracion: "Aprueba",
    descripcion: "",
  })

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

  const handleShowEscala = (escala) => {
    setSelectedEscala(escala)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  const handleAddScale = () => {
    setFormData({
      fechaInicial: "",
      fechaFinal: "",
      rangoInicial: "",
      rangoFinal: "",
      valoracion: "Aprueba",
      descripcion: "",
    })
    setIsCreateModalOpen(true)
  }

  const handleEditScale = (scale) => {
    setSelectedEscala(scale)
    setFormData({
      fechaInicial: scale.fechaInicial,
      fechaFinal: scale.fechaFinal,
      rangoInicial: scale.rangoInicial,
      rangoFinal: scale.rangoFinal,
      valoracion: scale.valoracion,
      descripcion: scale.descripcion,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteScale = (id) => {
    setItemToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteScale = () => {
    try {
      // Eliminar de la lista local
      const updatedScales = scales.filter((s) => s.id !== itemToDelete)
      setScales(updatedScales)

      // Mostrar mensaje de éxito
      setSuccessMessage("Escala eliminada exitosamente")
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error al eliminar la escala:", error)
      setSuccessMessage("Ocurrió un error al eliminar la escala")
      setShowSuccessModal(true)
    } finally {
      setShowDeleteConfirm(false)
      setItemToDelete(null)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "rangoInicial" || name === "rangoFinal" ? Number.parseInt(value) || "" : value,
    })
  }

  const handleToggleValoracion = () => {
    setFormData({
      ...formData,
      valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
    })
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const newScale = {
      id: Math.max(...scales.map((s) => s.id)) + 1,
      ...formData,
    }
    setScales([...scales, newScale])
    setIsCreateModalOpen(false)
    setSuccessMessage("Escala creada exitosamente")
    setShowSuccessModal(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const updatedScales = scales.map((scale) => (scale.id === selectedEscala.id ? { ...scale, ...formData } : scale))
    setScales(updatedScales)
    setIsEditModalOpen(false)
    setSuccessMessage("Escala actualizada exitosamente")
    setShowSuccessModal(true)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Escala de valoración</h1>
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
          data={scales}
          columns={columns}
          onShow={handleShowEscala}
          onAdd={handleAddScale}
          onEdit={handleEditScale}
          onDelete={handleDeleteScale}
          showActions={{ show: true, edit: true, delete: true, add: true }}
        />

        {selectedEscala && (
          <ScaleDetailModal escala={selectedEscala} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
        )}

        {/* Create Scale Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1f384c] mb-4">CREAR ESCALA DE VALORACIÓN</h2>

                <form onSubmit={handleCreateSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
                      <input
                        type="text"
                        name="fechaInicial"
                        value={formData.fechaInicial}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
                      <input
                        type="text"
                        name="fechaFinal"
                        value={formData.fechaFinal}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
                      <input
                        type="number"
                        name="rangoInicial"
                        value={formData.rangoInicial}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
                      <input
                        type="number"
                        name="rangoFinal"
                        value={formData.rangoFinal}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.valoracion === "Aprueba"}
                            onChange={handleToggleValoracion}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Descripción de la escala de valoración..."
                    ></textarea>
                  </div>

                  <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
                    <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

                    <div className="mb-2 text-sm text-center">
                      {formData.valoracion === "Aprueba"
                        ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
                        : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
                    </div>

                    {formData.valoracion === "No aprueba" ? (
                      <>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>0%</span>
                          <span>{formData.rangoFinal || 0}% Deficiente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#dc3545] h-5 rounded"
                            style={{ width: `${formData.rangoFinal || 0}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>{(formData.rangoFinal || 0) + 1}%</span>
                          <span>100% Excelente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#46ae69] h-5 rounded"
                            style={{
                              width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
                              marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
                            }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>0%</span>
                          <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#dc3545] h-5 rounded"
                            style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>{formData.rangoInicial || 0}%</span>
                          <span>100% Excelente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#46ae69] h-5 rounded"
                            style={{
                              width: `${100 - (formData.rangoInicial || 0)}%`,
                              marginLeft: `${formData.rangoInicial || 0}%`,
                            }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Crear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Scale Modal */}
        {isEditModalOpen && selectedEscala && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1f384c] mb-4">EDITAR ESCALA DE VALORACIÓN</h2>

                <form onSubmit={handleEditSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
                      <input
                        type="text"
                        name="fechaInicial"
                        value={formData.fechaInicial}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
                      <input
                        type="text"
                        name="fechaFinal"
                        value={formData.fechaFinal}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
                      <input
                        type="number"
                        name="rangoInicial"
                        value={formData.rangoInicial}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
                      <input
                        type="number"
                        name="rangoFinal"
                        value={formData.rangoFinal}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.valoracion === "Aprueba"}
                            onChange={handleToggleValoracion}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Descripción de la escala de valoración..."
                    ></textarea>
                  </div>

                  <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
                    <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

                    <div className="mb-2 text-sm text-center">
                      {formData.valoracion === "Aprueba"
                        ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
                        : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
                    </div>

                    {formData.valoracion === "No aprueba" ? (
                      <>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>0%</span>
                          <span>{formData.rangoFinal || 0}% Deficiente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#dc3545] h-5 rounded"
                            style={{ width: `${formData.rangoFinal || 0}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>{(formData.rangoFinal || 0) + 1}%</span>
                          <span>100% Excelente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#46ae69] h-5 rounded"
                            style={{
                              width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
                              marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
                            }}
                          ></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>0%</span>
                          <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#dc3545] h-5 rounded"
                            style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>{formData.rangoInicial || 0}%</span>
                          <span>100% Excelente</span>
                        </div>
                        <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                          <div
                            className="bg-[#46ae69] h-5 rounded"
                            style={{
                              width: `${100 - (formData.rangoInicial || 0)}%`,
                              marginLeft: `${formData.rangoInicial || 0}%`,
                            }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar escala */}
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDeleteScale}
          title="Eliminar Escala"
          message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
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
      </div>

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

// Componente para el modal de detalle de escala
const ScaleDetailModal = ({ escala, isOpen, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !escala) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">DETALLE ESCALA DE VALORACIÓN</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex">
              <div className="w-1/3 font-medium text-base">Fecha Inicial:</div>
              <div className="w-2/3 text-base text-gray-500">{escala.fechaInicial}</div>
            </div>

            <div className="flex">
              <div className="w-1/2 font-medium text-base">Fecha Final:</div>
              <div className="w-1/2 text-base text-gray-500">{escala.fechaFinal}</div>
            </div>

            <div className="flex">
              <div className="w-1/3 font-medium text-base">Rango Inicial:</div>
              <div className="w-2/3 text-base text-gray-500">{escala.rangoInicial}%</div>
            </div>

            <div className="flex">
              <div className="w-1/2 font-medium text-base">Rango Final:</div>
              <div className="w-1/2 text-base text-gray-500">{escala.rangoFinal}%</div>
            </div>

            <div className="flex">
              <div className="w-1/3 font-medium text-base">Valoración:</div>
              <div className="w-2/3 text-base text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    escala.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {escala.valoracion}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-3">Descripción</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700 text-sm">{escala.descripcion}</p>
          </div>

          <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-6">
            <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

            <div className="mb-2 text-sm text-center">
              {escala.valoracion === "Aprueba"
                ? `Aprueba a partir = ${escala.rangoInicial}%`
                : `Aprueba a partir = ${escala.rangoFinal + 1}%`}
            </div>

            {escala.valoracion === "No aprueba" ? (
              <>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>0%</span>
                  <span>{escala.rangoFinal}% Deficiente</span>
                </div>
                <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                  <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoFinal}%` }}></div>
                </div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{escala.rangoFinal + 1}%</span>
                  <span>100% Excelente</span>
                </div>
                <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                  <div
                    className="bg-[#46ae69] h-5 rounded"
                    style={{ width: `${100 - (escala.rangoFinal + 1)}%`, marginLeft: `${escala.rangoFinal + 1}%` }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>0%</span>
                  <span>{escala.rangoInicial - 1}% Deficiente</span>
                </div>
                <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                  <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoInicial - 1}%` }}></div>
                </div>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span>{escala.rangoInicial}%</span>
                  <span>100% Excelente</span>
                </div>
                <div className="w-full bg-gray-200 h-5 mb-2 rounded">
                  <div
                    className="bg-[#46ae69] h-5 rounded"
                    style={{ width: `${100 - escala.rangoInicial}%`, marginLeft: `${escala.rangoInicial}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scale

